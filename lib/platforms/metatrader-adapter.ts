// src/lib/platforms/metatrader-adapter.ts

import type { PlatformAdapter, ConnectionCredentials } from "./platform-adapter"
import type { TradingAccount, Trade } from "@/lib/trading-types"
import metaApiService from "./metaapi-service"

export class MetaTraderAdapter implements PlatformAdapter {
  name: string
  private server: string | null = null
  private login: string | null = null
  private password: string | null = null
  private investorPassword: string | null = null
  private broker: string | null = null
  private isConnected = false

  constructor(name: string) {
    this.name = name
  }

  async connectToMT5(accountId: string): Promise<boolean> {
    // Check if MetaAPI service is ready
    if (!metaApiService.isReady()) {
      const error = metaApiService.getInitializationError()
      console.error("MetaAPI service not ready:", error)
      return false
    }

    if (!this.server || !this.login || !this.password) {
      console.error("Missing credentials for MT5 connection")
      return false
    }

    try {
      const result = await metaApiService.connectAccount({
        login: this.login,
        password: this.password,
        server: this.server,
        accountId,
      })

      this.isConnected = result.success
      if (!result.success) {
        console.error("Failed to connect to MT5:", result.error)
      }
      return result.success
    } catch (error) {
      console.error("Error connecting to MT5:", error)
      return false
    }
  }

  async connect(credentials: ConnectionCredentials): Promise<boolean> {
    this.server = credentials.server || null
    this.login = credentials.login || null
    this.password = credentials.password || null
    this.investorPassword = credentials.investorPassword || null
    this.broker = credentials.broker || null

    // Check if MetaAPI service is ready before attempting connection
    if (!metaApiService.isReady()) {
      console.warn("MetaAPI service not ready. Connection will be simulated.")
      // For demo purposes, we can simulate a successful connection
      this.isConnected = true
      return true
    }

    // Connect to MT5 using the account ID (you can use the login as the account ID)
    return await this.connectToMT5(this.login as string)
  }

  async fetchMT5AccountData(accountId: string): Promise<TradingAccount | null> {
    if (!metaApiService.isReady()) {
      // Return mock data if service is not ready
      return {
        name: this.name,
        server: this.server || "",
        balance: 10000,
        equity: 10000,
        margin: 0,
        freeMargin: 10000,
        leverage: 100,
        currency: "USD",
        openPositions: 0,
        profit: 0,
      }
    }

    try {
      const accountInfo = await metaApiService.getAccountInformation(accountId)

      if (!accountInfo) {
        return null
      }

      // Convert MT5 account data to your TradingAccount interface
      return {
        name: accountInfo.name || this.name,
        server: this.server || "",
        balance: accountInfo.balance,
        equity: accountInfo.equity,
        margin: accountInfo.margin,
        freeMargin: accountInfo.freeMargin,
        leverage: accountInfo.leverage,
        currency: accountInfo.currency,
        openPositions: accountInfo.openPositions || 0,
        profit: accountInfo.profit || 0,
      }
    } catch (error) {
      console.error("Error fetching MT5 account data:", error)
      return null
    }
  }

  async getAccount(): Promise<TradingAccount | null> {
    if (!this.isConnected || !this.login) {
      return null
    }

    return await this.fetchMT5AccountData(this.login)
  }

  async fetchMT5Trades(accountId: string): Promise<Trade[]> {
    if (!metaApiService.isReady()) {
      // Return mock trades if service is not ready
      return []
    }

    try {
      // Get the last 90 days of trading history
      const endDate = new Date()
      const startDate = new Date()
      startDate.setDate(startDate.getDate() - 90)

      const history = await metaApiService.getTradeHistory(accountId, startDate, endDate)

      if (!history || !history.deals) {
        return []
      }

      // Convert MT5 deals to your Trade interface
      return history.deals.map((deal: any) => ({
        id: deal.id || deal.ticket || "",
        symbol: deal.symbol || "",
        type: deal.type || "",
        openTime: deal.time ? new Date(deal.time) : new Date(),
        closeTime: deal.time ? new Date(deal.time) : new Date(),
        openPrice: deal.price || 0,
        closePrice: deal.price || 0,
        volume: deal.volume || 0,
        profit: deal.profit || 0,
      }))
    } catch (error) {
      console.error("Error fetching MT5 trades:", error)
      return []
    }
  }

  async getTrades(): Promise<Trade[]> {
    if (!this.isConnected || !this.login) {
      return []
    }

    return await this.fetchMT5Trades(this.login)
  }

  async disconnect(): Promise<boolean> {
    if (!this.isConnected || !this.login) {
      return true
    }

    if (!metaApiService.isReady()) {
      this.isConnected = false
      return true
    }

    try {
      const result = await metaApiService.disconnectAccount(this.login)
      this.isConnected = !result.success
      return result.success
    } catch (error) {
      console.error("Error disconnecting from MT5:", error)
      return false
    }
  }
}

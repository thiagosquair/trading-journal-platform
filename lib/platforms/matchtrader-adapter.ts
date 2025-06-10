import type { PlatformAdapter, ConnectionCredentials } from "./platform-adapter"
import type { TradingAccount, Trade } from "@/lib/trading-types"
import { MatchTraderApiClient, type MatchTraderCredentials } from "@/lib/api-clients/matchtrader-api-client"

export class MatchTraderAdapter implements PlatformAdapter {
  name: string
  private apiClient: MatchTraderApiClient
  private isConnected = false

  constructor() {
    this.name = "MatchTrader"
    this.apiClient = new MatchTraderApiClient()
  }

  async connect(credentials: ConnectionCredentials): Promise<boolean> {
    if (!credentials.login || !credentials.password || !credentials.server) {
      throw new Error("Username, password, and server are required for MatchTrader")
    }

    try {
      const matchTraderCredentials: MatchTraderCredentials = {
        username: credentials.login,
        password: credentials.password,
        server: credentials.server,
        accountType: credentials.accountType === "live" ? "live" : "demo",
      }

      const success = await this.apiClient.authenticate(matchTraderCredentials)
      this.isConnected = success
      return success
    } catch (error) {
      console.error("MatchTrader connection error:", error)
      throw error
    }
  }

  async fetchAccounts(): Promise<TradingAccount[]> {
    if (!this.isConnected) {
      throw new Error("Not connected to MatchTrader")
    }

    try {
      const accountInfo = await this.apiClient.getAccountInfo()

      const account: TradingAccount = {
        id: accountInfo.id,
        name: accountInfo.name,
        broker: "MatchTrader",
        status: accountInfo.status,
        balance: accountInfo.balance,
        equity: accountInfo.equity,
        openPL: accountInfo.equity - accountInfo.balance,
        lastUpdated: accountInfo.lastUpdated,
        accountNumber: accountInfo.accountNumber,
        currency: accountInfo.currency,
        leverage: accountInfo.leverage,
        server: accountInfo.server,
        type: accountInfo.type,
        margin: accountInfo.margin,
        freeMargin: accountInfo.freeMargin,
        marginLevel: accountInfo.marginLevel,
      }

      return [account]
    } catch (error) {
      console.error("Error fetching MatchTrader accounts:", error)
      throw error
    }
  }

  async fetchTrades(accountId: string): Promise<Trade[]> {
    if (!this.isConnected) {
      throw new Error("Not connected to MatchTrader")
    }

    try {
      // Fetch both open positions and trade history
      const [openPositions, tradeHistory] = await Promise.all([
        this.apiClient.getOpenPositions(),
        this.apiClient.getTradeHistory(),
      ])

      const trades: Trade[] = []

      // Convert open positions to trades
      for (const position of openPositions) {
        trades.push({
          id: position.id,
          accountId,
          symbol: position.symbol,
          direction: position.type === "buy" ? "long" : "short",
          openDate: position.openTime,
          closeDate: undefined,
          openPrice: position.openPrice,
          closePrice: undefined,
          size: position.volume,
          profit: position.profit,
          profitPercent: position.profit
            ? Number.parseFloat(((position.profit / (position.openPrice * position.volume * 100)) * 100).toFixed(2))
            : undefined,
          status: "open",
          stopLoss: position.stopLoss,
          takeProfit: position.takeProfit,
          tags: ["matchtrader", position.symbol.toLowerCase()],
          swap: position.swap,
          commission: position.commission,
        })
      }

      // Convert trade history to trades
      for (const trade of tradeHistory) {
        trades.push({
          id: trade.id,
          accountId,
          symbol: trade.symbol,
          direction: trade.type === "buy" ? "long" : "short",
          openDate: trade.openTime,
          closeDate: trade.closeTime,
          openPrice: trade.openPrice,
          closePrice: trade.closePrice,
          size: trade.volume,
          profit: trade.profit,
          profitPercent:
            trade.profit && trade.closePrice
              ? Number.parseFloat(((trade.profit / (trade.openPrice * trade.volume * 100)) * 100).toFixed(2))
              : undefined,
          status: trade.status,
          stopLoss: trade.stopLoss,
          takeProfit: trade.takeProfit,
          tags: ["matchtrader", trade.symbol.toLowerCase()],
          notes: trade.comment,
          swap: trade.swap,
          commission: trade.commission,
        })
      }

      return trades
    } catch (error) {
      console.error("Error fetching MatchTrader trades:", error)
      throw error
    }
  }

  async syncAccount(accountId: string): Promise<void> {
    if (!this.isConnected) {
      throw new Error("Not connected to MatchTrader")
    }

    try {
      // Refresh account data
      await this.apiClient.getAccountInfo()
      console.log(`MatchTrader account ${accountId} synced successfully`)
    } catch (error) {
      console.error("Error syncing MatchTrader account:", error)
      throw error
    }
  }

  async disconnect(accountId: string): Promise<void> {
    this.apiClient.disconnect()
    this.isConnected = false
    console.log("Disconnected from MatchTrader")
  }
}

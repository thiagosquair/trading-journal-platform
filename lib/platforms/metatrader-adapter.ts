import type { PlatformAdapter, ConnectionCredentials } from "./platform-adapter"
import type { TradingAccount, Trade } from "@/lib/trading-types"
import {
  connectToMT5,
  fetchMT5AccountData,
  fetchMT5Trades,
  convertMT5AccountToTradingAccount,
  convertMT5TradesToTrades,
} from "@/lib/mt5-api-client"

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

  async connect(credentials: ConnectionCredentials): Promise<boolean> {
    this.server = credentials.server || null
    this.login = credentials.login || null
    this.password = credentials.password || null
    this.investorPassword = credentials.investorPassword || null
    this.broker = credentials.broker || null

    if (!this.server || !this.login || !(this.password || this.investorPassword)) {
      throw new Error("Server, login, and either password or investor password are required")
    }

    try {
      // Connect to MT5 using the API client
      const isConnected = await connectToMT5({
        server: this.server,
        login: this.login,
        password: this.password || this.investorPassword!,
        isInvestor: !!this.investorPassword,
      })

      if (!isConnected) {
        throw new Error("Failed to connect to MT5 server")
      }

      this.isConnected = true
      return true
    } catch (error) {
      console.error(`${this.name} connection error:`, error)
      throw error
    }
  }

  async fetchAccounts(): Promise<TradingAccount[]> {
    if (!this.isConnected || !this.server || !this.login) {
      throw new Error("Not connected to MetaTrader")
    }

    try {
      // Fetch account data using the API client
      const mt5Account = await fetchMT5AccountData(this.server, this.login)

      // Convert to our internal format
      const account = convertMT5AccountToTradingAccount(
        mt5Account,
        this.login === "536407" ? "Alvar Teste" : `${this.broker || "MetaTrader"} Account`,
      )

      return [account]
    } catch (error) {
      console.error(`Error fetching ${this.name} accounts:`, error)
      throw error
    }
  }

  async fetchTrades(accountId: string): Promise<Trade[]> {
    if (!this.isConnected || !this.server || !this.login) {
      throw new Error("Not connected to MetaTrader")
    }

    try {
      // Fetch trades using the API client
      const mt5Trades = await fetchMT5Trades(this.server, this.login)

      // Convert to our internal format
      return convertMT5TradesToTrades(mt5Trades, accountId)
    } catch (error) {
      console.error(`Error fetching ${this.name} trades:`, error)
      throw error
    }
  }

  async syncAccount(accountId: string): Promise<void> {
    if (!this.isConnected) {
      throw new Error("Not connected to MetaTrader")
    }

    try {
      // In a real implementation, we would sync with the MT5 API
      // For now, we'll just refresh the account data and trades
      await this.fetchAccounts()
      await this.fetchTrades(accountId)
    } catch (error) {
      console.error(`Error syncing ${this.name} account:`, error)
      throw error
    }
  }

  async disconnect(accountId: string): Promise<void> {
    // Clear session storage
    if (this.login) {
      sessionStorage.removeItem(`mt5_connection_${this.login}`)
      sessionStorage.removeItem(`mt5_account_${this.login}`)
      sessionStorage.removeItem(`mt5_trades_${this.login}`)
    }

    // Reset connection state
    this.server = null
    this.login = null
    this.password = null
    this.investorPassword = null
    this.broker = null
    this.isConnected = false

    console.log(`Disconnected from ${this.name}`)
  }
}

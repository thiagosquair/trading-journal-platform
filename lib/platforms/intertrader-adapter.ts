import type { PlatformAdapter, ConnectionCredentials } from "./platform-adapter"
import type { TradingAccount, Trade } from "@/lib/trading-types"

export class InterTraderAdapter implements PlatformAdapter {
  name = "InterTrader"
  private server: string | null = null
  private login: string | null = null
  private password: string | null = null
  private investorPassword: string | null = null
  private isConnected = false

  async connect(credentials: ConnectionCredentials): Promise<boolean> {
    this.server = credentials.server || "InterTrader-Server"
    this.login = credentials.login || null
    this.password = credentials.password || null
    this.investorPassword = credentials.investorPassword || null

    if (!this.login || !this.password) {
      throw new Error("Login and password are required for InterTrader")
    }

    try {
      // In a real implementation, we would connect to the InterTrader API
      // For demo purposes, we'll simulate a successful connection
      console.log(`Connecting to InterTrader, server: ${this.server}, login: ${this.login}`)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      this.isConnected = true
      return true
    } catch (error) {
      console.error("InterTrader connection error:", error)
      throw error
    }
  }

  async fetchAccounts(): Promise<TradingAccount[]> {
    if (!this.isConnected) {
      throw new Error("Not connected to InterTrader")
    }

    try {
      // In a real implementation, we would fetch account data from the InterTrader API
      // For demo purposes, we'll return mock data

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Create a mock account
      const account: TradingAccount = {
        id: this.login!,
        name: "InterTrader Account",
        broker: "InterTrader",
        status: "active",
        balance: 100000,
        equity: 102500,
        openPL: 2500,
        lastUpdated: new Date().toISOString(),
        accountNumber: this.login!,
        currency: "GBP",
      }

      return [account]
    } catch (error) {
      console.error("Error fetching InterTrader accounts:", error)
      throw error
    }
  }

  async fetchTrades(accountId: string): Promise<Trade[]> {
    if (!this.isConnected) {
      throw new Error("Not connected to InterTrader")
    }

    try {
      // In a real implementation, we would fetch trades from the InterTrader API
      // For demo purposes, we'll return mock trades

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1200))

      // Generate some mock trades
      const mockTrades: Trade[] = []
      const symbols = ["EURUSD", "GBPUSD", "USDJPY", "UK100", "DE30", "US500", "XAUUSD"]
      const now = new Date()

      // Generate 15 random trades
      for (let i = 0; i < 15; i++) {
        const isOpen = Math.random() > 0.5
        const openDate = new Date(now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000)
        const closeDate = isOpen ? undefined : new Date(openDate.getTime() + Math.random() * 5 * 24 * 60 * 60 * 1000)
        const direction = Math.random() > 0.5 ? "long" : "short"
        const symbol = symbols[Math.floor(Math.random() * symbols.length)]
        const openPrice = Number.parseFloat((Math.random() * 100 + 50).toFixed(2))
        const closePrice = isOpen
          ? undefined
          : Number.parseFloat((openPrice * (1 + (direction === "long" ? 1 : -1) * Math.random() * 0.05)).toFixed(2))
        const size = Math.floor(Math.random() * 5) + 1
        const profit = isOpen
          ? undefined
          : Number.parseFloat(((closePrice! - openPrice) * (direction === "long" ? 1 : -1) * size * 100).toFixed(2))

        mockTrades.push({
          id: `it-${i + 1}`,
          accountId,
          symbol,
          direction,
          openDate: openDate.toISOString(),
          closeDate: closeDate?.toISOString(),
          openPrice,
          closePrice,
          size,
          profit,
          profitPercent: profit ? Number.parseFloat(((profit / (openPrice * size * 100)) * 100).toFixed(2)) : undefined,
          status: isOpen ? "open" : "closed",
          stopLoss: direction === "long" ? openPrice * 0.98 : openPrice * 1.02,
          takeProfit: direction === "long" ? openPrice * 1.03 : openPrice * 0.97,
          tags: ["intertrader", symbol.toLowerCase()],
        })
      }

      return mockTrades
    } catch (error) {
      console.error("Error fetching InterTrader trades:", error)
      throw error
    }
  }

  async syncAccount(accountId: string): Promise<void> {
    if (!this.isConnected) {
      throw new Error("Not connected to InterTrader")
    }

    try {
      // In a real implementation, we would sync with the InterTrader API
      // For demo purposes, we'll simulate a sync operation
      console.log(`Syncing InterTrader account: ${accountId}`)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
    } catch (error) {
      console.error("Error syncing InterTrader account:", error)
      throw error
    }
  }

  async disconnect(accountId: string): Promise<void> {
    // In a real implementation, we would disconnect from the InterTrader API
    this.server = null
    this.login = null
    this.password = null
    this.investorPassword = null
    this.isConnected = false

    console.log("Disconnected from InterTrader")
  }
}

import type { PlatformAdapter, ConnectionCredentials } from "./platform-adapter"
import type { TradingAccount, Trade } from "@/lib/trading-types"

export class TradeLockerAdapter implements PlatformAdapter {
  name = "TradeLocker"

  async connect(credentials: ConnectionCredentials): Promise<boolean> {
    console.log("Connecting to TradeLocker with credentials:", credentials)

    // Validate required credentials
    if (!credentials.apiKey || !credentials.apiSecret) {
      console.error("TradeLocker connection failed: Missing API key or secret")
      return false
    }

    // In a real implementation, this would make an API call to TradeLocker
    // For demo purposes, we'll simulate a successful connection
    return true
  }

  async fetchAccounts(): Promise<TradingAccount[]> {
    // In a real implementation, this would fetch accounts from TradeLocker API
    // For demo purposes, we'll return a mock account
    return [
      {
        id: "tl-" + Math.random().toString(36).substring(2, 10),
        name: "TradeLocker Account",
        broker: "TradeLocker",
        status: "active",
        balance: 25000 + Math.random() * 5000,
        equity: 25000 + Math.random() * 5000,
        openPL: Math.random() * 1000 - 500,
        lastUpdated: new Date().toISOString(),
        accountNumber: "TL" + Math.floor(100000 + Math.random() * 900000),
        currency: "USD",
      },
    ]
  }

  async fetchTrades(accountId: string): Promise<Trade[]> {
    // In a real implementation, this would fetch trades from TradeLocker API
    // For demo purposes, we'll return mock trades
    const mockTrades: Trade[] = []

    // Generate some random trades
    const symbols = ["EURUSD", "GBPUSD", "USDJPY", "AUDUSD", "USDCAD"]
    const directions = ["long", "short"] as const
    const statuses = ["open", "closed"] as const

    for (let i = 0; i < 5; i++) {
      const isOpen = Math.random() > 0.5
      const direction = directions[Math.floor(Math.random() * directions.length)]
      const symbol = symbols[Math.floor(Math.random() * symbols.length)]
      const openPrice = 1 + Math.random()
      const closePrice = isOpen ? undefined : openPrice * (1 + (direction === "long" ? 0.01 : -0.01) * Math.random())
      const size = Math.floor(1 + Math.random() * 10) * 0.1
      const profit = isOpen ? undefined : (closePrice! - openPrice) * size * (direction === "long" ? 1 : -1)

      mockTrades.push({
        id: "tl-trade-" + Math.random().toString(36).substring(2, 10),
        accountId,
        symbol,
        direction,
        openDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        closeDate: isOpen ? undefined : new Date(Date.now() - Math.random() * 15 * 24 * 60 * 60 * 1000).toISOString(),
        openPrice,
        closePrice,
        size,
        profit,
        profitPercent: profit ? (profit / (openPrice * size)) * 100 : undefined,
        status: isOpen ? "open" : "closed",
        stopLoss: direction === "long" ? openPrice * 0.99 : openPrice * 1.01,
        takeProfit: direction === "long" ? openPrice * 1.02 : openPrice * 0.98,
        tags: ["tradelocker", Math.random() > 0.5 ? "automated" : "manual"],
      })
    }

    return mockTrades
  }

  async syncAccount(accountId: string): Promise<void> {
    console.log(`Syncing TradeLocker account ${accountId}`)
    // In a real implementation, this would sync the account with TradeLocker API
    // For demo purposes, we'll just log the sync
  }

  async disconnect(accountId: string): Promise<void> {
    console.log(`Disconnecting TradeLocker account ${accountId}`)
    // In a real implementation, this would disconnect from TradeLocker API
    // For demo purposes, we'll just log the disconnect
  }

  getConnectionStatus(accountId: string): Promise<{
    connected: boolean
    lastSyncTime?: string
    error?: string
    statusMessage?: string
    syncInProgress?: boolean
  }> {
    return Promise.resolve({
      connected: true,
      lastSyncTime: new Date().toISOString(),
      statusMessage: "Connected to TradeLocker",
      syncInProgress: false,
    })
  }

  getSupportedFeatures(): {
    realTimeData: boolean
    historicalData: boolean
    orderExecution: boolean
    paperTrading: boolean
    readOnly: boolean
    multipleAccounts: boolean
    supportedTimeframes: string[]
    supportedOrderTypes: string[]
    supportedAssetClasses: string[]
  } {
    return {
      realTimeData: true,
      historicalData: true,
      orderExecution: true,
      paperTrading: true,
      readOnly: false,
      multipleAccounts: true,
      supportedTimeframes: ["1m", "5m", "15m", "30m", "1h", "4h", "1d", "1w"],
      supportedOrderTypes: ["market", "limit", "stop", "stop-limit"],
      supportedAssetClasses: ["forex", "stocks", "indices", "commodities", "crypto"],
    }
  }
}

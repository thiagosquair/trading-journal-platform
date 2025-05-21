// MT5 API Client for connecting to and fetching data from MT5 servers
import type { TradingAccount, Trade } from "@/lib/trading-types"

// MT5 API connection configuration
export interface MT5ConnectionConfig {
  server: string
  login: string
  password: string
  isInvestor: boolean
}

// MT5 Account data as returned from the API
export interface MT5AccountData {
  login: string
  name?: string
  server: string
  balance: number
  equity: number
  margin: number
  freeMargin: number
  leverage: string
  currency: string
  openPositions: number
  profit: number
}

// MT5 Trade data as returned from the API
export interface MT5TradeData {
  ticket: number
  symbol: string
  type: string
  volume: number
  openPrice: number
  closePrice: number | null
  openTime: string
  closeTime: string | null
  stopLoss: number | null
  takeProfit: number | null
  profit: number
  commission: number
  swap: number
  comment: string
}

/**
 * Connect to MT5 server and authenticate
 */
export async function connectToMT5(config: MT5ConnectionConfig): Promise<boolean> {
  try {
    // In a production environment, this would make a real API call
    // For now, we'll simulate the API call for development purposes
    if (process.env.NODE_ENV === "production") {
      const response = await fetch(`https://${config.server}/api/auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          login: config.login,
          password: config.password,
          isInvestor: config.isInvestor,
        }),
      })

      if (!response.ok) {
        throw new Error(`Connection failed: ${response.statusText}`)
      }

      const data = await response.json()

      // Store the auth token
      sessionStorage.setItem("mt5_token", data.token)
    } else {
      // For development, simulate a successful connection
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }

    // Store connection info
    sessionStorage.setItem(
      "mt5_connection",
      JSON.stringify({
        server: config.server,
        login: config.login,
        isInvestor: config.isInvestor,
        connectedAt: new Date().toISOString(),
      }),
    )

    return true
  } catch (error) {
    console.error("MT5 connection error:", error)
    return false
  }
}

/**
 * Fetch account data from MT5 server
 */
export async function fetchMT5AccountData(server: string, login: string): Promise<MT5AccountData> {
  try {
    // In a production environment, this would make a real API call
    if (process.env.NODE_ENV === "production") {
      const token = sessionStorage.getItem("mt5_token")
      if (!token) {
        throw new Error("Not authenticated")
      }

      const response = await fetch(`https://${server}/api/account/${login}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch account data: ${response.statusText}`)
      }

      const data = await response.json()

      return {
        login: login,
        server: server,
        balance: data.balance,
        equity: data.equity,
        margin: data.margin,
        freeMargin: data.freeMargin,
        leverage: data.leverage,
        currency: data.currency,
        openPositions: data.positions,
        profit: data.profit,
      }
    } else {
      // For development, return mock data
      console.log(`Fetching account data for ${login} from ${server}`)

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check if we have a stored account for this login (for demo persistence)
      const storedAccount = sessionStorage.getItem(`mt5_account_${login}`)
      if (storedAccount) {
        return JSON.parse(storedAccount)
      }

      // Special handling for account 536407 (InterTrader)
      if (login === "536407") {
        const accountData: MT5AccountData = {
          login: login,
          server: server,
          balance: 50000.0,
          equity: 50250.0,
          margin: 5000.0,
          freeMargin: 45250.0,
          leverage: "1:200",
          currency: "GBP",
          openPositions: 2,
          profit: 250.0,
        }

        // Store the account data in sessionStorage for demo persistence
        sessionStorage.setItem(`mt5_account_${login}`, JSON.stringify(accountData))
        return accountData
      }

      // Generate realistic account data based on the login number
      const accountData: MT5AccountData = {
        login: login,
        server: server,
        balance: 10000.0,
        equity: 10250.0,
        margin: 1000.0,
        freeMargin: 9250.0,
        leverage: "1:100",
        currency: "USD",
        openPositions: 2,
        profit: 250.0,
      }

      // Store the account data in sessionStorage for demo persistence
      sessionStorage.setItem(`mt5_account_${login}`, JSON.stringify(accountData))
      return accountData
    }
  } catch (error) {
    console.error("Error fetching MT5 account data:", error)
    throw error
  }
}

/**
 * Fetch trades from MT5 server
 */
export async function fetchMT5Trades(server: string, login: string): Promise<MT5TradeData[]> {
  try {
    // In a production environment, this would make a real API call
    if (process.env.NODE_ENV === "production") {
      const token = sessionStorage.getItem("mt5_token")
      if (!token) {
        throw new Error("Not authenticated")
      }

      const response = await fetch(`https://${server}/api/trades/${login}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch trades: ${response.statusText}`)
      }

      return await response.json()
    } else {
      // For development, return mock trades
      console.log(`Fetching trades for ${login} from ${server}`)

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1200))

      // Check if we have stored trades for this login (for demo persistence)
      const storedTrades = sessionStorage.getItem(`mt5_trades_${login}`)
      if (storedTrades) {
        return JSON.parse(storedTrades)
      }

      // For the InterTrader account (536407), return specific trades
      if (login === "536407") {
        const trades: MT5TradeData[] = [
          {
            ticket: 123456,
            symbol: "EURUSD",
            type: "buy",
            volume: 1.0,
            openPrice: 1.085,
            closePrice: 1.092,
            openTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            closeTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            stopLoss: 1.08,
            takeProfit: 1.095,
            profit: 700,
            commission: -15,
            swap: -5,
            comment: "Market execution",
          },
          {
            ticket: 123457,
            symbol: "GBPUSD",
            type: "sell",
            volume: 0.5,
            openPrice: 1.265,
            closePrice: null,
            openTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            closeTime: null,
            stopLoss: 1.27,
            takeProfit: 1.255,
            profit: 250,
            commission: -10,
            swap: -3,
            comment: "Market execution",
          },
          {
            ticket: 123458,
            symbol: "XAUUSD",
            type: "buy",
            volume: 0.1,
            openPrice: 2100.0,
            closePrice: null,
            openTime: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
            closeTime: null,
            stopLoss: 2080.0,
            takeProfit: 2150.0,
            profit: -50,
            commission: -5,
            swap: 0,
            comment: "Market execution",
          },
        ]

        // Store trades in sessionStorage for demo persistence
        sessionStorage.setItem(`mt5_trades_${login}`, JSON.stringify(trades))
        return trades
      }

      // Generate some mock trades for other accounts
      const mockTrades: MT5TradeData[] = []
      const symbols = ["EURUSD", "GBPUSD", "USDJPY", "AUDUSD", "USDCAD", "XAUUSD"]
      const now = new Date()

      // Generate 10 random trades
      for (let i = 0; i < 10; i++) {
        const isOpen = Math.random() > 0.5
        const openDate = new Date(now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000) // Random date in last 30 days
        const closeDate = isOpen ? null : new Date(openDate.getTime() + Math.random() * 5 * 24 * 60 * 60 * 1000)
        const direction = Math.random() > 0.5 ? "buy" : "sell"
        const symbol = symbols[Math.floor(Math.random() * symbols.length)]
        const openPrice = Number.parseFloat((Math.random() * 100 + 50).toFixed(2))
        const closePrice = isOpen
          ? null
          : Number.parseFloat((openPrice * (1 + (direction === "buy" ? 1 : -1) * Math.random() * 0.05)).toFixed(2))
        const volume = Math.floor(Math.random() * 5) + 1
        const profit = isOpen
          ? Math.random() * 200 - 100
          : Number.parseFloat(((closePrice! - openPrice) * (direction === "buy" ? 1 : -1) * volume * 100).toFixed(2))

        mockTrades.push({
          ticket: 100000 + i,
          symbol,
          type: direction,
          volume,
          openPrice,
          closePrice,
          openTime: openDate.toISOString(),
          closeTime: closeDate?.toISOString() || null,
          stopLoss: direction === "buy" ? openPrice * 0.98 : openPrice * 1.02,
          takeProfit: direction === "buy" ? openPrice * 1.03 : openPrice * 0.97,
          profit,
          commission: -Math.round(volume * 5),
          swap: -Math.round(Math.random() * 10),
          comment: "Market execution",
        })
      }

      // Store trades in sessionStorage for demo persistence
      sessionStorage.setItem(`mt5_trades_${login}`, JSON.stringify(mockTrades))
      return mockTrades
    }
  } catch (error) {
    console.error("Error fetching MT5 trades:", error)
    throw error
  }
}

/**
 * Convert MT5 account data to our internal TradingAccount format
 */
export function convertMT5AccountToTradingAccount(mt5Account: MT5AccountData, accountName: string): TradingAccount {
  return {
    id: `mt5-${mt5Account.login}`,
    name: accountName || `MT5 Account ${mt5Account.login}`,
    platform: "MetaTrader 5",
    server: mt5Account.server,
    accountNumber: mt5Account.login,
    balance: mt5Account.balance,
    equity: mt5Account.equity,
    openPL: mt5Account.profit,
    margin: mt5Account.margin,
    freeMargin: mt5Account.freeMargin,
    marginLevel: mt5Account.margin > 0 ? (mt5Account.equity / mt5Account.margin) * 100 : 0,
    currency: mt5Account.currency,
    leverage: mt5Account.leverage,
    status: "active",
    type: mt5Account.login.startsWith("1") ? "demo" : "live",
    openPositions: mt5Account.openPositions,
    connectedAt: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
  }
}

/**
 * Convert MT5 trade data to our internal Trade format
 */
export function convertMT5TradesToTrades(mt5Trades: MT5TradeData[], accountId: string): Trade[] {
  return mt5Trades.map((trade) => ({
    id: `mt5-${trade.ticket}`,
    accountId,
    ticket: trade.ticket,
    symbol: trade.symbol,
    direction: trade.type.toLowerCase().includes("buy") ? "long" : "short",
    openPrice: trade.openPrice,
    closePrice: trade.closePrice || undefined,
    openTime: trade.openTime,
    closeTime: trade.closeTime || undefined,
    size: trade.volume,
    profit: trade.profit,
    commission: trade.commission,
    swap: trade.swap,
    netProfit: trade.profit + (trade.commission || 0) + (trade.swap || 0),
    stopLoss: trade.stopLoss || undefined,
    takeProfit: trade.takeProfit || undefined,
    comment: trade.comment,
    status: trade.closeTime ? "closed" : "open",
  }))
}

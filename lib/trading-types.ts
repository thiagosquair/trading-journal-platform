export interface TradingAccount {
  id: string
  name: string
  platform: string
  server: string
  accountNumber: string
  accountType: "demo" | "live" | "prop"
  status: "active" | "disconnected" | "pending"
  balance: number
  equity: number
  currency: string
  leverage: string
  lastUpdated: string
}

export interface Trade {
  id: string
  accountId: string
  symbol: string
  type: "buy" | "sell"
  openTime: string
  closeTime: string | null
  openPrice: number
  closePrice: number | null
  volume: number
  profit: number
  status: "open" | "closed"
  stopLoss: number | null
  takeProfit: number | null
}

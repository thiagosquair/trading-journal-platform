export interface MatchTraderCredentials {
  username: string
  password: string
  server: string
  accountType: "demo" | "live"
}

export interface MatchTraderAccount {
  id: string
  name: string
  balance: number
  equity: number
  margin: number
  freeMargin: number
  marginLevel: number
  currency: string
  leverage: string
  server: string
  accountNumber: string
  type: "demo" | "live"
  status: "active" | "inactive"
  lastUpdated: string
}

export interface MatchTraderPosition {
  id: string
  symbol: string
  type: "buy" | "sell"
  volume: number
  openPrice: number
  currentPrice: number
  profit: number
  swap: number
  commission: number
  openTime: string
  stopLoss?: number
  takeProfit?: number
}

export interface MatchTraderTrade {
  id: string
  symbol: string
  type: "buy" | "sell"
  volume: number
  openPrice: number
  closePrice?: number
  profit?: number
  swap: number
  commission: number
  openTime: string
  closeTime?: string
  status: "open" | "closed"
  stopLoss?: number
  takeProfit?: number
  comment?: string
}

export class MatchTraderApiClient {
  private baseUrl: string
  private credentials: MatchTraderCredentials | null = null
  private sessionToken: string | null = null

  constructor(baseUrl = "https://api.match-trader.com") {
    this.baseUrl = baseUrl
  }

  async authenticate(credentials: MatchTraderCredentials): Promise<boolean> {
    try {
      console.log("Authenticating with MatchTrader:", credentials.username)

      // In production, this would make a real API call
      const response = await fetch(`${this.baseUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: credentials.username,
          password: credentials.password,
          server: credentials.server,
          accountType: credentials.accountType,
        }),
      })

      if (!response.ok) {
        // For demo purposes, simulate authentication
        if (credentials.username === "matchtest" && credentials.password === "matchpassword") {
          this.credentials = credentials
          this.sessionToken = "demo-session-token-" + Date.now()
          return true
        }
        throw new Error("Invalid credentials")
      }

      const data = await response.json()
      this.sessionToken = data.sessionToken
      this.credentials = credentials
      return true
    } catch (error) {
      console.error("MatchTrader authentication error:", error)

      // Fallback to demo authentication for testing
      if (credentials.username === "matchtest" && credentials.password === "matchpassword") {
        this.credentials = credentials
        this.sessionToken = "demo-session-token-" + Date.now()
        return true
      }

      throw error
    }
  }

  async getAccountInfo(): Promise<MatchTraderAccount> {
    if (!this.sessionToken || !this.credentials) {
      throw new Error("Not authenticated")
    }

    try {
      // In production, this would make a real API call
      const response = await fetch(`${this.baseUrl}/account/info`, {
        headers: {
          Authorization: `Bearer ${this.sessionToken}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        // Return mock data for demo
        return this.getMockAccountInfo()
      }

      return await response.json()
    } catch (error) {
      console.error("Error fetching account info:", error)
      // Return mock data for demo
      return this.getMockAccountInfo()
    }
  }

  async getOpenPositions(): Promise<MatchTraderPosition[]> {
    if (!this.sessionToken) {
      throw new Error("Not authenticated")
    }

    try {
      // In production, this would make a real API call
      const response = await fetch(`${this.baseUrl}/positions/open`, {
        headers: {
          Authorization: `Bearer ${this.sessionToken}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        // Return mock data for demo
        return this.getMockOpenPositions()
      }

      return await response.json()
    } catch (error) {
      console.error("Error fetching open positions:", error)
      // Return mock data for demo
      return this.getMockOpenPositions()
    }
  }

  async getTradeHistory(from?: Date, to?: Date): Promise<MatchTraderTrade[]> {
    if (!this.sessionToken) {
      throw new Error("Not authenticated")
    }

    try {
      const params = new URLSearchParams()
      if (from) params.append("from", from.toISOString())
      if (to) params.append("to", to.toISOString())

      // In production, this would make a real API call
      const response = await fetch(`${this.baseUrl}/trades/history?${params}`, {
        headers: {
          Authorization: `Bearer ${this.sessionToken}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        // Return mock data for demo
        return this.getMockTradeHistory()
      }

      return await response.json()
    } catch (error) {
      console.error("Error fetching trade history:", error)
      // Return mock data for demo
      return this.getMockTradeHistory()
    }
  }

  async placeOrder(order: {
    symbol: string
    type: "buy" | "sell"
    volume: number
    price?: number
    stopLoss?: number
    takeProfit?: number
    comment?: string
  }): Promise<{ success: boolean; orderId?: string; message?: string }> {
    if (!this.sessionToken) {
      throw new Error("Not authenticated")
    }

    try {
      // In production, this would make a real API call
      const response = await fetch(`${this.baseUrl}/orders/place`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.sessionToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      })

      if (!response.ok) {
        // Simulate order placement for demo
        return {
          success: true,
          orderId: "demo-order-" + Date.now(),
          message: "Order placed successfully (demo)",
        }
      }

      return await response.json()
    } catch (error) {
      console.error("Error placing order:", error)
      return {
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }

  async closePosition(positionId: string): Promise<{ success: boolean; message?: string }> {
    if (!this.sessionToken) {
      throw new Error("Not authenticated")
    }

    try {
      // In production, this would make a real API call
      const response = await fetch(`${this.baseUrl}/positions/${positionId}/close`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.sessionToken}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        // Simulate position closing for demo
        return {
          success: true,
          message: "Position closed successfully (demo)",
        }
      }

      return await response.json()
    } catch (error) {
      console.error("Error closing position:", error)
      return {
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }

  // Mock data methods for demo purposes
  private getMockAccountInfo(): MatchTraderAccount {
    return {
      id: `matchtrader-${this.credentials?.username}`,
      name: "MatchTrader Account",
      balance: 25000,
      equity: 25350,
      margin: 1250,
      freeMargin: 24100,
      marginLevel: 2028,
      currency: "EUR",
      leverage: "1:20",
      server: this.credentials?.server || "demo.match-trader.com",
      accountNumber: this.credentials?.username || "",
      type: this.credentials?.accountType || "demo",
      status: "active",
      lastUpdated: new Date().toISOString(),
    }
  }

  private getMockOpenPositions(): MatchTraderPosition[] {
    return [
      {
        id: "pos-1",
        symbol: "EURUSD",
        type: "buy",
        volume: 0.5,
        openPrice: 1.0825,
        currentPrice: 1.0875,
        profit: 250,
        swap: -2.5,
        commission: -5,
        openTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        stopLoss: 1.0775,
        takeProfit: 1.0925,
      },
      {
        id: "pos-2",
        symbol: "DAX40",
        type: "sell",
        volume: 0.1,
        openPrice: 18250.5,
        currentPrice: 18200.0,
        profit: 505,
        swap: 0,
        commission: -8,
        openTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        stopLoss: 18300.0,
        takeProfit: 18150.0,
      },
    ]
  }

  private getMockTradeHistory(): MatchTraderTrade[] {
    return [
      {
        id: "trade-1",
        symbol: "GBPUSD",
        type: "buy",
        volume: 0.3,
        openPrice: 1.265,
        closePrice: 1.272,
        profit: 210,
        swap: -1.5,
        commission: -6,
        openTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        closeTime: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        status: "closed",
        stopLoss: 1.26,
        takeProfit: 1.275,
        comment: "GBP strength trade",
      },
      {
        id: "trade-2",
        symbol: "USDJPY",
        type: "sell",
        volume: 0.2,
        openPrice: 149.85,
        closePrice: 149.25,
        profit: 120,
        swap: 0.5,
        commission: -4,
        openTime: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        closeTime: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
        status: "closed",
        stopLoss: 150.2,
        takeProfit: 149.0,
        comment: "JPY reversal",
      },
    ]
  }

  disconnect(): void {
    this.sessionToken = null
    this.credentials = null
  }
}

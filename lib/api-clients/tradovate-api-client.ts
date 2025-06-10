/**
 * Tradovate API Client
 * Based on the Tradovate API documentation: https://api.tradovate.com/
 */

export interface TradovateCredentials {
  username: string
  password: string
  appId?: string
  appVersion?: string
  cid?: string
  sec?: string
}

export interface TradovateAccount {
  id: string
  name: string
  userId: number
  accountType: string
  active: boolean
  clearingHouseId: number
  riskCategoryId: number
  autoLiqProfileId: number
  marginAccountType: string
  legalStatus: string
  timestamp: string
  currency: string
}

export interface TradovatePosition {
  id: string
  accountId: number
  contractId: number
  timestamp: string
  tradeDate: string
  netPos: number
  netPrice: number
  positionType: string
  symbol: string
  direction: "long" | "short"
  unrealizedPl: number
}

export interface TradovateOrder {
  id: string
  accountId: number
  contractId: number
  timestamp: string
  action: string
  ordStatus: string
  orderQty: number
  orderType: string
  price?: number
  stopPrice?: number
  timeInForce: string
  expireTime?: string
  text?: string
  symbol: string
}

export interface TradovateExecutionReport {
  id: string
  orderId: number
  execId: string
  timestamp: string
  accountId: number
  contractId: number
  execType: string
  ordStatus: string
  price: number
  lastQty: number
  lastPrice: number
  leavesQty: number
  cumQty: number
  avgPrice: number
  symbol: string
}

export interface TradovateAccountSnapshot {
  id: string
  accountId: number
  timestamp: string
  cashBalance: number
  availableMargin: number
  marginBalance: number
  totalMarginRequirement: number
  initialMargin: number
  maintenanceMargin: number
  netLiquidation: number
  openPl: number
  dayPl: number
  weekPl: number
  monthPl: number
  yearPl: number
}

export interface TradovateContract {
  id: number
  name: string
  contractMaturity: string
  contractType: string
  currency: string
  firstTradeDate: string
  lastTradeDate: string
  product: string
  description: string
  status: string
  valuePerPoint: number
  pointFormat: string
  tickSize: number
  minPrice: number
  maxPrice: number
  symbol: string
}

class TradovateApiClient {
  private baseUrl = "https://live.tradovateapi.com/v1"
  private accessToken: string | null = null
  private expirationTime = 0
  private mockMode = true

  constructor(mockMode = true) {
    this.mockMode = mockMode
  }

  /**
   * Authenticate with the Tradovate API
   */
  async authenticate(credentials: TradovateCredentials): Promise<boolean> {
    if (this.mockMode) {
      console.log("Mock mode: Simulating authentication with Tradovate")
      this.accessToken = "mock-token"
      this.expirationTime = Date.now() + 24 * 60 * 60 * 1000 // 24 hours
      return true
    }

    try {
      const response = await fetch(`${this.baseUrl}/auth/accessTokenRequest`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.username,
          password: credentials.password,
          appId: credentials.appId,
          appVersion: credentials.appVersion,
          cid: credentials.cid,
          sec: credentials.sec,
        }),
      })

      if (!response.ok) {
        throw new Error(`Authentication failed: ${response.statusText}`)
      }

      const data = await response.json()
      this.accessToken = data.accessToken
      this.expirationTime = Date.now() + data.expiresIn * 1000
      return true
    } catch (error) {
      console.error("Tradovate authentication error:", error)
      return false
    }
  }

  /**
   * Check if the current token is valid
   */
  isAuthenticated(): boolean {
    return !!this.accessToken && Date.now() < this.expirationTime
  }

  /**
   * Get user accounts
   */
  async getAccounts(): Promise<TradovateAccount[]> {
    if (this.mockMode) {
      return [
        {
          id: "tradovate-1",
          name: "Tradovate Futures",
          userId: 12345,
          accountType: "LIVE",
          active: true,
          clearingHouseId: 1,
          riskCategoryId: 1,
          autoLiqProfileId: 1,
          marginAccountType: "SPECULATOR",
          legalStatus: "INDIVIDUAL",
          timestamp: new Date().toISOString(),
          currency: "USD",
        },
      ]
    }

    if (!this.isAuthenticated()) {
      throw new Error("Not authenticated")
    }

    const response = await fetch(`${this.baseUrl}/account/list`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to get accounts: ${response.statusText}`)
    }

    return response.json()
  }

  /**
   * Get account snapshot (balance, margin, P&L)
   */
  async getAccountSnapshot(accountId: string): Promise<TradovateAccountSnapshot> {
    if (this.mockMode) {
      return {
        id: `snapshot-${Date.now()}`,
        accountId: Number.parseInt(accountId),
        timestamp: new Date().toISOString(),
        cashBalance: 15000,
        availableMargin: 12500,
        marginBalance: 15200,
        totalMarginRequirement: 2500,
        initialMargin: 2500,
        maintenanceMargin: 2000,
        netLiquidation: 15200,
        openPl: 200,
        dayPl: 150,
        weekPl: 450,
        monthPl: 1200,
        yearPl: 3500,
      }
    }

    if (!this.isAuthenticated()) {
      throw new Error("Not authenticated")
    }

    const response = await fetch(`${this.baseUrl}/accountSnapshot/latest?accountId=${accountId}`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to get account snapshot: ${response.statusText}`)
    }

    return response.json()
  }

  /**
   * Get positions for an account
   */
  async getPositions(accountId: string): Promise<TradovatePosition[]> {
    if (this.mockMode) {
      return [
        {
          id: `position-1-${Date.now()}`,
          accountId: Number.parseInt(accountId),
          contractId: 12345,
          timestamp: new Date().toISOString(),
          tradeDate: new Date().toISOString(),
          netPos: 1,
          netPrice: 4750.25,
          positionType: "OVERNIGHT",
          symbol: "ES",
          direction: "long",
          unrealizedPl: 762.5,
        },
        {
          id: `position-2-${Date.now()}`,
          accountId: Number.parseInt(accountId),
          contractId: 67890,
          timestamp: new Date().toISOString(),
          tradeDate: new Date().toISOString(),
          netPos: -2,
          netPrice: 16750.5,
          positionType: "OVERNIGHT",
          symbol: "NQ",
          direction: "short",
          unrealizedPl: -350.75,
        },
      ]
    }

    if (!this.isAuthenticated()) {
      throw new Error("Not authenticated")
    }

    const response = await fetch(`${this.baseUrl}/position/list?accountId=${accountId}`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to get positions: ${response.statusText}`)
    }

    return response.json()
  }

  /**
   * Get orders for an account
   */
  async getOrders(accountId: string): Promise<TradovateOrder[]> {
    if (this.mockMode) {
      return [
        {
          id: `order-1-${Date.now()}`,
          accountId: Number.parseInt(accountId),
          contractId: 12345,
          timestamp: new Date().toISOString(),
          action: "Buy",
          ordStatus: "Filled",
          orderQty: 1,
          orderType: "Market",
          timeInForce: "Day",
          symbol: "ES",
        },
        {
          id: `order-2-${Date.now()}`,
          accountId: Number.parseInt(accountId),
          contractId: 67890,
          timestamp: new Date().toISOString(),
          action: "Sell",
          ordStatus: "Working",
          orderQty: 1,
          orderType: "Limit",
          price: 16700.0,
          timeInForce: "GTC",
          symbol: "NQ",
        },
      ]
    }

    if (!this.isAuthenticated()) {
      throw new Error("Not authenticated")
    }

    const response = await fetch(`${this.baseUrl}/order/list?accountId=${accountId}`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to get orders: ${response.statusText}`)
    }

    return response.json()
  }

  /**
   * Get execution reports (fills) for an account
   */
  async getExecutionReports(accountId: string): Promise<TradovateExecutionReport[]> {
    if (this.mockMode) {
      return [
        {
          id: `exec-1-${Date.now()}`,
          orderId: 12345,
          execId: `exec-id-1-${Date.now()}`,
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          accountId: Number.parseInt(accountId),
          contractId: 12345,
          execType: "Trade",
          ordStatus: "Filled",
          price: 4750.25,
          lastQty: 1,
          lastPrice: 4750.25,
          leavesQty: 0,
          cumQty: 1,
          avgPrice: 4750.25,
          symbol: "ES",
        },
        {
          id: `exec-2-${Date.now()}`,
          orderId: 67890,
          execId: `exec-id-2-${Date.now()}`,
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          accountId: Number.parseInt(accountId),
          contractId: 67890,
          execType: "Trade",
          ordStatus: "Filled",
          price: 16750.5,
          lastQty: 2,
          lastPrice: 16750.5,
          leavesQty: 0,
          cumQty: 2,
          avgPrice: 16750.5,
          symbol: "NQ",
        },
      ]
    }

    if (!this.isAuthenticated()) {
      throw new Error("Not authenticated")
    }

    const response = await fetch(`${this.baseUrl}/executionReport/list?accountId=${accountId}`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to get execution reports: ${response.statusText}`)
    }

    return response.json()
  }

  /**
   * Get available contracts
   */
  async getContracts(): Promise<TradovateContract[]> {
    if (this.mockMode) {
      return [
        {
          id: 12345,
          name: "ESZ3",
          contractMaturity: "2023-12-15",
          contractType: "FUTURES",
          currency: "USD",
          firstTradeDate: "2023-01-01",
          lastTradeDate: "2023-12-15",
          product: "ES",
          description: "E-mini S&P 500 Future December 2023",
          status: "Active",
          valuePerPoint: 50,
          pointFormat: "0.25",
          tickSize: 0.25,
          minPrice: 0,
          maxPrice: 10000,
          symbol: "ES",
        },
        {
          id: 67890,
          name: "NQZ3",
          contractMaturity: "2023-12-15",
          contractType: "FUTURES",
          currency: "USD",
          firstTradeDate: "2023-01-01",
          lastTradeDate: "2023-12-15",
          product: "NQ",
          description: "E-mini Nasdaq-100 Future December 2023",
          status: "Active",
          valuePerPoint: 20,
          pointFormat: "0.25",
          tickSize: 0.25,
          minPrice: 0,
          maxPrice: 20000,
          symbol: "NQ",
        },
      ]
    }

    if (!this.isAuthenticated()) {
      throw new Error("Not authenticated")
    }

    const response = await fetch(`${this.baseUrl}/contract/list`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to get contracts: ${response.statusText}`)
    }

    return response.json()
  }
}

export default TradovateApiClient

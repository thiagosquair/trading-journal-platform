// cTrader Open API Client
// Based on https://help.ctrader.com/open-api/

interface CTraderCredentials {
  clientId: string
  clientSecret: string
  accessToken?: string
  refreshToken?: string
  accountId?: string
}

interface CTraderAccount {
  accountId: string
  name: string
  balance: number
  equity: number
  margin: number
  freeMargin: number
  marginLevel: number
  currency: string
  leverage: string
  openPositions: number
  server: string
  lastUpdated: string
  isLive: boolean
}

interface CTraderPosition {
  id: string
  symbol: string
  tradeSide: "BUY" | "SELL"
  volume: number
  price: number
  currentPrice?: number
  openTimestamp: string
  closeTimestamp?: string
  stopLoss?: number
  takeProfit?: number
  unrealizedPnL?: number
  realizedPnL?: number
  commission: number
  swap: number
  comment?: string
}

interface CTraderSymbol {
  symbolId: string
  symbolName: string
  enabled: boolean
  baseAsset: string
  quoteAsset: string
  symbolCategory: string
  description: string
}

// cTrader Open API endpoints
const CTRADER_API_BASE = "https://openapi.ctrader.com"
const CTRADER_DEMO_API_BASE = "https://demo-openapi.ctrader.com"

export class CTraderApiClient {
  private credentials: CTraderCredentials | null = null
  private baseUrl: string
  private isDemo: boolean

  constructor(isDemo = true) {
    this.isDemo = isDemo
    this.baseUrl = isDemo ? CTRADER_DEMO_API_BASE : CTRADER_API_BASE
  }

  // OAuth2 Authentication Flow
  async authenticate(credentials: CTraderCredentials): Promise<boolean> {
    try {
      console.log("[cTrader API] Authenticating with credentials:", {
        clientId: credentials.clientId,
        hasSecret: !!credentials.clientSecret,
      })

      // If we already have an access token, validate it
      if (credentials.accessToken) {
        const isValid = await this.validateToken(credentials.accessToken)
        if (isValid) {
          this.credentials = credentials
          return true
        }
      }

      // Get access token using client credentials flow
      const tokenResponse = await this.getAccessToken(credentials.clientId, credentials.clientSecret)

      if (tokenResponse.access_token) {
        this.credentials = {
          ...credentials,
          accessToken: tokenResponse.access_token,
          refreshToken: tokenResponse.refresh_token,
        }
        return true
      }

      return false
    } catch (error) {
      console.error("[cTrader API] Authentication error:", error)
      throw new Error(`Authentication failed: ${error.message}`)
    }
  }

  // Get OAuth2 access token
  private async getAccessToken(clientId: string, clientSecret: string) {
    const response = await fetch(`${this.baseUrl}/v1/auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret,
        scope: "trading",
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Token request failed: ${error}`)
    }

    return await response.json()
  }

  // Validate access token
  private async validateToken(accessToken: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/v1/accounts`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
      return response.ok
    } catch {
      return false
    }
  }

  // Get trading accounts
  async getAccounts(): Promise<CTraderAccount[]> {
    if (!this.credentials?.accessToken) {
      throw new Error("Not authenticated")
    }

    try {
      console.log("[cTrader API] Fetching accounts")

      const response = await fetch(`${this.baseUrl}/v1/accounts`, {
        headers: {
          Authorization: `Bearer ${this.credentials.accessToken}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch accounts: ${response.statusText}`)
      }

      const data = await response.json()

      return (
        data.data?.map((account: any) => ({
          accountId: account.accountId.toString(),
          name: account.accountName || `cTrader Account ${account.accountId}`,
          balance: account.balance / 100, // cTrader returns in cents
          equity: account.equity / 100,
          margin: account.margin / 100,
          freeMargin: account.freeMargin / 100,
          marginLevel: account.marginLevel,
          currency: account.depositCurrency,
          leverage: `1:${account.leverage}`,
          openPositions: account.positionsCount || 0,
          server: this.isDemo ? "cTrader Demo" : "cTrader Live",
          lastUpdated: new Date().toISOString(),
          isLive: !this.isDemo,
        })) || []
      )
    } catch (error) {
      console.error("[cTrader API] Error fetching accounts:", error)
      throw error
    }
  }

  // Get account details
  async getAccountInfo(accountId: string): Promise<CTraderAccount> {
    if (!this.credentials?.accessToken) {
      throw new Error("Not authenticated")
    }

    try {
      console.log("[cTrader API] Fetching account info for:", accountId)

      const response = await fetch(`${this.baseUrl}/v1/accounts/${accountId}`, {
        headers: {
          Authorization: `Bearer ${this.credentials.accessToken}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch account info: ${response.statusText}`)
      }

      const data = await response.json()
      const account = data.data

      return {
        accountId: account.accountId.toString(),
        name: account.accountName || `cTrader Account ${account.accountId}`,
        balance: account.balance / 100,
        equity: account.equity / 100,
        margin: account.margin / 100,
        freeMargin: account.freeMargin / 100,
        marginLevel: account.marginLevel,
        currency: account.depositCurrency,
        leverage: `1:${account.leverage}`,
        openPositions: account.positionsCount || 0,
        server: this.isDemo ? "cTrader Demo" : "cTrader Live",
        lastUpdated: new Date().toISOString(),
        isLive: !this.isDemo,
      }
    } catch (error) {
      console.error("[cTrader API] Error fetching account info:", error)
      throw error
    }
  }

  // Get open positions
  async getOpenPositions(accountId: string): Promise<CTraderPosition[]> {
    if (!this.credentials?.accessToken) {
      throw new Error("Not authenticated")
    }

    try {
      console.log("[cTrader API] Fetching open positions for account:", accountId)

      const response = await fetch(`${this.baseUrl}/v1/accounts/${accountId}/positions`, {
        headers: {
          Authorization: `Bearer ${this.credentials.accessToken}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch positions: ${response.statusText}`)
      }

      const data = await response.json()

      return (
        data.data?.map((position: any) => ({
          id: position.positionId.toString(),
          symbol: position.symbolName,
          tradeSide: position.tradeSide,
          volume: position.volume / 100, // cTrader returns in lots * 100
          price: position.price,
          currentPrice: position.currentPrice,
          openTimestamp: new Date(position.openTimestamp).toISOString(),
          stopLoss: position.stopLoss,
          takeProfit: position.takeProfit,
          unrealizedPnL: position.unrealizedPnL / 100,
          commission: position.commission / 100,
          swap: position.swap / 100,
          comment: position.comment,
        })) || []
      )
    } catch (error) {
      console.error("[cTrader API] Error fetching positions:", error)
      throw error
    }
  }

  // Get trade history
  async getTradeHistory(accountId: string, from?: Date, to?: Date): Promise<CTraderPosition[]> {
    if (!this.credentials?.accessToken) {
      throw new Error("Not authenticated")
    }

    try {
      console.log("[cTrader API] Fetching trade history for account:", accountId)

      const params = new URLSearchParams()
      if (from) params.append("from", from.toISOString())
      if (to) params.append("to", to.toISOString())

      const response = await fetch(`${this.baseUrl}/v1/accounts/${accountId}/positions/history?${params}`, {
        headers: {
          Authorization: `Bearer ${this.credentials.accessToken}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch trade history: ${response.statusText}`)
      }

      const data = await response.json()

      return (
        data.data?.map((position: any) => ({
          id: position.positionId.toString(),
          symbol: position.symbolName,
          tradeSide: position.tradeSide,
          volume: position.volume / 100,
          price: position.price,
          currentPrice: position.closePrice,
          openTimestamp: new Date(position.openTimestamp).toISOString(),
          closeTimestamp: position.closeTimestamp ? new Date(position.closeTimestamp).toISOString() : undefined,
          stopLoss: position.stopLoss,
          takeProfit: position.takeProfit,
          realizedPnL: position.realizedPnL / 100,
          commission: position.commission / 100,
          swap: position.swap / 100,
          comment: position.comment,
        })) || []
      )
    } catch (error) {
      console.error("[cTrader API] Error fetching trade history:", error)
      throw error
    }
  }

  // Get available symbols
  async getSymbols(): Promise<CTraderSymbol[]> {
    if (!this.credentials?.accessToken) {
      throw new Error("Not authenticated")
    }

    try {
      console.log("[cTrader API] Fetching symbols")

      const response = await fetch(`${this.baseUrl}/v1/symbols`, {
        headers: {
          Authorization: `Bearer ${this.credentials.accessToken}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch symbols: ${response.statusText}`)
      }

      const data = await response.json()

      return (
        data.data?.map((symbol: any) => ({
          symbolId: symbol.symbolId.toString(),
          symbolName: symbol.symbolName,
          enabled: symbol.enabled,
          baseAsset: symbol.baseAsset,
          quoteAsset: symbol.quoteAsset,
          symbolCategory: symbol.symbolCategory,
          description: symbol.description,
        })) || []
      )
    } catch (error) {
      console.error("[cTrader API] Error fetching symbols:", error)
      throw error
    }
  }

  // Test connection
  async testConnection(): Promise<{ success: boolean; message: string }> {
    try {
      if (!this.credentials?.accessToken) {
        return { success: false, message: "No access token available" }
      }

      const accounts = await this.getAccounts()
      return {
        success: true,
        message: `Successfully connected! Found ${accounts.length} account(s)`,
      }
    } catch (error) {
      return {
        success: false,
        message: `Connection failed: ${error.message}`,
      }
    }
  }

  // Logout
  async logout(): Promise<void> {
    this.credentials = null
    console.log("[cTrader API] Logged out")
  }

  // Get current credentials
  getCredentials(): CTraderCredentials | null {
    return this.credentials
  }
}

// Create singleton instances
export const ctraderApiClient = new CTraderApiClient(true) // Demo
export const ctraderLiveApiClient = new CTraderApiClient(false) // Live

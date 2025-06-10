// cTrader API Client - Based on ClickAlgo and official cTrader documentation
// Implements the core functionality similar to their .NET SDK but for TypeScript

export interface CTraderConfig {
  clientId: string
  clientSecret: string
  redirectUri: string
  environment: "demo" | "live"
}

export interface CTraderAccount {
  accountId: string
  accountNumber: string
  brokerName: string
  depositCurrency: string
  balance: number
  equity: number
  margin: number
  freeMargin: number
  marginLevel: number
  unrealizedPnL: number
  leverage: number
  accountType: "DEMO" | "LIVE"
  isLive: boolean
  lastUpdateTimestamp: string
}

export interface CTraderPosition {
  positionId: string
  symbolName: string
  tradeSide: "BUY" | "SELL"
  volume: number
  entryPrice: number
  currentPrice: number
  stopLoss?: number
  takeProfit?: number
  unrealizedPnL: number
  realizedPnL: number
  commission: number
  swap: number
  openTimestamp: string
  closeTimestamp?: string
  comment?: string
  label?: string
}

export interface CTraderOrder {
  orderId: string
  orderType: "MARKET" | "LIMIT" | "STOP" | "STOP_LIMIT"
  tradeSide: "BUY" | "SELL"
  symbolName: string
  requestedVolume: number
  executedVolume: number
  orderStatus: "PENDING" | "FILLED" | "CANCELLED" | "REJECTED"
  limitPrice?: number
  stopPrice?: number
  stopLoss?: number
  takeProfit?: number
  expirationTimestamp?: string
  comment?: string
  label?: string
  createTimestamp: string
  updateTimestamp: string
}

export interface CTraderSymbol {
  symbolId: string
  symbolName: string
  enabled: boolean
  baseAsset: string
  quoteAsset: string
  symbolCategory: string
  description: string
  digits: number
  pipPosition: number
  lotSize: number
  minVolume: number
  maxVolume: number
  stepVolume: number
  marginRate: number
  swapRollover3Days: number
  swapLong: number
  swapShort: number
  commission: number
  tradingMode: string
}

export interface CTraderTick {
  symbolName: string
  bid: number
  ask: number
  timestamp: string
}

export class CTraderApiClient {
  private config: CTraderConfig
  private accessToken: string | null = null
  private refreshToken: string | null = null
  private baseUrl: string
  private wsUrl: string
  private ws: WebSocket | null = null
  private eventHandlers: Map<string, Function[]> = new Map()

  constructor(config: CTraderConfig) {
    this.config = config
    this.baseUrl = config.environment === "demo" ? "https://demo-openapi.ctrader.com" : "https://openapi.ctrader.com"
    this.wsUrl = config.environment === "demo" ? "wss://demo-openapi.ctrader.com/ws" : "wss://openapi.ctrader.com/ws"
  }

  // Authentication Methods
  async authenticate(): Promise<boolean> {
    try {
      console.log("[cTrader] Starting authentication process")

      const tokenResponse = await this.getAccessToken()

      if (tokenResponse.access_token) {
        this.accessToken = tokenResponse.access_token
        this.refreshToken = tokenResponse.refresh_token
        console.log("[cTrader] Authentication successful")
        return true
      }

      return false
    } catch (error) {
      console.error("[cTrader] Authentication failed:", error)
      throw error
    }
  }

  private async getAccessToken() {
    const response = await fetch(`${this.baseUrl}/v1/auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret,
        scope: "trading",
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Token request failed: ${error}`)
    }

    return await response.json()
  }

  // Account Methods
  async getAccounts(): Promise<CTraderAccount[]> {
    const response = await this.makeRequest("/v1/accounts")

    return (
      response.data?.map((account: any) => ({
        accountId: account.accountId.toString(),
        accountNumber: account.accountNumber?.toString() || account.accountId.toString(),
        brokerName: account.brokerName || "cTrader",
        depositCurrency: account.depositCurrency,
        balance: account.balance / 100, // cTrader returns in cents
        equity: account.equity / 100,
        margin: account.margin / 100,
        freeMargin: account.freeMargin / 100,
        marginLevel: account.marginLevel / 100,
        unrealizedPnL: account.unrealizedPnL / 100,
        leverage: account.leverage,
        accountType: this.config.environment === "demo" ? "DEMO" : "LIVE",
        isLive: this.config.environment === "live",
        lastUpdateTimestamp: new Date().toISOString(),
      })) || []
    )
  }

  async getAccountById(accountId: string): Promise<CTraderAccount> {
    const response = await this.makeRequest(`/v1/accounts/${accountId}`)
    const account = response.data

    return {
      accountId: account.accountId.toString(),
      accountNumber: account.accountNumber?.toString() || account.accountId.toString(),
      brokerName: account.brokerName || "cTrader",
      depositCurrency: account.depositCurrency,
      balance: account.balance / 100,
      equity: account.equity / 100,
      margin: account.margin / 100,
      freeMargin: account.freeMargin / 100,
      marginLevel: account.marginLevel / 100,
      unrealizedPnL: account.unrealizedPnL / 100,
      leverage: account.leverage,
      accountType: this.config.environment === "demo" ? "DEMO" : "LIVE",
      isLive: this.config.environment === "live",
      lastUpdateTimestamp: new Date().toISOString(),
    }
  }

  // Position Methods
  async getPositions(accountId: string): Promise<CTraderPosition[]> {
    const response = await this.makeRequest(`/v1/accounts/${accountId}/positions`)

    return (
      response.data?.map((position: any) => ({
        positionId: position.positionId.toString(),
        symbolName: position.symbolName,
        tradeSide: position.tradeSide,
        volume: position.volume / 100,
        entryPrice: position.entryPrice,
        currentPrice: position.currentPrice,
        stopLoss: position.stopLoss,
        takeProfit: position.takeProfit,
        unrealizedPnL: position.unrealizedPnL / 100,
        realizedPnL: position.realizedPnL / 100,
        commission: position.commission / 100,
        swap: position.swap / 100,
        openTimestamp: new Date(position.openTimestamp).toISOString(),
        closeTimestamp: position.closeTimestamp ? new Date(position.closeTimestamp).toISOString() : undefined,
        comment: position.comment,
        label: position.label,
      })) || []
    )
  }

  async getPositionHistory(accountId: string, from?: Date, to?: Date): Promise<CTraderPosition[]> {
    const params = new URLSearchParams()
    if (from) params.append("from", from.toISOString())
    if (to) params.append("to", to.toISOString())

    const response = await this.makeRequest(`/v1/accounts/${accountId}/positions/history?${params}`)

    return (
      response.data?.map((position: any) => ({
        positionId: position.positionId.toString(),
        symbolName: position.symbolName,
        tradeSide: position.tradeSide,
        volume: position.volume / 100,
        entryPrice: position.entryPrice,
        currentPrice: position.closePrice || position.currentPrice,
        stopLoss: position.stopLoss,
        takeProfit: position.takeProfit,
        unrealizedPnL: 0,
        realizedPnL: position.realizedPnL / 100,
        commission: position.commission / 100,
        swap: position.swap / 100,
        openTimestamp: new Date(position.openTimestamp).toISOString(),
        closeTimestamp: position.closeTimestamp ? new Date(position.closeTimestamp).toISOString() : undefined,
        comment: position.comment,
        label: position.label,
      })) || []
    )
  }

  // Order Methods
  async getOrders(accountId: string): Promise<CTraderOrder[]> {
    const response = await this.makeRequest(`/v1/accounts/${accountId}/orders`)

    return (
      response.data?.map((order: any) => ({
        orderId: order.orderId.toString(),
        orderType: order.orderType,
        tradeSide: order.tradeSide,
        symbolName: order.symbolName,
        requestedVolume: order.requestedVolume / 100,
        executedVolume: order.executedVolume / 100,
        orderStatus: order.orderStatus,
        limitPrice: order.limitPrice,
        stopPrice: order.stopPrice,
        stopLoss: order.stopLoss,
        takeProfit: order.takeProfit,
        expirationTimestamp: order.expirationTimestamp ? new Date(order.expirationTimestamp).toISOString() : undefined,
        comment: order.comment,
        label: order.label,
        createTimestamp: new Date(order.createTimestamp).toISOString(),
        updateTimestamp: new Date(order.updateTimestamp).toISOString(),
      })) || []
    )
  }

  // Symbol Methods
  async getSymbols(): Promise<CTraderSymbol[]> {
    const response = await this.makeRequest("/v1/symbols")

    return (
      response.data?.map((symbol: any) => ({
        symbolId: symbol.symbolId.toString(),
        symbolName: symbol.symbolName,
        enabled: symbol.enabled,
        baseAsset: symbol.baseAsset,
        quoteAsset: symbol.quoteAsset,
        symbolCategory: symbol.symbolCategory,
        description: symbol.description,
        digits: symbol.digits,
        pipPosition: symbol.pipPosition,
        lotSize: symbol.lotSize,
        minVolume: symbol.minVolume / 100,
        maxVolume: symbol.maxVolume / 100,
        stepVolume: symbol.stepVolume / 100,
        marginRate: symbol.marginRate,
        swapRollover3Days: symbol.swapRollover3Days,
        swapLong: symbol.swapLong,
        swapShort: symbol.swapShort,
        commission: symbol.commission,
        tradingMode: symbol.tradingMode,
      })) || []
    )
  }

  // WebSocket Methods for Real-time Data
  async connectWebSocket(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(`${this.wsUrl}?access_token=${this.accessToken}`)

        this.ws.onopen = () => {
          console.log("[cTrader] WebSocket connected")
          resolve()
        }

        this.ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data)
            this.handleWebSocketMessage(data)
          } catch (error) {
            console.error("[cTrader] WebSocket message parse error:", error)
          }
        }

        this.ws.onerror = (error) => {
          console.error("[cTrader] WebSocket error:", error)
          reject(error)
        }

        this.ws.onclose = () => {
          console.log("[cTrader] WebSocket disconnected")
          this.ws = null
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  private handleWebSocketMessage(data: any) {
    const { type } = data
    const handlers = this.eventHandlers.get(type) || []
    handlers.forEach((handler) => handler(data))
  }

  // Event Subscription Methods
  on(event: string, handler: Function) {
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, [])
    }
    this.eventHandlers.get(event)!.push(handler)
  }

  off(event: string, handler: Function) {
    const handlers = this.eventHandlers.get(event)
    if (handlers) {
      const index = handlers.indexOf(handler)
      if (index > -1) {
        handlers.splice(index, 1)
      }
    }
  }

  // Subscribe to real-time price updates
  async subscribeToTicks(symbolNames: string[]) {
    if (!this.ws) {
      throw new Error("WebSocket not connected")
    }

    const message = {
      type: "SUBSCRIBE_TICKS",
      symbolNames: symbolNames,
    }

    this.ws.send(JSON.stringify(message))
  }

  // Utility Methods
  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    if (!this.accessToken) {
      throw new Error("Not authenticated")
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        "Content-Type": "application/json",
        ...options.headers,
      },
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`API request failed: ${error}`)
    }

    return await response.json()
  }

  async testConnection(): Promise<{ success: boolean; message: string }> {
    try {
      const accounts = await this.getAccounts()
      return {
        success: true,
        message: `Connected successfully! Found ${accounts.length} account(s).`,
      }
    } catch (error) {
      return {
        success: false,
        message: `Connection failed: ${error.message}`,
      }
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
    this.accessToken = null
    this.refreshToken = null
    this.eventHandlers.clear()
  }
}

// Factory function to create cTrader clients
export function createCTraderClient(config: CTraderConfig): CTraderApiClient {
  return new CTraderApiClient(config)
}

// Singleton instances for demo and live
export const ctraderDemo = createCTraderClient({
  clientId: process.env.CTRADER_CLIENT_ID || "15150_ic0eEJCL9tya3FxMn68FJtGFcAKuHBEiaVTCUKE9I4qMV7twOL",
  clientSecret: process.env.CTRADER_CLIENT_SECRET || "lmyZLlJVE8FGthNenij3VII2lVC7RJqAmEiEevDrA2DNEcCTbl",
  redirectUri: process.env.CTRADER_REDIRECT_URI || "https://trading-journal-platform-ZBKXCDFwpDQ/api/ctrader/callback",
  environment: "demo",
})

export const ctraderLive = createCTraderClient({
  clientId: process.env.CTRADER_CLIENT_ID || "15150_ic0eEJCL9tya3FxMn68FJtGFcAKuHBEiaVTCUKE9I4qMV7twOL",
  clientSecret: process.env.CTRADER_CLIENT_SECRET || "lmyZLlJVE8FGthNenij3VII2lVC7RJqAmEiEevDrA2DNEcCTbl",
  redirectUri: process.env.CTRADER_REDIRECT_URI || "https://trading-journal-platform-ZBKXCDFwpDQ/api/ctrader/callback",
  environment: "live",
})

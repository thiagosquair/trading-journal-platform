// MetaTrader Bridge Service
// This service handles communication with the MetaTrader Terminal via a local bridge application

import { EventEmitter } from "events"

interface MTCredentials {
  platform: "mt4" | "mt5"
  server: string
  login: string
  password: string
  investorPassword?: string
}

interface MTAccount {
  balance: number
  equity: number
  margin: number
  freeMargin: number
  marginLevel: number
  currency: string
  leverage: string
  profit: number
}

interface MTPosition {
  ticket: number
  symbol: string
  type: string
  volume: number
  openPrice: number
  openTime: string
  stopLoss: number | null
  takeProfit: number | null
  profit: number
  comment: string
  swap: number
  commission: number
}

interface MTOrder {
  ticket: number
  symbol: string
  type: string
  volume: number
  openPrice: number
  openTime: string
  closePrice: number | null
  closeTime: string | null
  stopLoss: number | null
  takeProfit: number | null
  profit: number
  comment: string
  swap: number
  commission: number
}

export class MTBridgeService extends EventEmitter {
  private static instance: MTBridgeService
  private isConnected = false
  private socket: WebSocket | null = null
  private connectionAttempts = 0
  private maxConnectionAttempts = 5
  private reconnectTimeout: NodeJS.Timeout | null = null
  private credentials: MTCredentials | null = null
  private accountData: MTAccount | null = null
  private positions: MTPosition[] = []
  private orders: MTOrder[] = []
  private lastUpdateTime: Date | null = null
  private bridgeUrl = "ws://localhost:8080" // Default bridge URL

  private constructor() {
    super()
    // Private constructor to enforce singleton
  }

  public static getInstance(): MTBridgeService {
    if (!MTBridgeService.instance) {
      MTBridgeService.instance = new MTBridgeService()
    }
    return MTBridgeService.instance
  }

  public setBridgeUrl(url: string): void {
    this.bridgeUrl = url
  }

  public async connect(credentials: MTCredentials): Promise<boolean> {
    this.credentials = credentials

    if (typeof window === "undefined") {
      console.error("MT Bridge can only be used in browser environment")
      return false
    }

    try {
      // Check if bridge is installed and running
      const bridgeStatus = await this.checkBridgeStatus()
      if (!bridgeStatus.installed) {
        console.error("MT Bridge is not installed. Please install the bridge application.")
        this.emit("error", { type: "bridge_not_installed", message: "MT Bridge is not installed" })
        return false
      }

      if (!bridgeStatus.running) {
        console.error("MT Bridge is installed but not running. Please start the bridge application.")
        this.emit("error", { type: "bridge_not_running", message: "MT Bridge is not running" })
        return false
      }

      // Connect to the bridge via WebSocket
      return await this.connectToWebSocket()
    } catch (error) {
      console.error("Error connecting to MT Bridge:", error)
      this.emit("error", { type: "connection_error", message: "Failed to connect to MT Bridge" })
      return false
    }
  }

  private async checkBridgeStatus(): Promise<{ installed: boolean; running: boolean }> {
    try {
      // Try to connect to the bridge status endpoint
      const response = await fetch("http://localhost:8081/status", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
      })

      if (response.ok) {
        const data = await response.json()
        return { installed: true, running: data.running }
      }

      return { installed: false, running: false }
    } catch (error) {
      // If we can't connect, assume the bridge is not installed or running
      return { installed: false, running: false }
    }
  }

  private async connectToWebSocket(): Promise<boolean> {
    return new Promise((resolve) => {
      try {
        this.socket = new WebSocket(this.bridgeUrl)

        this.socket.onopen = () => {
          console.log("Connected to MT Bridge")
          this.isConnected = true
          this.connectionAttempts = 0
          this.emit("connected")

          // Authenticate with the bridge
          this.authenticate()

          resolve(true)
        }

        this.socket.onclose = () => {
          console.log("Disconnected from MT Bridge")
          this.isConnected = false
          this.emit("disconnected")

          // Try to reconnect
          this.attemptReconnect()
        }

        this.socket.onerror = (error) => {
          console.error("MT Bridge WebSocket error:", error)
          this.emit("error", { type: "websocket_error", message: "WebSocket connection error" })
          resolve(false)
        }

        this.socket.onmessage = (event) => {
          this.handleMessage(event.data)
        }
      } catch (error) {
        console.error("Error creating WebSocket connection:", error)
        this.emit("error", { type: "websocket_creation_error", message: "Failed to create WebSocket connection" })
        resolve(false)
      }
    })
  }

  private authenticate(): void {
    if (!this.socket || !this.credentials) return

    const authMessage = {
      action: "authenticate",
      platform: this.credentials.platform,
      server: this.credentials.server,
      login: this.credentials.login,
      password: this.credentials.password,
      investorPassword: this.credentials.investorPassword,
    }

    this.socket.send(JSON.stringify(authMessage))
  }

  private handleMessage(data: any): void {
    try {
      const message = JSON.parse(data)

      switch (message.type) {
        case "auth_result":
          this.handleAuthResult(message)
          break
        case "account_info":
          this.handleAccountInfo(message)
          break
        case "positions":
          this.handlePositions(message)
          break
        case "orders":
          this.handleOrders(message)
          break
        case "error":
          this.handleError(message)
          break
        default:
          console.warn("Unknown message type:", message.type)
      }
    } catch (error) {
      console.error("Error parsing message:", error)
    }
  }

  private handleAuthResult(message: any): void {
    if (message.success) {
      console.log("Authentication successful")
      this.emit("authenticated")

      // Request initial data
      this.requestAccountInfo()
      this.requestPositions()
      this.requestOrders()

      // Start regular updates
      this.startRegularUpdates()
    } else {
      console.error("Authentication failed:", message.error)
      this.emit("error", { type: "authentication_error", message: message.error })
    }
  }

  private handleAccountInfo(message: any): void {
    this.accountData = message.data
    this.lastUpdateTime = new Date()
    this.emit("account_updated", this.accountData)
  }

  private handlePositions(message: any): void {
    this.positions = message.data
    this.lastUpdateTime = new Date()
    this.emit("positions_updated", this.positions)
  }

  private handleOrders(message: any): void {
    this.orders = message.data
    this.lastUpdateTime = new Date()
    this.emit("orders_updated", this.orders)
  }

  private handleError(message: any): void {
    console.error("MT Bridge error:", message.error)
    this.emit("error", { type: "bridge_error", message: message.error })
  }

  private attemptReconnect(): void {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout)
    }

    if (this.connectionAttempts < this.maxConnectionAttempts) {
      this.connectionAttempts++
      const delay = Math.min(1000 * Math.pow(2, this.connectionAttempts - 1), 30000)

      console.log(`Attempting to reconnect in ${delay / 1000} seconds (attempt ${this.connectionAttempts})`)

      this.reconnectTimeout = setTimeout(() => {
        if (this.credentials) {
          this.connectToWebSocket()
        }
      }, delay)
    } else {
      console.error("Max reconnection attempts reached")
      this.emit("error", { type: "max_reconnect_attempts", message: "Maximum reconnection attempts reached" })
    }
  }

  private requestAccountInfo(): void {
    if (!this.socket || !this.isConnected) return

    const message = {
      action: "get_account_info",
    }

    this.socket.send(JSON.stringify(message))
  }

  private requestPositions(): void {
    if (!this.socket || !this.isConnected) return

    const message = {
      action: "get_positions",
    }

    this.socket.send(JSON.stringify(message))
  }

  private requestOrders(): void {
    if (!this.socket || !this.isConnected) return

    const message = {
      action: "get_orders",
    }

    this.socket.send(JSON.stringify(message))
  }

  private startRegularUpdates(): void {
    // Request updates every 5 seconds
    setInterval(() => {
      if (this.isConnected) {
        this.requestAccountInfo()
        this.requestPositions()
        this.requestOrders()
      }
    }, 5000)
  }

  public getAccountData(): MTAccount | null {
    return this.accountData
  }

  public getPositions(): MTPosition[] {
    return this.positions
  }

  public getOrders(): MTOrder[] {
    return this.orders
  }

  public getLastUpdateTime(): Date | null {
    return this.lastUpdateTime
  }

  public isConnectedToBridge(): boolean {
    return this.isConnected
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.close()
      this.socket = null
    }

    this.isConnected = false
    this.credentials = null
    this.accountData = null
    this.positions = []
    this.orders = []
    this.lastUpdateTime = null

    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout)
      this.reconnectTimeout = null
    }

    this.emit("disconnected")
  }
}

// Export singleton instance
export const mtBridgeService = MTBridgeService.getInstance()

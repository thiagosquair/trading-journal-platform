// src/lib/platforms/metaapi-service.ts

import MetaApi from "metaapi.cloud-sdk"

export interface MT5ConnectionConfig {
  login: string
  password: string
  server: string
  accountId: string
}

export class MetaApiService {
  private api: any
  private connections: Record<string, any> = {}
  private isInitialized = false
  private initializationError: string | null = null

  constructor() {
    this.initializeApi()
  }

  private initializeApi() {
    try {
      // Get token from environment variables
      const token = process.env.META_API_TOKEN || process.env.METAAPI_TOKEN

      if (!token) {
        this.initializationError =
          "MetaAPI token not found in environment variables. Please add META_API_TOKEN or METAAPI_TOKEN to your environment."
        console.warn(this.initializationError)
        return
      }

      // Validate token format (basic check)
      if (typeof token !== "string" || token.trim().length === 0) {
        this.initializationError = "MetaAPI token is invalid or empty."
        console.error(this.initializationError)
        return
      }

      this.api = new MetaApi(token.trim())
      this.isInitialized = true
      console.log("MetaAPI service initialized successfully")
    } catch (error: any) {
      this.initializationError = `Failed to initialize MetaAPI: ${error.message}`
      console.error(this.initializationError, error)
    }
  }

  private checkInitialization(): { success: boolean; error?: string } {
    if (!this.isInitialized) {
      return {
        success: false,
        error: this.initializationError || "MetaAPI service not initialized",
      }
    }
    return { success: true }
  }

  async connectAccount(
    config: MT5ConnectionConfig,
  ): Promise<{ success: boolean; accountId?: string; error?: string; details?: any }> {
    const initCheck = this.checkInitialization()
    if (!initCheck.success) {
      return { success: false, error: initCheck.error }
    }

    try {
      const { login, password, server, accountId } = config

      // Validate input parameters
      if (!login || !password || !server || !accountId) {
        return {
          success: false,
          error: "Missing required connection parameters (login, password, server, or accountId)",
        }
      }

      // Check if account already exists in MetaAPI
      const accounts = await this.api.metatraderAccountApi.getAccountsWithInfiniteScrollPagination()
      let account = accounts.find((a: any) => a.login === login && a.type.startsWith("cloud"))

      // If account doesn't exist, create it
      if (!account) {
        console.log("Adding MT5 account to MetaApi")
        account = await this.api.metatraderAccountApi.createAccount({
          name: `Trading Journal Account - ${login}`,
          type: "cloud",
          login: login,
          password: password,
          server: server,
          platform: "mt5",
          magic: 1000,
        })
      } else {
        console.log("MT5 account already added to MetaApi", account.id)
      }

      // Deploy account if not already deployed
      if (account.state !== "DEPLOYED") {
        console.log("Deploying account")
        await account.deploy()
      }

      // Connect to the account
      console.log("Connecting to MT5 account")
      const connection = account.getRPCConnection()
      await connection.connect()

      // Wait for synchronization
      console.log("Waiting for synchronization")
      await connection.waitSynchronized()

      // Store connection for future use
      this.connections[accountId] = {
        connection,
        account,
      }

      return { success: true, accountId }
    } catch (error: any) {
      console.error("Error connecting to MT5:", error)
      return {
        success: false,
        error: error.message || "Unknown error occurred during connection",
        details: error.details || {},
      }
    }
  }

  async getAccountInformation(accountId: string): Promise<any> {
    const initCheck = this.checkInitialization()
    if (!initCheck.success) {
      throw new Error(initCheck.error)
    }

    try {
      const conn = this.connections[accountId]
      if (!conn) {
        throw new Error("Account not connected")
      }

      return await conn.connection.getAccountInformation()
    } catch (error) {
      console.error("Error getting account information:", error)
      throw error
    }
  }

  async getTradeHistory(accountId: string, startDate: Date, endDate: Date): Promise<any> {
    const initCheck = this.checkInitialization()
    if (!initCheck.success) {
      throw new Error(initCheck.error)
    }

    try {
      const conn = this.connections[accountId]
      if (!conn) {
        throw new Error("Account not connected")
      }

      // Get history orders
      const historyOrders = await conn.connection.getHistoryOrdersByTimeRange(startDate, endDate)

      // Get history deals
      const historyDeals = await conn.connection.getDealsByTimeRange(startDate, endDate)

      return {
        orders: historyOrders,
        deals: historyDeals,
      }
    } catch (error) {
      console.error("Error getting trade history:", error)
      throw error
    }
  }

  async getPositions(accountId: string): Promise<any> {
    const initCheck = this.checkInitialization()
    if (!initCheck.success) {
      throw new Error(initCheck.error)
    }

    try {
      const conn = this.connections[accountId]
      if (!conn) {
        throw new Error("Account not connected")
      }

      return await conn.connection.getPositions()
    } catch (error) {
      console.error("Error getting positions:", error)
      throw error
    }
  }

  async disconnectAccount(accountId: string): Promise<{ success: boolean; message?: string; error?: string }> {
    const initCheck = this.checkInitialization()
    if (!initCheck.success) {
      return { success: false, error: initCheck.error }
    }

    try {
      const conn = this.connections[accountId]
      if (!conn) {
        return { success: true, message: "Account not connected" }
      }

      await conn.connection.close()
      delete this.connections[accountId]

      return { success: true }
    } catch (error: any) {
      console.error("Error disconnecting account:", error)
      return { success: false, error: error.message }
    }
  }

  // Method to check if the service is ready to use
  isReady(): boolean {
    return this.isInitialized
  }

  // Method to get initialization error
  getInitializationError(): string | null {
    return this.initializationError
  }
}

export default new MetaApiService()

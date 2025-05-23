// src/lib/platforms/metaapi-service.ts

// Only import MetaApi when running on the server
let MetaApi: any = null;

// Server-side only import
if (typeof window === 'undefined') {
  // Dynamic import to ensure this only runs on the server
  try {
    MetaApi = require("metaapi.cloud-sdk").default;
  } catch (error) {
    console.error("Failed to import MetaApi SDK:", error);
  }
}

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
    // Only initialize on the server
    if (typeof window === 'undefined') {
      this.initializeApi()
    } else {
      this.initializationError = "MetaAPI service cannot be initialized in browser environment"
      console.warn(this.initializationError)
    }
  }

  private initializeApi() {
    try {
      // Ensure we're on the server
      if (typeof window !== 'undefined') {
        this.initializationError = "MetaAPI service cannot be initialized in browser environment"
        console.warn(this.initializationError)
        return
      }

      // Check if MetaApi was imported successfully
      if (!MetaApi) {
        this.initializationError = "MetaAPI SDK could not be imported. This service is only available server-side."
        console.error(this.initializationError)
        return
      }

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
    // Ensure we're on the server
    if (typeof window !== 'undefined') {
      return { 
        success: false, 
        error: "MetaAPI service cannot be used in browser environment" 
      }
    }

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
    // Ensure we're on the server
    if (typeof window !== 'undefined') {
      throw new Error("MetaAPI service cannot be used in browser environment")
    }

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
    // Ensure we're on the server
    if (typeof window !== 'undefined') {
      throw new Error("MetaAPI service cannot be used in browser environment")
    }

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
    // Ensure we're on the server
    if (typeof window !== 'undefined') {
      throw new Error("MetaAPI service cannot be used in browser environment")
    }

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
    // Ensure we're on the server
    if (typeof window !== 'undefined') {
      return { 
        success: false, 
        error: "MetaAPI service cannot be used in browser environment" 
      }
    }

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
    // If in browser, always return false
    if (typeof window !== 'undefined') {
      return false
    }
    return this.isInitialized
  }

  // Method to get initialization error
  getInitializationError(): string | null {
    return this.initializationError
  }
}

// Create a singleton instance only on the server side
let metaApiServiceInstance: MetaApiService | null = null;

// Only create the instance on the server
if (typeof window === 'undefined') {
  metaApiServiceInstance = new MetaApiService();
} else {
  // For client-side, create a mock service that returns appropriate errors
  metaApiServiceInstance = {
    isReady: () => false,
    getInitializationError: () => "MetaAPI service is only available server-side",
    connectAccount: async () => ({ success: false, error: "MetaAPI service is only available server-side" }),
    getAccountInformation: async () => { throw new Error("MetaAPI service is only available server-side") },
    getTradeHistory: async () => { throw new Error("MetaAPI service is only available server-side") },
    getPositions: async () => { throw new Error("MetaAPI service is only available server-side") },
    disconnectAccount: async () => ({ success: false, error: "MetaAPI service is only available server-side" }),
  } as unknown as MetaApiService;
}

export default metaApiServiceInstance;

"use server"

import type { TradingAccount, Trade, PlatformCredentials } from "@/lib/trading-types"
import { getPlatformAdapter } from "@/lib/platforms/platform-adapter"
import { DXtradeAdapter } from "@/lib/platforms/dxtrade-adapter"

// Store connected adapters (in a real app, this would be in a database)
const connectedAdapters: Record<string, any> = {}

// Mock data for demo purposes
const mockAccounts: TradingAccount[] = [
  {
    id: "acc-1",
    name: "Demo MT5 Account",
    platform: "mt5",
    accountNumber: "12345678",
    balance: 10000,
    equity: 10250.75,
    currency: "USD",
    leverage: "1:100",
    status: "active",
    lastUpdated: new Date().toISOString(),
    openPositions: 3,
    server: "Demo-Server",
    type: "demo",
  },
  {
    id: "acc-2",
    name: "TradingView Paper Trading",
    platform: "tradingview",
    accountNumber: "TV98765",
    balance: 5000,
    equity: 4950.25,
    currency: "USD",
    leverage: "1:1",
    status: "active",
    lastUpdated: new Date().toISOString(),
    openPositions: 1,
    server: "Paper",
    type: "demo",
  },
  {
    id: "acc-3",
    name: "Inactive MT4 Account",
    platform: "mt4",
    accountNumber: "87654321",
    balance: 2500,
    equity: 2500,
    currency: "EUR",
    leverage: "1:30",
    status: "disconnected",
    lastUpdated: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    openPositions: 0,
    server: "Live-Server",
    type: "live",
  },
]

// Test platform connection
export async function testPlatformConnection(
  credentials: PlatformCredentials,
): Promise<{ success: boolean; message: string }> {
  try {
    // Get the platform adapter
    const adapter = getPlatformAdapter(credentials.platform)

    if (!adapter) {
      return { success: false, message: `Platform ${credentials.platform} is not supported` }
    }

    // Special handling for DXtrade
    if (credentials.platform.toLowerCase() === "dxtrade") {
      const dxAdapter = new DXtradeAdapter()
      const success = await dxAdapter.connect(credentials)

      if (success) {
        return { success: true, message: "Connection successful" }
      } else {
        return { success: false, message: "Connection failed. Please check your credentials and try again." }
      }
    }

    // For other platforms, simulate connection test
    if (!credentials.server || !credentials.login || !credentials.password) {
      return { success: false, message: "Missing required credentials" }
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // 90% success rate for demo purposes
    if (Math.random() > 0.1) {
      return { success: true, message: "Connection successful" }
    } else {
      return { success: false, message: "Connection failed. Please check your credentials and try again." }
    }
  } catch (error) {
    console.error("Error testing platform connection:", error)
    return { success: false, message: "An error occurred while testing the connection" }
  }
}

// Alias for testPlatformConnection for better naming in components
export const testConnection = testPlatformConnection

// Connect a trading account
export async function connectTradingAccount(credentials: PlatformCredentials): Promise<TradingAccount> {
  try {
    // Special handling for DXtrade
    if (credentials.platform.toLowerCase() === "dxtrade") {
      const dxAdapter = new DXtradeAdapter()

      // Connect to DXtrade
      const success = await dxAdapter.connect(credentials)

      if (!success) {
        throw new Error("Failed to connect to DXtrade")
      }

      // Fetch account data
      const accounts = await dxAdapter.fetchAccounts()

      if (accounts.length === 0) {
        throw new Error("No accounts found")
      }

      const account = accounts[0]
      account.name = credentials.name || account.name
      account.type = credentials.demo ? "demo" : "live"

      // Add to mock accounts
      mockAccounts.push(account)

      return account
    }

    // For other platforms, simulate connection
    return new Promise((resolve) => {
      setTimeout(() => {
        const newAccount: TradingAccount = {
          id: `acc-${Date.now()}`,
          name: credentials.name || `${credentials.platform.toUpperCase()} Account`,
          platform: credentials.platform,
          accountNumber: credentials.login || credentials.accountNumber || String(Date.now()),
          balance: 10000,
          equity: 10000,
          currency: "USD",
          leverage: "1:100",
          status: "active",
          lastUpdated: new Date().toISOString(),
          openPositions: 0,
          server: credentials.server || "Demo-Server",
          type: credentials.demo ? "demo" : "live",
        }

        // Add to mock accounts
        mockAccounts.push(newAccount)

        resolve(newAccount)
      }, 1500)
    })
  } catch (error) {
    console.error("Error connecting trading account:", error)
    throw error
  }
}

// Fetch all trading accounts
export async function fetchTradingAccounts(): Promise<TradingAccount[]> {
  // In a real app, this would fetch from an API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockAccounts)
    }, 800)
  })
}

// Fetch a trading account by ID
export async function fetchAccountById(id: string): Promise<TradingAccount | null> {
  // In a real app, this would fetch from an API
  return new Promise((resolve) => {
    setTimeout(() => {
      const account = mockAccounts.find((acc) => acc.id === id)
      resolve(account || null)
    }, 500)
  })
}

// Fetch trades for an account
export async function fetchAccountTrades(accountId: string): Promise<Trade[]> {
  // Check if this is a DXtrade account
  if (accountId.startsWith("dxtrade-")) {
    try {
      const dxAdapter = new DXtradeAdapter()

      // We need to reconnect the adapter first
      // In a real app, you would store the credentials securely
      await dxAdapter.connect({
        login: accountId.split("-")[1],
        password: "********", // This is just a placeholder
      })

      return await dxAdapter.fetchTrades(accountId)
    } catch (error) {
      console.error("Error fetching DXtrade trades:", error)
      // Fall back to mock trades
    }
  }

  // For other platforms or if DXtrade fails, return mock trades
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "trade-1",
          accountId,
          symbol: "EURUSD",
          direction: "long",
          openPrice: 1.085,
          closePrice: 1.092,
          openTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          closeTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          size: 0.5,
          profit: 35,
          status: "closed",
          stopLoss: 1.08,
          takeProfit: 1.095,
        },
        {
          id: "trade-2",
          accountId,
          symbol: "GBPUSD",
          direction: "short",
          openPrice: 1.265,
          closePrice: null,
          openTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          closeTime: null,
          size: 0.3,
          profit: -15,
          status: "open",
          stopLoss: 1.27,
          takeProfit: 1.255,
        },
      ])
    }, 700)
  })
}

// Alias for fetchAccountTrades for better naming in components
export const fetchTrades = fetchAccountTrades

// Disconnect a trading account
export async function disconnectTradingAccount(accountId: string): Promise<boolean> {
  // Check if this is a DXtrade account
  if (accountId.startsWith("dxtrade-")) {
    try {
      const dxAdapter = new DXtradeAdapter()
      await dxAdapter.disconnect(accountId)

      // Update account status
      const accountIndex = mockAccounts.findIndex((acc) => acc.id === accountId)
      if (accountIndex !== -1) {
        mockAccounts[accountIndex].status = "disconnected"
      }

      return true
    } catch (error) {
      console.error("Error disconnecting DXtrade account:", error)
      return false
    }
  }

  // For other platforms
  return new Promise((resolve) => {
    setTimeout(() => {
      const accountIndex = mockAccounts.findIndex((acc) => acc.id === accountId)
      if (accountIndex !== -1) {
        mockAccounts[accountIndex].status = "disconnected"
        resolve(true)
      } else {
        resolve(false)
      }
    }, 800)
  })
}

// Sync account data with broker
export async function syncTradingAccount(accountId: string): Promise<{ success: boolean; message: string }> {
  // Check if this is a DXtrade account
  if (accountId.startsWith("dxtrade-")) {
    try {
      const dxAdapter = new DXtradeAdapter()

      // We need to reconnect the adapter first
      // In a real app, you would store the credentials securely
      await dxAdapter.connect({
        login: accountId.split("-")[1],
        password: "********", // This is just a placeholder
      })

      await dxAdapter.syncAccount(accountId)

      // Update the account data
      const accountIndex = mockAccounts.findIndex((acc) => acc.id === accountId)
      if (accountIndex !== -1) {
        mockAccounts[accountIndex].lastUpdated = new Date().toISOString()
      }

      return { success: true, message: "Account synchronized successfully" }
    } catch (error) {
      console.error("Error syncing DXtrade account:", error)
      return { success: false, message: "Failed to sync account" }
    }
  }

  // For other platforms
  return new Promise((resolve) => {
    setTimeout(() => {
      const account = mockAccounts.find((acc) => acc.id === accountId)
      if (!account) {
        resolve({ success: false, message: "Account not found" })
        return
      }

      // Update the account data
      account.lastUpdated = new Date().toISOString()
      account.balance += Math.random() * 100 - 50
      account.equity = account.balance + Math.random() * 200 - 100
      account.openPositions = Math.floor(Math.random() * 5)

      resolve({ success: true, message: "Account synchronized successfully" })
    }, 1200)
  })
}

// Get connection status for an account
export async function getConnectionStatus(
  accountId: string,
): Promise<{ connected: boolean; lastSyncTime: string | null; statusMessage: string; syncInProgress: boolean }> {
  try {
    // Check if this is a DXtrade account
    if (accountId.startsWith("dxtrade-")) {
      // Find the account
      const account = mockAccounts.find((acc) => acc.id === accountId)

      if (!account) {
        return {
          connected: false,
          lastSyncTime: null,
          statusMessage: "Account not found",
          syncInProgress: false,
        }
      }

      return {
        connected: account.status === "active",
        lastSyncTime: account.lastUpdated,
        statusMessage: account.status === "active" ? "Connected" : "Disconnected",
        syncInProgress: false,
      }
    }

    // Check if we have a connected adapter for this account
    if (connectedAdapters[accountId] && connectedAdapters[accountId].getConnectionStatus) {
      return await connectedAdapters[accountId].getConnectionStatus(accountId)
    }

    // Otherwise, return mock status
    return {
      connected: true,
      lastSyncTime: new Date().toISOString(),
      statusMessage: "Connected (Mock)",
      syncInProgress: false,
    }
  } catch (error) {
    console.error("Error getting connection status:", error)
    return {
      connected: false,
      lastSyncTime: null,
      statusMessage: "Error",
      syncInProgress: false,
    }
  }
}

// Get last sync time for an account
export async function getLastSyncTime(accountId: string): Promise<string | null> {
  try {
    // Check if this is a DXtrade account
    if (accountId.startsWith("dxtrade-")) {
      // Find the account
      const account = mockAccounts.find((acc) => acc.id === accountId)
      return account?.lastUpdated || null
    }

    // Check if we have a connected adapter for this account
    if (connectedAdapters[accountId] && connectedAdapters[accountId].getLastSyncTime) {
      return await connectedAdapters[accountId].getLastSyncTime(accountId)
    }

    // Otherwise, return mock time
    return new Date().toISOString()
  } catch (error) {
    console.error("Error getting last sync time:", error)
    return null
  }
}

// Get supported features for a platform
export async function getSupportedFeatures(platform: string): Promise<{
  realTimeData: boolean
  historicalData: boolean
  orderExecution: boolean
  paperTrading: boolean
  readOnly: boolean
  multipleAccounts: boolean
  supportedTimeframes: string[]
  supportedOrderTypes: string[]
  supportedAssetClasses: string[]
}> {
  try {
    // Special handling for DXtrade
    if (platform.toLowerCase() === "dxtrade") {
      return {
        realTimeData: true,
        historicalData: true,
        orderExecution: false,
        paperTrading: false,
        readOnly: true,
        multipleAccounts: true,
        supportedTimeframes: ["1m", "5m", "15m", "30m", "1h", "4h", "1d", "1w"],
        supportedOrderTypes: ["market", "limit", "stop", "stop-limit"],
        supportedAssetClasses: ["forex", "stocks", "indices", "commodities", "crypto"],
      }
    }

    // Get the appropriate adapter for the platform
    const adapter = getPlatformAdapter(platform)

    // Check if the adapter supports this method
    if (adapter.getSupportedFeatures) {
      return adapter.getSupportedFeatures()
    }

    // Otherwise, return default features
    return {
      realTimeData: true,
      historicalData: true,
      orderExecution: false,
      paperTrading: false,
      readOnly: true,
      multipleAccounts: false,
      supportedTimeframes: ["1m", "5m", "15m", "30m", "1h", "4h", "1d", "1w"],
      supportedOrderTypes: ["market", "limit", "stop"],
      supportedAssetClasses: ["forex", "stocks", "indices", "commodities"],
    }
  } catch (error) {
    console.error("Error getting supported features:", error)
    throw error
  }
}

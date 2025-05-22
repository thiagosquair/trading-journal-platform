// /app/trading-accounts/mt5Connector.js
import MetaApi from "metaapi.cloud-sdk"

export class MT5Connector {
  constructor(token) {
    this.api = new MetaApi(token || process.env.META_API_TOKEN)
    this.connections = {}
  }

  async connectToAccount(accountId) {
    try {
      // Get account information
      const account = await this.api.metatraderAccountApi.getAccount(accountId)

      // Connect to the account
      console.log(`Connecting to account ${accountId}...`)
      const connection = await account.connect()

      // Store the connection for later use
      this.connections[accountId] = connection

      console.log(`Connected to account ${accountId}`)
      return connection
    } catch (error) {
      console.error(`Error connecting to account ${accountId}:`, error)
      throw error
    }
  }

  async disconnectFromAccount(accountId) {
    try {
      const connection = this.connections[accountId]
      if (!connection) {
        throw new Error(`Not connected to account ${accountId}`)
      }

      // Close the connection
      await connection.close()

      // Remove from connections
      delete this.connections[accountId]

      console.log(`Disconnected from account ${accountId}`)
      return true
    } catch (error) {
      console.error(`Error disconnecting from account ${accountId}:`, error)
      throw error
    }
  }

  async getAccountInfo(accountId) {
    try {
      const connection = this.connections[accountId]
      if (!connection) {
        throw new Error(`Not connected to account ${accountId}`)
      }

      // Wait for terminal state synchronization
      await connection.waitSynchronized()

      // Get account information
      const accountInfo = connection.terminalState.accountInformation
      return accountInfo
    } catch (error) {
      console.error(`Error getting account info for ${accountId}:`, error)
      throw error
    }
  }

  async getHistory(accountId, startDate, endDate) {
    try {
      const connection = this.connections[accountId]
      if (!connection) {
        throw new Error(`Not connected to account ${accountId}`)
      }

      // Wait for terminal state synchronization
      await connection.waitSynchronized()

      // Get history
      const history = await connection.historyStorage.getDealsByTimeRange(new Date(startDate), new Date(endDate))

      return history
    } catch (error) {
      console.error(`Error getting history for ${accountId}:`, error)
      throw error
    }
  }

  async getLiveData(accountId) {
    try {
      const connection = this.connections[accountId]
      if (!connection) {
        throw new Error(`Not connected to account ${accountId}`)
      }

      // Wait for terminal state synchronization
      await connection.waitSynchronized()

      // Subscribe to market data
      return {
        accountInfo: connection.terminalState.accountInformation,
        positions: connection.terminalState.positions,
        orders: connection.terminalState.orders,
        // Add more data as needed
      }
    } catch (error) {
      console.error(`Error getting live data for ${accountId}:`, error)
      throw error
    }
  }
}

// Create a singleton instance
const metaApiToken = process.env.META_API_TOKEN
export const mt5Connector = new MT5Connector(metaApiToken)

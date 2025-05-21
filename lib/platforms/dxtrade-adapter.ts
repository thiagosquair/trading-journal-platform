import type { PlatformAdapter, ConnectionCredentials } from "./platform-adapter"
import type { TradingAccount, Trade } from "@/lib/trading-types"
import { dxtradeApiClient } from "@/lib/api-clients/dxtrade-api-client"

export class DXtradeAdapter implements PlatformAdapter {
  name = "DXtrade"
  private isConnected = false
  private credentials: ConnectionCredentials | null = null

  async connect(credentials: ConnectionCredentials): Promise<boolean> {
    try {
      // Store credentials
      this.credentials = credentials

      // Connect to DXtrade API
      const success = await dxtradeApiClient.authenticate({
        login: credentials.login,
        username: credentials.username,
        password: credentials.password || "",
        apiKey: credentials.apiKey,
      })

      this.isConnected = success
      return success
    } catch (error) {
      console.error("DXtrade connection error:", error)
      this.isConnected = false
      throw error
    }
  }

  async fetchAccounts(): Promise<TradingAccount[]> {
    if (!this.isConnected) {
      throw new Error("Not connected to DXtrade")
    }

    try {
      // Get account info from API
      const accountInfo = await dxtradeApiClient.getAccountInfo()

      // Convert to our internal format
      const account: TradingAccount = {
        id: `dxtrade-${accountInfo.accountId}`,
        name: this.credentials?.name || accountInfo.name,
        platform: "DXtrade",
        accountNumber: accountInfo.accountId,
        balance: accountInfo.balance,
        equity: accountInfo.equity,
        openPL: accountInfo.equity - accountInfo.balance,
        currency: accountInfo.currency,
        leverage: accountInfo.leverage,
        status: "active",
        lastUpdated: accountInfo.lastUpdated,
        openPositions: accountInfo.openPositions,
        server: accountInfo.server,
        type: this.credentials?.demo ? "demo" : "live",
      }

      return [account]
    } catch (error) {
      console.error("Error fetching DXtrade accounts:", error)
      throw error
    }
  }

  async fetchTrades(accountId: string): Promise<Trade[]> {
    if (!this.isConnected) {
      throw new Error("Not connected to DXtrade")
    }

    try {
      // Get open positions and trade history
      const openPositions = await dxtradeApiClient.getOpenPositions()
      const tradeHistory = await dxtradeApiClient.getTradeHistory(
        new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
        new Date(),
      )

      // Combine and convert to our internal format
      const trades: Trade[] = [
        ...openPositions.map((position) => ({
          id: position.id,
          accountId,
          symbol: position.symbol,
          direction: position.type === "buy" ? "long" : "short",
          openDate: position.openTime,
          closeDate: position.closeTime,
          openPrice: position.openPrice,
          closePrice: position.closePrice,
          size: position.volume,
          profit: position.profit,
          profitPercent: position.profit
            ? Number.parseFloat(((position.profit / (position.openPrice * position.volume * 100)) * 100).toFixed(2))
            : undefined,
          status: position.closePrice ? "closed" : "open",
          stopLoss: position.stopLoss || undefined,
          takeProfit: position.takeProfit || undefined,
          tags: ["dxtrade", position.symbol.toLowerCase()],
        })),
        ...tradeHistory.map((trade) => ({
          id: trade.id,
          accountId,
          symbol: trade.symbol,
          direction: trade.type === "buy" ? "long" : "short",
          openDate: trade.openTime,
          closeDate: trade.closeTime,
          openPrice: trade.openPrice,
          closePrice: trade.closePrice,
          size: trade.volume,
          profit: trade.profit,
          profitPercent: trade.profit
            ? Number.parseFloat(((trade.profit / (trade.openPrice * trade.volume * 100)) * 100).toFixed(2))
            : undefined,
          status: trade.closePrice ? "closed" : "open",
          stopLoss: trade.stopLoss || undefined,
          takeProfit: trade.takeProfit || undefined,
          tags: ["dxtrade", trade.symbol.toLowerCase()],
        })),
      ]

      return trades
    } catch (error) {
      console.error("Error fetching DXtrade trades:", error)
      throw error
    }
  }

  async syncAccount(accountId: string): Promise<void> {
    if (!this.isConnected) {
      throw new Error("Not connected to DXtrade")
    }

    try {
      // In a real implementation, we would sync with the DXtrade API
      // For now, we'll just refresh the account data
      await this.fetchAccounts()
      await this.fetchTrades(accountId)
    } catch (error) {
      console.error("Error syncing DXtrade account:", error)
      throw error
    }
  }

  async disconnect(accountId: string): Promise<void> {
    try {
      // Logout from DXtrade API
      await dxtradeApiClient.logout()

      // Reset connection state
      this.isConnected = false
      this.credentials = null

      console.log("Disconnected from DXtrade")
    } catch (error) {
      console.error("Error disconnecting from DXtrade:", error)
      throw error
    }
  }
}

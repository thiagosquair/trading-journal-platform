import type { PlatformAdapter, ConnectionCredentials } from "./platform-adapter"
import type { TradingAccount, Trade } from "@/lib/trading-types"
import TradovateApiClient, { type TradovateCredentials } from "../api-clients/tradovate-api-client"

export class TradovateAdapter implements PlatformAdapter {
  name = "Tradovate"
  private apiClient: TradovateApiClient

  constructor(mockMode = true) {
    this.apiClient = new TradovateApiClient(mockMode)
  }

  async connect(credentials: ConnectionCredentials): Promise<boolean> {
    const tradovateCredentials: TradovateCredentials = {
      username: credentials.username || "",
      password: credentials.password || "",
      appId: credentials.appId,
      appVersion: credentials.appVersion,
    }

    return await this.apiClient.authenticate(tradovateCredentials)
  }

  async fetchAccounts(): Promise<TradingAccount[]> {
    try {
      const accounts = await this.apiClient.getAccounts()

      return accounts.map((account) => {
        return {
          id: account.id,
          name: account.name,
          broker: "Tradovate",
          status: account.active ? "active" : "inactive",
          balance: 0, // Will be updated with snapshot
          equity: 0, // Will be updated with snapshot
          openPL: 0, // Will be updated with snapshot
          lastUpdated: account.timestamp,
          accountNumber: account.id,
          currency: account.currency,
        }
      })
    } catch (error) {
      console.error("Error fetching Tradovate accounts:", error)
      throw error
    }
  }

  async fetchAccountDetails(accountId: string): Promise<TradingAccount> {
    try {
      const accounts = await this.fetchAccounts()
      const account = accounts.find((a) => a.id === accountId)

      if (!account) {
        throw new Error(`Account ${accountId} not found`)
      }

      const snapshot = await this.apiClient.getAccountSnapshot(accountId)

      return {
        ...account,
        balance: snapshot.cashBalance,
        equity: snapshot.netLiquidation,
        openPL: snapshot.openPl,
        lastUpdated: snapshot.timestamp,
        marginUsed: snapshot.totalMarginRequirement,
        freeMargin: snapshot.availableMargin,
      }
    } catch (error) {
      console.error(`Error fetching Tradovate account details for ${accountId}:`, error)
      throw error
    }
  }

  async fetchTrades(accountId: string): Promise<Trade[]> {
    try {
      // Get positions and execution reports
      const positions = await this.apiClient.getPositions(accountId)
      const executions = await this.apiClient.getExecutionReports(accountId)
      const contracts = await this.apiClient.getContracts()

      // Convert positions to open trades
      const openTrades = positions.map((position) => {
        const contract = contracts.find((c) => c.id === position.contractId)

        return {
          id: position.id,
          accountId,
          symbol: position.symbol,
          direction: position.direction,
          openDate: position.timestamp,
          openPrice: position.netPrice,
          size: Math.abs(position.netPos),
          profit: position.unrealizedPl,
          profitPercent: (position.unrealizedPl / position.netPrice) * 100,
          status: "open",
          tags: ["futures"],
          contractDetails: contract
            ? {
                contractType: contract.contractType,
                expiryDate: contract.lastTradeDate,
                pointValue: contract.valuePerPoint,
                tickSize: contract.tickSize,
              }
            : undefined,
        }
      })

      // Convert execution reports to closed trades
      // This is simplified - in a real implementation, you'd need to match buy/sell executions
      const closedTrades = executions
        .filter((exec) => exec.ordStatus === "Filled")
        .map((exec) => {
          const contract = contracts.find((c) => c.id === exec.contractId)

          return {
            id: exec.id,
            accountId,
            symbol: exec.symbol,
            direction: exec.lastQty > 0 ? "long" : "short",
            openDate: exec.timestamp,
            closeDate: exec.timestamp, // Simplified - would need to match buy/sell in real implementation
            openPrice: exec.price,
            closePrice: exec.price, // Simplified
            size: Math.abs(exec.lastQty),
            profit: 0, // Simplified
            profitPercent: 0, // Simplified
            status: "closed",
            tags: ["futures"],
            contractDetails: contract
              ? {
                  contractType: contract.contractType,
                  expiryDate: contract.lastTradeDate,
                  pointValue: contract.valuePerPoint,
                  tickSize: contract.tickSize,
                }
              : undefined,
          }
        })

      return [...openTrades, ...closedTrades]
    } catch (error) {
      console.error(`Error fetching Tradovate trades for ${accountId}:`, error)
      throw error
    }
  }

  async syncAccount(accountId: string): Promise<void> {
    try {
      await this.fetchAccountDetails(accountId)
      await this.fetchTrades(accountId)
      console.log(`Synced Tradovate account ${accountId}`)
    } catch (error) {
      console.error(`Error syncing Tradovate account ${accountId}:`, error)
      throw error
    }
  }

  async disconnect(accountId: string): Promise<void> {
    console.log(`Disconnected from Tradovate account ${accountId}`)
    // No actual disconnection needed for REST API
  }
}

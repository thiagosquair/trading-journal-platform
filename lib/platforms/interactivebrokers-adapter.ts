import type { PlatformAdapter, ConnectionCredentials } from "./platform-adapter"
import type { TradingAccount, Trade } from "@/lib/trading-types"

export class InteractiveBrokersAdapter implements PlatformAdapter {
  name = "Interactive Brokers"

  async connect(credentials: ConnectionCredentials): Promise<boolean> {
    // Simulate connection
    await new Promise((resolve) => setTimeout(resolve, 800))
    return true
  }

  async fetchAccounts(): Promise<TradingAccount[]> {
    // Return mock account
    return [
      {
        id: "ib-1",
        name: "Interactive Brokers Demo",
        broker: "Interactive Brokers",
        status: "active",
        balance: 10000,
        equity: 10200,
        openPL: 200,
        lastUpdated: new Date().toISOString(),
        accountNumber: "IB12345",
        currency: "USD",
      },
    ]
  }

  async fetchTrades(accountId: string): Promise<Trade[]> {
    // Return mock trades
    return []
  }

  async syncAccount(accountId: string): Promise<void> {
    // Simulate sync
  }

  async disconnect(accountId: string): Promise<void> {
    // Simulate disconnect
  }
}

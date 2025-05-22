import type { Trade } from "./trading-types"

// Mock data for demonstration purposes
const mockTrades: Trade[] = [
  {
    id: "1",
    accountId: "acc1",
    symbol: "EURUSD",
    type: "BUY",
    openTime: new Date("2023-05-01T10:30:00Z").toISOString(),
    closeTime: new Date("2023-05-01T14:45:00Z").toISOString(),
    openPrice: 1.075,
    closePrice: 1.0785,
    volume: 0.5,
    profit: 175.0,
    commission: 5.0,
    swap: -2.5,
    pips: 35,
    status: "CLOSED",
  },
  {
    id: "2",
    accountId: "acc1",
    symbol: "GBPUSD",
    type: "SELL",
    openTime: new Date("2023-05-02T09:15:00Z").toISOString(),
    closeTime: new Date("2023-05-02T16:30:00Z").toISOString(),
    openPrice: 1.245,
    closePrice: 1.238,
    volume: 0.3,
    profit: 210.0,
    commission: 4.5,
    swap: -1.8,
    pips: 70,
    status: "CLOSED",
  },
  {
    id: "3",
    accountId: "acc1",
    symbol: "USDJPY",
    type: "BUY",
    openTime: new Date("2023-05-03T08:45:00Z").toISOString(),
    closeTime: new Date("2023-05-03T12:15:00Z").toISOString(),
    openPrice: 134.25,
    closePrice: 133.8,
    volume: 0.2,
    profit: -90.0,
    commission: 3.0,
    swap: -1.2,
    pips: -45,
    status: "CLOSED",
  },
]

export async function fetchTrades(accountId: string): Promise<Trade[]> {
  // In a real application, this would be an API call
  // For now, we'll simulate a network request with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredTrades = mockTrades.filter((trade) => trade.accountId === accountId)
      resolve(filteredTrades)
    }, 500)
  })
}

export async function fetchTradeById(tradeId: string): Promise<Trade | null> {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const trade = mockTrades.find((t) => t.id === tradeId) || null
      resolve(trade)
    }, 300)
  })
}

export async function fetchRecentTrades(limit = 5): Promise<Trade[]> {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const sortedTrades = [...mockTrades].sort(
        (a, b) => new Date(b.openTime).getTime() - new Date(a.openTime).getTime(),
      )
      resolve(sortedTrades.slice(0, limit))
    }, 300)
  })
}

export async function fetchTradeStatistics(accountId: string) {
  // Simulate API call
  const trades = await fetchTrades(accountId)

  const totalTrades = trades.length
  const winningTrades = trades.filter((t) => t.profit > 0).length
  const losingTrades = trades.filter((t) => t.profit < 0).length

  const totalProfit = trades.reduce((sum, trade) => sum + trade.profit, 0)
  const totalCommission = trades.reduce((sum, trade) => sum + trade.commission, 0)
  const totalSwap = trades.reduce((sum, trade) => sum + trade.swap, 0)

  const netProfit = totalProfit - totalCommission - totalSwap

  return {
    totalTrades,
    winningTrades,
    losingTrades,
    winRate: totalTrades > 0 ? winningTrades / totalTrades : 0,
    totalProfit,
    totalCommission,
    totalSwap,
    netProfit,
  }
}

export async function testConnection(accountDetails: any): Promise<{ success: boolean; message: string }> {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // For demo purposes, always return success
      resolve({ success: true, message: "Connection successful" })
    }, 1000)
  })
}

export async function testPlatformConnection(
  platform: string,
  credentials: any,
): Promise<{ success: boolean; message: string }> {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // For demo purposes, always return success
      resolve({ success: true, message: `Connection to ${platform} successful` })
    }, 1000)
  })
}

export async function connectTradingAccount(
  accountDetails: any,
): Promise<{ success: boolean; accountId?: string; message: string }> {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // For demo purposes, always return success
      resolve({
        success: true,
        accountId: `acc-${Math.floor(Math.random() * 10000)}`,
        message: "Account connected successfully",
      })
    }, 1500)
  })
}

export async function fetchTradingAccounts(): Promise<any[]> {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "acc1",
          name: "Demo MT5 Account",
          platform: "MT5",
          broker: "Demo Broker",
          balance: 10000,
          equity: 10050,
          currency: "USD",
          lastSynced: new Date().toISOString(),
        },
        {
          id: "acc2",
          name: "Demo MT4 Account",
          platform: "MT4",
          broker: "Demo Broker",
          balance: 5000,
          equity: 5025,
          currency: "USD",
          lastSynced: new Date().toISOString(),
        },
      ])
    }, 800)
  })
}

export async function fetchAccountById(accountId: string): Promise<any | null> {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      if (accountId === "acc1") {
        resolve({
          id: "acc1",
          name: "Demo MT5 Account",
          platform: "MT5",
          broker: "Demo Broker",
          balance: 10000,
          equity: 10050,
          currency: "USD",
          lastSynced: new Date().toISOString(),
        })
      } else if (accountId === "acc2") {
        resolve({
          id: "acc2",
          name: "Demo MT4 Account",
          platform: "MT4",
          broker: "Demo Broker",
          balance: 5000,
          equity: 5025,
          currency: "USD",
          lastSynced: new Date().toISOString(),
        })
      } else {
        resolve(null)
      }
    }, 500)
  })
}

export async function getSupportedFeatures(platform: string): Promise<string[]> {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const features = ["trade_history", "account_info", "positions", "orders"]

      // Add platform-specific features
      if (platform === "MT5" || platform === "MT4") {
        features.push("expert_advisors")
      }

      if (platform === "cTrader") {
        features.push("copy_trading")
      }

      resolve(features)
    }, 300)
  })
}

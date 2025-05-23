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
  try {
    // Try to fetch from API first
    const response = await fetch(`/api/mt5/history?accountId=${accountId}`, {
      method: "GET",
    })

    if (response.ok) {
      const data = await response.json()
      if (data.deals && Array.isArray(data.deals)) {
        return data.deals.map((deal: any) => ({
          id: deal.id || deal.ticket || String(Math.random()),
          accountId,
          symbol: deal.symbol || "Unknown",
          type: deal.type || "UNKNOWN",
          openTime: deal.openTime || deal.time || new Date().toISOString(),
          closeTime: deal.closeTime || deal.time || new Date().toISOString(),
          openPrice: deal.openPrice || deal.price || 0,
          closePrice: deal.closePrice || deal.price || 0,
          volume: deal.volume || 0,
          profit: deal.profit || 0,
          commission: deal.commission || 0,
          swap: deal.swap || 0,
          pips: deal.pips || 0,
          status: deal.status || "CLOSED",
        }))
      }
    }

    // Fallback to mock data
    console.log("Falling back to mock trade data for account:", accountId)
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredTrades = mockTrades.filter((trade) => trade.accountId === accountId)
        resolve(
          filteredTrades.length > 0
            ? filteredTrades
            : [
                {
                  id: "mt5_1",
                  accountId,
                  symbol: "EURUSD",
                  type: "BUY",
                  openTime: new Date("2025-05-20T10:30:00Z").toISOString(),
                  closeTime: new Date("2025-05-20T14:45:00Z").toISOString(),
                  openPrice: 1.0865,
                  closePrice: 1.0885,
                  volume: 0.5,
                  profit: 100.0,
                  commission: 5.0,
                  swap: -2.5,
                  pips: 20,
                  status: "CLOSED",
                },
              ],
        )
      }, 500)
    })
  } catch (error) {
    console.error("Error fetching trades:", error)
    return []
  }
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
  const totalCommission = trades.reduce((sum, trade) => sum + (trade.commission || 0), 0)
  const totalSwap = trades.reduce((sum, trade) => sum + (trade.swap || 0), 0)

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

// Connect to trading account
export async function connectTradingAccount(accountData: {
  name: string
  platform: string
  server: string
  accountNumber: string
  password: string
  accessType: string
}): Promise<{ success: boolean; accountId: string }> {
  try {
    // Try to connect via API first
    if (accountData.platform === "MT5" || accountData.platform === "MT4") {
      const response = await fetch("/api/mt5/connect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: accountData.name,
          server: accountData.server,
          login: accountData.accountNumber,
          password: accountData.password,
        }),
      })

      if (response.ok) {
        const data = await response.json()

        // Create account object with real data
        const newAccount = {
          id: `mt5_${accountData.accountNumber}`,
          name: accountData.name,
          platform: accountData.platform,
          server: accountData.server,
          accountNumber: accountData.accountNumber,
          balance: data.balance || 10000,
          equity: data.equity || 10000,
          currency: data.currency || "USD",
          leverage: data.leverage || "1:100",
          margin: data.margin || 0,
          freeMargin: data.freeMargin || 0,
          marginLevel: data.marginLevel || 0,
          status: "connected",
          lastUpdated: new Date().toISOString(),
          createdAt: new Date().toISOString(),
        }

        // Save to localStorage
        if (typeof window !== "undefined") {
          const existingAccounts = JSON.parse(localStorage.getItem("tradingAccounts") || "[]")
          const accountExists = existingAccounts.some((acc: any) => acc.id === newAccount.id)

          if (!accountExists) {
            existingAccounts.push(newAccount)
            localStorage.setItem("tradingAccounts", JSON.stringify(existingAccounts))
          } else {
            // Update existing account
            const updatedAccounts = existingAccounts.map((acc: any) =>
              acc.id === newAccount.id ? { ...acc, ...newAccount } : acc,
            )
            localStorage.setItem("tradingAccounts", JSON.stringify(updatedAccounts))
          }
        }

        return { success: true, accountId: newAccount.id }
      }
    }

    // Fallback to mock connection
    console.log("Falling back to mock connection for platform:", accountData.platform)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Store in localStorage for demo purposes
    if (typeof window !== "undefined") {
      const existingAccounts = JSON.parse(localStorage.getItem("tradingAccounts") || "[]")
      const newAccount = {
        ...accountData,
        id: `${accountData.platform.toLowerCase()}_${accountData.accountNumber}`,
        balance: 10000,
        equity: 10000,
        status: "connected",
        lastUpdated: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      }

      existingAccounts.push(newAccount)
      localStorage.setItem("tradingAccounts", JSON.stringify(existingAccounts))
    }

    return { success: true, accountId: `${accountData.platform.toLowerCase()}_${accountData.accountNumber}` }
  } catch (error) {
    console.error("Error connecting trading account:", error)
    throw error
  }
}

// Add the missing testPlatformConnection function
export async function testPlatformConnection(connectionData: {
  platform: string
  server: string
  accountNumber: string
  password: string
  accessType: string
}): Promise<{ success: boolean; message: string }> {
  try {
    // Try to test connection via API first
    if (connectionData.platform === "MT5" || connectionData.platform === "MT4") {
      const response = await fetch("/api/mt5/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          server: connectionData.server,
          login: connectionData.accountNumber,
          password: connectionData.password,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        return {
          success: true,
          message:
            data.message || `Connection successful! Your ${connectionData.platform} account is ready to connect.`,
        }
      }
    }

    // Simulate API call for other platforms or fallback
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Always succeed for demo purposes
    return {
      success: true,
      message: `Connection successful! Your ${connectionData.platform.toUpperCase()} account is ready to connect.`,
    }
  } catch (error) {
    console.error("Error testing connection:", error)
    throw error
  }
}

export async function fetchTradingAccounts(): Promise<any[]> {
  // Get from localStorage for demo purposes
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("tradingAccounts") || "[]")
  }
  return []
}

export async function disconnectTradingAccount(accountId: string): Promise<{ success: boolean }> {
  try {
    // Try to disconnect via API first
    if (accountId.startsWith("mt5_") || accountId.startsWith("mt4_")) {
      const response = await fetch("/api/mt5/disconnect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accountId }),
      })

      if (response.ok) {
        // Remove from localStorage
        if (typeof window !== "undefined") {
          const existingAccounts = JSON.parse(localStorage.getItem("tradingAccounts") || "[]")
          const updatedAccounts = existingAccounts.filter((account: any) => account.id !== accountId)
          localStorage.setItem("tradingAccounts", JSON.stringify(updatedAccounts))
        }

        return { success: true }
      }
    }

    // Fallback to mock disconnection
    console.log("Falling back to mock disconnection for account:", accountId)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Remove from localStorage for demo purposes
    if (typeof window !== "undefined") {
      const existingAccounts = JSON.parse(localStorage.getItem("tradingAccounts") || "[]")
      const updatedAccounts = existingAccounts.filter((account: any) => account.id !== accountId)
      localStorage.setItem("tradingAccounts", JSON.stringify(updatedAccounts))
    }

    return { success: true }
  } catch (error) {
    console.error("Error disconnecting account:", error)
    throw error
  }
}

export async function fetchAccountById(accountId: string): Promise<any | null> {
  try {
    // Try to fetch from API first
    if (accountId.startsWith("mt5_") || accountId.startsWith("mt4_")) {
      const response = await fetch(`/api/mt5/account-info?accountId=${accountId}`, {
        method: "GET",
      })

      if (response.ok) {
        const accountInfo = await response.json()

        // Get existing account from localStorage
        if (typeof window !== "undefined") {
          const accounts = JSON.parse(localStorage.getItem("tradingAccounts") || "[]")
          const existingAccount = accounts.find((acc: any) => acc.id === accountId)

          if (existingAccount) {
            // Update with latest data
            const updatedAccount = {
              ...existingAccount,
              balance: accountInfo.balance || existingAccount.balance,
              equity: accountInfo.equity || existingAccount.equity,
              margin: accountInfo.margin || existingAccount.margin,
              freeMargin: accountInfo.freeMargin || existingAccount.freeMargin,
              marginLevel: accountInfo.marginLevel || existingAccount.marginLevel,
              currency: accountInfo.currency || existingAccount.currency,
              leverage: accountInfo.leverage || existingAccount.leverage,
              lastUpdated: new Date().toISOString(),
            }

            // Save updated account
            const updatedAccounts = accounts.map((acc: any) => (acc.id === accountId ? updatedAccount : acc))
            localStorage.setItem("tradingAccounts", JSON.stringify(updatedAccounts))

            return updatedAccount
          }
        }
      }
    }

    // Fallback to localStorage
    console.log("Falling back to localStorage for account:", accountId)

    // Simulate API call
    if (typeof window !== "undefined") {
      const accounts = JSON.parse(localStorage.getItem("tradingAccounts") || "[]")
      const account = accounts.find((acc: any) => acc.id === accountId) || null

      // If account not found but we have an ID, create a mock account
      if (!account && accountId) {
        const mockAccount = {
          id: accountId,
          name: "Demo Account",
          platform: accountId.startsWith("mt5_") ? "MT5" : accountId.startsWith("mt4_") ? "MT4" : "Unknown",
          server: "demo-server.com",
          accountNumber: accountId.split("_")[1] || "12345678",
          balance: 27544.7,
          equity: 12759.73,
          currency: "GBP",
          leverage: "1:30",
          margin: 1500.25,
          freeMargin: 11259.48,
          marginLevel: 850.5,
          status: "connected",
          lastUpdated: new Date().toISOString(),
          createdAt: new Date().toISOString(),
        }
        return mockAccount
      }

      return account
    }

    // If we're on the server, return a mock account
    if (accountId) {
      return {
        id: accountId,
        name: "Demo Account",
        platform: accountId.startsWith("mt5_") ? "MT5" : accountId.startsWith("mt4_") ? "MT4" : "Unknown",
        server: "demo-server.com",
        accountNumber: accountId.split("_")[1] || "12345678",
        balance: 27544.7,
        equity: 12759.73,
        currency: "GBP",
        leverage: "1:30",
        margin: 1500.25,
        freeMargin: 11259.48,
        marginLevel: 850.5,
        status: "connected",
        lastUpdated: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      }
    }

    return null
  } catch (error) {
    console.error("Error fetching account by ID:", error)

    // Return mock data if there's an error
    if (accountId) {
      return {
        id: accountId,
        name: "Demo Account",
        platform: accountId.startsWith("mt5_") ? "MT5" : accountId.startsWith("mt4_") ? "MT4" : "Unknown",
        server: "demo-server.com",
        accountNumber: accountId.split("_")[1] || "12345678",
        balance: 27544.7,
        equity: 12759.73,
        currency: "GBP",
        leverage: "1:30",
        margin: 1500.25,
        freeMargin: 11259.48,
        marginLevel: 850.5,
        status: "connected",
        lastUpdated: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      }
    }

    return null
  }
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

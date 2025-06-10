import { MT5_CONFIG } from "./mt5-connection"

// Existing code...

export async function fetchAccountById(accountId: string) {
  console.log(`[Trading Actions] Fetching account: ${accountId}`)

  if (MT5_CONFIG.useRealApi) {
    try {
      // Try to fetch from the real API first
      const response = await fetch(`/api/mt5/account-info?accountId=${accountId}`)

      if (response.ok) {
        const data = await response.json()
        console.log("[Trading Actions] Account data from API:", data)
        return {
          id: accountId,
          ...data,
        }
      } else {
        console.warn("[Trading Actions] API call failed, falling back to localStorage")
      }
    } catch (error) {
      console.error("[Trading Actions] Error fetching from API:", error)
    }
  }

  // Fallback to localStorage
  if (typeof window !== "undefined") {
    const accounts = JSON.parse(localStorage.getItem("tradingAccounts") || "[]")
    const account = accounts.find((acc: any) => acc.id === accountId)
    console.log("[Trading Actions] Account data from localStorage:", account)
    return account || null
  }

  return null
}

export async function fetchTrades(accountId: string) {
  console.log(`[Trading Actions] Fetching trades for account: ${accountId}`)

  if (MT5_CONFIG.useRealApi) {
    try {
      // Try to fetch from the real API first
      const response = await fetch(`/api/mt5/history?accountId=${accountId}`)

      if (response.ok) {
        const data = await response.json()
        console.log("[Trading Actions] Trades data from API:", data)
        return data.deals || []
      } else {
        console.warn("[Trading Actions] API call failed, falling back to mock data")
      }
    } catch (error) {
      console.error("[Trading Actions] Error fetching trades from API:", error)
    }
  }

  // Return mock trades as fallback
  return [
    {
      id: "1",
      symbol: "EURUSD",
      type: "BUY",
      openTime: new Date().toISOString(),
      closeTime: new Date().toISOString(),
      volume: 0.1,
      openPrice: 1.075,
      closePrice: 1.078,
      profit: 30,
    },
    {
      id: "2",
      symbol: "GBPUSD",
      type: "SELL",
      openTime: new Date().toISOString(),
      closeTime: new Date().toISOString(),
      volume: 0.2,
      openPrice: 1.265,
      closePrice: 1.26,
      profit: 100,
    },
  ]
}

// Other functions...

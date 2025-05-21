"use client"

import { useState, useEffect } from "react"

export interface TradingAccount {
  id: string
  name: string
  platform: string
  server?: string
  accountNumber: string
  balance: number
  equity: number
  currency: string
  leverage: string
  status: string
  type?: string
  accountType?: string
  openPositions?: number
  lastUpdated: string
}

export function useTradingAccounts() {
  const [accounts, setAccounts] = useState<TradingAccount[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAccounts = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // In a real app, this would be an API call
      // For now, we'll use localStorage
      const savedAccounts = JSON.parse(localStorage.getItem("tradingAccounts") || "[]")
      setAccounts(savedAccounts)
    } catch (err) {
      console.error("Error fetching accounts:", err)
      setError("Failed to load trading accounts")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchAccounts()
  }, [])

  const refreshAccounts = async () => {
    await fetchAccounts()
  }

  return {
    accounts,
    isLoading,
    error,
    refreshAccounts,
  }
}

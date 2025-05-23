"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function DebugStorage() {
  const [accounts, setAccounts] = useState<any[]>([])

  const loadAccounts = () => {
    const stored = localStorage.getItem("tradingAccounts")
    console.log("Debug - Raw localStorage:", stored)
    const parsed = stored ? JSON.parse(stored) : []
    console.log("Debug - Parsed accounts:", parsed)
    setAccounts(parsed)
  }

  const clearAccounts = () => {
    localStorage.removeItem("tradingAccounts")
    setAccounts([])
    console.log("Debug - Cleared all accounts")
  }

  const addTestAccount = () => {
    const testAccount = {
      id: `test_${Date.now()}`,
      name: "Test Account",
      platform: "MT5",
      broker: "Test Broker",
      server: "test.server.com",
      accountNumber: "123456",
      status: "active",
      balance: 10000,
      equity: 10000,
      openPL: 0,
      currency: "USD",
      lastUpdated: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    }

    const existing = JSON.parse(localStorage.getItem("tradingAccounts") || "[]")
    const updated = [...existing, testAccount]
    localStorage.setItem("tradingAccounts", JSON.stringify(updated))
    loadAccounts()
    console.log("Debug - Added test account")
  }

  useEffect(() => {
    loadAccounts()
  }, [])

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Debug Storage</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button onClick={loadAccounts} variant="outline" size="sm">
            Reload
          </Button>
          <Button onClick={addTestAccount} variant="outline" size="sm">
            Add Test Account
          </Button>
          <Button onClick={clearAccounts} variant="destructive" size="sm">
            Clear All
          </Button>
        </div>
        <div>
          <p className="text-sm font-medium">Accounts in localStorage: {accounts.length}</p>
          <pre className="text-xs bg-muted p-2 rounded mt-2 overflow-auto max-h-40">
            {JSON.stringify(accounts, null, 2)}
          </pre>
        </div>
      </CardContent>
    </Card>
  )
}

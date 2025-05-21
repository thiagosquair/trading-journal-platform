"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, RefreshCw, AlertCircle, CheckCircle2, Loader2 } from "lucide-react"
import Link from "next/link"
import { fetchAccountById, fetchAccountTrades, syncTradingAccount } from "@/lib/trading-actions"

interface Trade {
  id: string
  accountId: string
  symbol: string
  direction: string
  openPrice: number
  closePrice?: number | null
  openTime: string
  closeTime?: string | null
  size: number
  profit?: number | null
  status: string
  stopLoss?: number | null
  takeProfit?: number | null
}

interface TradingAccount {
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

export default function LiveTradeSyncMonitor({ accountId }: { accountId: string }) {
  const router = useRouter()
  const [account, setAccount] = useState<TradingAccount | null>(null)
  const [trades, setTrades] = useState<Trade[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSyncing, setIsSyncing] = useState(false)
  const [syncStatus, setSyncStatus] = useState<{ success: boolean; message: string } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const loadAccountData = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Try to load from localStorage first (for demo purposes)
      const savedAccounts = JSON.parse(localStorage.getItem("tradingAccounts") || "[]")
      const foundAccount = savedAccounts.find((acc: TradingAccount) => acc.id === accountId)

      if (foundAccount) {
        setAccount(foundAccount)

        // Generate mock trades for the account
        const mockTrades: Trade[] = []
        const symbols = ["EURUSD", "GBPUSD", "USDJPY", "AUDUSD", "USDCAD", "XAUUSD"]
        const now = new Date()

        for (let i = 0; i < 5; i++) {
          const isOpen = Math.random() > 0.5
          const openDate = new Date(now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000)
          const closeDate = isOpen ? undefined : new Date(openDate.getTime() + Math.random() * 5 * 24 * 60 * 60 * 1000)
          const direction = Math.random() > 0.5 ? "long" : "short"
          const symbol = symbols[Math.floor(Math.random() * symbols.length)]
          const openPrice = Number.parseFloat((Math.random() * 100 + 50).toFixed(2))
          const closePrice = isOpen
            ? undefined
            : Number.parseFloat((openPrice * (1 + (direction === "long" ? 1 : -1) * Math.random() * 0.05)).toFixed(2))
          const size = Math.floor(Math.random() * 5) + 1
          const profit = isOpen
            ? undefined
            : Number.parseFloat(((closePrice! - openPrice) * (direction === "long" ? 1 : -1) * size * 100).toFixed(2))

          mockTrades.push({
            id: `trade-${i + 1}`,
            accountId,
            symbol,
            direction,
            openTime: openDate.toISOString(),
            closeTime: closeDate?.toISOString(),
            openPrice,
            closePrice,
            size,
            profit,
            status: isOpen ? "open" : "closed",
            stopLoss: direction === "long" ? openPrice * 0.98 : openPrice * 1.02,
            takeProfit: direction === "long" ? openPrice * 1.03 : openPrice * 0.97,
          })
        }

        setTrades(mockTrades)
      } else {
        // If not found in localStorage, try to fetch from API
        const accountData = await fetchAccountById(accountId)
        if (accountData) {
          setAccount(accountData)
          const tradesData = await fetchAccountTrades(accountId)
          setTrades(tradesData)
        } else {
          setError("Account not found")
        }
      }
    } catch (err) {
      console.error("Error loading account data:", err)
      setError("Failed to load account data. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSync = async () => {
    if (!account) return

    setIsSyncing(true)
    setSyncStatus(null)

    try {
      // For demo purposes, update the account in localStorage
      const savedAccounts = JSON.parse(localStorage.getItem("tradingAccounts") || "[]")
      const accountIndex = savedAccounts.findIndex((acc: TradingAccount) => acc.id === accountId)

      if (accountIndex !== -1) {
        // Update the account data
        savedAccounts[accountIndex].lastUpdated = new Date().toISOString()
        savedAccounts[accountIndex].balance += Math.random() * 100 - 50
        savedAccounts[accountIndex].equity = savedAccounts[accountIndex].balance + Math.random() * 200 - 100

        localStorage.setItem("tradingAccounts", JSON.stringify(savedAccounts))

        // Update the account state
        setAccount(savedAccounts[accountIndex])

        // Generate a new trade
        const newTrade: Trade = {
          id: `trade-${Date.now()}`,
          accountId,
          symbol: "EURUSD",
          direction: Math.random() > 0.5 ? "long" : "short",
          openPrice: 1.08 + Math.random() * 0.02,
          openTime: new Date().toISOString(),
          size: 0.1 + Math.random() * 0.9,
          status: "open",
          stopLoss: 1.07,
          takeProfit: 1.09,
        }

        setTrades((prev) => [newTrade, ...prev])

        setSyncStatus({
          success: true,
          message: "Account synchronized successfully. New trade detected!",
        })
      } else {
        // If not found in localStorage, try to sync via API
        const result = await syncTradingAccount(accountId)
        setSyncStatus(result)

        // Reload account data
        await loadAccountData()
      }
    } catch (err) {
      console.error("Error syncing account:", err)
      setSyncStatus({
        success: false,
        message: "Failed to synchronize account. Please try again.",
      })
    } finally {
      setIsSyncing(false)
    }
  }

  useEffect(() => {
    loadAccountData()

    // Set up auto-refresh every 30 seconds
    const intervalId = setInterval(() => {
      handleSync()
    }, 30000)

    return () => clearInterval(intervalId)
  }, [accountId])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (error || !account) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" className="mb-6" asChild>
          <Link href="/trading-accounts">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Trading Accounts
          </Link>
        </Button>

        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error || "Account not found"}</AlertDescription>
        </Alert>

        <Button onClick={loadAccountData}>Try Again</Button>
      </div>
    )
  }

  const openTrades = trades.filter((trade) => trade.status === "open")
  const closedTrades = trades.filter((trade) => trade.status === "closed")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/trading-accounts">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              {account.name}
              <Badge
                className={
                  account.type?.toLowerCase() === "demo" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                }
              >
                {account.type || "Live"}
              </Badge>
            </h1>
            <p className="text-muted-foreground mt-1">
              {account.platform} • {account.server || "Server"} • Account #{account.accountNumber}
            </p>
          </div>
        </div>

        <Button onClick={handleSync} disabled={isSyncing}>
          {isSyncing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Syncing...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Sync Now
            </>
          )}
        </Button>
      </div>

      {syncStatus && (
        <Alert variant={syncStatus.success ? "default" : "destructive"}>
          {syncStatus.success ? (
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          <AlertDescription>{syncStatus.message}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {account.balance.toLocaleString(undefined, {
                style: "currency",
                currency: account.currency || "USD",
                maximumFractionDigits: 2,
              })}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Equity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {account.equity.toLocaleString(undefined, {
                style: "currency",
                currency: account.currency || "USD",
                maximumFractionDigits: 2,
              })}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Last Updated</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">{new Date(account.lastUpdated).toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="open">
        <TabsList>
          <TabsTrigger value="open">Open Trades ({openTrades.length})</TabsTrigger>
          <TabsTrigger value="closed">Closed Trades ({closedTrades.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="open" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Open Positions</CardTitle>
              <CardDescription>Currently active trades in your account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Symbol</th>
                      <th className="text-left py-3 px-4">Type</th>
                      <th className="text-left py-3 px-4">Open Time</th>
                      <th className="text-right py-3 px-4">Size</th>
                      <th className="text-right py-3 px-4">Open Price</th>
                      <th className="text-right py-3 px-4">Stop Loss</th>
                      <th className="text-right py-3 px-4">Take Profit</th>
                      <th className="text-right py-3 px-4">Current P/L</th>
                    </tr>
                  </thead>
                  <tbody>
                    {openTrades.map((trade) => (
                      <tr key={trade.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4">{trade.symbol}</td>
                        <td className="py-3 px-4 capitalize">
                          <Badge variant={trade.direction === "long" ? "default" : "secondary"}>
                            {trade.direction === "long" ? "Buy" : "Sell"}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">{new Date(trade.openTime).toLocaleString()}</td>
                        <td className="py-3 px-4 text-right">{trade.size.toFixed(2)}</td>
                        <td className="py-3 px-4 text-right">{trade.openPrice.toFixed(5)}</td>
                        <td className="py-3 px-4 text-right">{trade.stopLoss?.toFixed(5) || "-"}</td>
                        <td className="py-3 px-4 text-right">{trade.takeProfit?.toFixed(5) || "-"}</td>
                        <td className="py-3 px-4 text-right font-medium text-green-600">
                          {(Math.random() * 100 - 20).toFixed(2)} {account.currency}
                        </td>
                      </tr>
                    ))}
                    {openTrades.length === 0 && (
                      <tr>
                        <td colSpan={8} className="py-6 text-center text-muted-foreground">
                          No open trades found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="closed" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Closed Trades</CardTitle>
              <CardDescription>Historical trades from your account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Symbol</th>
                      <th className="text-left py-3 px-4">Type</th>
                      <th className="text-left py-3 px-4">Open Time</th>
                      <th className="text-left py-3 px-4">Close Time</th>
                      <th className="text-right py-3 px-4">Size</th>
                      <th className="text-right py-3 px-4">Open Price</th>
                      <th className="text-right py-3 px-4">Close Price</th>
                      <th className="text-right py-3 px-4">Profit/Loss</th>
                    </tr>
                  </thead>
                  <tbody>
                    {closedTrades.map((trade) => (
                      <tr key={trade.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4">{trade.symbol}</td>
                        <td className="py-3 px-4 capitalize">
                          <Badge variant={trade.direction === "long" ? "default" : "secondary"}>
                            {trade.direction === "long" ? "Buy" : "Sell"}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">{new Date(trade.openTime).toLocaleString()}</td>
                        <td className="py-3 px-4">
                          {trade.closeTime ? new Date(trade.closeTime).toLocaleString() : "-"}
                        </td>
                        <td className="py-3 px-4 text-right">{trade.size.toFixed(2)}</td>
                        <td className="py-3 px-4 text-right">{trade.openPrice.toFixed(5)}</td>
                        <td className="py-3 px-4 text-right">{trade.closePrice?.toFixed(5) || "-"}</td>
                        <td
                          className={`py-3 px-4 text-right font-medium ${(trade.profit || 0) >= 0 ? "text-green-600" : "text-red-600"}`}
                        >
                          {(trade.profit || 0).toLocaleString(undefined, {
                            style: "currency",
                            currency: account.currency || "USD",
                            maximumFractionDigits: 2,
                          })}
                        </td>
                      </tr>
                    ))}
                    {closedTrades.length === 0 && (
                      <tr>
                        <td colSpan={8} className="py-6 text-center text-muted-foreground">
                          No closed trades found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

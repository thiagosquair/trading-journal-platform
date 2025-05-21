"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RefreshCw, Settings, BarChart3, History, FileSpreadsheet } from "lucide-react"
import Link from "next/link"

interface Trade {
  id: string
  symbol: string
  type: "buy" | "sell"
  openPrice: number
  closePrice?: number
  openTime: string
  closeTime?: string
  volume: number
  profit: number
  pips?: number
  status: "open" | "closed"
}

interface Account {
  id: string
  name: string
  platform: string
  accountNumber: string
  balance: number
  equity: number
  margin?: number
  freeMargin?: number
  marginLevel?: number
  currency: string
  leverage?: string
  server?: string
  accountType?: string
  status: string
  lastUpdated: string
}

export default function AccountDetailsClient({ id }: { id: string }) {
  const [account, setAccount] = useState<Account | null>(null)
  const [trades, setTrades] = useState<Trade[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSyncing, setIsSyncing] = useState(false)

  useEffect(() => {
    loadAccountData()
  }, [])

  const loadAccountData = async () => {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call
      // For now, we'll use mock data from localStorage
      const savedAccounts = JSON.parse(localStorage.getItem("tradingAccounts") || "[]")
      const foundAccount = savedAccounts.find((acc: Account) => acc.id === id)

      if (foundAccount) {
        setAccount(foundAccount)

        // Generate some mock trades
        const mockTrades: Trade[] = [
          {
            id: "t1",
            symbol: "EURUSD",
            type: "buy",
            openPrice: 1.0865,
            closePrice: 1.0885,
            openTime: "2025-05-20T10:30:00Z",
            closeTime: "2025-05-20T14:45:00Z",
            volume: 0.5,
            profit: 100,
            pips: 20,
            status: "closed",
          },
          {
            id: "t2",
            symbol: "GBPUSD",
            type: "sell",
            openPrice: 1.265,
            openTime: "2025-05-21T09:15:00Z",
            volume: 0.3,
            profit: -25,
            status: "open",
          },
        ]
        setTrades(mockTrades)
      }
    } catch (error) {
      console.error("Failed to load account data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSync = async () => {
    setIsSyncing(true)
    try {
      // Simulate syncing
      await new Promise((resolve) => setTimeout(resolve, 2000))
      await loadAccountData()
    } finally {
      setIsSyncing(false)
    }
  }

  const getAccountTypeColor = (type?: string) => {
    if (!type) return "bg-gray-100 text-gray-800"

    switch (type.toLowerCase()) {
      case "demo":
        return "bg-blue-100 text-blue-800"
      case "live":
        return "bg-green-100 text-green-800"
      case "prop":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatCurrency = (value?: number) => {
    if (value === undefined) return "N/A"
    return value.toLocaleString(undefined, {
      style: "currency",
      currency: account?.currency || "USD",
      maximumFractionDigits: 2,
    })
  }

  const getTradeTypeColor = (type: string) => {
    return type === "buy" ? "text-green-600" : "text-red-600"
  }

  const getProfitColor = (profit: number) => {
    return profit >= 0 ? "text-green-600" : "text-red-600"
  }

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading account details...</div>
  }

  if (!account) {
    return <div className="p-8">Account not found</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{account.name}</h1>
          <p className="text-muted-foreground">
            {account.platform} • {account.server || "Server"} • Account #{account.accountNumber}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={loadAccountData} disabled={isLoading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button onClick={handleSync} disabled={isSyncing}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isSyncing ? "animate-spin" : ""}`} />
            {isSyncing ? "Syncing..." : "Sync Now"}
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/trading-accounts/${id}/settings`}>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Balance</CardDescription>
            <CardTitle className="text-2xl">{formatCurrency(account.balance)}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Equity</CardDescription>
            <CardTitle className="text-2xl">{formatCurrency(account.equity)}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Free Margin</CardDescription>
            <CardTitle className="text-2xl">{formatCurrency(account.freeMargin)}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Account Type</CardDescription>
            <CardTitle className="flex items-center gap-2">
              <Badge className={getAccountTypeColor(account.accountType)}>
                {account.accountType
                  ? account.accountType.charAt(0).toUpperCase() + account.accountType.slice(1)
                  : "Unknown"}
              </Badge>
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Account Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Platform</p>
              <p>{account.platform}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Server</p>
              <p>{account.server || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Account Number</p>
              <p>{account.accountNumber}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Currency</p>
              <p>{account.currency}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Leverage</p>
              <p>{account.leverage || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Margin Level</p>
              <p>{account.marginLevel ? `${account.marginLevel}%` : "N/A"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Status</p>
              <p>{account.status.charAt(0).toUpperCase() + account.status.slice(1)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
              <p>{new Date(account.lastUpdated).toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="open-trades">
        <TabsList>
          <TabsTrigger value="open-trades">Open Trades</TabsTrigger>
          <TabsTrigger value="trade-history">Trade History</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>
        <TabsContent value="open-trades" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Open Trades</CardTitle>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/trading-accounts/${id}/live-monitor`}>
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Live Monitor
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {trades.filter((t) => t.status === "open").length > 0 ? (
                <div className="space-y-4">
                  {trades
                    .filter((t) => t.status === "open")
                    .map((trade) => (
                      <div key={trade.id} className="flex justify-between items-center p-3 border rounded-md">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{trade.symbol}</span>
                            <span className={getTradeTypeColor(trade.type)}>{trade.type.toUpperCase()}</span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(trade.openTime).toLocaleString()} • {trade.volume} lots
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={getProfitColor(trade.profit)}>
                            {trade.profit > 0 ? "+" : ""}
                            {formatCurrency(trade.profit)}
                          </div>
                          <div className="text-sm text-muted-foreground">Entry: {trade.openPrice}</div>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-4">No open trades</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="trade-history" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Trade History</CardTitle>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/trading-accounts/${id}/history`}>
                    <History className="mr-2 h-4 w-4" />
                    Full History
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {trades.filter((t) => t.status === "closed").length > 0 ? (
                <div className="space-y-4">
                  {trades
                    .filter((t) => t.status === "closed")
                    .map((trade) => (
                      <div key={trade.id} className="flex justify-between items-center p-3 border rounded-md">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{trade.symbol}</span>
                            <span className={getTradeTypeColor(trade.type)}>{trade.type.toUpperCase()}</span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {trade.closeTime && new Date(trade.closeTime).toLocaleString()} • {trade.volume} lots
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={getProfitColor(trade.profit)}>
                            {trade.profit > 0 ? "+" : ""}
                            {formatCurrency(trade.profit)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {trade.pips && (trade.pips > 0 ? "+" : "") + trade.pips + " pips"}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-4">No trade history</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="performance" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Performance</CardTitle>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/trading-accounts/${id}/reports`}>
                    <FileSpreadsheet className="mr-2 h-4 w-4" />
                    Reports
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-4">Performance metrics will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

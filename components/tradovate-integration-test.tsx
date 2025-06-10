"use client"

import { useState } from "react"
import { TradovateAccountConnector } from "./tradovate-account-connector"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, RefreshCw, Loader2 } from "lucide-react"

interface Trade {
  id: string
  symbol: string
  direction: string
  openDate: string
  closeDate?: string
  openPrice: number
  closePrice?: number
  size: number
  profit: number
  profitPercent: number
  status: string
}

interface Account {
  id: string
  name: string
  broker: string
  balance: number
  equity: number
  openPL: number
  marginUsed?: number
  freeMargin?: number
}

export function TradovateIntegrationTest() {
  const [isConnected, setIsConnected] = useState(false)
  const [account, setAccount] = useState<Account | null>(null)
  const [trades, setTrades] = useState<Trade[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [syncSuccess, setSyncSuccess] = useState(false)

  const handleAccountConnected = (data: any) => {
    if (data.success && data.accounts && data.accounts.length > 0) {
      setIsConnected(true)
      setAccount(data.accounts[0])

      // Fetch trades for the connected account
      fetchTrades(data.accounts[0].id)
    }
  }

  const fetchTrades = async (accountId: string) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/tradovate/accounts/${accountId}/trades`)
      const data = await response.json()

      if (data.success && data.trades) {
        setTrades(data.trades)
      }
    } catch (error) {
      console.error("Error fetching trades:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSyncAccount = async () => {
    if (!account) return

    setIsLoading(true)
    setSyncSuccess(false)

    try {
      // Fetch updated account details
      const accountResponse = await fetch(`/api/tradovate/accounts`)
      const accountData = await accountResponse.json()

      if (accountData.success && accountData.accounts && accountData.accounts.length > 0) {
        setAccount(accountData.accounts[0])
      }

      // Fetch updated trades
      await fetchTrades(account.id)

      setSyncSuccess(true)

      // Reset success message after 3 seconds
      setTimeout(() => {
        setSyncSuccess(false)
      }, 3000)
    } catch (error) {
      console.error("Error syncing account:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  if (!isConnected) {
    return <TradovateAccountConnector onAccountConnected={handleAccountConnected} />
  }

  const openTrades = trades.filter((trade) => trade.status === "open")
  const closedTrades = trades.filter((trade) => trade.status === "closed")

  return (
    <div className="space-y-6">
      {syncSuccess && (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">Success</AlertTitle>
          <AlertDescription className="text-green-700">Account synced successfully!</AlertDescription>
        </Alert>
      )}

      {account && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>{account.name}</CardTitle>
              <CardDescription>Tradovate Futures Account</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={handleSyncAccount} disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
              Sync Account
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Balance</p>
                <p className="text-xl font-semibold">{formatCurrency(account.balance)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Equity</p>
                <p className="text-xl font-semibold">{formatCurrency(account.equity)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Open P&L</p>
                <p className={`text-xl font-semibold ${account.openPL >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {formatCurrency(account.openPL)}
                </p>
              </div>
              {account.marginUsed !== undefined && account.freeMargin !== undefined && (
                <>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Free Margin</p>
                    <p className="text-xl font-semibold">{formatCurrency(account.freeMargin)}</p>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="all">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="all">All Trades ({trades.length})</TabsTrigger>
          <TabsTrigger value="open">Open Positions ({openTrades.length})</TabsTrigger>
          <TabsTrigger value="closed">Closed Trades ({closedTrades.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {trades.map((trade) => (
            <TradeCard key={trade.id} trade={trade} />
          ))}
          {trades.length === 0 && <p className="text-center text-muted-foreground py-8">No trades found</p>}
        </TabsContent>

        <TabsContent value="open" className="space-y-4">
          {openTrades.map((trade) => (
            <TradeCard key={trade.id} trade={trade} />
          ))}
          {openTrades.length === 0 && <p className="text-center text-muted-foreground py-8">No open positions</p>}
        </TabsContent>

        <TabsContent value="closed" className="space-y-4">
          {closedTrades.map((trade) => (
            <TradeCard key={trade.id} trade={trade} />
          ))}
          {closedTrades.length === 0 && <p className="text-center text-muted-foreground py-8">No closed trades</p>}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function TradeCard({ trade }: { trade: Trade }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-lg">{trade.symbol}</h3>
            <Badge variant={trade.direction === "long" ? "default" : "destructive"}>
              {trade.direction === "long" ? "BUY" : "SELL"}
            </Badge>
            <Badge variant="outline">{trade.status.toUpperCase()}</Badge>
          </div>
          <div className={`font-semibold ${trade.profit >= 0 ? "text-green-600" : "text-red-600"}`}>
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(trade.profit)}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
          <div>
            <p className="text-muted-foreground">Open Date</p>
            <p>{new Date(trade.openDate).toLocaleString()}</p>
          </div>
          {trade.closeDate && (
            <div>
              <p className="text-muted-foreground">Close Date</p>
              <p>{new Date(trade.closeDate).toLocaleString()}</p>
            </div>
          )}
          <div>
            <p className="text-muted-foreground">Open Price</p>
            <p>{trade.openPrice}</p>
          </div>
          {trade.closePrice && (
            <div>
              <p className="text-muted-foreground">Close Price</p>
              <p>{trade.closePrice}</p>
            </div>
          )}
          <div>
            <p className="text-muted-foreground">Size</p>
            <p>{trade.size}</p>
          </div>
          <div>
            <p className="text-muted-foreground">P&L %</p>
            <p className={trade.profitPercent >= 0 ? "text-green-600" : "text-red-600"}>
              {trade.profitPercent.toFixed(2)}%
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

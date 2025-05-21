"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AccountPerformance } from "@/components/account-performance"
import { TradesTable } from "@/components/trades-table"
import type { TradingAccount, Trade } from "@/lib/trading-types"
import { RefreshCcw, AlertTriangle, Share2 } from "lucide-react"
import { formatCurrency, formatDate } from "@/lib/utils"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { PerformanceShareCard } from "@/components/social/performance-share-card"

interface TradingAccountDetailsProps {
  account: TradingAccount
  trades: Trade[]
  onSync?: () => void
  onDisconnect?: () => void
}

export function TradingAccountDetails({ account, trades, onSync, onDisconnect }: TradingAccountDetailsProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [shareDialogOpen, setShareDialogOpen] = useState(false)

  const handleSync = async () => {
    if (!onSync) return

    setIsLoading(true)
    try {
      await onSync()
    } finally {
      setIsLoading(false)
    }
  }

  const openTrades = trades.filter((trade) => trade.status === "open")
  const closedTrades = trades.filter((trade) => trade.status === "closed")

  const totalProfit = closedTrades.reduce((sum, trade) => sum + (trade.profit || 0), 0)
  const winningTrades = closedTrades.filter((trade) => (trade.profit || 0) > 0)
  const winRate = closedTrades.length > 0 ? (winningTrades.length / closedTrades.length) * 100 : 0

  const shareableStats = {
    balance: {
      value: formatCurrency(account.balance, account.currency),
      label: "Balance",
    },
    equity: {
      value: formatCurrency(account.equity, account.currency),
      label: "Equity",
    },
    openPL: {
      value: formatCurrency(account.openPL, account.currency),
      label: "Open P/L",
      trend: account.openPL > 0 ? "up" : account.openPL < 0 ? "down" : "neutral",
    },
    winRate: {
      value: `${winRate.toFixed(1)}%`,
      label: "Win Rate",
      trend: winRate > 50 ? "up" : "down",
    },
    totalProfit: {
      value: formatCurrency(totalProfit, account.currency),
      label: "Total Profit",
      trend: totalProfit > 0 ? "up" : "down",
    },
    trades: {
      value: closedTrades.length,
      label: "Trades",
    },
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{account.name}</h1>
          <p className="text-muted-foreground">
            {account.broker} • {account.accountNumber}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2" onClick={() => setShareDialogOpen(true)}>
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" size="sm" className="gap-2" onClick={handleSync} disabled={isLoading}>
            <RefreshCcw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            {isLoading ? "Syncing..." : "Sync"}
          </Button>
          {account.status === "disconnected" && (
            <Button variant="destructive" size="sm" className="gap-2">
              <AlertTriangle className="h-4 w-4" />
              Reconnect
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(account.balance, account.currency)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Equity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(account.equity, account.currency)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Open P/L</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${account.openPL > 0 ? "text-green-500" : account.openPL < 0 ? "text-red-500" : ""}`}
            >
              {formatCurrency(account.openPL, account.currency)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="open-positions">Open Positions ({openTrades.length})</TabsTrigger>
          <TabsTrigger value="trade-history">Trade History ({closedTrades.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <AccountPerformance account={account} trades={trades} />
        </TabsContent>
        <TabsContent value="open-positions">
          <TradesTable trades={openTrades} />
        </TabsContent>
        <TabsContent value="trade-history">
          <TradesTable trades={closedTrades} />
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Account Details</CardTitle>
          <CardDescription>Information about your trading account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Broker</p>
              <p className="text-sm text-muted-foreground">{account.broker}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Account Number</p>
              <p className="text-sm text-muted-foreground">{account.accountNumber || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Status</p>
              <p className="text-sm text-muted-foreground capitalize">{account.status}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Last Updated</p>
              <p className="text-sm text-muted-foreground">{formatDate(account.lastUpdated)}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          {onDisconnect && (
            <Button variant="outline" size="sm" onClick={onDisconnect}>
              Disconnect Account
            </Button>
          )}
        </CardFooter>
      </Card>

      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share Your Trading Account</DialogTitle>
          </DialogHeader>
          <PerformanceShareCard
            title={`${account.name} Performance`}
            description={`My trading account performance with ${account.broker}`}
            stats={shareableStats}
            chartImageUrl="/trading-chart-profit.png"
            period="Account Summary"
            username="trader_john"
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

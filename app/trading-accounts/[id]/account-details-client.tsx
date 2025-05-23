"use client"

import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, RefreshCw, Settings, Trash2, AlertCircle, BarChart3, ListFilter, Clock, Wallet } from "lucide-react"
import { fetchAccountById, fetchTrades, disconnectTradingAccount } from "@/lib/trading-actions"
import { formatCurrency } from "@/lib/utils"

export default function AccountDetailsClient({ accountId }: { accountId: string }) {
  const router = useRouter()
  const [account, setAccount] = useState<any | null>(null)
  const [trades, setTrades] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSyncing, setIsSyncing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadAccountData()
  }, [accountId])

  const loadAccountData = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const accountData = await fetchAccountById(accountId)
      if (!accountData) {
        throw new Error("Account not found")
      }
      setAccount(accountData)

      const tradesData = await fetchTrades(accountId)
      setTrades(tradesData)
    } catch (err: any) {
      console.error("Error loading account data:", err)
      setError(err.message || "Failed to load account data")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSyncAccount = async () => {
    setIsSyncing(true)
    try {
      // Call the API to sync the account
      const response = await fetch(`/api/mt5/account-info?accountId=${accountId}`, {
        method: "GET",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to sync account")
      }

      const accountInfo = await response.json()

      // Update the account with the latest data
      const updatedAccount = {
        ...account,
        balance: accountInfo.balance,
        equity: accountInfo.equity,
        margin: accountInfo.margin,
        freeMargin: accountInfo.freeMargin,
        marginLevel: accountInfo.marginLevel,
        currency: accountInfo.currency,
        leverage: accountInfo.leverage,
        lastSynced: new Date().toISOString(),
      }

      setAccount(updatedAccount)

      // Save to localStorage
      if (typeof window !== "undefined") {
        const accounts = JSON.parse(localStorage.getItem("tradingAccounts") || "[]")
        const updatedAccounts = accounts.map((acc: any) => (acc.id === accountId ? updatedAccount : acc))
        localStorage.setItem("tradingAccounts", JSON.stringify(updatedAccounts))
      }

      // Reload trades
      const tradesResponse = await fetch(`/api/mt5/history?accountId=${accountId}`, {
        method: "GET",
      })

      if (tradesResponse.ok) {
        const tradesData = await tradesResponse.json()
        setTrades(tradesData.deals || [])
      }
    } catch (err: any) {
      console.error("Error syncing account:", err)
      alert(err.message || "Failed to sync account")
    } finally {
      setIsSyncing(false)
    }
  }

  const handleDisconnectAccount = async () => {
    if (!confirm("Are you sure you want to disconnect this account?")) {
      return
    }

    try {
      // Call the API to disconnect the account
      const response = await fetch(`/api/mt5/disconnect`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accountId }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to disconnect account")
      }

      await disconnectTradingAccount(accountId)
      router.push("/trading-accounts")
    } catch (err: any) {
      console.error("Error disconnecting account:", err)
      alert(err.message || "Failed to disconnect account")
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <Skeleton className="h-8 w-64" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-5 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-24" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className="h-5 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-24" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className="h-5 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-24" />
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trades">Trades</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-6">
            <div className="space-y-6">
              <Skeleton className="h-64 w-full" />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-6">
        <Button variant="outline" size="sm" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{account.name}</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Badge variant="outline">{account.platform}</Badge>
              <span>•</span>
              <span>{account.server || account.broker}</span>
              <span>•</span>
              <span>ID: {account.accountNumber}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" onClick={handleSyncAccount} disabled={isSyncing} className="flex-1 sm:flex-none">
            {isSyncing ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Syncing...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Sync Account
              </>
            )}
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push(`/trading-accounts/${accountId}/settings`)}
            className="flex-1 sm:flex-none"
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button variant="destructive" onClick={handleDisconnectAccount} className="flex-1 sm:flex-none">
            <Trash2 className="mr-2 h-4 w-4" />
            Disconnect
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Wallet className="mr-2 h-4 w-4" />
              Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(account.balance, account.currency || "USD")}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Wallet className="mr-2 h-4 w-4" />
              Equity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(account.equity, account.currency || "USD")}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              Last Synced
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg">
              {account.lastSynced ? new Date(account.lastSynced).toLocaleString() : "Never"}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trades">Trades</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>Details about your trading account</CardDescription>
              </CardHeader>
              <CardContent>
                <dl className="space-y-4">
                  <div className="flex justify-between">
                    <dt className="font-medium">Platform</dt>
                    <dd>{account.platform}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Server</dt>
                    <dd>{account.server || "N/A"}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Account Number</dt>
                    <dd>{account.accountNumber}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Currency</dt>
                    <dd>{account.currency || "USD"}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Leverage</dt>
                    <dd>{account.leverage || "N/A"}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Margin</dt>
                    <dd>{formatCurrency(account.margin || 0, account.currency || "USD")}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Free Margin</dt>
                    <dd>{formatCurrency(account.freeMargin || 0, account.currency || "USD")}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Margin Level</dt>
                    <dd>{account.marginLevel ? `${account.marginLevel}%` : "N/A"}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Connected On</dt>
                    <dd>{account.createdAt ? new Date(account.createdAt).toLocaleDateString() : "Unknown"}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account Summary</CardTitle>
                <CardDescription>Overview of your trading activity</CardDescription>
              </CardHeader>
              <CardContent>
                <dl className="space-y-4">
                  <div className="flex justify-between">
                    <dt className="font-medium">Total Trades</dt>
                    <dd>{trades.length}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Winning Trades</dt>
                    <dd>{trades.filter((trade) => trade.profit > 0).length}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Losing Trades</dt>
                    <dd>{trades.filter((trade) => trade.profit < 0).length}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Win Rate</dt>
                    <dd>
                      {trades.length > 0
                        ? `${((trades.filter((trade) => trade.profit > 0).length / trades.length) * 100).toFixed(2)}%`
                        : "N/A"}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Total Profit</dt>
                    <dd
                      className={
                        trades.reduce((sum, trade) => sum + trade.profit, 0) >= 0 ? "text-green-600" : "text-red-600"
                      }
                    >
                      {formatCurrency(
                        trades.reduce((sum, trade) => sum + trade.profit, 0),
                        account.currency || "USD",
                      )}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Average Trade</dt>
                    <dd
                      className={
                        trades.length > 0 && trades.reduce((sum, trade) => sum + trade.profit, 0) / trades.length >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {trades.length > 0
                        ? formatCurrency(
                            trades.reduce((sum, trade) => sum + trade.profit, 0) / trades.length,
                            account.currency || "USD",
                          )
                        : "N/A"}
                    </dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="trades" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Trade History</CardTitle>
                  <CardDescription>All trades from your account</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <ListFilter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleSyncAccount} disabled={isSyncing}>
                    {isSyncing ? <RefreshCw className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                    <span className="ml-2">Refresh</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {trades.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No trades found for this account.</p>
                  <Button variant="outline" className="mt-4" onClick={handleSyncAccount} disabled={isSyncing}>
                    {isSyncing ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Syncing...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Sync Account
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Symbol</th>
                        <th className="text-left py-3 px-4">Type</th>
                        <th className="text-left py-3 px-4">Open Time</th>
                        <th className="text-left py-3 px-4">Close Time</th>
                        <th className="text-right py-3 px-4">Volume</th>
                        <th className="text-right py-3 px-4">Open Price</th>
                        <th className="text-right py-3 px-4">Close Price</th>
                        <th className="text-right py-3 px-4">Profit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {trades.map((trade) => (
                        <tr key={trade.id} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4">{trade.symbol}</td>
                          <td className="py-3 px-4">
                            <Badge variant={trade.type === "BUY" ? "default" : "secondary"}>{trade.type}</Badge>
                          </td>
                          <td className="py-3 px-4">{new Date(trade.openTime).toLocaleString()}</td>
                          <td className="py-3 px-4">
                            {trade.closeTime ? new Date(trade.closeTime).toLocaleString() : "Open"}
                          </td>
                          <td className="py-3 px-4 text-right">{trade.volume}</td>
                          <td className="py-3 px-4 text-right">{trade.openPrice}</td>
                          <td className="py-3 px-4 text-right">{trade.closePrice || "Open"}</td>
                          <td
                            className={`py-3 px-4 text-right font-medium ${trade.profit >= 0 ? "text-green-600" : "text-red-600"}`}
                          >
                            {formatCurrency(trade.profit, account.currency || "USD")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="performance" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Performance Analysis</CardTitle>
                  <CardDescription>Analyze your trading performance</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={handleSyncAccount} disabled={isSyncing}>
                  {isSyncing ? <RefreshCw className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                  <span className="ml-2">Refresh</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <BarChart3 className="h-16 w-16 mx-auto text-muted-foreground" />
                  <p className="mt-4 text-muted-foreground">
                    Performance charts will appear here once you have more trading data.
                  </p>
                  <Button variant="outline" className="mt-4" onClick={handleSyncAccount} disabled={isSyncing}>
                    {isSyncing ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Syncing...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Sync Account
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="settings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account settings and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">General Settings</h3>
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="account-name">Account Name</Label>
                    <Input id="account-name" defaultValue={account.name} />
                    <p className="text-sm text-muted-foreground">
                      This name is only visible to you and helps you identify this account.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Sync Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-sync">Auto Sync</Label>
                      <p className="text-sm text-muted-foreground">Automatically sync this account every hour</p>
                    </div>
                    <Switch id="auto-sync" defaultChecked={true} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="journal-sync">Journal Integration</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically create journal entries for new trades
                      </p>
                    </div>
                    <Switch id="journal-sync" defaultChecked={false} />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Danger Zone</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Disconnect Account</p>
                      <p className="text-sm text-muted-foreground">This will remove the account from your profile</p>
                    </div>
                    <Button variant="destructive" onClick={handleDisconnectAccount}>
                      Disconnect
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

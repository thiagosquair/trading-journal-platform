"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2, RefreshCw } from "lucide-react"
import { connectTradingAccount, fetchTradingAccounts, fetchTrades } from "@/lib/trading-actions"
import type { TradingAccount, Trade } from "@/lib/trading-types"
import { formatCurrency } from "@/lib/utils"
import TradesTable from "@/components/trades-table"

export function DXtradeIntegrationTest() {
  const [accounts, setAccounts] = useState<TradingAccount[]>([])
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null)
  const [trades, setTrades] = useState<Trade[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isSyncing, setIsSyncing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Load existing accounts on mount
  useEffect(() => {
    loadAccounts()
  }, [])

  // Load trades when selected account changes
  useEffect(() => {
    if (selectedAccount) {
      loadTrades(selectedAccount)
    }
  }, [selectedAccount])

  async function loadAccounts() {
    setIsLoading(true)
    setError(null)

    try {
      const fetchedAccounts = await fetchTradingAccounts()
      // Filter to only show DXtrade accounts
      const dxtradeAccounts = fetchedAccounts.filter((acc) => acc.broker === "Gooey Trade")
      setAccounts(dxtradeAccounts)

      if (dxtradeAccounts.length > 0 && !selectedAccount) {
        setSelectedAccount(dxtradeAccounts[0].id)
      }
    } catch (err) {
      console.error("Error loading accounts:", err)
      setError("Failed to load trading accounts")
    } finally {
      setIsLoading(false)
    }
  }

  async function loadTrades(accountId: string) {
    setIsLoading(true)
    setError(null)

    try {
      const fetchedTrades = await fetchTrades(accountId)
      setTrades(fetchedTrades)
    } catch (err) {
      console.error("Error loading trades:", err)
      setError("Failed to load trades for this account")
    } finally {
      setIsLoading(false)
    }
  }

  async function handleConnectStandardAccount() {
    setIsConnecting(true)
    setError(null)
    setSuccess(null)

    try {
      // Connect to the standard DXtrade demo account
      await connectTradingAccount({
        platform: "dxtrade",
        name: "DXtrade Standard Account",
        login: "123456", // Standard demo account
        password: "demo123",
        broker: "Gooey Trade",
      })

      setSuccess("Successfully connected DXtrade Standard Account")
      await loadAccounts()
    } catch (err) {
      console.error("Error connecting account:", err)
      setError("Failed to connect DXtrade Standard Account")
    } finally {
      setIsConnecting(false)
    }
  }

  async function handleConnectProAccount() {
    setIsConnecting(true)
    setError(null)
    setSuccess(null)

    try {
      // Connect to the pro DXtrade account with the credentials provided earlier
      await connectTradingAccount({
        platform: "dxtrade",
        name: "DXtrade Pro Account",
        login: "634733", // The account credentials provided earlier
        password: "p4S&cFn!7",
        broker: "Gooey Trade",
      })

      setSuccess("Successfully connected DXtrade Pro Account")
      await loadAccounts()
    } catch (err) {
      console.error("Error connecting account:", err)
      setError("Failed to connect DXtrade Pro Account")
    } finally {
      setIsConnecting(false)
    }
  }

  async function handleSync() {
    if (!selectedAccount) return

    setIsSyncing(true)
    setError(null)
    setSuccess(null)

    try {
      // In a real implementation, this would sync with the DXtrade API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setSuccess("Successfully synced account data")
      await loadAccounts()
      await loadTrades(selectedAccount)
    } catch (err) {
      console.error("Error syncing account:", err)
      setError("Failed to sync account data")
    } finally {
      setIsSyncing(false)
    }
  }

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert variant="default" className="bg-green-50 text-green-800 border-green-200">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Connect Standard Account</CardTitle>
            <CardDescription>Connect to the DXtrade standard demo account</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              This will connect to a standard DXtrade demo account with basic features.
            </p>
          </CardContent>
          <CardFooter>
            <Button onClick={handleConnectStandardAccount} disabled={isConnecting}>
              {isConnecting ? "Connecting..." : "Connect Standard Account"}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Connect Pro Account</CardTitle>
            <CardDescription>Connect to the DXtrade pro account with your credentials</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              This will connect to your DXtrade pro account using the credentials you provided earlier.
            </p>
          </CardContent>
          <CardFooter>
            <Button onClick={handleConnectProAccount} disabled={isConnecting}>
              {isConnecting ? "Connecting..." : "Connect Pro Account"}
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Connected Accounts</h2>
        <Button variant="outline" onClick={loadAccounts} disabled={isLoading}>
          Refresh Accounts
        </Button>
      </div>

      {isLoading && !accounts.length ? (
        <div className="space-y-4">
          <Skeleton className="h-[100px] w-full" />
          <Skeleton className="h-[100px] w-full" />
        </div>
      ) : accounts.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              No DXtrade accounts connected. Use the buttons above to connect an account.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {accounts.map((account) => (
              <Card
                key={account.id}
                className={`cursor-pointer hover:border-primary transition-colors ${
                  selectedAccount === account.id ? "border-primary" : ""
                }`}
                onClick={() => setSelectedAccount(account.id)}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{account.name}</CardTitle>
                      <CardDescription>{account.broker}</CardDescription>
                    </div>
                    <Badge
                      variant="outline"
                      className={`
                        ${account.status === "active" ? "bg-green-50 text-green-700 border-green-200" : ""}
                        ${account.status === "disconnected" ? "bg-red-50 text-red-700 border-red-200" : ""}
                      `}
                    >
                      {account.status.charAt(0).toUpperCase() + account.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Balance</p>
                      <p className="text-xl font-bold">{formatCurrency(account.balance, account.currency)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Equity</p>
                      <p className="text-xl font-bold">{formatCurrency(account.equity, account.currency)}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground">Account Number</p>
                    <p>{account.accountNumber || "N/A"}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedAccount && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">Account Details</h3>
                <Button variant="outline" onClick={handleSync} disabled={isSyncing}>
                  <RefreshCw className={`mr-2 h-4 w-4 ${isSyncing ? "animate-spin" : ""}`} />
                  {isSyncing ? "Syncing..." : "Sync Account"}
                </Button>
              </div>

              <Tabs defaultValue="trades">
                <TabsList>
                  <TabsTrigger value="trades">Trades</TabsTrigger>
                  <TabsTrigger value="performance">Performance</TabsTrigger>
                </TabsList>
                <TabsContent value="trades" className="mt-4">
                  {isLoading ? <Skeleton className="h-[400px] w-full" /> : <TradesTable trades={trades} />}
                </TabsContent>
                <TabsContent value="performance" className="mt-4">
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-center text-muted-foreground">Performance metrics will be available soon.</p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

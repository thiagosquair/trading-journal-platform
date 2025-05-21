"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BarChart3, Plus, RefreshCw, Settings, CheckCircle2 } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

interface TradingAccount {
  id: string
  name: string
  platform: string
  accountNumber: string
  balance: number
  equity: number
  currency: string
  leverage?: string
  status: string
  type?: string
  lastUpdated: string
  openPositions?: number
  server?: string
}

export default function TradingAccountsClient() {
  const [accounts, setAccounts] = useState<TradingAccount[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showSuccess, setShowSuccess] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Check if we just added a new account
    if (searchParams?.get("newAccount") === "true") {
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 5000)
    }
  }, [searchParams])

  // Add a separate useEffect for loading accounts that only runs once on mount
  useEffect(() => {
    loadAccounts()
    // Empty dependency array means this only runs once when component mounts
  }, [])

  const loadAccounts = () => {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call
      const savedAccounts = JSON.parse(localStorage.getItem("tradingAccounts") || "[]")
      setAccounts(savedAccounts)
    } catch (error) {
      console.error("Failed to load accounts:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getAccountTypeColor = (type?: string) => {
    switch (type) {
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

  const formatCurrency = (value: number, currency: string) => {
    return value.toLocaleString(undefined, {
      style: "currency",
      currency: currency || "USD",
      maximumFractionDigits: 2,
    })
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "mt4":
        return "💹"
      case "mt5":
        return "📊"
      case "ctrader":
        return "📈"
      case "dxtrade":
        return "📉"
      default:
        return "🔄"
    }
  }

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading trading accounts...</div>
  }

  return (
    <div className="space-y-6">
      {showSuccess && (
        <Alert>
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <AlertDescription>
            Account successfully connected! You can now view and monitor your trading activity.
          </AlertDescription>
        </Alert>
      )}

      {accounts.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No Trading Accounts</CardTitle>
            <CardDescription>You haven't connected any trading accounts yet.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Connect your trading accounts to track your performance and analyze your trades.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-3">
            <Button onClick={() => router.push("/trading-accounts/add-account")}>
              <Plus className="mr-2 h-4 w-4" />
              Add Trading Account
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-3xl font-bold tracking-tight">Trading Accounts</h1>
            <div className="flex gap-3">
              <Button variant="outline" onClick={loadAccounts} disabled={isLoading}>
                <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
              <Button onClick={() => router.push("/trading-accounts/add-account")}>
                <Plus className="mr-2 h-4 w-4" />
                Add Account
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            {accounts.map((account) => (
              <Card key={account.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{getPlatformIcon(account.platform)}</span>
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {account.name}
                          <Badge className={getAccountTypeColor(account.type)}>
                            {account.type ? account.type.charAt(0).toUpperCase() + account.type.slice(1) : "Unknown"}
                          </Badge>
                        </CardTitle>
                        <CardDescription>
                          {account.platform} • {account.server || "Server"} • Account #{account.accountNumber}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant={account.status === "active" ? "default" : "secondary"}>
                      {account.status === "active" ? "Active" : "Disconnected"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-3">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Balance</p>
                      <p className="text-2xl font-bold">{formatCurrency(account.balance, account.currency)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Equity</p>
                      <p className="text-2xl font-bold">{formatCurrency(account.equity, account.currency)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Last Updated</p>
                      <p className="text-base">
                        {new Date(account.lastUpdated).toLocaleString(undefined, {
                          dateStyle: "short",
                          timeStyle: "short",
                        })}
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t bg-muted/50 px-6 py-3">
                  <div className="flex flex-wrap gap-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => router.push(`/trading-accounts/${account.id}`)}
                      className="h-8"
                    >
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Dashboard
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => router.push(`/trading-accounts/${account.id}/live-monitor`)}
                      className="h-8"
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Live Monitor
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => router.push(`/trading-accounts/${account.id}/settings`)}
                      className="h-8"
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

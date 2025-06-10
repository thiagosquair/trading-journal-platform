"use client"

import { CardDescription } from "@/components/ui/card"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, AlertCircle, Loader2, TrendingUp, TrendingDown } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

interface AccountData {
  id: string
  name: string
  balance: number
  equity: number
  margin: number
  freeMargin: number
  marginLevel: number
  currency: string
  leverage: string
  server: string
  accountNumber: string
  type: string
  status: string
}

interface Position {
  id: string
  symbol: string
  type: string
  volume: number
  openPrice: number
  currentPrice: number
  profit: number
  swap: number
  commission: number
  openTime: string
  stopLoss?: number
  takeProfit?: number
}

interface Trade {
  id: string
  symbol: string
  type: string
  volume: number
  openPrice: number
  closePrice?: number
  profit?: number
  swap: number
  commission: number
  openTime: string
  closeTime?: string
  status: string
  comment?: string
}

export default function MatchTraderIntegrationTest() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    server: "",
    accountType: "demo",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [testResult, setTestResult] = useState<{
    success: boolean
    message?: string
  } | null>(null)
  const [accountData, setAccountData] = useState<AccountData | null>(null)
  const [positions, setPositions] = useState<Position[]>([])
  const [trades, setTrades] = useState<Trade[]>([])

  const handleLoadTestCredentials = () => {
    setCredentials({
      username: "matchtest",
      password: "matchpassword",
      server: "demo.match-trader.com",
      accountType: "demo",
    })
  }

  const handleTestConnection = async () => {
    setIsLoading(true)
    setTestResult(null)

    try {
      const response = await fetch("/api/matchtrader/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      })

      const result = await response.json()
      setTestResult(result)
    } catch (error) {
      setTestResult({
        success: false,
        message: "Connection test failed",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleConnect = async () => {
    setIsLoading(true)

    try {
      const response = await fetch("/api/matchtrader/connect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      })

      const result = await response.json()

      if (result.success) {
        setIsConnected(true)
        setAccountData(result.account)

        // Load mock positions and trades for demo
        setPositions([
          {
            id: "pos-1",
            symbol: "EURUSD",
            type: "buy",
            volume: 0.5,
            openPrice: 1.0825,
            currentPrice: 1.0875,
            profit: 250,
            swap: -2.5,
            commission: -5,
            openTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            stopLoss: 1.0775,
            takeProfit: 1.0925,
          },
          {
            id: "pos-2",
            symbol: "DAX40",
            type: "sell",
            volume: 0.1,
            openPrice: 18250.5,
            currentPrice: 18200.0,
            profit: 505,
            swap: 0,
            commission: -8,
            openTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            stopLoss: 18300.0,
            takeProfit: 18150.0,
          },
        ])

        setTrades([
          {
            id: "trade-1",
            symbol: "GBPUSD",
            type: "buy",
            volume: 0.3,
            openPrice: 1.265,
            closePrice: 1.272,
            profit: 210,
            swap: -1.5,
            commission: -6,
            openTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            closeTime: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            status: "closed",
            comment: "GBP strength trade",
          },
        ])
      } else {
        setTestResult({
          success: false,
          message: result.error || "Connection failed",
        })
      }
    } catch (error) {
      setTestResult({
        success: false,
        message: "Connection failed",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isConnected && accountData) {
    return (
      <div className="space-y-6">
        <Alert>
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>Connected Successfully!</AlertTitle>
          <AlertDescription>Your MatchTrader account is now connected and data has been loaded.</AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Account Overview
              <Badge variant="outline">{accountData.type.toUpperCase()}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Balance</p>
                <p className="text-2xl font-bold">{formatCurrency(accountData.balance, accountData.currency)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Equity</p>
                <p className="text-2xl font-bold">{formatCurrency(accountData.equity, accountData.currency)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Free Margin</p>
                <p className="text-2xl font-bold">{formatCurrency(accountData.freeMargin, accountData.currency)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Margin Level</p>
                <p className="text-2xl font-bold">{accountData.marginLevel.toFixed(2)}%</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Account:</span> {accountData.accountNumber}
                </div>
                <div>
                  <span className="text-muted-foreground">Server:</span> {accountData.server}
                </div>
                <div>
                  <span className="text-muted-foreground">Leverage:</span> {accountData.leverage}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="positions" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="positions">Open Positions ({positions.length})</TabsTrigger>
            <TabsTrigger value="trades">Trade History ({trades.length})</TabsTrigger>
            <TabsTrigger value="all">All Trades ({positions.length + trades.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="positions" className="space-y-4">
            {positions.map((position) => (
              <Card key={position.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold">{position.symbol}</span>
                        <Badge variant={position.type === "buy" ? "default" : "secondary"}>
                          {position.type.toUpperCase()}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{position.volume} lots</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Open: {position.openPrice} → Current: {position.currentPrice}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Opened: {new Date(position.openTime).toLocaleString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`text-lg font-bold flex items-center ${
                          position.profit >= 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {position.profit >= 0 ? (
                          <TrendingUp className="w-4 h-4 mr-1" />
                        ) : (
                          <TrendingDown className="w-4 h-4 mr-1" />
                        )}
                        {formatCurrency(position.profit, accountData.currency)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Swap: {formatCurrency(position.swap, accountData.currency)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="trades" className="space-y-4">
            {trades.map((trade) => (
              <Card key={trade.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold">{trade.symbol}</span>
                        <Badge variant={trade.type === "buy" ? "default" : "secondary"}>
                          {trade.type.toUpperCase()}
                        </Badge>
                        <Badge variant="outline">{trade.status.toUpperCase()}</Badge>
                        <span className="text-sm text-muted-foreground">{trade.volume} lots</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {trade.openPrice} → {trade.closePrice}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(trade.openTime).toLocaleString()} -{" "}
                        {trade.closeTime ? new Date(trade.closeTime).toLocaleString() : "Open"}
                      </div>
                      {trade.comment && <div className="text-sm text-muted-foreground italic">{trade.comment}</div>}
                    </div>
                    <div className="text-right">
                      <div
                        className={`text-lg font-bold flex items-center ${
                          (trade.profit || 0) >= 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {(trade.profit || 0) >= 0 ? (
                          <TrendingUp className="w-4 h-4 mr-1" />
                        ) : (
                          <TrendingDown className="w-4 h-4 mr-1" />
                        )}
                        {formatCurrency(trade.profit || 0, accountData.currency)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Swap: {formatCurrency(trade.swap, accountData.currency)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="all" className="space-y-4">
            {[...positions.map((p) => ({ ...p, status: "open" })), ...trades].map((item) => (
              <Card key={item.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold">{item.symbol}</span>
                        <Badge variant={item.type === "buy" ? "default" : "secondary"}>{item.type.toUpperCase()}</Badge>
                        <Badge variant={item.status === "open" ? "default" : "outline"}>
                          {item.status.toUpperCase()}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{item.volume} lots</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {item.openPrice} →{" "}
                        {item.status === "open" ? (item as Position).currentPrice : (item as Trade).closePrice}
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`text-lg font-bold flex items-center ${
                          (item.profit || 0) >= 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {(item.profit || 0) >= 0 ? (
                          <TrendingUp className="w-4 h-4 mr-1" />
                        ) : (
                          <TrendingDown className="w-4 h-4 mr-1" />
                        )}
                        {formatCurrency(item.profit || 0, accountData.currency)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>MatchTrader Connection Test</CardTitle>
        <CardDescription>Test your MatchTrader API connection with demo or live credentials</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={credentials.username}
              onChange={(e) => setCredentials((prev) => ({ ...prev, username: e.target.value }))}
              placeholder="Your MatchTrader username"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials((prev) => ({ ...prev, password: e.target.value }))}
              placeholder="Your MatchTrader password"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="server">Server</Label>
            <Input
              id="server"
              value={credentials.server}
              onChange={(e) => setCredentials((prev) => ({ ...prev, server: e.target.value }))}
              placeholder="e.g., demo.match-trader.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="accountType">Account Type</Label>
            <select
              id="accountType"
              value={credentials.accountType}
              onChange={(e) => setCredentials((prev) => ({ ...prev, accountType: e.target.value }))}
              className="w-full px-3 py-2 border border-input bg-background rounded-md"
            >
              <option value="demo">Demo</option>
              <option value="live">Live</option>
            </select>
          </div>
        </div>

        {testResult && (
          <Alert variant={testResult.success ? "default" : "destructive"}>
            {testResult.success ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
            <AlertTitle>{testResult.success ? "Success" : "Error"}</AlertTitle>
            <AlertDescription>{testResult.message}</AlertDescription>
          </Alert>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" onClick={handleLoadTestCredentials}>
            Load Test Credentials
          </Button>
          <Button variant="secondary" onClick={handleTestConnection} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Testing...
              </>
            ) : (
              "Test Connection"
            )}
          </Button>
          <Button onClick={handleConnect} disabled={isLoading || !testResult?.success}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              "Connect & Load Data"
            )}
          </Button>
        </div>

        <div className="text-sm text-muted-foreground">
          <p className="font-medium mb-2">Test Credentials:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>
              Username: <code>matchtest</code>
            </li>
            <li>
              Password: <code>matchpassword</code>
            </li>
            <li>
              Server: <code>demo.match-trader.com</code>
            </li>
            <li>Account Type: Demo</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { RefreshCw, AlertCircle, ArrowUpRight, ArrowDownRight, BarChart3, Download } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function MT4AccountDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [isSyncing, setIsSyncing] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  // Account data for the OANDA account - using correct values from MT4 screenshots
  const [accountData, setAccountData] = useState({
    id: "400929",
    name: "MT4 Vercel [OANDA-725]",
    broker: "OANDA",
    platform: "MetaTrader 4",
    server: "OANDA-Demo-1",
    login: "400929",
    status: "active",
    balance: 100000.0,
    equity: 100000.0,
    openPL: 0.0,
    margin: 0.0,
    freeMargin: 100000.0,
    marginLevel: 0.0,
    lastUpdated: "2025-05-18T15:29:22",
    currency: "USD",
  })

  // No open positions yet since this is a fresh account
  const [positions, setPositions] = useState([])

  // No closed trades yet since this is a fresh account
  const [closedTrades, setClosedTrades] = useState([])

  // Balance history for chart - just the initial deposit for now
  const [balanceHistory, setBalanceHistory] = useState([{ date: "May 18", balance: 100000.0 }])

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Simulate syncing
  const handleSync = () => {
    setIsSyncing(true)

    // For a fresh account, just update the timestamp
    setTimeout(() => {
      setAccountData({
        ...accountData,
        lastUpdated: new Date().toISOString(),
      })

      setIsSyncing(false)
    }, 2000)
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-6 space-y-8">
        <div className="animate-pulse">
          <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-96 bg-gray-200 rounded"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 animate-pulse">
            <div className="h-[200px] bg-gray-200 rounded"></div>
          </div>
          <div className="animate-pulse">
            <div className="h-[200px] bg-gray-200 rounded"></div>
          </div>
        </div>

        <div className="animate-pulse">
          <div className="h-[400px] bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{accountData.name}</h1>
          <p className="text-muted-foreground mt-1">
            Account #{accountData.login} • {accountData.broker} • {accountData.server}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleSync} disabled={isSyncing}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isSyncing ? "animate-spin" : ""}`} />
            {isSyncing ? "Syncing..." : "Sync Account"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>Account Overview</CardTitle>
            <CardDescription>Current balance and equity information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Balance</p>
                <p className="text-2xl font-bold">{formatCurrency(accountData.balance, accountData.currency)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Equity</p>
                <p className="text-2xl font-bold">{formatCurrency(accountData.equity, accountData.currency)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Open P/L</p>
                <p className={`text-2xl font-bold ${accountData.openPL >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {formatCurrency(accountData.openPL, accountData.currency)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Free Margin</p>
                <p className="text-2xl font-bold">{formatCurrency(accountData.freeMargin, accountData.currency)}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              <div>
                <p className="text-sm text-muted-foreground">Used Margin</p>
                <p className="font-medium">{formatCurrency(accountData.margin, accountData.currency)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Margin Level</p>
                <p className="font-medium">
                  {accountData.marginLevel === 0 ? "N/A" : `${accountData.marginLevel.toFixed(2)}%`}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last Updated</p>
                <p className="font-medium">{new Date(accountData.lastUpdated).toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Balance History</CardTitle>
            <CardDescription>Account balance</CardDescription>
          </CardHeader>
          <CardContent className="h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={balanceHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[99000, 101000]} />
                <Tooltip formatter={(value) => [`$${value}`, "Balance"]} />
                <Area type="monotone" dataKey="balance" stroke="#10b981" fill="#10b98133" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="positions">Open Positions</TabsTrigger>
          <TabsTrigger value="history">Trade History</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          <Alert className="bg-blue-50 border-blue-200">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-600">
              This is a new account with a starting balance of $100,000.00. No trading activity has been recorded yet.
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>Account Summary</CardTitle>
              <CardDescription>Initial deposit and account setup</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-md p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">Initial Deposit</h4>
                      <p className="text-sm text-muted-foreground">
                        {new Date(accountData.lastUpdated).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge className="bg-green-50 text-green-700 border-green-200">
                      +{formatCurrency(accountData.balance, accountData.currency)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Your account has been successfully set up with an initial balance of{" "}
                    {formatCurrency(accountData.balance, accountData.currency)}. You can now start trading on the MT4
                    platform.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>Next steps for your trading account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border rounded-md p-4">
                  <h4 className="font-medium mb-2">Place Your First Trade</h4>
                  <p className="text-sm text-muted-foreground">
                    Open the MT4 platform and place your first trade to start building your trading history.
                  </p>
                </div>
                <div className="border rounded-md p-4">
                  <h4 className="font-medium mb-2">Set Risk Parameters</h4>
                  <p className="text-sm text-muted-foreground">
                    Determine your risk management strategy before entering positions.
                  </p>
                </div>
                <div className="border rounded-md p-4">
                  <h4 className="font-medium mb-2">Track Performance</h4>
                  <p className="text-sm text-muted-foreground">
                    After placing trades, return here to track your performance and analyze results.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="positions" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Open Positions</CardTitle>
                <CardDescription>Active trades in your MT4 account</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </CardHeader>
            <CardContent>
              {positions.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ticket</TableHead>
                      <TableHead>Symbol</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Open Price</TableHead>
                      <TableHead>Current</TableHead>
                      <TableHead>SL</TableHead>
                      <TableHead>TP</TableHead>
                      <TableHead className="text-right">Swap</TableHead>
                      <TableHead className="text-right">P/L</TableHead>
                      <TableHead className="text-right">Pips</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {positions.map((position) => (
                      <TableRow key={position.id}>
                        <TableCell className="font-medium">{position.ticket}</TableCell>
                        <TableCell>{position.symbol}</TableCell>
                        <TableCell className={position.direction === "long" ? "text-green-600" : "text-red-600"}>
                          {position.direction === "long" ? (
                            <div className="flex items-center">
                              <ArrowUpRight className="h-4 w-4 mr-1" />
                              Buy
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <ArrowDownRight className="h-4 w-4 mr-1" />
                              Sell
                            </div>
                          )}
                        </TableCell>
                        <TableCell>{position.size}</TableCell>
                        <TableCell>{position.openPrice}</TableCell>
                        <TableCell>{position.currentPrice}</TableCell>
                        <TableCell>{position.stopLoss}</TableCell>
                        <TableCell>{position.takeProfit}</TableCell>
                        <TableCell className="text-right">{position.swap.toFixed(2)}</TableCell>
                        <TableCell className={`text-right ${position.profit >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {position.profit >= 0 ? "+" : ""}
                          {formatCurrency(position.profit, accountData.currency)}
                        </TableCell>
                        <TableCell
                          className={`text-right ${position.profitPips >= 0 ? "text-green-600" : "text-red-600"}`}
                        >
                          {position.profitPips >= 0 ? "+" : ""}
                          {position.profitPips}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8">
                  <div className="mx-auto rounded-full bg-muted w-12 h-12 flex items-center justify-center mb-4">
                    <AlertCircle className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium">No Open Positions</h3>
                  <p className="text-muted-foreground mt-1 mb-4 max-w-md mx-auto">
                    You don't have any open positions yet. Open the MT4 platform to place your first trade.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Trade History</CardTitle>
                <CardDescription>Closed trades from your MT4 account</CardDescription>
              </div>
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Period
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Select Period</DropdownMenuLabel>
                    <DropdownMenuItem>Today</DropdownMenuItem>
                    <DropdownMenuItem>This Week</DropdownMenuItem>
                    <DropdownMenuItem>This Month</DropdownMenuItem>
                    <DropdownMenuItem>Last 3 Months</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>All Time</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {closedTrades.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ticket</TableHead>
                      <TableHead>Symbol</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Open Time</TableHead>
                      <TableHead>Close Time</TableHead>
                      <TableHead>Open Price</TableHead>
                      <TableHead>Close Price</TableHead>
                      <TableHead className="text-right">Swap</TableHead>
                      <TableHead className="text-right">P/L</TableHead>
                      <TableHead className="text-right">Pips</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {closedTrades.map((trade) => (
                      <TableRow key={trade.id}>
                        <TableCell className="font-medium">{trade.ticket}</TableCell>
                        <TableCell>{trade.symbol}</TableCell>
                        <TableCell className={trade.direction === "long" ? "text-green-600" : "text-red-600"}>
                          {trade.direction === "long" ? (
                            <div className="flex items-center">
                              <ArrowUpRight className="h-4 w-4 mr-1" />
                              Buy
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <ArrowDownRight className="h-4 w-4 mr-1" />
                              Sell
                            </div>
                          )}
                        </TableCell>
                        <TableCell>{trade.size}</TableCell>
                        <TableCell>{new Date(trade.openDate).toLocaleString()}</TableCell>
                        <TableCell>{new Date(trade.closeDate).toLocaleString()}</TableCell>
                        <TableCell>{trade.openPrice}</TableCell>
                        <TableCell>{trade.closePrice}</TableCell>
                        <TableCell className="text-right">{trade.swap.toFixed(2)}</TableCell>
                        <TableCell className={`text-right ${trade.profit >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {trade.profit >= 0 ? "+" : ""}
                          {formatCurrency(trade.profit, accountData.currency)}
                        </TableCell>
                        <TableCell
                          className={`text-right ${trade.profitPips >= 0 ? "text-green-600" : "text-red-600"}`}
                        >
                          {trade.profitPips >= 0 ? "+" : ""}
                          {trade.profitPips}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8">
                  <div className="mx-auto rounded-full bg-muted w-12 h-12 flex items-center justify-center mb-4">
                    <AlertCircle className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium">No Trade History</h3>
                  <p className="text-muted-foreground mt-1 mb-4 max-w-md mx-auto">
                    You haven't closed any trades yet. Your trade history will appear here once you've completed some
                    trades.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="mt-6">
          <Alert className="bg-blue-50 border-blue-200 mb-6">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-600">
              Performance metrics will be available after you've completed some trades. Start trading to see detailed
              analytics.
            </AlertDescription>
          </Alert>
          <Card>
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
              <CardDescription>High-level performance metrics for your account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium">Ready to Start Trading</h3>
                <p className="text-muted-foreground mt-1 mb-4 max-w-md mx-auto">
                  Your account is set up with {formatCurrency(accountData.balance, accountData.currency)}. As you start
                  trading, we'll analyze your performance and provide detailed insights and metrics.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

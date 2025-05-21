"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { RefreshCw, ArrowLeft, BarChart3, Download, AlertCircle } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// Mock data for the MT4 demo account
const accountData = {
  id: "mt4-demo",
  name: "OANDA MT4 Demo",
  broker: "OANDA",
  platform: "MetaTrader 4",
  server: "OANDA-Demo-1",
  login: "7890179",
  status: "active",
  balance: 10247.35,
  equity: 10389.62,
  openPL: 142.27,
  margin: 520.15,
  freeMargin: 9869.47,
  marginLevel: 1997.56,
  lastUpdated: new Date().toISOString(),
  currency: "USD",
}

// Mock trades for the MT4 demo account
const tradesData = [
  {
    id: "t1",
    ticket: "12345678",
    symbol: "EURUSD",
    direction: "long",
    openDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    openPrice: 1.0875,
    size: 0.5,
    status: "open",
    currentPrice: 1.0923,
    stopLoss: 1.0825,
    takeProfit: 1.0975,
    profit: 24.0,
    profitPips: 48,
    tags: ["trend", "breakout"],
  },
  {
    id: "t2",
    ticket: "12345679",
    symbol: "GBPUSD",
    direction: "short",
    openDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    openPrice: 1.265,
    size: 0.3,
    status: "open",
    currentPrice: 1.2598,
    stopLoss: 1.27,
    takeProfit: 1.255,
    profit: 15.6,
    profitPips: 52,
    tags: ["resistance", "reversal"],
  },
  {
    id: "t3",
    ticket: "12345675",
    symbol: "USDJPY",
    direction: "long",
    openDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    openPrice: 149.25,
    size: 0.2,
    status: "open",
    currentPrice: 148.75,
    stopLoss: 148.5,
    takeProfit: 150.25,
    profit: -10.0,
    profitPips: -50,
    tags: ["support", "bounce"],
  },
  {
    id: "t4",
    ticket: "12345671",
    symbol: "EURUSD",
    direction: "long",
    openDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    closeDate: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    openPrice: 1.0825,
    closePrice: 1.0897,
    size: 0.5,
    status: "closed",
    profit: 36.0,
    profitPips: 72,
    tags: ["trend", "pullback"],
  },
  {
    id: "t5",
    ticket: "12345672",
    symbol: "GBPUSD",
    direction: "short",
    openDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    closeDate: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    openPrice: 1.2725,
    closePrice: 1.268,
    size: 0.4,
    status: "closed",
    profit: 18.0,
    profitPips: 45,
    tags: ["news", "gbp"],
  },
  {
    id: "t6",
    ticket: "12345673",
    symbol: "USDJPY",
    direction: "short",
    openDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    closeDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    openPrice: 150.5,
    closePrice: 151.25,
    size: 0.3,
    status: "closed",
    profit: -22.5,
    profitPips: -75,
    tags: ["resistance", "failed"],
  },
  {
    id: "t7",
    ticket: "12345674",
    symbol: "AUDUSD",
    direction: "long",
    openDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    closeDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    openPrice: 0.6525,
    closePrice: 0.658,
    size: 0.5,
    status: "closed",
    profit: 27.5,
    profitPips: 55,
    tags: ["support", "bounce"],
  },
  {
    id: "t8",
    ticket: "12345676",
    symbol: "XAUUSD",
    direction: "long",
    openDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    closeDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    openPrice: 2325.5,
    closePrice: 2342.75,
    size: 0.05,
    status: "closed",
    profit: 86.25,
    profitPips: 1725,
    tags: ["gold", "trend"],
  },
]

// Performance data
const performanceData = {
  totalTrades: 8,
  winningTrades: 5,
  losingTrades: 3,
  winRate: 62.5,
  profitFactor: 2.35,
  totalProfit: 175.85,
  averageWin: 41.87,
  averageLoss: -16.17,
  largestWin: 86.25,
  largestLoss: -22.5,
  averageHoldingTime: "2.1 days",
  sharpeRatio: 1.85,
  drawdown: {
    current: 0,
    maximum: 32.5,
    percentage: 0.32,
  },
}

// Balance history for chart
const balanceHistory = [
  { date: "May 1", balance: 10000 },
  { date: "May 2", balance: 10025 },
  { date: "May 3", balance: 10018 },
  { date: "May 4", balance: 10045 },
  { date: "May 5", balance: 10075 },
  { date: "May 6", balance: 10062 },
  { date: "May 7", balance: 10095 },
  { date: "May 8", balance: 10120 },
  { date: "May 9", balance: 10105 },
  { date: "May 10", balance: 10145 },
  { date: "May 11", balance: 10175 },
  { date: "May 12", balance: 10168 },
  { date: "May 13", balance: 10195 },
  { date: "May 14", balance: 10215 },
  { date: "May 15", balance: 10247.35 },
]

// Monthly performance for chart
const monthlyPerformance = [
  { month: "Jan", profit: 0 },
  { month: "Feb", profit: 0 },
  { month: "Mar", profit: 0 },
  { month: "Apr", profit: 0 },
  { month: "May", profit: 247.35 },
]

export default function MT4AccountShowcase() {
  const [isSyncing, setIsSyncing] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  const handleSync = () => {
    setIsSyncing(true)
    // Simulate sync delay
    setTimeout(() => {
      setIsSyncing(false)
    }, 2000)
  }

  // Pie chart colors
  const COLORS = ["#10b981", "#ef4444"]

  // Pie chart data
  const pieData = [
    { name: "Winning Trades", value: performanceData.winningTrades },
    { name: "Losing Trades", value: performanceData.losingTrades },
  ]

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">{accountData.name}</h1>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Active
          </Badge>
        </div>
        <Button variant="outline" onClick={handleSync} disabled={isSyncing}>
          <RefreshCw className={`mr-2 h-4 w-4 ${isSyncing ? "animate-spin" : ""}`} />
          {isSyncing ? "Syncing..." : "Sync Account"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Account Overview</CardTitle>
                <CardDescription>
                  {accountData.broker} • {accountData.platform} • Server: {accountData.server}
                </CardDescription>
              </div>
            </div>
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
                <p className="text-sm text-muted-foreground">Margin Level</p>
                <p className="text-2xl font-bold">{accountData.marginLevel.toFixed(2)}%</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div>
                <p className="text-sm text-muted-foreground">Used Margin</p>
                <p className="font-medium">{formatCurrency(accountData.margin, accountData.currency)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Free Margin</p>
                <p className="font-medium">{formatCurrency(accountData.freeMargin, accountData.currency)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Login ID</p>
                <p className="font-medium">{accountData.login}</p>
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
            <CardDescription>Account balance over time</CardDescription>
          </CardHeader>
          <CardContent className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={balanceHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={["dataMin - 100", "dataMax + 100"]} />
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
          <TabsTrigger value="trades">Trades</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="journal">Journal</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Open Positions</CardTitle>
                <CardDescription>Currently active trades</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tradesData
                    .filter((trade) => trade.status === "open")
                    .map((trade) => (
                      <div key={trade.id} className="border rounded-md p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium">{trade.symbol}</h4>
                            <p className={`text-sm ${trade.direction === "long" ? "text-green-600" : "text-red-600"}`}>
                              {trade.direction === "long" ? "Buy" : "Sell"} • {trade.size} lots
                            </p>
                          </div>
                          <Badge
                            className={`${
                              trade.profit >= 0
                                ? "bg-green-50 text-green-700 border-green-200"
                                : "bg-red-50 text-red-700 border-red-200"
                            }`}
                          >
                            {trade.profit >= 0 ? "+" : ""}
                            {formatCurrency(trade.profit, accountData.currency)} ({trade.profitPips} pips)
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <div>
                            <p className="text-muted-foreground">Open</p>
                            <p>{trade.openPrice}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Current</p>
                            <p>{trade.currentPrice}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">SL/TP</p>
                            <p>
                              {trade.stopLoss} / {trade.takeProfit}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest closed trades</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tradesData
                    .filter((trade) => trade.status === "closed")
                    .slice(0, 3)
                    .map((trade) => (
                      <div key={trade.id} className="border rounded-md p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium">{trade.symbol}</h4>
                            <p className={`text-sm ${trade.direction === "long" ? "text-green-600" : "text-red-600"}`}>
                              {trade.direction === "long" ? "Buy" : "Sell"} • {trade.size} lots
                            </p>
                          </div>
                          <Badge
                            className={`${
                              trade.profit >= 0
                                ? "bg-green-50 text-green-700 border-green-200"
                                : "bg-red-50 text-red-700 border-red-200"
                            }`}
                          >
                            {trade.profit >= 0 ? "+" : ""}
                            {formatCurrency(trade.profit, accountData.currency)} ({trade.profitPips} pips)
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <div>
                            <p className="text-muted-foreground">Open</p>
                            <p>{trade.openPrice}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Close</p>
                            <p>{trade.closePrice}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Date</p>
                            <p>{new Date(trade.closeDate || "").toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Trades
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Performance Summary</CardTitle>
              <CardDescription>Key metrics for your trading account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Win Rate</h4>
                  <p className="text-2xl font-bold">{performanceData.winRate}%</p>
                  <p className="text-sm text-muted-foreground">
                    {performanceData.winningTrades} wins, {performanceData.losingTrades} losses
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Profit Factor</h4>
                  <p className="text-2xl font-bold">{performanceData.profitFactor.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">Gross profit / Gross loss</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Total Profit</h4>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(performanceData.totalProfit, accountData.currency)}
                  </p>
                  <p className="text-sm text-muted-foreground">From {performanceData.totalTrades} trades</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Max Drawdown</h4>
                  <p className="text-2xl font-bold text-amber-600">
                    {formatCurrency(performanceData.drawdown.maximum, accountData.currency)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {(performanceData.drawdown.percentage * 100).toFixed(2)}% of balance
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trades" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Trading History</CardTitle>
                <CardDescription>All trades for your MT4 account</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ticket</TableHead>
                      <TableHead>Symbol</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Open Date</TableHead>
                      <TableHead>Close Date</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Open Price</TableHead>
                      <TableHead>Close Price</TableHead>
                      <TableHead className="text-right">Profit/Loss</TableHead>
                      <TableHead className="text-right">Pips</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tradesData.map((trade) => (
                      <TableRow key={trade.id}>
                        <TableCell className="font-medium">{trade.ticket}</TableCell>
                        <TableCell>{trade.symbol}</TableCell>
                        <TableCell className={trade.direction === "long" ? "text-green-600" : "text-red-600"}>
                          {trade.direction === "long" ? "Buy" : "Sell"}
                        </TableCell>
                        <TableCell>{new Date(trade.openDate).toLocaleDateString()}</TableCell>
                        <TableCell>{trade.closeDate ? new Date(trade.closeDate).toLocaleDateString() : "-"}</TableCell>
                        <TableCell>{trade.size}</TableCell>
                        <TableCell>{trade.openPrice}</TableCell>
                        <TableCell>
                          {trade.closePrice || (trade.status === "open" ? trade.currentPrice : "-")}
                        </TableCell>
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
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              trade.status === "open"
                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                : "bg-gray-50 text-gray-700 border-gray-200"
                            }
                          >
                            {trade.status.charAt(0).toUpperCase() + trade.status.slice(1)}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Monthly Performance</CardTitle>
                <CardDescription>Profit/loss by month</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      formatter={(value: number) => [`${formatCurrency(value, accountData.currency)}`, "Profit/Loss"]}
                      labelFormatter={(label) => `Month: ${label}`}
                    />
                    <Bar
                      dataKey="profit"
                      fill="#10b981"
                      name="Profit/Loss"
                      // @ts-ignore - recharts types are incorrect
                      fill={(entry: any) => (entry.profit >= 0 ? "#10b981" : "#ef4444")}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Win/Loss Ratio</CardTitle>
                <CardDescription>Distribution of trades</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => [value, "Trades"]} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Profit Metrics</CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Profit</p>
                      <p className="text-lg font-medium text-green-600">
                        {formatCurrency(performanceData.totalProfit, accountData.currency)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Average Win</p>
                      <p className="text-lg font-medium text-green-600">
                        {formatCurrency(performanceData.averageWin, accountData.currency)}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Average Loss</p>
                      <p className="text-lg font-medium text-red-600">
                        {formatCurrency(performanceData.averageLoss, accountData.currency)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Largest Win</p>
                      <p className="text-lg font-medium text-green-600">
                        {formatCurrency(performanceData.largestWin, accountData.currency)}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Largest Loss</p>
                      <p className="text-lg font-medium text-red-600">
                        {formatCurrency(performanceData.largestLoss, accountData.currency)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Profit Factor</p>
                      <p className="text-lg font-medium">{performanceData.profitFactor.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Trade Statistics</CardTitle>
                <CardDescription>Analysis of your trading activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Trades</p>
                    <p className="text-lg font-medium">{performanceData.totalTrades}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Winning Trades</p>
                      <p className="text-lg font-medium">
                        {performanceData.winningTrades} ({performanceData.winRate.toFixed(1)}%)
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Losing Trades</p>
                      <p className="text-lg font-medium">
                        {performanceData.losingTrades} ({(100 - performanceData.winRate).toFixed(1)}%)
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Average Holding Time</p>
                    <p className="text-lg font-medium">{performanceData.averageHoldingTime}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Sharpe Ratio</p>
                    <p className="text-lg font-medium">{performanceData.sharpeRatio.toFixed(2)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="journal" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Trading Journal</CardTitle>
              <CardDescription>Your notes and observations</CardDescription>
            </CardHeader>
            <CardContent>
              <Alert className="bg-blue-50 border-blue-200 mb-6">
                <AlertCircle className="h-4 w-4 text-blue-600" />
                <AlertDescription>
                  The trading journal feature allows you to add notes to your trades and track your trading psychology.
                  This feature is coming soon.
                </AlertDescription>
              </Alert>
              <div className="text-center py-8">
                <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium">Journal Feature Coming Soon</h3>
                <p className="text-muted-foreground mt-1 mb-4 max-w-md mx-auto">
                  You'll be able to add notes to your trades, track your emotions, and identify patterns in your trading
                  behavior.
                </p>
                <Button variant="outline" disabled>
                  Create Journal Entry
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

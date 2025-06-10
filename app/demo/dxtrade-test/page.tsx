"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, RefreshCw, TrendingUp, DollarSign, Activity } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

// Mock data that would come from the DXtrade API
const mockDemoAccount = {
  id: "dxtrade-DX123456",
  name: "DXtrade Demo Account",
  platform: "DXtrade",
  broker: "DXtrade Demo",
  accountNumber: "DX123456",
  balance: 10000,
  equity: 10250,
  openPL: 250,
  currency: "USD",
  leverage: "1:100",
  status: "active",
  lastUpdated: new Date().toISOString(),
  openPositions: 2,
  server: "DXtrade Demo",
  type: "demo",
}

const mockTrades = [
  {
    id: "p789012",
    accountId: "dxtrade-DX123456",
    symbol: "EURUSD",
    direction: "long",
    openDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    closeDate: null,
    openPrice: 1.085,
    closePrice: null,
    size: 0.5,
    profit: 25,
    profitPercent: 2.3,
    status: "open",
    stopLoss: 1.08,
    takeProfit: 1.09,
    tags: ["dxtrade", "eurusd"],
  },
  {
    id: "p789013",
    accountId: "dxtrade-DX123456",
    symbol: "USDJPY",
    direction: "short",
    openDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    closeDate: null,
    openPrice: 154.5,
    closePrice: null,
    size: 0.3,
    profit: -15,
    profitPercent: -0.6,
    status: "open",
    stopLoss: 155.0,
    takeProfit: 153.5,
    tags: ["dxtrade", "usdjpy"],
  },
  {
    id: "o789012",
    accountId: "dxtrade-DX123456",
    symbol: "EURUSD",
    direction: "long",
    openDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    closeDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    openPrice: 1.08,
    closePrice: 1.085,
    size: 0.5,
    profit: 25,
    profitPercent: 4.6,
    status: "closed",
    stopLoss: 1.075,
    takeProfit: 1.09,
    tags: ["dxtrade", "eurusd"],
  },
]

export default function DXtradeTestDemo() {
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isSyncing, setIsSyncing] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleConnect = async () => {
    setIsConnecting(true)
    // Simulate API connection
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsConnecting(false)
    setIsConnected(true)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 5000)
  }

  const handleSync = async () => {
    setIsSyncing(true)
    // Simulate API sync
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSyncing(false)
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">DXtrade Integration Test</h1>
        <p className="text-muted-foreground">
          This demonstrates the DXtrade integration with demo account connection and data fetching.
        </p>
      </div>

      {showSuccess && (
        <Alert variant="default" className="bg-green-50 text-green-800 border-green-200">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>Successfully connected DXtrade Demo Account</AlertDescription>
        </Alert>
      )}

      {!isConnected ? (
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Connect Demo Account</CardTitle>
            <CardDescription>Connect to the DXtrade demo account with test credentials</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                <strong>Login:</strong> dxtest
              </p>
              <p>
                <strong>Password:</strong> dxpassword
              </p>
              <p>
                <strong>Server:</strong> Demo
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleConnect} disabled={isConnecting} className="w-full">
              {isConnecting ? "Connecting..." : "Connect Demo Account"}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Account Overview */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{mockDemoAccount.name}</CardTitle>
                  <CardDescription>{mockDemoAccount.broker}</CardDescription>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Active
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Balance</p>
                    <p className="text-xl font-bold">
                      {formatCurrency(mockDemoAccount.balance, mockDemoAccount.currency)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Equity</p>
                    <p className="text-xl font-bold">
                      {formatCurrency(mockDemoAccount.equity, mockDemoAccount.currency)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Activity className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Open P&L</p>
                    <p
                      className={`text-xl font-bold ${mockDemoAccount.openPL >= 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      {formatCurrency(mockDemoAccount.openPL, mockDemoAccount.currency)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Account Number</p>
                    <p className="font-medium">{mockDemoAccount.accountNumber}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Leverage</p>
                    <p className="font-medium">{mockDemoAccount.leverage}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Actions */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Account Data</h2>
            <Button variant="outline" onClick={handleSync} disabled={isSyncing}>
              <RefreshCw className={`mr-2 h-4 w-4 ${isSyncing ? "animate-spin" : ""}`} />
              {isSyncing ? "Syncing..." : "Sync Account"}
            </Button>
          </div>

          {/* Trades Table */}
          <Tabs defaultValue="trades">
            <TabsList>
              <TabsTrigger value="trades">All Trades ({mockTrades.length})</TabsTrigger>
              <TabsTrigger value="open">
                Open Positions ({mockTrades.filter((t) => t.status === "open").length})
              </TabsTrigger>
              <TabsTrigger value="closed">
                Closed Trades ({mockTrades.filter((t) => t.status === "closed").length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="trades" className="mt-4">
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b">
                        <tr className="text-left">
                          <th className="p-4 font-medium">Symbol</th>
                          <th className="p-4 font-medium">Direction</th>
                          <th className="p-4 font-medium">Size</th>
                          <th className="p-4 font-medium">Open Price</th>
                          <th className="p-4 font-medium">Close Price</th>
                          <th className="p-4 font-medium">Profit</th>
                          <th className="p-4 font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockTrades.map((trade) => (
                          <tr key={trade.id} className="border-b hover:bg-muted/50">
                            <td className="p-4 font-medium">{trade.symbol}</td>
                            <td className="p-4">
                              <Badge variant={trade.direction === "long" ? "default" : "secondary"}>
                                {trade.direction.toUpperCase()}
                              </Badge>
                            </td>
                            <td className="p-4">{trade.size}</td>
                            <td className="p-4">{trade.openPrice}</td>
                            <td className="p-4">{trade.closePrice || "-"}</td>
                            <td className="p-4">
                              <span className={trade.profit && trade.profit >= 0 ? "text-green-600" : "text-red-600"}>
                                {formatCurrency(trade.profit || 0, "USD")}
                              </span>
                            </td>
                            <td className="p-4">
                              <Badge variant={trade.status === "open" ? "outline" : "secondary"}>
                                {trade.status.toUpperCase()}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="open" className="mt-4">
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b">
                        <tr className="text-left">
                          <th className="p-4 font-medium">Symbol</th>
                          <th className="p-4 font-medium">Direction</th>
                          <th className="p-4 font-medium">Size</th>
                          <th className="p-4 font-medium">Open Price</th>
                          <th className="p-4 font-medium">Stop Loss</th>
                          <th className="p-4 font-medium">Take Profit</th>
                          <th className="p-4 font-medium">Profit</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockTrades
                          .filter((t) => t.status === "open")
                          .map((trade) => (
                            <tr key={trade.id} className="border-b hover:bg-muted/50">
                              <td className="p-4 font-medium">{trade.symbol}</td>
                              <td className="p-4">
                                <Badge variant={trade.direction === "long" ? "default" : "secondary"}>
                                  {trade.direction.toUpperCase()}
                                </Badge>
                              </td>
                              <td className="p-4">{trade.size}</td>
                              <td className="p-4">{trade.openPrice}</td>
                              <td className="p-4">{trade.stopLoss || "-"}</td>
                              <td className="p-4">{trade.takeProfit || "-"}</td>
                              <td className="p-4">
                                <span className={trade.profit && trade.profit >= 0 ? "text-green-600" : "text-red-600"}>
                                  {formatCurrency(trade.profit || 0, "USD")}
                                </span>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="closed" className="mt-4">
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b">
                        <tr className="text-left">
                          <th className="p-4 font-medium">Symbol</th>
                          <th className="p-4 font-medium">Direction</th>
                          <th className="p-4 font-medium">Size</th>
                          <th className="p-4 font-medium">Open Price</th>
                          <th className="p-4 font-medium">Close Price</th>
                          <th className="p-4 font-medium">Profit</th>
                          <th className="p-4 font-medium">Profit %</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockTrades
                          .filter((t) => t.status === "closed")
                          .map((trade) => (
                            <tr key={trade.id} className="border-b hover:bg-muted/50">
                              <td className="p-4 font-medium">{trade.symbol}</td>
                              <td className="p-4">
                                <Badge variant={trade.direction === "long" ? "default" : "secondary"}>
                                  {trade.direction.toUpperCase()}
                                </Badge>
                              </td>
                              <td className="p-4">{trade.size}</td>
                              <td className="p-4">{trade.openPrice}</td>
                              <td className="p-4">{trade.closePrice}</td>
                              <td className="p-4">
                                <span className={trade.profit && trade.profit >= 0 ? "text-green-600" : "text-red-600"}>
                                  {formatCurrency(trade.profit || 0, "USD")}
                                </span>
                              </td>
                              <td className="p-4">
                                <span
                                  className={
                                    trade.profitPercent && trade.profitPercent >= 0 ? "text-green-600" : "text-red-600"
                                  }
                                >
                                  {trade.profitPercent ? `${trade.profitPercent}%` : "-"}
                                </span>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}

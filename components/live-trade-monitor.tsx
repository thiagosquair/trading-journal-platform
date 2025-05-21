"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RefreshCw, AlertTriangle, Wifi, WifiOff } from "lucide-react"

interface Trade {
  id: string
  symbol: string
  direction: "long" | "short"
  openPrice: number
  currentPrice?: number
  openTime: string
  size: number
  profit: number
  status: "open" | "closed"
  stopLoss?: number | null
  takeProfit?: number | null
}

interface LiveTradeMonitorProps {
  accountId: string
  platform: string
}

export function LiveTradeMonitor({ accountId, platform }: LiveTradeMonitorProps) {
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSyncing, setIsSyncing] = useState(false)
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(null)
  const [statusMessage, setStatusMessage] = useState("")
  const [trades, setTrades] = useState<Trade[]>([])

  const checkConnectionStatus = useCallback(async () => {
    try {
      setIsLoading(true)

      // Simulate API call to check connection status
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demo purposes, randomly determine if connected
      const connected = Math.random() > 0.3
      setIsConnected(connected)

      if (connected) {
        setLastSyncTime(new Date().toISOString())
        setStatusMessage("Connected to trading platform")

        // Simulate trades data
        const mockTrades: Trade[] = [
          {
            id: "t1",
            symbol: "EURUSD",
            direction: "long",
            openPrice: 1.0865,
            currentPrice: 1.0872,
            openTime: new Date().toISOString(),
            size: 0.5,
            profit: 3.5,
            status: "open",
            stopLoss: 1.0845,
            takeProfit: 1.0895,
          },
          {
            id: "t2",
            symbol: "GBPUSD",
            direction: "short",
            openPrice: 1.265,
            currentPrice: 1.2645,
            openTime: new Date().toISOString(),
            size: 0.3,
            profit: 1.5,
            status: "open",
            stopLoss: 1.267,
            takeProfit: 1.26,
          },
        ]
        setTrades(mockTrades)
      } else {
        setStatusMessage("Not connected to trading platform")
        setTrades([])
      }
    } catch (error) {
      console.error("Error checking connection status:", error)
      setIsConnected(false)
      setStatusMessage("Error checking connection")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    checkConnectionStatus()

    // Set up polling for live updates
    const interval = setInterval(() => {
      if (!isSyncing) {
        checkConnectionStatus()
      }
    }, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [checkConnectionStatus, isSyncing])

  const handleSync = async () => {
    try {
      setIsSyncing(true)

      // Simulate sync process
      await new Promise((resolve) => setTimeout(resolve, 2000))

      await checkConnectionStatus()
    } catch (error) {
      console.error("Error syncing account:", error)
      setStatusMessage("Error syncing account")
    } finally {
      setIsSyncing(false)
    }
  }

  const getDirectionColor = (direction: string) => {
    return direction === "long" ? "text-green-600" : "text-red-600"
  }

  const getProfitColor = (profit: number) => {
    return profit >= 0 ? "text-green-600" : "text-red-600"
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Live Monitor</h2>
          <p className="text-muted-foreground">Real-time monitoring of your trading account</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={checkConnectionStatus} disabled={isLoading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button onClick={handleSync} disabled={isSyncing || !isConnected}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isSyncing ? "animate-spin" : ""}`} />
            {isSyncing ? "Syncing..." : "Sync Now"}
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Connection Status</CardTitle>
            <Badge variant={isConnected ? "default" : "secondary"}>
              {isConnected ? (
                <span className="flex items-center">
                  <Wifi className="mr-1 h-3 w-3" /> Connected
                </span>
              ) : (
                <span className="flex items-center">
                  <WifiOff className="mr-1 h-3 w-3" /> Disconnected
                </span>
              )}
            </Badge>
          </div>
          <CardDescription>
            {statusMessage}
            {lastSyncTime && (
              <span className="block mt-1">Last updated: {new Date(lastSyncTime).toLocaleString()}</span>
            )}
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="open-trades">
        <TabsList>
          <TabsTrigger value="open-trades">Open Trades</TabsTrigger>
          <TabsTrigger value="account-info">Account Info</TabsTrigger>
          <TabsTrigger value="trade-history">Trade History</TabsTrigger>
        </TabsList>

        <TabsContent value="open-trades" className="space-y-4 mt-4">
          {isConnected ? (
            trades.length > 0 ? (
              trades.map((trade) => (
                <Card key={trade.id}>
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{trade.symbol}</h3>
                          <Badge variant="outline" className={getDirectionColor(trade.direction)}>
                            {trade.direction.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Opened: {new Date(trade.openTime).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className={`font-bold ${getProfitColor(trade.profit)}`}>
                          {trade.profit > 0 ? "+" : ""}
                          {trade.profit.toFixed(2)} USD
                        </span>
                        <span className="text-sm">
                          {trade.size} lots @ {trade.openPrice}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Current Price</p>
                        <p>{trade.currentPrice}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Stop Loss</p>
                        <p>{trade.stopLoss || "None"}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Take Profit</p>
                        <p>{trade.takeProfit || "None"}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <p>No open trades found</p>
                </CardContent>
              </Card>
            )
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <AlertTriangle className="h-8 w-8 text-amber-500 mx-auto mb-2" />
                <p>Not connected to trading platform</p>
                <p className="text-sm text-muted-foreground mt-1">Please check your connection or try again later</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="account-info" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <p className="text-center text-muted-foreground">
                Account information will be displayed here when connected
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trade-history" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <p className="text-center text-muted-foreground">Trade history will be displayed here when connected</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

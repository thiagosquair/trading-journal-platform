"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, XCircle, AlertTriangle, RefreshCw, Clock, Database, Shield, Zap, Info } from "lucide-react"
import { getConnectionStatus, syncTradingAccount, disconnectTradingAccount } from "@/lib/trading-actions"
import type { ConnectionStatus } from "@/lib/platforms/platform-adapter"

interface PlatformConnectionStatusProps {
  accountId: string
  platform: string
  name: string
  onSync?: () => void
  onDisconnect?: () => void
}

export function PlatformConnectionStatus({
  accountId,
  platform,
  name,
  onSync,
  onDisconnect,
}: PlatformConnectionStatusProps) {
  const [status, setStatus] = useState<ConnectionStatus | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSyncing, setIsSyncing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Format the last sync time
  const formatLastSyncTime = (timeString?: string) => {
    if (!timeString) return "Never"

    const syncTime = new Date(timeString)
    const now = new Date()
    const diffMs = now.getTime() - syncTime.getTime()
    const diffMins = Math.floor(diffMs / 60000)

    if (diffMins < 1) return "Just now"
    if (diffMins < 60) return `${diffMins} minute${diffMins === 1 ? "" : "s"} ago`

    const diffHours = Math.floor(diffMins / 60)
    if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`

    const diffDays = Math.floor(diffHours / 24)
    return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`
  }

  // Get connection status
  const fetchConnectionStatus = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const connectionStatus = await getConnectionStatus(accountId)
      setStatus(connectionStatus)
    } catch (err: any) {
      setError(err.message || "Failed to get connection status")
    } finally {
      setIsLoading(false)
    }
  }

  // Sync account data
  const handleSync = async () => {
    try {
      setIsSyncing(true)
      setError(null)

      await syncTradingAccount(accountId)
      await fetchConnectionStatus()

      if (onSync) onSync()
    } catch (err: any) {
      setError(err.message || "Failed to sync account data")
    } finally {
      setIsSyncing(false)
    }
  }

  // Disconnect account
  const handleDisconnect = async () => {
    try {
      setIsLoading(true)
      setError(null)

      await disconnectTradingAccount(accountId)

      if (onDisconnect) onDisconnect()
    } catch (err: any) {
      setError(err.message || "Failed to disconnect account")
      setIsLoading(false)
    }
  }

  // Fetch connection status on mount
  useEffect(() => {
    fetchConnectionStatus()

    // Poll for status updates every 30 seconds
    const interval = setInterval(fetchConnectionStatus, 30000)

    return () => clearInterval(interval)
  }, [accountId])

  // Get status badge
  const getStatusBadge = () => {
    if (!status) return <Badge variant="outline">Unknown</Badge>

    if (status.connected) {
      return <Badge className="bg-green-500">Connected</Badge>
    } else {
      return <Badge variant="destructive">Disconnected</Badge>
    }
  }

  // Get status icon
  const getStatusIcon = () => {
    if (!status) return <AlertTriangle className="h-8 w-8 text-yellow-500" />

    if (status.connected) {
      return <CheckCircle2 className="h-8 w-8 text-green-500" />
    } else {
      return <XCircle className="h-8 w-8 text-red-500" />
    }
  }

  // Get platform icon
  const getPlatformIcon = () => {
    switch (platform.toLowerCase()) {
      case "mt4":
      case "mt5":
        return <Database className="h-5 w-5 text-blue-500" />
      case "tradingview":
        return <Zap className="h-5 w-5 text-purple-500" />
      case "interactivebrokers":
        return <Shield className="h-5 w-5 text-green-500" />
      default:
        return <Database className="h-5 w-5 text-blue-500" />
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{name}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              {getPlatformIcon()}
              <span className="ml-1">{platform}</span>
            </CardDescription>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            {getStatusIcon()}
            <div className="ml-3">
              <div className="font-medium">{status?.statusMessage || "Checking status..."}</div>
              <div className="text-sm text-muted-foreground flex items-center">
                <Clock className="mr-1 h-3 w-3" />
                Last synced: {formatLastSyncTime(status?.lastSyncTime)}
              </div>
            </div>
          </div>
        </div>

        {status?.syncInProgress && (
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span>Syncing data...</span>
              <span>Please wait</span>
            </div>
            <Progress value={45} className="h-2" />
          </div>
        )}

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center">
            <Info className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>Account ID: {accountId.substring(0, 8)}...</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>Auto-sync: Every 15 min</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <div className="flex justify-between w-full">
          <Button variant="outline" size="sm" onClick={fetchConnectionStatus} disabled={isLoading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>

          <div className="space-x-2">
            <Button variant="outline" size="sm" onClick={handleSync} disabled={isSyncing || !status?.connected}>
              <Database className={`mr-2 h-4 w-4 ${isSyncing ? "animate-pulse" : ""}`} />
              {isSyncing ? "Syncing..." : "Sync Data"}
            </Button>

            <Button variant="destructive" size="sm" onClick={handleDisconnect} disabled={isLoading}>
              Disconnect
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

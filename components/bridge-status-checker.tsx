"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, CheckCircle, XCircle, AlertTriangle } from "lucide-react"

type BridgeStatus = "checking" | "connected" | "disconnected" | "error"

export default function BridgeStatusChecker() {
  const [status, setStatus] = useState<BridgeStatus>("checking")
  const [lastChecked, setLastChecked] = useState<Date | null>(null)
  const [isChecking, setIsChecking] = useState(false)

  useEffect(() => {
    checkBridgeStatus()
  }, [])

  const checkBridgeStatus = async () => {
    setIsChecking(true)
    setStatus("checking")

    // Simulate checking bridge status
    setTimeout(() => {
      // For demo purposes, randomly determine status
      const statuses: BridgeStatus[] = ["connected", "disconnected", "error"]
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]

      setStatus(randomStatus)
      setLastChecked(new Date())
      setIsChecking(false)
    }, 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>MetaTrader Bridge Status</CardTitle>
        <CardDescription>Check the connection status of your MetaTrader bridge</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between p-4 rounded-lg border">
          <div className="flex items-center gap-3">
            {status === "checking" && <RefreshCw className="h-5 w-5 text-muted-foreground animate-spin" />}
            {status === "connected" && <CheckCircle className="h-5 w-5 text-green-500" />}
            {status === "disconnected" && <XCircle className="h-5 w-5 text-red-500" />}
            {status === "error" && <AlertTriangle className="h-5 w-5 text-amber-500" />}

            <div>
              <p className="font-medium">
                {status === "checking" && "Checking bridge status..."}
                {status === "connected" && "Bridge is connected"}
                {status === "disconnected" && "Bridge is disconnected"}
                {status === "error" && "Connection error"}
              </p>
              {lastChecked && (
                <p className="text-sm text-muted-foreground">Last checked: {lastChecked.toLocaleTimeString()}</p>
              )}
            </div>
          </div>

          <Badge
            variant={
              status === "connected"
                ? "default"
                : status === "disconnected"
                  ? "destructive"
                  : status === "error"
                    ? "outline"
                    : "secondary"
            }
          >
            {status === "checking" ? "Checking..." : status}
          </Badge>
        </div>

        {status === "disconnected" && (
          <div className="mt-4 p-4 rounded-lg bg-red-50 border border-red-200 text-red-800">
            <h3 className="font-medium mb-2">Bridge Not Connected</h3>
            <p className="text-sm mb-3">Your MetaTrader bridge is not connected. Please check that:</p>
            <ul className="list-disc pl-5 text-sm space-y-1">
              <li>The bridge application is running on your computer</li>
              <li>Your MetaTrader terminal is open and logged in</li>
              <li>Your internet connection is working properly</li>
              <li>No firewall is blocking the connection</li>
            </ul>
          </div>
        )}

        {status === "error" && (
          <div className="mt-4 p-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-800">
            <h3 className="font-medium mb-2">Connection Error</h3>
            <p className="text-sm mb-3">There was an error connecting to your MetaTrader bridge. Try these steps:</p>
            <ul className="list-disc pl-5 text-sm space-y-1">
              <li>Restart the bridge application</li>
              <li>Verify the bridge is configured with the correct settings</li>
              <li>Check if your MetaTrader terminal is responding</li>
              <li>Reinstall the bridge if problems persist</li>
            </ul>
          </div>
        )}

        {status === "connected" && (
          <div className="mt-4 p-4 rounded-lg bg-green-50 border border-green-200 text-green-800">
            <h3 className="font-medium mb-2">Bridge Connected Successfully</h3>
            <p className="text-sm">
              Your MetaTrader bridge is connected and working properly. Your trading accounts will receive live updates
              automatically.
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={checkBridgeStatus} disabled={isChecking}>
          {isChecking ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Checking...
            </>
          ) : (
            "Check Bridge Status"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle, XCircle, RefreshCw } from "lucide-react"

export default function MT5ConnectionDebugPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [connectionResult, setConnectionResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const testConnection = async () => {
    setIsLoading(true)
    setError(null)
    setConnectionResult(null)

    try {
      const response = await fetch("/api/mt5/test-connection")
      const data = await response.json()

      if (response.ok) {
        setConnectionResult(data)
      } else {
        setError(data.error || "Failed to test connection")
        setConnectionResult(data)
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const testAccountInfo = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Test with a sample account ID
      const response = await fetch("/api/mt5/account-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accountId: "test-account-123" }),
      })

      const data = await response.json()
      console.log("Account info test result:", data)

      if (response.ok) {
        alert("Account info API test successful! Check console for details.")
      } else {
        alert(`Account info API test failed: ${data.error}`)
      }
    } catch (err: any) {
      alert(`Account info API test error: ${err.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">MT5 Connection Debug</h1>
        <p className="text-muted-foreground">Test the connection to your MT5 backend service</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Backend Connection Test</CardTitle>
            <CardDescription>Test if the frontend can reach the MT5 backend service</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={testConnection} disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Testing Connection...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Test Backend Connection
                </>
              )}
            </Button>

            {error && (
              <Alert variant="destructive">
                <XCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {connectionResult && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  {connectionResult.isHealthy ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                  <span className="font-medium">
                    Backend Status: {connectionResult.isHealthy ? "Healthy" : "Unhealthy"}
                  </span>
                </div>

                <div className="grid gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Backend URL:</span>
                    <span className="font-mono">{connectionResult.backendUrl}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Status Code:</span>
                    <Badge variant={connectionResult.status === 200 ? "default" : "destructive"}>
                      {connectionResult.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Timestamp:</span>
                    <span>{new Date(connectionResult.timestamp).toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Environment Variables:</h4>
                  <div className="grid gap-1 text-sm">
                    <div className="flex justify-between">
                      <span>NODE_ENV:</span>
                      <span className="font-mono">{connectionResult.environment.NODE_ENV}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>MT5_BACKEND_URL:</span>
                      <Badge
                        variant={connectionResult.environment.MT5_BACKEND_URL === "Set" ? "default" : "destructive"}
                      >
                        {connectionResult.environment.MT5_BACKEND_URL}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>NEXT_PUBLIC_MT5_BACKEND_URL:</span>
                      <Badge
                        variant={
                          connectionResult.environment.NEXT_PUBLIC_MT5_BACKEND_URL === "Set" ? "default" : "destructive"
                        }
                      >
                        {connectionResult.environment.NEXT_PUBLIC_MT5_BACKEND_URL}
                      </Badge>
                    </div>
                  </div>
                </div>

                {connectionResult.backendResponse && (
                  <div className="space-y-2">
                    <h4 className="font-medium">Backend Response:</h4>
                    <pre className="bg-muted p-3 rounded text-xs overflow-auto">
                      {JSON.stringify(connectionResult.backendResponse, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Info API Test</CardTitle>
            <CardDescription>Test the account info API endpoint</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={testAccountInfo} disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Testing API...
                </>
              ) : (
                "Test Account Info API"
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

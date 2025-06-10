"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Loader2, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react"

export default function CTraderTestPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [testResult, setTestResult] = useState<any>(null)
  const [environment, setEnvironment] = useState<"demo" | "live">("demo")

  const testConnection = async (env: "demo" | "live") => {
    setIsLoading(true)
    setEnvironment(env)
    setTestResult(null)

    try {
      const response = await fetch(`/api/ctrader/test?environment=${env}`)
      const data = await response.json()
      setTestResult(data)
    } catch (error) {
      setTestResult({
        success: false,
        error: "Network error occurred",
        details: error.message,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">cTrader API Test</h1>
          <p className="text-muted-foreground">Test your cTrader API integration</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Demo Environment
                <Badge variant="secondary">Safe</Badge>
              </CardTitle>
              <CardDescription>Test with demo accounts and simulated data</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => testConnection("demo")} disabled={isLoading} className="w-full">
                {isLoading && environment === "demo" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Testing...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Test Demo Connection
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Live Environment
                <Badge variant="destructive">Real Money</Badge>
              </CardTitle>
              <CardDescription>Test with live accounts and real data</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => testConnection("live")} disabled={isLoading} variant="outline" className="w-full">
                {isLoading && environment === "live" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Testing...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Test Live Connection
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {testResult && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Test Results
                {testResult.success ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert variant={testResult.success ? "default" : "destructive"}>
                <AlertDescription>{testResult.success ? testResult.message : testResult.error}</AlertDescription>
              </Alert>

              {testResult.success && (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Connection Details</h4>
                    <div className="grid gap-2 text-sm">
                      <div>
                        Environment: <Badge>{testResult.environment}</Badge>
                      </div>
                      <div>Client ID: {testResult.credentials?.clientId}</div>
                      <div>Has Secret: {testResult.credentials?.hasClientSecret ? "✅" : "❌"}</div>
                      <div>Redirect URI: {testResult.credentials?.redirectUri}</div>
                    </div>
                  </div>

                  {testResult.accounts && testResult.accounts.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Available Accounts ({testResult.accounts.length})</h4>
                      <div className="space-y-2">
                        {testResult.accounts.map((account: any, index: number) => (
                          <div key={index} className="border rounded-lg p-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="font-medium">{account.brokerName}</div>
                                <div className="text-sm text-muted-foreground">Account: {account.accountNumber}</div>
                              </div>
                              <div className="text-right">
                                <div className="font-medium">
                                  {account.currency} {account.balance.toLocaleString()}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  Equity: {account.currency} {account.equity.toLocaleString()}
                                </div>
                              </div>
                            </div>
                            <div className="mt-2 flex gap-2">
                              <Badge variant={account.isLive ? "destructive" : "secondary"}>
                                {account.accountType}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {!testResult.success && testResult.details && (
                <details className="text-sm">
                  <summary className="cursor-pointer font-medium">Error Details</summary>
                  <pre className="mt-2 p-2 bg-muted rounded text-xs overflow-auto">{testResult.details}</pre>
                </details>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

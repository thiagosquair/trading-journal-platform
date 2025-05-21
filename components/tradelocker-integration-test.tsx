"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react"
import { testPlatformConnection } from "@/lib/trading-actions"

export default function TradeLockerIntegrationTest() {
  const [apiKey, setApiKey] = useState("")
  const [apiSecret, setApiSecret] = useState("")
  const [accountName, setAccountName] = useState("TradeLocker Account")
  const [isLoading, setIsLoading] = useState(false)
  const [testResult, setTestResult] = useState<{
    success: boolean
    message?: string
  } | null>(null)

  const handleTest = async () => {
    if (!apiKey || !apiSecret) {
      setTestResult({
        success: false,
        message: "Please enter both API Key and API Secret",
      })
      return
    }

    setIsLoading(true)
    setTestResult(null)

    try {
      const result = await testPlatformConnection({
        platform: "tradelocker",
        name: accountName,
        apiKey,
        apiSecret,
      })

      setTestResult(result)
    } catch (error) {
      setTestResult({
        success: false,
        message: error instanceof Error ? error.message : "An unknown error occurred",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>TradeLocker Integration Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="account-name">Account Name</Label>
          <Input
            id="account-name"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            placeholder="My TradeLocker Account"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="api-key">API Key</Label>
          <Input
            id="api-key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your TradeLocker API Key"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="api-secret">API Secret</Label>
          <Input
            id="api-secret"
            type="password"
            value={apiSecret}
            onChange={(e) => setApiSecret(e.target.value)}
            placeholder="Enter your TradeLocker API Secret"
          />
        </div>

        <Button onClick={handleTest} disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Testing Connection
            </>
          ) : (
            "Test Connection"
          )}
        </Button>

        {testResult && (
          <Alert variant={testResult.success ? "default" : "destructive"}>
            {testResult.success ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
            <AlertTitle>{testResult.success ? "Success" : "Error"}</AlertTitle>
            <AlertDescription>{testResult.message}</AlertDescription>
          </Alert>
        )}

        <div className="text-sm text-muted-foreground mt-4">
          <p>
            TradeLocker is a secure trading platform with advanced risk management features. To connect your account,
            you need to generate API credentials from your TradeLocker dashboard.
          </p>
          <ol className="list-decimal list-inside mt-2 space-y-1">
            <li>Log in to your TradeLocker account</li>
            <li>Navigate to Settings &gt; API Access</li>
            <li>Click "Generate New API Key"</li>
            <li>Copy the API Key and Secret</li>
            <li>Paste them in the fields above</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  )
}

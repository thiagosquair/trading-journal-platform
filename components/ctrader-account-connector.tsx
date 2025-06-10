"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertCircle, CheckCircle2, ExternalLink } from "lucide-react"

export default function CTraderAccountConnector() {
  const router = useRouter()
  const [accountType, setAccountType] = useState("demo")
  const [isLoading, setIsLoading] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [testResult, setTestResult] = useState<{ success: boolean; message: string; accounts?: any[] } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const nameRef = useRef<HTMLInputElement>(null)
  const clientIdRef = useRef<HTMLInputElement>(null)
  const clientSecretRef = useRef<HTMLInputElement>(null)

  const handleTestConnection = async () => {
    setIsLoading(true)
    setError(null)
    setTestResult(null)

    try {
      // Test the API connection with environment variables
      const response = await fetch(`/api/ctrader/test?environment=${accountType}`)
      const data = await response.json()

      if (data.success) {
        setTestResult({
          success: true,
          message: `${data.message} Found ${data.accounts?.length || 0} account(s).`,
          accounts: data.accounts,
        })
      } else {
        setTestResult({
          success: false,
          message: data.error || "Connection failed",
        })
      }
    } catch (err) {
      setTestResult({
        success: false,
        message: "Network error. Please check your connection and try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleConnect = async () => {
    if (!testResult?.success) {
      setError("Please test the connection first")
      return
    }

    setIsConnecting(true)
    setError(null)

    try {
      // Start OAuth flow
      const clientId =
        process.env.NEXT_PUBLIC_CTRADER_CLIENT_ID || "15150_ic0eEJCL9tya3FxMn68FJtGFcAKuHBEiaVTCUKE9I4qMV7twOL"
      const redirectUri = encodeURIComponent(
        process.env.NEXT_PUBLIC_CTRADER_REDIRECT_URI ||
          "https://trading-journal-platform-ZBKXCDFwpDQ/api/ctrader/callback",
      )
      const state = `${accountType}_${Date.now()}`
      const scope = "trading"

      const baseUrl = accountType === "demo" ? "https://demo-openapi.ctrader.com" : "https://openapi.ctrader.com"
      const authUrl = `${baseUrl}/v1/auth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&state=${state}`

      // Redirect to cTrader OAuth
      window.location.href = authUrl
    } catch (err) {
      setError("An error occurred while starting the connection process")
      console.error("OAuth error:", err)
    } finally {
      setIsConnecting(false)
    }
  }

  const handleLoadTestAccount = () => {
    if (nameRef.current) nameRef.current.value = "cTrader Demo Account"
    if (clientIdRef.current) clientIdRef.current.value = "your_client_id"
    if (clientSecretRef.current) clientSecretRef.current.value = "your_client_secret"
    setAccountType("demo")
  }

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">cTrader Open API Setup</h4>
        <p className="text-sm text-blue-700 mb-3">
          To connect your cTrader account, you'll need to create an API application first:
        </p>
        <ol className="text-sm text-blue-700 space-y-1 mb-3">
          <li>1. Visit the cTrader Developer Portal</li>
          <li>2. Create a new application</li>
          <li>3. Copy your Client ID and Client Secret</li>
          <li>4. Enter them below</li>
        </ol>
        <Button variant="outline" size="sm" asChild>
          <a href="https://connect.ctrader.com/" target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-2 h-4 w-4" />
            Open cTrader Developer Portal
          </a>
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="account-name">Account Name</Label>
          <Input
            id="account-name"
            ref={nameRef}
            placeholder="My cTrader Account"
            disabled={isLoading || isConnecting}
          />
        </div>

        <div className="space-y-2">
          <Label>Account Type</Label>
          <RadioGroup
            value={accountType}
            onValueChange={setAccountType}
            className="flex flex-col space-y-1"
            disabled={isLoading || isConnecting}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="demo" id="demo" />
              <Label htmlFor="demo" className="font-normal cursor-pointer">
                Demo Account (Recommended for testing)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="live" id="live" />
              <Label htmlFor="live" className="font-normal cursor-pointer">
                Live Account
              </Label>
            </div>
          </RadioGroup>
          <p className="text-sm text-muted-foreground">
            {accountType === "demo"
              ? "Demo accounts use simulated data and are perfect for testing"
              : "Live accounts connect to your real trading account"}
          </p>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="client-id">Client ID</Label>
          <Input
            id="client-id"
            ref={clientIdRef}
            placeholder="Your cTrader API Client ID"
            disabled={isLoading || isConnecting}
          />
          <p className="text-sm text-muted-foreground">Get this from your cTrader API application settings</p>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="client-secret">Client Secret</Label>
          <Input
            id="client-secret"
            type="password"
            ref={clientSecretRef}
            placeholder="Your cTrader API Client Secret"
            disabled={isLoading || isConnecting}
          />
          <p className="text-sm text-muted-foreground">Keep this secret and never share it publicly</p>
        </div>
      </div>

      {testResult && (
        <Alert variant={testResult.success ? "default" : "destructive"}>
          {testResult.success ? (
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          <AlertDescription>
            {testResult.message}
            {testResult.success && testResult.accounts && testResult.accounts.length > 0 && (
              <div className="mt-2">
                <p className="font-medium">Available Accounts:</p>
                <ul className="list-disc list-inside text-sm">
                  {testResult.accounts.map((account, index) => (
                    <li key={index}>
                      {account.name} - {account.currency} {account.balance.toLocaleString()}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Button variant="outline" onClick={handleLoadTestAccount} disabled={isLoading || isConnecting}>
          Load Test Credentials
        </Button>
        <Button variant="secondary" onClick={handleTestConnection} disabled={isLoading || isConnecting}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Testing...
            </>
          ) : (
            "Test Connection"
          )}
        </Button>
        <Button onClick={handleConnect} disabled={isConnecting || isLoading || !testResult?.success}>
          {isConnecting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Connecting...
            </>
          ) : (
            "Connect Account"
          )}
        </Button>
      </div>
    </div>
  )
}

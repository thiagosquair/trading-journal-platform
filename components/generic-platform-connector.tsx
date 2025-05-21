"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertCircle, CheckCircle2, Info } from "lucide-react"
import { usePathname } from "next/navigation"

export default function GenericPlatformConnector() {
  const router = useRouter()
  const pathname = usePathname()
  const platformId = pathname.split("/").pop() || ""
  const platformName = getPlatformName(platformId)

  const [accessType, setAccessType] = useState("investor")
  const [isLoading, setIsLoading] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const nameRef = useRef<HTMLInputElement>(null)
  const serverRef = useRef<HTMLInputElement>(null)
  const accountNumberRef = useRef<HTMLInputElement>(null)
  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const apiKeyRef = useRef<HTMLInputElement>(null)
  const apiSecretRef = useRef<HTMLInputElement>(null)

  // Get field requirements based on selected platform
  const getFieldRequirements = () => {
    switch (platformId.toLowerCase()) {
      case "tradingview":
        return {
          server: false,
          accountNumber: false,
          username: true,
          password: true,
          apiKey: true,
          apiSecret: false,
          showAccessType: false,
          notes: "TradingView requires your username, password, and API key for integration.",
        }
      case "ninjatrader":
        return {
          server: false,
          accountNumber: true,
          username: true,
          password: true,
          apiKey: false,
          apiSecret: false,
          showAccessType: true,
          notes: "NinjaTrader requires your account number, username, and password.",
        }
      case "tradestation":
        return {
          server: false,
          accountNumber: true,
          username: true,
          password: false,
          apiKey: true,
          apiSecret: true,
          showAccessType: false,
          notes: "TradeStation uses OAuth. You'll need your account number, username, API key, and API secret.",
        }
      case "thinkorswim":
        return {
          server: false,
          accountNumber: true,
          username: true,
          password: true,
          apiKey: false,
          apiSecret: false,
          showAccessType: true,
          notes: "ThinkOrSwim requires your account number, username, and password.",
        }
      case "interactivebrokers":
        return {
          server: false,
          accountNumber: true,
          username: true,
          password: true,
          apiKey: false,
          apiSecret: false,
          showAccessType: true,
          notes: "Interactive Brokers requires your account number, username, and password.",
        }
      case "matchtrader":
        return {
          server: true,
          accountNumber: true,
          username: false,
          password: true,
          apiKey: false,
          apiSecret: false,
          showAccessType: true,
          notes: "MatchTrader requires your server, account number, and password.",
        }
      case "tradovate":
        return {
          server: false,
          accountNumber: true,
          username: true,
          password: true,
          apiKey: true,
          apiSecret: true,
          showAccessType: false,
          notes: "Tradovate requires your account number, username, password, API key, and API secret.",
        }
      case "rithmic":
        return {
          server: true,
          accountNumber: true,
          username: true,
          password: true,
          apiKey: false,
          apiSecret: false,
          showAccessType: true,
          notes: "Rithmic requires your server, account number, username, and password.",
        }
      case "sierrachart":
        return {
          server: false,
          accountNumber: true,
          username: true,
          password: true,
          apiKey: false,
          apiSecret: false,
          showAccessType: true,
          notes: "Sierra Chart requires your account number, username, and password.",
        }
      case "dxfeed":
        return {
          server: true,
          accountNumber: true,
          username: true,
          password: true,
          apiKey: false,
          apiSecret: false,
          showAccessType: false,
          notes: "DXfeed requires your server, account number, username, and password.",
        }
      case "tradelocker":
        return {
          server: false,
          accountNumber: true,
          username: true,
          password: true,
          apiKey: true,
          apiSecret: false,
          showAccessType: false,
          notes: "TradeLocker requires your account number, username, password, and API key.",
        }
      default:
        return {
          server: true,
          accountNumber: true,
          username: false,
          password: true,
          apiKey: false,
          apiSecret: false,
          showAccessType: true,
          notes: "Please enter your account credentials.",
        }
    }
  }

  const fieldRequirements = getFieldRequirements()

  const handleTestConnection = async () => {
    if (
      !nameRef.current?.value ||
      (fieldRequirements.server && !serverRef.current?.value) ||
      (fieldRequirements.accountNumber && !accountNumberRef.current?.value) ||
      (fieldRequirements.username && !usernameRef.current?.value) ||
      (fieldRequirements.password && !passwordRef.current?.value) ||
      (fieldRequirements.apiKey && !apiKeyRef.current?.value) ||
      (fieldRequirements.apiSecret && !apiSecretRef.current?.value)
    ) {
      setError("Please fill in all required fields")
      return
    }

    setIsLoading(true)
    setError(null)
    setTestResult(null)

    try {
      // Simulate successful connection for testing purposes
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setTestResult({
        success: true,
        message: `Connection to ${platformName} successful! Your account is ready to be connected.`,
      })
    } catch (err) {
      setTestResult({
        success: false,
        message: "Connection failed. Please check your credentials and try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleConnect = async () => {
    if (
      !nameRef.current?.value ||
      (fieldRequirements.server && !serverRef.current?.value) ||
      (fieldRequirements.accountNumber && !accountNumberRef.current?.value) ||
      (fieldRequirements.username && !usernameRef.current?.value) ||
      (fieldRequirements.password && !passwordRef.current?.value) ||
      (fieldRequirements.apiKey && !apiKeyRef.current?.value) ||
      (fieldRequirements.apiSecret && !apiSecretRef.current?.value)
    ) {
      setError("Please fill in all required fields")
      return
    }

    if (!testResult?.success) {
      setError("Please test the connection before connecting")
      return
    }

    setIsConnecting(true)
    setError(null)

    try {
      // Create account object
      const accountData = {
        id: Date.now().toString(),
        name: nameRef.current.value,
        platform: platformId,
        server: serverRef.current?.value || "",
        accountNumber: accountNumberRef.current?.value || "",
        balance: Math.floor(Math.random() * 50000) + 10000,
        equity: Math.floor(Math.random() * 50000) + 10000,
        currency: "USD",
        leverage: "1:100",
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        isDemo: accessType === "demo",
      }

      // Save to localStorage for demo purposes
      const existingAccounts = JSON.parse(localStorage.getItem("tradingAccounts") || "[]")
      existingAccounts.push(accountData)
      localStorage.setItem("tradingAccounts", JSON.stringify(existingAccounts))

      // Redirect to trading accounts page
      router.push("/trading-accounts?newAccount=true")
    } catch (err) {
      setError("An error occurred while connecting the account")
      console.error("Connection error:", err)
    } finally {
      setIsConnecting(false)
    }
  }

  const handleLoadDemoAccount = () => {
    if (nameRef.current) nameRef.current.value = `${platformName} Demo Account`
    if (serverRef.current) serverRef.current.value = `${platformId}.demo.server.com`
    if (accountNumberRef.current) accountNumberRef.current.value = `${platformId}${Math.floor(Math.random() * 100000)}`
    if (usernameRef.current) usernameRef.current.value = `demo_${platformId}_user`
    if (passwordRef.current) passwordRef.current.value = "demo12345"
    if (apiKeyRef.current) apiKeyRef.current.value = `${platformId}_demo_api_key`
    if (apiSecretRef.current) apiSecretRef.current.value = `${platformId}_demo_api_secret`
    setAccessType("demo")
  }

  const handleLoadTestAccount = () => {
    if (nameRef.current) nameRef.current.value = `${platformName} Test Account`
    if (serverRef.current) serverRef.current.value = `${platformId}.live.server.com`
    if (accountNumberRef.current) accountNumberRef.current.value = `${platformId}${Math.floor(Math.random() * 100000)}`
    if (usernameRef.current) usernameRef.current.value = `test_${platformId}_user`
    if (passwordRef.current) passwordRef.current.value = "test12345"
    if (apiKeyRef.current) apiKeyRef.current.value = `${platformId}_test_api_key`
    if (apiSecretRef.current) apiSecretRef.current.value = `${platformId}_test_api_secret`
    setAccessType("full")
  }

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>{fieldRequirements.notes}</AlertDescription>
      </Alert>

      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="account-name">Account Name</Label>
          <Input
            id="account-name"
            ref={nameRef}
            placeholder={`My ${platformName} Account`}
            disabled={isLoading || isConnecting}
          />
        </div>

        {fieldRequirements.server && (
          <div className="grid gap-2">
            <Label htmlFor="server">Server Address</Label>
            <Input
              id="server"
              ref={serverRef}
              placeholder={`Your ${platformName} server`}
              disabled={isLoading || isConnecting}
            />
            <p className="text-sm text-muted-foreground">
              Enter your {platformName} server address provided by your broker
            </p>
          </div>
        )}

        {fieldRequirements.accountNumber && (
          <div className="grid gap-2">
            <Label htmlFor="account-number">Account Number/ID</Label>
            <Input
              id="account-number"
              ref={accountNumberRef}
              placeholder="e.g., 12345678"
              disabled={isLoading || isConnecting}
            />
          </div>
        )}

        {fieldRequirements.username && (
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" ref={usernameRef} placeholder="Your username" disabled={isLoading || isConnecting} />
          </div>
        )}

        {fieldRequirements.showAccessType && fieldRequirements.password && (
          <div className="space-y-2">
            <Label>Access Type</Label>
            <RadioGroup
              value={accessType}
              onValueChange={setAccessType}
              className="flex flex-col space-y-1"
              disabled={isLoading || isConnecting}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="investor" id="investor" />
                <Label htmlFor="investor" className="font-normal cursor-pointer">
                  Read-Only Access (Recommended)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="full" id="full" />
                <Label htmlFor="full" className="font-normal cursor-pointer">
                  Full Access
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="demo" id="demo" />
                <Label htmlFor="demo" className="font-normal cursor-pointer">
                  Demo Account
                </Label>
              </div>
            </RadioGroup>
            <p className="text-sm text-muted-foreground">
              {accessType === "investor"
                ? "Read-only access uses your investor password and cannot place trades"
                : accessType === "full"
                  ? "Full access uses your main password and can place trades (use with caution)"
                  : "Demo accounts are for practice and testing purposes"}
            </p>
          </div>
        )}

        {fieldRequirements.password && (
          <div className="grid gap-2">
            <Label htmlFor="password">
              {fieldRequirements.showAccessType
                ? accessType === "investor"
                  ? "Investor Password"
                  : accessType === "demo"
                    ? "Demo Password"
                    : "Main Password"
                : "Password"}
            </Label>
            <Input id="password" type="password" ref={passwordRef} disabled={isLoading || isConnecting} />
          </div>
        )}

        {fieldRequirements.apiKey && (
          <div className="grid gap-2">
            <Label htmlFor="api-key">API Key</Label>
            <Input id="api-key" ref={apiKeyRef} disabled={isLoading || isConnecting} />
          </div>
        )}

        {fieldRequirements.apiSecret && (
          <div className="grid gap-2">
            <Label htmlFor="api-secret">API Secret</Label>
            <Input id="api-secret" type="password" ref={apiSecretRef} disabled={isLoading || isConnecting} />
          </div>
        )}
      </div>

      {testResult && (
        <Alert variant={testResult.success ? "default" : "destructive"}>
          {testResult.success ? (
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          <AlertDescription>{testResult.message}</AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Button variant="outline" onClick={handleLoadDemoAccount} disabled={isLoading || isConnecting}>
          Load Demo Account
        </Button>
        <Button variant="outline" onClick={handleLoadTestAccount} disabled={isLoading || isConnecting}>
          Load Test Account
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

// Helper function to get a formatted platform name
function getPlatformName(platformId: string): string {
  const platformNames: Record<string, string> = {
    mt4: "MetaTrader 4",
    mt5: "MetaTrader 5",
    ctrader: "cTrader",
    dxtrade: "DXtrade",
    tradingview: "TradingView",
    ninjatrader: "NinjaTrader",
    tradestation: "TradeStation",
    thinkorswim: "ThinkOrSwim",
    interactivebrokers: "Interactive Brokers",
    tradelocker: "TradeLocker",
    matchtrader: "MatchTrader",
    tradovate: "Tradovate",
    rithmic: "Rithmic",
    sierrachart: "Sierra Chart",
    dxfeed: "DXfeed",
  }

  return platformNames[platformId.toLowerCase()] || platformId
}

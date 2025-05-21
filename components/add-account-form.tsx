"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react"

export default function AddAccountForm() {
  const router = useRouter()
  const [platform, setPlatform] = useState("mt5")
  const [accessType, setAccessType] = useState("investor")
  const [isLoading, setIsLoading] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const nameRef = useRef<HTMLInputElement>(null)
  const serverRef = useRef<HTMLInputElement>(null)
  const accountNumberRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const apiKeyRef = useRef<HTMLInputElement>(null)
  const apiSecretRef = useRef<HTMLInputElement>(null)

  // Get field requirements based on selected platform
  const getFieldRequirements = () => {
    switch (platform.toLowerCase()) {
      case "mt4":
      case "mt5":
        return {
          server: true,
          accountNumber: true,
          password: true,
          apiKey: false,
          apiSecret: false,
        }
      case "tradingview":
        return {
          server: false,
          accountNumber: true,
          password: false,
          apiKey: true,
          apiSecret: true,
        }
      case "ctrader":
        return {
          server: true,
          accountNumber: true,
          password: true,
          apiKey: false,
          apiSecret: false,
        }
      case "ninjatrader":
        return {
          server: false,
          accountNumber: true,
          password: true,
          apiKey: false,
          apiSecret: false,
        }
      case "dxtrade":
        return {
          server: true,
          accountNumber: true,
          password: true,
          apiKey: false,
          apiSecret: false,
        }
      case "tradestation":
        return {
          server: false,
          accountNumber: true,
          password: false,
          apiKey: true,
          apiSecret: true,
        }
      case "thinkorswim":
        return {
          server: false,
          accountNumber: true,
          password: true,
          apiKey: false,
          apiSecret: false,
        }
      case "interactivebrokers":
        return {
          server: false,
          accountNumber: true,
          password: true,
          apiKey: false,
          apiSecret: false,
        }
      case "tradelocker":
        return {
          server: true,
          accountNumber: true,
          password: true,
          apiKey: false,
          apiSecret: false,
        }
      default:
        return {
          server: true,
          accountNumber: true,
          password: true,
          apiKey: false,
          apiSecret: false,
        }
    }
  }

  const fieldRequirements = getFieldRequirements()

  const handleTestConnection = async () => {
    if (
      !nameRef.current?.value ||
      (fieldRequirements.server && !serverRef.current?.value) ||
      (fieldRequirements.accountNumber && !accountNumberRef.current?.value) ||
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
        message: "Connection successful! Your account is ready to be connected.",
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
        platform: platform,
        server: serverRef.current?.value || "",
        accountNumber: accountNumberRef.current?.value || "",
        balance: 50000,
        equity: 50250,
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
    if (nameRef.current) nameRef.current.value = "Demo Trading Account"
    if (serverRef.current) serverRef.current.value = "Demo.Server.com"
    if (accountNumberRef.current) accountNumberRef.current.value = "12345678"
    if (passwordRef.current) passwordRef.current.value = "demo12345"
    if (apiKeyRef.current) apiKeyRef.current.value = "demo_api_key"
    if (apiSecretRef.current) apiSecretRef.current.value = "demo_api_secret"
    setPlatform("mt5")
    setAccessType("demo")
  }

  const handleLoadTestAccount = () => {
    const platformData = {
      mt5: {
        name: "MT5 Test Account",
        server: "InterTrader-Server",
        accountNumber: "536407",
        password: "password123",
        apiKey: "",
        apiSecret: "",
      },
      tradingview: {
        name: "TradingView Test Account",
        server: "",
        accountNumber: "tv12345",
        password: "",
        apiKey: "tv_api_key_test",
        apiSecret: "tv_api_secret_test",
      },
      ctrader: {
        name: "cTrader Test Account",
        server: "ctrader.broker.com",
        accountNumber: "ct98765",
        password: "ctrader123",
        apiKey: "",
        apiSecret: "",
      },
      tradelocker: {
        name: "TradeLocker Test Account",
        server: "api.tradelocker.com",
        accountNumber: "tl54321",
        password: "tradelocker123",
        apiKey: "",
        apiSecret: "",
      },
    }

    const data = platformData[platform as keyof typeof platformData] || platformData.mt5

    if (nameRef.current) nameRef.current.value = data.name
    if (serverRef.current) serverRef.current.value = data.server
    if (accountNumberRef.current) accountNumberRef.current.value = data.accountNumber
    if (passwordRef.current) passwordRef.current.value = data.password
    if (apiKeyRef.current) apiKeyRef.current.value = data.apiKey
    if (apiSecretRef.current) apiSecretRef.current.value = data.apiSecret
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

      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="platform">Platform</Label>
          <Select value={platform} onValueChange={setPlatform}>
            <SelectTrigger id="platform">
              <SelectValue placeholder="Select platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mt5">MetaTrader 5</SelectItem>
              <SelectItem value="mt4">MetaTrader 4</SelectItem>
              <SelectItem value="tradingview">TradingView</SelectItem>
              <SelectItem value="ctrader">cTrader</SelectItem>
              <SelectItem value="ninjatrader">NinjaTrader</SelectItem>
              <SelectItem value="dxtrade">DXtrade</SelectItem>
              <SelectItem value="tradestation">TradeStation</SelectItem>
              <SelectItem value="thinkorswim">ThinkOrSwim</SelectItem>
              <SelectItem value="interactivebrokers">Interactive Brokers</SelectItem>
              <SelectItem value="matchtrader">MatchTrader</SelectItem>
              <SelectItem value="tradovate">Tradovate</SelectItem>
              <SelectItem value="rithmic">Rithmic</SelectItem>
              <SelectItem value="sierrachart">Sierra Chart</SelectItem>
              <SelectItem value="tradelocker">TradeLocker</SelectItem>
              <SelectItem value="dxfeed">DXfeed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="account-name">Account Name</Label>
          <Input
            id="account-name"
            ref={nameRef}
            placeholder="My Trading Account"
            disabled={isLoading || isConnecting}
          />
        </div>

        {fieldRequirements.server && (
          <div className="grid gap-2">
            <Label htmlFor="server">Server Address</Label>
            <Input
              id="server"
              ref={serverRef}
              placeholder={platform === "mt5" ? "e.g., ICMarketsSC-Live" : "Your broker's server"}
              disabled={isLoading || isConnecting}
            />
            <p className="text-sm text-muted-foreground">
              {platform === "mt5" && "You can find this in your MT5 platform under Tools > Options > Server"}
              {platform === "mt4" && "You can find this in your MT4 platform under Tools > Options > Server"}
              {platform === "ctrader" && "Enter your cTrader server address"}
              {platform === "tradelocker" && "Enter your TradeLocker server address"}
            </p>
          </div>
        )}

        {fieldRequirements.accountNumber && (
          <div className="grid gap-2">
            <Label htmlFor="account-number">Account Number/Login</Label>
            <Input
              id="account-number"
              ref={accountNumberRef}
              placeholder="e.g., 12345678"
              disabled={isLoading || isConnecting}
            />
          </div>
        )}

        {fieldRequirements.password && (
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
              {accessType === "investor"
                ? "Investor Password"
                : accessType === "demo"
                  ? "Demo Password"
                  : "Main Password"}
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

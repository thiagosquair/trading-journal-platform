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

export default function GenericPlatformConnector({ platformName }: { platformName: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const platformId = pathname.split("/").pop() || ""

  const [accessType, setAccessType] = useState("investor")
  const [isLoading, setIsLoading] = useState(false)
  const [isTestingConnection, setIsTestingConnection] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null)

  const nameRef = useRef<HTMLInputElement>(null)
  const serverRef = useRef<HTMLInputElement>(null)
  const accountNumberRef = useRef<HTMLInputElement>(null)
  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const apiKeyRef = useRef<HTMLInputElement>(null)
  const secretKeyRef = useRef<HTMLInputElement>(null)

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
    if (!nameRef.current?.value || !apiKeyRef.current?.value || !secretKeyRef.current?.value) {
      setError("Please fill in all fields")
      return
    }

    setIsTestingConnection(true)
    setError(null)
    setTestResult(null)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // For demo purposes, always succeed
      setTestResult({
        success: true,
        message: `Connection successful! Your ${platformName} account is ready to connect.`,
      })
    } catch (err: any) {
      setError(err.message || "Failed to test connection")
    } finally {
      setIsTestingConnection(false)
    }
  }

  const handleConnect = async () => {
    if (!nameRef.current?.value || !apiKeyRef.current?.value || !secretKeyRef.current?.value) {
      setError("Please fill in all fields")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Redirect to accounts page after successful connection
      router.push("/trading-accounts")
    } catch (err: any) {
      setError(err.message || "Failed to connect account")
    } finally {
      setIsLoading(false)
    }
  }

  const handleLoadDemoAccount = () => {
    if (nameRef.current) nameRef.current.value = `Demo ${platformName} Account`
    if (apiKeyRef.current) apiKeyRef.current.value = "demo_api_key_12345"
    if (secretKeyRef.current) secretKeyRef.current.value = "demo_secret_key_67890"
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
            disabled={isLoading || isTestingConnection}
          />
        </div>

        {fieldRequirements.server && (
          <div className="grid gap-2">
            <Label htmlFor="server">Server Address</Label>
            <Input
              id="server"
              ref={serverRef}
              placeholder={`Your ${platformName} server`}
              disabled={isLoading || isTestingConnection}
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
              disabled={isLoading || isTestingConnection}
            />
          </div>
        )}

        {fieldRequirements.username && (
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              ref={usernameRef}
              placeholder="Your username"
              disabled={isLoading || isTestingConnection}
            />
          </div>
        )}

        {fieldRequirements.showAccessType && fieldRequirements.password && (
          <div className="space-y-2">
            <Label>Access Type</Label>
            <RadioGroup
              value={accessType}
              onValueChange={setAccessType}
              className="flex flex-col space-y-1"
              disabled={isLoading || isTestingConnection}
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
            <Input id="password" type="password" ref={passwordRef} disabled={isLoading || isTestingConnection} />
          </div>
        )}

        {fieldRequirements.apiKey && (
          <div className="grid gap-2">
            <Label htmlFor="api-key">API Key</Label>
            <Input id="api-key" ref={apiKeyRef} disabled={isLoading || isTestingConnection} />
          </div>
        )}

        {fieldRequirements.apiSecret && (
          <div className="grid gap-2">
            <Label htmlFor="api-secret">API Secret</Label>
            <Input id="api-secret" type="password" ref={secretKeyRef} disabled={isLoading || isTestingConnection} />
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
        <Button variant="outline" onClick={handleLoadDemoAccount} disabled={isLoading || isTestingConnection}>
          Load Demo Account
        </Button>
        <Button variant="outline" onClick={handleTestConnection} disabled={isLoading || isTestingConnection}>
          {isTestingConnection ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Testing...
            </>
          ) : (
            "Test Connection"
          )}
        </Button>
        <Button onClick={handleConnect} disabled={isLoading || !testResult?.success}>
          {isLoading ? (
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

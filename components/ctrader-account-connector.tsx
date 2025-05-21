"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react"

export default function CTraderAccountConnector() {
  const router = useRouter()
  const [accessType, setAccessType] = useState("investor")
  const [isLoading, setIsLoading] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const nameRef = useRef<HTMLInputElement>(null)
  const serverRef = useRef<HTMLInputElement>(null)
  const accountNumberRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const handleTestConnection = async () => {
    if (
      !nameRef.current?.value ||
      !serverRef.current?.value ||
      !accountNumberRef.current?.value ||
      !passwordRef.current?.value
    ) {
      setError("Please fill in all required fields")
      return
    }

    setIsLoading(true)
    setError(null)
    setTestResult(null)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulate successful connection
      setTestResult({
        success: true,
        message: "Connection successful! Your cTrader account is ready to be connected.",
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
      !serverRef.current?.value ||
      !accountNumberRef.current?.value ||
      !passwordRef.current?.value
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
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Save to localStorage for demo purposes
      const accountData = {
        id: Date.now().toString(),
        name: nameRef.current.value,
        platform: "cTrader",
        server: serverRef.current.value,
        accountNumber: accountNumberRef.current.value,
        balance: 50000,
        equity: 50250,
        currency: "USD",
        leverage: "1:100",
        status: "active",
        type: accessType === "demo" ? "demo" : "live",
        lastUpdated: new Date().toISOString(),
      }

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

  const handleLoadTestAccount = () => {
    if (nameRef.current) nameRef.current.value = "cTrader Test Account"
    if (serverRef.current) serverRef.current.value = "ctrader.broker.com"
    if (accountNumberRef.current) accountNumberRef.current.value = "ct98765"
    if (passwordRef.current) passwordRef.current.value = "ctrader123"
    setAccessType("demo")
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
          <Label htmlFor="account-name">Account Name</Label>
          <Input
            id="account-name"
            ref={nameRef}
            placeholder="My cTrader Account"
            disabled={isLoading || isConnecting}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="server">Server Address</Label>
          <Input
            id="server"
            ref={serverRef}
            placeholder="e.g., demo.ctrader.com"
            disabled={isLoading || isConnecting}
          />
          <p className="text-sm text-muted-foreground">
            You can find this in your cTrader platform settings or from your broker
          </p>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="account-number">Account Number/Login</Label>
          <Input
            id="account-number"
            ref={accountNumberRef}
            placeholder="e.g., 12345678"
            disabled={isLoading || isConnecting}
          />
        </div>

        <div className="space-y-2">
          <Label>Account Type</Label>
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

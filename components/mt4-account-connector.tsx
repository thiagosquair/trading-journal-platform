"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react"

export default function MT4AccountConnector() {
  const router = useRouter()
  const [accountType, setAccountType] = useState("live")
  const [isLoading, setIsLoading] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const nameRef = useRef<HTMLInputElement>(null)
  const serverRef = useRef<HTMLInputElement>(null)
  const loginRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const investorPasswordRef = useRef<HTMLInputElement>(null)

  const handleTestConnection = async () => {
    if (
      !serverRef.current?.value ||
      !loginRef.current?.value ||
      (!passwordRef.current?.value && !investorPasswordRef.current?.value)
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

      // For demo purposes, always succeed
      setTestResult({ success: true, message: "Connection successful!" })
    } catch (err) {
      setError("An error occurred while testing the connection")
      console.error("Connection test error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleConnect = async () => {
    if (
      !nameRef.current?.value ||
      !serverRef.current?.value ||
      !loginRef.current?.value ||
      (!passwordRef.current?.value && !investorPasswordRef.current?.value)
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
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Create account data
      const accountData = {
        id: `mt4-${Date.now()}`,
        name: nameRef.current.value,
        platform: "mt4",
        server: serverRef.current.value,
        accountNumber: loginRef.current.value,
        balance: 10000 + Math.random() * 5000,
        equity: 10000 + Math.random() * 5000,
        currency: "USD",
        leverage: "1:100",
        status: "active",
        type: accountType,
        lastUpdated: new Date().toISOString(),
        openPositions: Math.floor(Math.random() * 5),
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

  const handleLoadTestAccount = () => {
    if (nameRef.current) nameRef.current.value = "MT4 Demo Account"
    if (serverRef.current) serverRef.current.value = "Demo.MT4Server.com"
    if (loginRef.current) loginRef.current.value = "12345678"
    if (passwordRef.current) passwordRef.current.value = "password123"
    if (investorPasswordRef.current) investorPasswordRef.current.value = ""
    setAccountType("demo")
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
          <Input id="account-name" ref={nameRef} placeholder="My MT4 Account" disabled={isLoading || isConnecting} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="server">Server</Label>
          <Input
            id="server"
            ref={serverRef}
            placeholder="Your MT4 server address"
            disabled={isLoading || isConnecting}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="login">Login/Account Number</Label>
          <Input
            id="login"
            ref={loginRef}
            placeholder="Your MT4 login or account number"
            disabled={isLoading || isConnecting}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            ref={passwordRef}
            placeholder="Your MT4 password"
            disabled={isLoading || isConnecting}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="investor-password">Investor Password (Optional)</Label>
          <Input
            id="investor-password"
            type="password"
            ref={investorPasswordRef}
            placeholder="Your MT4 investor password"
            disabled={isLoading || isConnecting}
          />
          <p className="text-sm text-muted-foreground">
            If you don't want to provide your main password, you can use the investor password for read-only access
          </p>
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
              <RadioGroupItem value="live" id="live" />
              <Label htmlFor="live" className="font-normal cursor-pointer">
                Live Account
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="demo" id="demo" />
              <Label htmlFor="demo" className="font-normal cursor-pointer">
                Demo Account
              </Label>
            </div>
          </RadioGroup>
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

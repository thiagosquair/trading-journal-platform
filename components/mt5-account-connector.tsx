"use client"

import { useState, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react"
import { MetaTraderAdapter } from "@/lib/platforms/metatrader-adapter"

export default function MT5AccountConnector() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null)
  const [accessType, setAccessType] = useState<"investor" | "full">("investor")
  const [error, setError] = useState<string | null>(null)

  const nameRef = useRef<HTMLInputElement>(null)
  const serverRef = useRef<HTMLInputElement>(null)
  const accountNumberRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const handleTestConnection = useCallback(async () => {
    if (!serverRef.current?.value || !accountNumberRef.current?.value || !passwordRef.current?.value) {
      setError("Please fill in all required fields")
      return
    }

    setIsLoading(true)
    setError(null)
    setTestResult(null)

    try {
      const adapter = new MetaTraderAdapter("MT5")

      await adapter.connect({
        server: serverRef.current.value,
        login: accountNumberRef.current.value,
        password: accessType === "full" ? passwordRef.current.value : undefined,
        investorPassword: accessType === "investor" ? passwordRef.current.value : undefined,
      })

      setTestResult({
        success: true,
        message: "Connection successful! Your account is ready to be connected.",
      })
    } catch (err) {
      setError("An error occurred while testing the connection")
      console.error("Connection test error:", err)
    } finally {
      setIsLoading(false)
    }
  }, [accessType])

  const handleConnect = useCallback(async () => {
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
      const adapter = new MetaTraderAdapter("MT5")

      // Connect to the platform
      await adapter.connect({
        server: serverRef.current.value,
        login: accountNumberRef.current.value,
        password: accessType === "full" ? passwordRef.current.value : undefined,
        investorPassword: accessType === "investor" ? passwordRef.current.value : undefined,
        broker: serverRef.current.value.split("-")[0],
      })

      // Fetch account data
      const accounts = await adapter.fetchAccounts()

      if (accounts && accounts.length > 0) {
        // Store the account in localStorage for persistence
        const existingAccounts = JSON.parse(localStorage.getItem("tradingAccounts") || "[]")

        // Check if account already exists
        const existingIndex = existingAccounts.findIndex((acc: any) => acc.id === accounts[0].id)

        if (existingIndex >= 0) {
          // Update existing account
          existingAccounts[existingIndex] = {
            ...accounts[0],
            name: nameRef.current.value || accounts[0].name,
            createdAt: existingAccounts[existingIndex].createdAt,
            lastUpdated: new Date().toISOString(),
          }
        } else {
          // Add new account
          existingAccounts.push({
            ...accounts[0],
            name: nameRef.current.value || accounts[0].name,
            createdAt: new Date().toISOString(),
            lastUpdated: new Date().toISOString(),
          })
        }

        localStorage.setItem("tradingAccounts", JSON.stringify(existingAccounts))

        // Fetch trades for the account
        const trades = await adapter.fetchTrades(accounts[0].id)

        // Store trades in localStorage
        localStorage.setItem(`trades_${accounts[0].id}`, JSON.stringify(trades))

        // Redirect to trading accounts page with success parameter
        router.push("/trading-accounts?newAccount=true")
      } else {
        setError("No accounts found")
      }
    } catch (err) {
      setError("An error occurred while connecting the account")
      console.error("Connection error:", err)
    } finally {
      setIsConnecting(false)
    }
  }, [router, testResult, accessType])

  const handleLoadDemoAccount = useCallback(() => {
    if (nameRef.current) nameRef.current.value = "MT5 Demo Account"
    if (serverRef.current) serverRef.current.value = "MetaQuotes-Demo"
    if (accountNumberRef.current) accountNumberRef.current.value = "1234567"
    if (passwordRef.current) passwordRef.current.value = "demo12345"
    setAccessType("investor")
  }, [])

  const handleLoadTestAccount = useCallback(() => {
    if (nameRef.current) nameRef.current.value = "Alvar Teste"
    if (serverRef.current) serverRef.current.value = "InterTrader-Server"
    if (accountNumberRef.current) accountNumberRef.current.value = "536407"
    if (passwordRef.current) passwordRef.current.value = "password123"
    setAccessType("investor")
  }, [])

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
          <Input id="account-name" ref={nameRef} placeholder="My MT5 Account" disabled={isLoading || isConnecting} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="server">MT5 Server</Label>
          <Input
            id="server"
            ref={serverRef}
            placeholder="e.g., ICMarketsSC-Live"
            disabled={isLoading || isConnecting}
          />
          <p className="text-sm text-muted-foreground">
            You can find this in your MT5 platform under Tools &gt; Options &gt; Server
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
          <Label>Access Type</Label>
          <RadioGroup
            value={accessType}
            onValueChange={(value) => setAccessType(value as "investor" | "full")}
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
          </RadioGroup>
          <p className="text-sm text-muted-foreground">
            {accessType === "investor"
              ? "Read-only access uses your investor password and cannot place trades"
              : "Full access uses your main password and can place trades (use with caution)"}
          </p>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">{accessType === "investor" ? "Investor Password" : "Main Password"}</Label>
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

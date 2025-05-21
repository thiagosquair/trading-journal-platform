"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react"
import { dxtradeApiClient } from "@/lib/api-clients/dxtrade-api-client"

export default function DXtradeAccountConnector() {
  const router = useRouter()
  const [accountType, setAccountType] = useState("live")
  const [isLoading, setIsLoading] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const nameRef = useRef<HTMLInputElement>(null)
  const loginRef = useRef<HTMLInputElement>(null)
  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const apiKeyRef = useRef<HTMLInputElement>(null)

  const handleTestConnection = async () => {
    if (!loginRef.current?.value || !passwordRef.current?.value) {
      setError("Please fill in all required fields")
      return
    }

    setIsLoading(true)
    setError(null)
    setTestResult(null)

    try {
      // Test connection using the API client
      const success = await dxtradeApiClient.authenticate({
        login: loginRef.current.value,
        username: usernameRef.current?.value,
        password: passwordRef.current.value,
        apiKey: apiKeyRef.current?.value,
      })

      if (success) {
        setTestResult({ success: true, message: "Connection successful!" })
      } else {
        setTestResult({ success: false, message: "Invalid credentials. Please check your login and password." })
      }

      // Logout after testing
      await dxtradeApiClient.logout()
    } catch (err) {
      setError("An error occurred while testing the connection")
      console.error("Connection test error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleConnect = async () => {
    if (!nameRef.current?.value || !loginRef.current?.value || !passwordRef.current?.value) {
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
      // Connect using the API client
      const success = await dxtradeApiClient.authenticate({
        login: loginRef.current.value,
        username: usernameRef.current?.value,
        password: passwordRef.current.value,
        apiKey: apiKeyRef.current?.value,
      })

      if (!success) {
        throw new Error("Failed to connect to DXtrade")
      }

      // Get account info
      const accountInfo = await dxtradeApiClient.getAccountInfo()

      // Create account data
      const accountData = {
        id: `dxtrade-${accountInfo.accountId}`,
        name: nameRef.current.value || accountInfo.name,
        platform: "DXtrade",
        accountNumber: accountInfo.accountId,
        balance: accountInfo.balance,
        equity: accountInfo.equity,
        currency: accountInfo.currency,
        leverage: accountInfo.leverage,
        status: "active",
        type: accountType,
        lastUpdated: accountInfo.lastUpdated,
        openPositions: accountInfo.openPositions,
        server: accountInfo.server,
      }

      // Get trades
      const openPositions = await dxtradeApiClient.getOpenPositions()
      const tradeHistory = await dxtradeApiClient.getTradeHistory(
        new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
        new Date(),
      )

      // Convert to our internal format
      const trades = [
        ...openPositions.map((position) => ({
          id: position.id,
          accountId: accountData.id,
          symbol: position.symbol,
          direction: position.type === "buy" ? "long" : "short",
          openTime: position.openTime,
          closeTime: position.closeTime,
          openPrice: position.openPrice,
          closePrice: position.closePrice,
          size: position.volume,
          profit: position.profit,
          status: position.closePrice ? "closed" : "open",
          stopLoss: position.stopLoss || undefined,
          takeProfit: position.takeProfit || undefined,
        })),
        ...tradeHistory.map((trade) => ({
          id: trade.id,
          accountId: accountData.id,
          symbol: trade.symbol,
          direction: trade.type === "buy" ? "long" : "short",
          openTime: trade.openTime,
          closeTime: trade.closeTime,
          openPrice: trade.openPrice,
          closePrice: trade.closePrice,
          size: trade.volume,
          profit: trade.profit,
          status: trade.closePrice ? "closed" : "open",
          stopLoss: trade.stopLoss || undefined,
          takeProfit: trade.takeProfit || undefined,
        })),
      ]

      // Save to localStorage for demo purposes
      const existingAccounts = JSON.parse(localStorage.getItem("tradingAccounts") || "[]")
      existingAccounts.push(accountData)
      localStorage.setItem("tradingAccounts", JSON.stringify(existingAccounts))
      localStorage.setItem(`trades_${accountData.id}`, JSON.stringify(trades))

      // Logout after saving data
      await dxtradeApiClient.logout()

      // Redirect to trading accounts page
      router.push("/trading-accounts?newAccount=true")
    } catch (err) {
      setError("An error occurred while connecting the account")
      console.error("Connection error:", err)
    } finally {
      setIsConnecting(false)
    }
  }

  const handleLoadYourAccount = () => {
    if (nameRef.current) nameRef.current.value = "DXtrade Pro Account"
    if (loginRef.current) loginRef.current.value = "634733"
    if (usernameRef.current) usernameRef.current.value = "fff_C12024"
    if (passwordRef.current) passwordRef.current.value = "" // User needs to enter their password
    if (apiKeyRef.current) apiKeyRef.current.value = ""
    setAccountType("live")
  }

  const handleLoadTestAccount = () => {
    if (nameRef.current) nameRef.current.value = "DXtrade Test Account"
    if (loginRef.current) loginRef.current.value = "dxtest"
    if (usernameRef.current) usernameRef.current.value = ""
    if (passwordRef.current) passwordRef.current.value = "dxpassword"
    if (apiKeyRef.current) apiKeyRef.current.value = ""
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
          <Input
            id="account-name"
            ref={nameRef}
            placeholder="My DXtrade Account"
            disabled={isLoading || isConnecting}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="login">Login/Account Number</Label>
          <Input
            id="login"
            ref={loginRef}
            placeholder="Your DXtrade login or account number"
            disabled={isLoading || isConnecting}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="username">Username (Optional)</Label>
          <Input
            id="username"
            ref={usernameRef}
            placeholder="Your DXtrade username"
            disabled={isLoading || isConnecting}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            ref={passwordRef}
            placeholder="Your DXtrade password"
            disabled={isLoading || isConnecting}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="api-key">API Key (Optional)</Label>
          <Input id="api-key" ref={apiKeyRef} placeholder="Your DXtrade API key" disabled={isLoading || isConnecting} />
          <p className="text-sm text-muted-foreground">
            API key is optional and may be required for some DXtrade brokers
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
        <Button variant="outline" onClick={handleLoadYourAccount} disabled={isLoading || isConnecting}>
          Load Your Account
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

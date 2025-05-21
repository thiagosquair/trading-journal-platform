"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react"

// MatchTrader API integration
const connectToMatchTrader = async (credentials: any) => {
  try {
    // In a production environment, this would make a real API call
    // For now, we'll simulate the API call for development purposes
    console.log("Connecting to MatchTrader with credentials:", credentials)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Validate credentials
    if (credentials.username !== "matchtest" && credentials.password !== "matchpassword") {
      return { success: false, message: "Invalid credentials. Please check your username and password." }
    }

    return { success: true, message: "Connection successful!" }
  } catch (error) {
    console.error("MatchTrader connection error:", error)
    return { success: false, message: "Connection failed. Please try again." }
  }
}

const fetchMatchTraderAccountData = async (credentials: any) => {
  try {
    // In a production environment, this would make a real API call
    console.log("Fetching MatchTrader account data for:", credentials.username)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Return mock data for now
    return {
      id: `matchtrader-${Date.now()}`,
      name: credentials.name || "MatchTrader Account",
      platform: "MatchTrader",
      accountNumber: credentials.username,
      balance: 25000,
      equity: 25150,
      currency: "EUR",
      leverage: "1:20",
      status: "active",
      type: credentials.accountType,
      lastUpdated: new Date().toISOString(),
      openPositions: 2,
    }
  } catch (error) {
    console.error("Error fetching MatchTrader account data:", error)
    throw error
  }
}

const fetchMatchTraderTrades = async (accountId: string) => {
  try {
    // In a production environment, this would make a real API call
    console.log("Fetching MatchTrader trades for account:", accountId)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1200))

    // Generate some realistic trades
    const trades = [
      {
        id: `matchtrader-trade-${Date.now()}-1`,
        accountId,
        symbol: "EURUSD",
        direction: "long",
        openPrice: 1.0825,
        closePrice: null,
        openTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        closeTime: null,
        size: 0.5,
        profit: 75,
        status: "open",
        stopLoss: 1.0775,
        takeProfit: 1.0925,
      },
      {
        id: `matchtrader-trade-${Date.now()}-2`,
        accountId,
        symbol: "DAX40",
        direction: "short",
        openPrice: 18250.5,
        closePrice: 18200.0,
        openTime: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        closeTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        size: 0.1,
        profit: 505,
        status: "closed",
        stopLoss: 18300.0,
        takeProfit: 18150.0,
      },
    ]

    return trades
  } catch (error) {
    console.error("Error fetching MatchTrader trades:", error)
    throw error
  }
}

export default function MatchTraderAccountConnector() {
  const router = useRouter()
  const [accountType, setAccountType] = useState("live")
  const [isLoading, setIsLoading] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const nameRef = useRef<HTMLInputElement>(null)
  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const serverRef = useRef<HTMLInputElement>(null)

  const handleTestConnection = async () => {
    if (!usernameRef.current?.value || !passwordRef.current?.value || !serverRef.current?.value) {
      setError("Please fill in all required fields")
      return
    }

    setIsLoading(true)
    setError(null)
    setTestResult(null)

    try {
      const result = await connectToMatchTrader({
        username: usernameRef.current.value,
        password: passwordRef.current.value,
        server: serverRef.current.value,
        accountType,
      })

      setTestResult(result)
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
      !usernameRef.current?.value ||
      !passwordRef.current?.value ||
      !serverRef.current?.value
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
      // Get account data
      const accountData = await fetchMatchTraderAccountData({
        name: nameRef.current.value,
        username: usernameRef.current.value,
        password: passwordRef.current.value,
        server: serverRef.current.value,
        accountType,
      })

      // Get trades
      const trades = await fetchMatchTraderTrades(accountData.id)

      // Save to localStorage for demo purposes
      const existingAccounts = JSON.parse(localStorage.getItem("tradingAccounts") || "[]")
      existingAccounts.push(accountData)
      localStorage.setItem("tradingAccounts", JSON.stringify(existingAccounts))
      localStorage.setItem(`trades_${accountData.id}`, JSON.stringify(trades))

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
    if (nameRef.current) nameRef.current.value = "MatchTrader Demo Account"
    if (usernameRef.current) usernameRef.current.value = "matchtest"
    if (passwordRef.current) passwordRef.current.value = "matchpassword"
    if (serverRef.current) serverRef.current.value = "demo.matchtrader.com"
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
            placeholder="My MatchTrader Account"
            disabled={isLoading || isConnecting}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="server">Server</Label>
          <Input
            id="server"
            ref={serverRef}
            placeholder="e.g., demo.matchtrader.com"
            disabled={isLoading || isConnecting}
          />
          <p className="text-sm text-muted-foreground">
            You can find this in your MatchTrader platform settings or from your broker
          </p>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            ref={usernameRef}
            placeholder="Your MatchTrader username"
            disabled={isLoading || isConnecting}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            ref={passwordRef}
            placeholder="Your MatchTrader password"
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

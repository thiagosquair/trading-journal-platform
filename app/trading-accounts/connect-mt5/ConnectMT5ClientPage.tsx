"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ConnectMT5ClientPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isTestingConnection, setIsTestingConnection] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  // Form state
  const [accountName, setAccountName] = useState("")
  const [server, setServer] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [password, setPassword] = useState("")
  const [accountType, setAccountType] = useState("demo")

  const handleLoadTestAccount = () => {
    setAccountName("Demo MT5 Account")
    setServer("Demo.MT5Server.com")
    setAccountNumber("12345678")
    setPassword("demopassword")
    setAccountType("demo")
  }

  const handleTestConnection = useCallback(async () => {
    if (!accountName.trim() || !server.trim() || !accountNumber.trim() || !password.trim()) {
      setConnectionStatus("error")
      setErrorMessage("Please fill in all fields")
      return
    }

    setIsTestingConnection(true)
    setConnectionStatus("idle")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulate successful connection
      setConnectionStatus("success")
    } catch (error) {
      setConnectionStatus("error")
      setErrorMessage("Failed to connect to the server. Please check your credentials and try again.")
    } finally {
      setIsTestingConnection(false)
    }
  }, [accountName, server, accountNumber, password])

  const handleConnectAccount = useCallback(async () => {
    if (!accountName.trim() || !server.trim() || !accountNumber.trim() || !password.trim()) {
      setConnectionStatus("error")
      setErrorMessage("Please fill in all fields")
      return
    }

    if (connectionStatus !== "success") {
      setConnectionStatus("error")
      setErrorMessage("Please test the connection first")
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Create a new account object
      const newAccount = {
        id: Date.now().toString(),
        name: accountName,
        platform: "MetaTrader 5",
        server,
        accountNumber,
        accountType,
        status: "active",
        balance: 10000,
        equity: 10250,
        currency: "USD",
        leverage: "1:100",
        lastUpdated: new Date().toISOString(),
      }

      // Get existing accounts from localStorage
      const existingAccounts = JSON.parse(localStorage.getItem("tradingAccounts") || "[]")

      // Add the new account
      localStorage.setItem("tradingAccounts", JSON.stringify([...existingAccounts, newAccount]))

      // Redirect to the trading accounts page
      router.push("/trading-accounts")
    } catch (error) {
      setConnectionStatus("error")
      setErrorMessage("Failed to connect the account. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }, [accountName, server, accountNumber, password, connectionStatus, router])

  return (
    <div className="container mx-auto py-8 max-w-3xl">
      <div className="mb-6">
        <Button variant="outline" size="sm" asChild>
          <a href="/trading-accounts">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Trading Accounts
          </a>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Connect MetaTrader 5 Account</CardTitle>
          <CardDescription>Enter your MT5 account details to connect to your trading account</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="manual" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="manual">Manual Connection</TabsTrigger>
              <TabsTrigger value="auto">Auto-Detect (Coming Soon)</TabsTrigger>
            </TabsList>
            <TabsContent value="manual" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="accountName">Account Name</Label>
                  <Input
                    id="accountName"
                    placeholder="My MT5 Account"
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountType">Account Type</Label>
                  <Select value={accountType} onValueChange={setAccountType}>
                    <SelectTrigger id="accountType">
                      <SelectValue placeholder="Select account type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="demo">Demo</SelectItem>
                      <SelectItem value="live">Live</SelectItem>
                      <SelectItem value="prop">Prop Firm</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="server">Server</Label>
                <Input
                  id="server"
                  placeholder="demo.metatrader5.com"
                  value={server}
                  onChange={(e) => setServer(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input
                    id="accountNumber"
                    placeholder="12345678"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {connectionStatus === "success" && (
                <Alert className="bg-green-50 border-green-200">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-600">
                    Connection successful! Your account is ready to be connected.
                  </AlertDescription>
                </Alert>
              )}

              {connectionStatus === "error" && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}

              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={handleLoadTestAccount}>
                  Load Test Account
                </Button>
                <Button variant="secondary" onClick={handleTestConnection} disabled={isTestingConnection}>
                  {isTestingConnection ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Testing...
                    </>
                  ) : (
                    "Test Connection"
                  )}
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="auto" className="py-4">
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  Auto-detection of MT5 accounts will be available in a future update.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleConnectAccount} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              "Connect Account"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

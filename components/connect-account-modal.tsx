"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertCircle, CheckCircle } from "lucide-react"

interface ConnectAccountModalProps {
  isOpen: boolean
  onClose: () => void
  onConnect: () => void
  initialPlatform: string | null
}

export default function ConnectAccountModal({ isOpen, onClose, onConnect, initialPlatform }: ConnectAccountModalProps) {
  const [platform, setPlatform] = useState(initialPlatform || "mt4")
  const [isLoading, setIsLoading] = useState(false)
  const [isTestingConnection, setIsTestingConnection] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null)

  // Use refs for form values to avoid re-renders
  const nameRef = useRef<HTMLInputElement>(null)
  const serverRef = useRef<HTMLInputElement>(null)
  const accountNumberRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const [accessType, setAccessType] = useState("read-only")

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setError(null)
      setTestResult(null)

      // Set platform if initialPlatform is provided
      if (initialPlatform) {
        setPlatform(initialPlatform)
      }
    }
  }, [isOpen, initialPlatform])

  // Handle platform change
  const handlePlatformChange = useCallback((value: string) => {
    setPlatform(value)
    setError(null)
    setTestResult(null)
  }, [])

  // Test connection
  const handleTestConnection = useCallback(async () => {
    if (
      !nameRef.current?.value ||
      !serverRef.current?.value ||
      !accountNumberRef.current?.value ||
      !passwordRef.current?.value
    ) {
      setError("Please fill in all fields")
      return
    }

    setIsTestingConnection(true)
    setError(null)
    setTestResult(null)

    try {
      // Simulate API call for demo
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setTestResult({
        success: true,
        message: `Connection successful! Your ${platform.toUpperCase()} account is ready to connect.`,
      })
    } catch (err: any) {
      setError(err.message || "Failed to test connection")
    } finally {
      setIsTestingConnection(false)
    }
  }, [platform])

  // Connect account
  const handleConnect = useCallback(async () => {
    if (
      !nameRef.current?.value ||
      !serverRef.current?.value ||
      !accountNumberRef.current?.value ||
      !passwordRef.current?.value
    ) {
      setError("Please fill in all fields")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Create account object with proper structure
      const accountData = {
        id: `acc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: nameRef.current.value,
        platform: platform.toUpperCase(),
        broker: `${platform.toUpperCase()} Broker`,
        server: serverRef.current.value,
        accountNumber: accountNumberRef.current.value,
        password: passwordRef.current.value,
        accessType: accessType,
        status: "active",
        balance: 10000 + Math.random() * 50000, // Random demo balance
        equity: 10000 + Math.random() * 50000,
        openPL: (Math.random() - 0.5) * 1000,
        currency: "USD",
        lastUpdated: new Date().toISOString(),
        lastSynced: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      }

      console.log("Creating account:", accountData)

      // Get existing accounts from localStorage
      const existingAccounts = JSON.parse(localStorage.getItem("tradingAccounts") || "[]")
      console.log("Existing accounts:", existingAccounts)

      // Add new account
      const updatedAccounts = [...existingAccounts, accountData]
      console.log("Updated accounts:", updatedAccounts)

      // Save to localStorage
      localStorage.setItem("tradingAccounts", JSON.stringify(updatedAccounts))

      // Verify it was saved
      const savedAccounts = JSON.parse(localStorage.getItem("tradingAccounts") || "[]")
      console.log("Verified saved accounts:", savedAccounts)

      // Call the onConnect callback to refresh the parent component
      onConnect()

      // Close modal
      onClose()

      // Show success message
      alert(`Successfully connected ${accountData.name}!`)
    } catch (err: any) {
      console.error("Error connecting account:", err)
      setError(err.message || "Failed to connect account")
    } finally {
      setIsLoading(false)
    }
  }, [platform, onConnect, onClose, accessType])

  // Load demo account
  const handleLoadDemoAccount = useCallback(() => {
    const platformUpper = platform.toUpperCase()

    if (nameRef.current) nameRef.current.value = `Demo ${platformUpper} Account`

    if (["mt4", "mt5"].includes(platform)) {
      if (serverRef.current) serverRef.current.value = `Demo.${platformUpper}Server.com`
      if (accountNumberRef.current) accountNumberRef.current.value = "12345678"
      if (passwordRef.current) passwordRef.current.value = "demo-password"
    } else {
      // For API-based platforms
      if (serverRef.current) serverRef.current.value = "demo_api_key_12345"
      if (accountNumberRef.current) accountNumberRef.current.value = `${platform.toUpperCase()}12345`
      if (passwordRef.current) passwordRef.current.value = "demo_secret_key_67890"
    }

    setAccessType("read-only")
  }, [platform])

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Connect Trading Account</DialogTitle>
          <DialogDescription>
            Connect your trading account to track performance and analyze your trades.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={platform} onValueChange={handlePlatformChange} className="mt-4">
          <TabsList className="grid grid-cols-5">
            <TabsTrigger value="mt4">MT4</TabsTrigger>
            <TabsTrigger value="mt5">MT5</TabsTrigger>
            <TabsTrigger value="ctrader">cTrader</TabsTrigger>
            <TabsTrigger value="tradingview">TradingView</TabsTrigger>
            <TabsTrigger value="tradelocker">TradeLocker</TabsTrigger>
          </TabsList>

          {["mt4", "mt5"].map((platformType) => (
            <TabsContent key={platformType} value={platformType} className="space-y-4 mt-4">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor={`${platformType}-account-name`}>Account Name</Label>
                  <Input
                    id={`${platformType}-account-name`}
                    placeholder={`My ${platformType.toUpperCase()} Account`}
                    ref={nameRef}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor={`${platformType}-server`}>{platformType.toUpperCase()} Server</Label>
                  <Input
                    id={`${platformType}-server`}
                    placeholder={`broker.${platformType}server.com`}
                    ref={serverRef}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor={`${platformType}-account-number`}>Account Number/Login</Label>
                  <Input id={`${platformType}-account-number`} placeholder="12345678" ref={accountNumberRef} />
                </div>

                <div className="space-y-2">
                  <Label>Access Type</Label>
                  <RadioGroup value={accessType} onValueChange={setAccessType}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="read-only" id={`${platformType}-read-only`} />
                      <Label htmlFor={`${platformType}-read-only`} className="font-normal">
                        Read-Only (Investor Password)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="full-access" id={`${platformType}-full-access`} />
                      <Label htmlFor={`${platformType}-full-access`} className="font-normal">
                        Full Access (Main Password)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor={`${platformType}-password`}>Password</Label>
                  <Input id={`${platformType}-password`} type="password" placeholder="••••••••" ref={passwordRef} />
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {testResult && (
                  <Alert variant={testResult.success ? "default" : "destructive"}>
                    {testResult.success ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                    <AlertDescription>{testResult.message}</AlertDescription>
                  </Alert>
                )}

                <div className="flex justify-between">
                  <Button variant="outline" onClick={handleLoadDemoAccount}>
                    Load Demo Account
                  </Button>
                  <Button variant="outline" onClick={handleTestConnection} disabled={isTestingConnection}>
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
              </div>
            </TabsContent>
          ))}

          {["ctrader", "tradingview", "tradelocker"].map((platformType) => (
            <TabsContent key={platformType} value={platformType} className="space-y-4 mt-4">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor={`${platformType}-account-name`}>Account Name</Label>
                  <Input
                    id={`${platformType}-account-name`}
                    placeholder={`My ${
                      platformType === "ctrader"
                        ? "cTrader"
                        : platformType === "tradingview"
                          ? "TradingView"
                          : "TradeLocker"
                    } Account`}
                    ref={nameRef}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor={`${platformType}-api-key`}>API Key</Label>
                  <Input
                    id={`${platformType}-api-key`}
                    placeholder={`Your ${
                      platformType === "ctrader"
                        ? "cTrader"
                        : platformType === "tradingview"
                          ? "TradingView"
                          : "TradeLocker"
                    } API Key`}
                    ref={serverRef}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor={`${platformType}-account-id`}>Account ID</Label>
                  <Input
                    id={`${platformType}-account-id`}
                    placeholder={`${platformType === "ctrader" ? "CT" : platformType === "tradingview" ? "TV" : "TL"}12345`}
                    ref={accountNumberRef}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor={`${platformType}-secret-key`}>Secret Key</Label>
                  <Input id={`${platformType}-secret-key`} type="password" placeholder="••••••••" ref={passwordRef} />
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {testResult && (
                  <Alert variant={testResult.success ? "default" : "destructive"}>
                    {testResult.success ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                    <AlertDescription>{testResult.message}</AlertDescription>
                  </Alert>
                )}

                <div className="flex justify-between">
                  <Button variant="outline" onClick={handleLoadDemoAccount}>
                    Load Demo Account
                  </Button>
                  <Button variant="outline" onClick={handleTestConnection} disabled={isTestingConnection}>
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
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
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
      </DialogContent>
    </Dialog>
  )
}

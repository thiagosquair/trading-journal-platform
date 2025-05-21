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
import { connectTradingAccount, testConnection } from "@/lib/trading-actions"

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
  const accessTypeRef = useRef<string>("read-only")

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

  // Handle access type change
  const handleAccessTypeChange = useCallback((value: string) => {
    accessTypeRef.current = value
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
      const result = await testConnection({
        platform,
        server: serverRef.current.value,
        accountNumber: accountNumberRef.current.value,
        password: passwordRef.current.value,
        accessType: accessTypeRef.current,
      })

      setTestResult(result)
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
      await connectTradingAccount({
        name: nameRef.current.value,
        platform,
        server: serverRef.current.value,
        accountNumber: accountNumberRef.current.value,
        password: passwordRef.current.value,
        accessType: accessTypeRef.current,
      })

      onConnect()
      onClose()
    } catch (err: any) {
      setError(err.message || "Failed to connect account")
    } finally {
      setIsLoading(false)
    }
  }, [platform, onConnect, onClose])

  // Load demo account
  const handleLoadDemoAccount = useCallback(() => {
    if (nameRef.current) nameRef.current.value = "Demo MT4 Account"
    if (serverRef.current) serverRef.current.value = "Demo.MT4Server.com"
    if (accountNumberRef.current) accountNumberRef.current.value = "12345678"
    if (passwordRef.current) passwordRef.current.value = "demo-password"
    accessTypeRef.current = "read-only"
  }, [])

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
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="mt4">MT4</TabsTrigger>
            <TabsTrigger value="tradingview">TradingView</TabsTrigger>
            <TabsTrigger value="tradelocker">TradeLocker</TabsTrigger>
          </TabsList>

          <TabsContent value="mt4" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="account-name">Account Name</Label>
                <Input id="account-name" placeholder="My MT4 Account" ref={nameRef} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="mt4-server">MT4 Server</Label>
                <Input id="mt4-server" placeholder="broker.mt4server.com" ref={serverRef} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="account-number">Account Number/Login</Label>
                <Input id="account-number" placeholder="12345678" ref={accountNumberRef} />
              </div>

              <div className="space-y-2">
                <Label>Access Type</Label>
                <RadioGroup defaultValue="read-only" onValueChange={handleAccessTypeChange}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="read-only" id="read-only" />
                    <Label htmlFor="read-only" className="font-normal">
                      Read-Only (Investor Password)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="full-access" id="full-access" />
                    <Label htmlFor="full-access" className="font-normal">
                      Full Access (Main Password)
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="••••••••" ref={passwordRef} />
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

          <TabsContent value="tradingview" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="tv-account-name">Account Name</Label>
                <Input id="tv-account-name" placeholder="My TradingView Account" ref={nameRef} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="tv-api-key">API Key</Label>
                <Input id="tv-api-key" placeholder="Your TradingView API Key" ref={serverRef} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="tv-secret-key">Secret Key</Label>
                <Input id="tv-secret-key" type="password" placeholder="••••••••" ref={passwordRef} />
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

              <div className="flex justify-end">
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

          <TabsContent value="tradelocker" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="tl-account-name">Account Name</Label>
                <Input id="tl-account-name" placeholder="My TradeLocker Account" ref={nameRef} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="tl-api-key">API Key</Label>
                <Input id="tl-api-key" placeholder="Your TradeLocker API Key" ref={serverRef} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="tl-account-id">Account ID</Label>
                <Input id="tl-account-id" placeholder="TL12345" ref={accountNumberRef} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="tl-secret-key">Secret Key</Label>
                <Input id="tl-secret-key" type="password" placeholder="••••••••" ref={passwordRef} />
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

              <div className="flex justify-end">
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

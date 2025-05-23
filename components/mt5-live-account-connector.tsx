"use client"

import { useState, useCallback, useRef } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { connectTradingAccount, testPlatformConnection } from "@/lib/trading-actions"
import { AlertCircle, CheckCircle2, Loader2, Shield, Key } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useRouter } from "next/navigation"

export default function MT5LiveAccountConnector({ onSuccess }: { onSuccess?: () => void }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isTesting, setIsTesting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null)

  // Use refs instead of state for form values to prevent re-renders
  const accountNameRef = useRef<HTMLInputElement>(null)
  const serverRef = useRef<HTMLInputElement>(null)
  const loginRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const investorPasswordRef = useRef<HTMLInputElement>(null)
  const accessTypeRef = useRef<string>("investor")

  // Handle access type change
  const handleAccessTypeChange = useCallback((value: string) => {
    accessTypeRef.current = value
  }, [])

  // Test connection
  const handleTestConnection = useCallback(async () => {
    // Get current values from refs
    const server = serverRef.current?.value || ""
    const login = loginRef.current?.value || ""
    const password = accessTypeRef.current === "full" ? passwordRef.current?.value || "" : ""
    const investorPassword = accessTypeRef.current === "investor" ? investorPasswordRef.current?.value || "" : ""

    // Validate fields
    if (
      !server ||
      !login ||
      (accessTypeRef.current === "full" && !password) ||
      (accessTypeRef.current === "investor" && !investorPassword)
    ) {
      setError("Please fill in all required fields")
      return
    }

    setIsTesting(true)
    setError(null)
    setTestResult(null)

    try {
      const result = await testPlatformConnection({
        platform: "mt5",
        name: accountNameRef.current?.value || "MT5 Account",
        server,
        login,
        password,
        investorPassword,
      })

      setTestResult({
        success: result.success,
        message: result.message || (result.success ? "Connection successful!" : "Connection failed"),
      })
    } catch (err: any) {
      setTestResult({
        success: false,
        message: err.message || "Connection test failed",
      })
    } finally {
      setIsTesting(false)
    }
  }, [])

  // Connect account
  const handleConnect = useCallback(async () => {
    // Get current values from refs
    const accountName = accountNameRef.current?.value || ""
    const server = serverRef.current?.value || ""
    const login = loginRef.current?.value || ""
    const password = accessTypeRef.current === "full" ? passwordRef.current?.value || "" : ""
    const investorPassword = accessTypeRef.current === "investor" ? investorPasswordRef.current?.value || "" : ""

    // Validate fields
    if (!accountName) {
      setError("Please enter an account name")
      return
    }

    if (
      !server ||
      !login ||
      (accessTypeRef.current === "full" && !password) ||
      (accessTypeRef.current === "investor" && !investorPassword)
    ) {
      setError("Please fill in all required fields")
      return
    }

    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      await connectTradingAccount({
        platform: "mt5",
        name: accountName,
        server,
        login,
        password,
        investorPassword,
      })

      setSuccess("Account connected successfully!")

setTimeout(() => {
  if (onSuccess) {
    onSuccess()
  } else {
    router.push("/trading-accounts")
  }
}, 1500)

    } catch (err: any) {
      setError(err.message || "Failed to connect account")
    } finally {
      setIsLoading(false)
    }
  }, [router])

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Connect Live MT5 Account</CardTitle>
        <CardDescription>
          Enter your MetaTrader 5 account details to connect and track your trading performance
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert variant="default" className="bg-green-50 border-green-200">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-600">{success}</AlertDescription>
          </Alert>
        )}

        {testResult && (
          <Alert
            variant={testResult.success ? "default" : "destructive"}
            className={testResult.success ? "bg-green-50 border-green-200" : undefined}
          >
            {testResult.success ? (
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            <AlertDescription className={testResult.success ? "text-green-600" : undefined}>
              {testResult.message}
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="account-name">Account Name</Label>
            <Input
              id="account-name"
              ref={accountNameRef}
              placeholder="My Live MT5 Account"
              defaultValue="Live MT5 Account"
            />
            <p className="text-sm text-muted-foreground">A recognizable name for this account</p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="server">MT5 Server</Label>
            <Input id="server" ref={serverRef} placeholder="e.g., ICMarketsSC-Live" />
            <p className="text-sm text-muted-foreground">Your broker's MT5 server address</p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="login">Account Number/Login</Label>
            <Input id="login" ref={loginRef} placeholder="e.g., 12345678" />
            <p className="text-sm text-muted-foreground">Your MT5 account number</p>
          </div>

          <div className="space-y-3">
            <Label>Access Type</Label>
            <RadioGroup defaultValue="investor" onValueChange={handleAccessTypeChange}>
              <div className="flex items-start space-x-2 p-2 border rounded-md">
                <RadioGroupItem value="investor" id="investor" />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="investor" className="flex items-center">
                    <Shield className="h-4 w-4 mr-2 text-green-600" />
                    Read-Only Access (Recommended)
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Uses investor password for safe, view-only access to your account data
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-2 p-2 border rounded-md">
                <RadioGroupItem value="full" id="full" />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="full" className="flex items-center">
                    <Key className="h-4 w-4 mr-2 text-amber-600" />
                    Full Access
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Uses main password. Only use if you need trading capabilities.
                  </p>
                </div>
              </div>
            </RadioGroup>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">
              {accessTypeRef.current === "investor" ? "Investor Password" : "Main Password"}
            </Label>
            <Input
              id="password"
              type="password"
              ref={accessTypeRef.current === "investor" ? investorPasswordRef : passwordRef}
              placeholder={accessTypeRef.current === "investor" ? "Investor password" : "Main password"}
            />
            <p className="text-sm text-muted-foreground">
              {accessTypeRef.current === "investor"
                ? "Your MT5 investor password for read-only access"
                : "Your MT5 main password (use with caution)"}
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleTestConnection} disabled={isTesting || isLoading}>
          {isTesting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Testing...
            </>
          ) : (
            "Test Connection"
          )}
        </Button>

        <Button onClick={handleConnect} disabled={isLoading || isTesting}>
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
  )
}

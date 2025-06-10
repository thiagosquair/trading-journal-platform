"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"

interface TradovateAccountConnectorProps {
  onAccountConnected?: (accountData: any) => void
}

export function TradovateAccountConnector({ onAccountConnected }: TradovateAccountConnectorProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [appId, setAppId] = useState("")
  const [appVersion, setAppVersion] = useState("1.0")
  const [isLoading, setIsLoading] = useState(false)
  const [testSuccess, setTestSuccess] = useState(false)
  const [testError, setTestError] = useState("")
  const [connectSuccess, setConnectSuccess] = useState(false)
  const [connectError, setConnectError] = useState("")

  const handleTestConnection = async () => {
    if (!username || !password) {
      setTestError("Username and password are required")
      setTestSuccess(false)
      return
    }

    setIsLoading(true)
    setTestError("")
    setTestSuccess(false)

    try {
      const response = await fetch("/api/tradovate/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          appId,
          appVersion,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setTestSuccess(true)
      } else {
        setTestError(data.error || "Connection test failed")
      }
    } catch (error) {
      setTestError("An error occurred while testing the connection")
      console.error("Error testing Tradovate connection:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleConnectAccount = async () => {
    if (!username || !password) {
      setConnectError("Username and password are required")
      setConnectSuccess(false)
      return
    }

    setIsLoading(true)
    setConnectError("")
    setConnectSuccess(false)

    try {
      const response = await fetch("/api/tradovate/connect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          appId,
          appVersion,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setConnectSuccess(true)
        if (onAccountConnected) {
          onAccountConnected(data)
        }
      } else {
        setConnectError(data.error || "Failed to connect account")
      }
    } catch (error) {
      setConnectError("An error occurred while connecting the account")
      console.error("Error connecting Tradovate account:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLoadTestCredentials = () => {
    setUsername("tradovate_demo")
    setPassword("demo_password")
    setAppId("TradingJournal")
    setAppVersion("1.0")
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Connect Tradovate Account</CardTitle>
        <CardDescription>Enter your Tradovate credentials to connect your account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Your Tradovate username"
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your Tradovate password"
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="appId">App ID (Optional)</Label>
          <Input
            id="appId"
            value={appId}
            onChange={(e) => setAppId(e.target.value)}
            placeholder="Your application ID"
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="appVersion">App Version</Label>
          <Input
            id="appVersion"
            value={appVersion}
            onChange={(e) => setAppVersion(e.target.value)}
            placeholder="1.0"
            disabled={isLoading}
          />
        </div>

        {testSuccess && (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Success</AlertTitle>
            <AlertDescription className="text-green-700">Connection to Tradovate successful!</AlertDescription>
          </Alert>
        )}

        {testError && (
          <Alert className="bg-red-50 border-red-200">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertTitle className="text-red-800">Error</AlertTitle>
            <AlertDescription className="text-red-700">{testError}</AlertDescription>
          </Alert>
        )}

        {connectSuccess && (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Success</AlertTitle>
            <AlertDescription className="text-green-700">Account connected successfully!</AlertDescription>
          </Alert>
        )}

        {connectError && (
          <Alert className="bg-red-50 border-red-200">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertTitle className="text-red-800">Error</AlertTitle>
            <AlertDescription className="text-red-700">{connectError}</AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <div className="flex space-x-2 w-full">
          <Button variant="outline" onClick={handleLoadTestCredentials} disabled={isLoading} className="flex-1">
            Load Test Credentials
          </Button>
          <Button variant="outline" onClick={handleTestConnection} disabled={isLoading} className="flex-1">
            {isLoading && testError === "" && testSuccess === false ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Test Connection
          </Button>
        </div>
        <Button onClick={handleConnectAccount} disabled={isLoading || !testSuccess} className="w-full">
          {isLoading && connectError === "" && connectSuccess === false ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          Connect Account
        </Button>
      </CardFooter>
    </Card>
  )
}

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, AlertCircle, ArrowRight, Loader2 } from "lucide-react"
import ConnectAccountModal from "@/components/connect-account-modal"
import { connectTradingAccount } from "@/lib/trading-actions"

export default function MT4DemoWalkthrough() {
  const router = useRouter()
  const [step, setStep] = useState<number>(1)
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<"idle" | "connecting" | "success" | "error">("idle")
  const [accountId, setAccountId] = useState<string | null>(null)

  const handleConnect = async () => {
    setConnectionStatus("connecting")
    setIsConnecting(true)

    try {
      // Create the credentials object for the OANDA MT4 demo
      const credentials = {
        platform: "mt4",
        name: "OANDA MT4 Demo",
        broker: "OANDA",
        server: "OANDA-Demo-1",
        login: "7890179",
        password: "wibf2xk",
        investorPassword: "q7oilpa",
      }

      // Connect the account
      const account = await connectTradingAccount(credentials)
      setAccountId(account.id)
      setConnectionStatus("success")
      setStep(3)
    } catch (error) {
      console.error("Connection error:", error)
      setConnectionStatus("error")
    } finally {
      setIsConnecting(false)
      setIsConnectModalOpen(false)
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Connect OANDA MT4 Demo Account</CardTitle>
              <CardDescription>We'll connect a pre-configured MetaTrader 4 demo account from OANDA</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted p-4 rounded-md">
                <h3 className="font-medium mb-2">Account Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium">Platform</p>
                    <p className="text-muted-foreground">MetaTrader 4</p>
                  </div>
                  <div>
                    <p className="font-medium">Broker</p>
                    <p className="text-muted-foreground">OANDA</p>
                  </div>
                  <div>
                    <p className="font-medium">Server</p>
                    <p className="text-muted-foreground">OANDA-Demo-1</p>
                  </div>
                  <div>
                    <p className="font-medium">Login</p>
                    <p className="text-muted-foreground">7890179</p>
                  </div>
                  <div>
                    <p className="font-medium">Password</p>
                    <p className="text-muted-foreground">•••••••</p>
                  </div>
                  <div>
                    <p className="font-medium">Investor Password</p>
                    <p className="text-muted-foreground">•••••••</p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                This is a demo account with simulated data. In a production environment, you would connect to your
                actual trading account with real credentials.
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => router.push("/trading-accounts")}>
                Back to Accounts
              </Button>
              <Button onClick={() => setStep(2)}>
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )
      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Ready to Connect</CardTitle>
              <CardDescription>The system will now attempt to connect to the OANDA MT4 demo account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="bg-blue-50 border-blue-200">
                <AlertCircle className="h-5 w-5 text-blue-600" />
                <AlertTitle>What happens next?</AlertTitle>
                <AlertDescription>
                  When you click "Connect Account", the system will:
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Attempt to connect to the MetaTrader 4 platform</li>
                    <li>Retrieve account information and balance</li>
                    <li>Import recent trading history</li>
                    <li>Calculate performance metrics</li>
                  </ul>
                </AlertDescription>
              </Alert>
              <p className="text-sm text-muted-foreground">
                In this demo, we're simulating the connection process. In a real implementation, this would connect to
                the actual MT4 API.
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button onClick={handleConnect} disabled={isConnecting}>
                {isConnecting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    Connect Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        )
      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Connection Successful!</CardTitle>
              <CardDescription>The OANDA MT4 demo account has been connected to your trading journal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {connectionStatus === "success" ? (
                <Alert className="bg-green-50 border-green-200">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <AlertTitle>Account Connected</AlertTitle>
                  <AlertDescription>
                    Your OANDA MT4 demo account has been successfully connected. You can now view your account details,
                    trades, and performance metrics.
                  </AlertDescription>
                </Alert>
              ) : (
                <Alert variant="destructive">
                  <AlertCircle className="h-5 w-5" />
                  <AlertTitle>Connection Failed</AlertTitle>
                  <AlertDescription>
                    There was an error connecting to the OANDA MT4 demo account. Please try again.
                  </AlertDescription>
                </Alert>
              )}
              <div className="bg-muted p-4 rounded-md">
                <h3 className="font-medium mb-2">What you can do now:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>View account balance and equity</li>
                  <li>Browse your trading history</li>
                  <li>Analyze performance metrics</li>
                  <li>Sync your account to get the latest data</li>
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => router.push("/trading-accounts")}>
                Back to Accounts
              </Button>
              <Button onClick={() => router.push(`/trading-accounts/${accountId || "mt4-demo"}`)}>
                View Account Details
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto py-6 space-y-8 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">OANDA MT4 Demo Connection</h1>
        <p className="text-muted-foreground mt-1">Follow these steps to connect the OANDA MetaTrader 4 demo account</p>
      </div>

      {renderStep()}

      <ConnectAccountModal
        isOpen={isConnectModalOpen}
        onClose={() => setIsConnectModalOpen(false)}
        onConnect={() => {}}
        initialPlatform="mt4"
      />
    </div>
  )
}

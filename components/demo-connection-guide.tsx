"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Steps, Step } from "@/components/ui/steps"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, AlertCircle, ArrowRight } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import ConnectAccountModal from "@/components/connect-account-modal"

export default function DemoConnectionGuide() {
  const router = useRouter()
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)
  const [connectionStatus, setConnectionStatus] = useState<"idle" | "success" | "error">("idle")
  const [activeTab, setActiveTab] = useState("mt4")

  const handleOpenModal = (platform: string) => {
    setSelectedPlatform(platform)
    setIsConnectModalOpen(true)
  }

  const handleConnectionResult = (success: boolean) => {
    setConnectionStatus(success ? "success" : "error")
    setIsConnectModalOpen(false)
  }

  const handleStartMT4Demo = () => {
    router.push("/trading-accounts/demo-connect/mt4")
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Connect Demo Account</h1>
        <p className="text-muted-foreground mt-1">
          Follow these steps to connect a pre-configured demo account to your trading journal
        </p>
      </div>

      {connectionStatus === "success" && (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle2 className="h-5 w-5 text-green-600" />
          <AlertTitle>Connection Successful!</AlertTitle>
          <AlertDescription>
            Your demo account has been connected successfully. You can now view your account details and trades.
          </AlertDescription>
          <div className="mt-4">
            <Button className="mt-2" onClick={() => router.push("/trading-accounts")}>
              View Trading Accounts
            </Button>
          </div>
        </Alert>
      )}

      {connectionStatus === "error" && (
        <Alert variant="destructive">
          <AlertCircle className="h-5 w-5" />
          <AlertTitle>Connection Failed</AlertTitle>
          <AlertDescription>
            There was an error connecting to the demo account. Please try again or choose a different platform.
          </AlertDescription>
        </Alert>
      )}

      {connectionStatus === "idle" && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Choose a Demo Platform</CardTitle>
              <CardDescription>
                Select one of our pre-configured demo accounts to test the platform integration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="mt4">MetaTrader 4</TabsTrigger>
                  <TabsTrigger value="dxtrade">DXtrade</TabsTrigger>
                  <TabsTrigger value="intertrader">InterTrader</TabsTrigger>
                </TabsList>

                <TabsContent value="mt4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium">OANDA MetaTrader 4 Demo</h3>
                        <p className="text-sm text-muted-foreground">
                          Connect to a pre-configured MT4 demo account from OANDA
                        </p>
                      </div>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        Forex
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
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
                    <Button className="w-full" onClick={handleStartMT4Demo}>
                      Start Guided Connection
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="dxtrade">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium">DXtrade Demo via Gooey Trade</h3>
                        <p className="text-sm text-muted-foreground">
                          Connect to a pre-configured DXtrade demo account
                        </p>
                      </div>
                      <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                        Multi-Asset
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium">Login</p>
                        <p className="text-muted-foreground">634733</p>
                      </div>
                      <div>
                        <p className="font-medium">Username</p>
                        <p className="text-muted-foreground">fff_CI2024</p>
                      </div>
                      <div>
                        <p className="font-medium">Password</p>
                        <p className="text-muted-foreground">•••••••</p>
                      </div>
                      <div>
                        <p className="font-medium">Platform URL</p>
                        <p className="text-muted-foreground">trade.gooeytrade.com</p>
                      </div>
                    </div>
                    <Button className="w-full" onClick={() => handleOpenModal("dxtrade")}>
                      Connect DXtrade Demo
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="intertrader">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium">InterTrader Forex CFD Demo</h3>
                        <p className="text-sm text-muted-foreground">
                          Connect to a pre-configured InterTrader demo account
                        </p>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        CFD
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium">Server</p>
                        <p className="text-muted-foreground">InterTrader-Server</p>
                      </div>
                      <div>
                        <p className="font-medium">Login</p>
                        <p className="text-muted-foreground">536405</p>
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
                    <Button className="w-full" onClick={() => handleOpenModal("intertrader")}>
                      Connect InterTrader Demo
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Connection Process</CardTitle>
              <CardDescription>What to expect when connecting a demo account</CardDescription>
            </CardHeader>
            <CardContent>
              <Steps>
                <Step title="Select a demo platform" description="Choose from MT4, DXtrade, or InterTrader" />
                <Step
                  title="Review pre-filled credentials"
                  description="The demo account details are already configured"
                />
                <Step title="Click Connect" description="The system will attempt to connect to the platform" />
                <Step
                  title="View account details"
                  description="Once connected, you'll see your account data and trades"
                />
              </Steps>
            </CardContent>
            <CardFooter className="flex flex-col items-start">
              <p className="text-sm text-muted-foreground mb-4">
                Note: These are demo accounts with simulated data. In a production environment, you would connect to
                your actual trading accounts with real credentials.
              </p>
              <Button variant="outline" onClick={() => router.push("/trading-accounts")}>
                Back to Trading Accounts
              </Button>
            </CardFooter>
          </Card>
        </>
      )}

      <ConnectAccountModal
        isOpen={isConnectModalOpen}
        onClose={() => setIsConnectModalOpen(false)}
        onConnect={() => handleConnectionResult(true)}
        initialPlatform={selectedPlatform}
      />
    </div>
  )
}

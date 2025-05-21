"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"

// Import all platform connectors
import MT4AccountConnector from "@/components/mt4-account-connector"
import MT5AccountConnector from "@/components/mt5-account-connector"
import DXtradeAccountConnector from "@/components/dxtrade-account-connector"
import CTraderAccountConnector from "@/components/ctrader-account-connector"
import GenericPlatformConnector from "@/components/generic-platform-connector" // Add this new import

// Platform-specific components
const platformComponents = {
  mt4: MT4AccountConnector,
  mt5: MT5AccountConnector,
  dxtrade: DXtradeAccountConnector,
  ctrader: CTraderAccountConnector,
  tradingview: GenericPlatformConnector,
  ninjatrader: GenericPlatformConnector,
  tradestation: GenericPlatformConnector,
  thinkorswim: GenericPlatformConnector,
  interactivebrokers: GenericPlatformConnector,
  tradelocker: GenericPlatformConnector,
  matchtrader: GenericPlatformConnector,
  tradovate: GenericPlatformConnector,
  rithmic: GenericPlatformConnector,
  sierrachart: GenericPlatformConnector,
  dxfeed: GenericPlatformConnector,
}

export default function UniversalPlatformConnector({ platform }: { platform: string }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [platformInfo, setPlatformInfo] = useState<{
    name: string
    description: string
    component: React.ComponentType<any> | null
  }>({
    name: "",
    description: "",
    component: null,
  })

  useEffect(() => {
    // Normalize platform name
    const normalizedPlatform = platform.toLowerCase()

    // Get platform info
    switch (normalizedPlatform) {
      case "mt4":
        setPlatformInfo({
          name: "MetaTrader 4",
          description: "Connect your MT4 account to track your trading performance and analyze your trades",
          component: platformComponents.mt4,
        })
        break
      case "mt5":
        setPlatformInfo({
          name: "MetaTrader 5",
          description: "Connect your MT5 account to track your trading performance and analyze your trades",
          component: platformComponents.mt5,
        })
        break
      case "dxtrade":
        setPlatformInfo({
          name: "DXtrade",
          description: "Connect your DXtrade account to track your trading performance and analyze your trades",
          component: platformComponents.dxtrade,
        })
        break
      case "ctrader":
        setPlatformInfo({
          name: "cTrader",
          description: "Connect your cTrader account to track your trading performance and analyze your trades",
          component: platformComponents.ctrader,
        })
        break
      case "tradingview":
        setPlatformInfo({
          name: "TradingView",
          description: "Connect your TradingView account to track your trading performance and analyze your trades",
          component: platformComponents.tradingview,
        })
        break
      case "ninjatrader":
        setPlatformInfo({
          name: "NinjaTrader",
          description: "Connect your NinjaTrader account to track your trading performance and analyze your trades",
          component: platformComponents.ninjatrader,
        })
        break
      case "tradestation":
        setPlatformInfo({
          name: "TradeStation",
          description: "Connect your TradeStation account to track your trading performance and analyze your trades",
          component: platformComponents.tradestation,
        })
        break
      case "thinkorswim":
        setPlatformInfo({
          name: "ThinkOrSwim",
          description: "Connect your ThinkOrSwim account to track your trading performance and analyze your trades",
          component: platformComponents.thinkorswim,
        })
        break
      case "interactivebrokers":
        setPlatformInfo({
          name: "Interactive Brokers",
          description:
            "Connect your Interactive Brokers account to track your trading performance and analyze your trades",
          component: platformComponents.interactivebrokers,
        })
        break
      case "tradelocker":
        setPlatformInfo({
          name: "TradeLocker",
          description: "Connect your TradeLocker account to track your trading performance and analyze your trades",
          component: platformComponents.tradelocker,
        })
        break
      case "matchtrader":
        setPlatformInfo({
          name: "MatchTrader",
          description: "Connect your MatchTrader account to track your trading performance and analyze your trades",
          component: platformComponents.matchtrader,
        })
        break
      case "tradovate":
        setPlatformInfo({
          name: "Tradovate",
          description: "Connect your Tradovate account to track your trading performance and analyze your trades",
          component: platformComponents.tradovate,
        })
        break
      case "rithmic":
        setPlatformInfo({
          name: "Rithmic",
          description: "Connect your Rithmic account to track your trading performance and analyze your trades",
          component: platformComponents.rithmic,
        })
        break
      case "sierrachart":
        setPlatformInfo({
          name: "Sierra Chart",
          description: "Connect your Sierra Chart account to track your trading performance and analyze your trades",
          component: platformComponents.sierrachart,
        })
        break
      case "dxfeed":
        setPlatformInfo({
          name: "DXfeed",
          description: "Connect your DXfeed account to track your trading performance and analyze your trades",
          component: platformComponents.dxfeed,
        })
        break
      default:
        setError(`Platform "${platform}" is not supported yet`)
        setPlatformInfo({
          name: platform,
          description: "",
          component: null,
        })
    }

    setIsLoading(false)
  }, [platform])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  const PlatformComponent = platformInfo.component

  return (
    <div className="container mx-auto py-6 max-w-3xl">
      <Button variant="ghost" className="mb-6" asChild>
        <Link href="/trading-accounts/add-account">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Platform Selection
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Connect {platformInfo.name} Account</CardTitle>
          <CardDescription>{platformInfo.description}</CardDescription>
        </CardHeader>
        <CardContent>
          {error ? (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : PlatformComponent ? (
            <PlatformComponent />
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">
                Connection for {platformInfo.name} is coming soon. Please check back later.
              </p>
              <Button asChild>
                <Link href="/trading-accounts/add-account">Go Back</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

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
import CTraderAccountConnector from "@/components/ctrader-account-connector"
import DXtradeAccountConnector from "@/components/dxtrade-account-connector"
import GenericPlatformConnector from "@/components/generic-platform-connector"

// Platform-specific components mapping
const platformComponents: Record<string, React.ComponentType<any>> = {
  mt4: MT4AccountConnector,
  mt5: MT5AccountConnector,
  ctrader: CTraderAccountConnector,
  dxtrade: DXtradeAccountConnector,
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

// Platform display names and descriptions
const platformInfo: Record<string, { name: string; description: string }> = {
  mt4: {
    name: "MetaTrader 4",
    description: "Connect your MT4 account to track your trading performance and analyze your trades",
  },
  mt5: {
    name: "MetaTrader 5",
    description: "Connect your MT5 account to track your trading performance and analyze your trades",
  },
  ctrader: {
    name: "cTrader",
    description: "Connect your cTrader account to track your trading performance and analyze your trades",
  },
  dxtrade: {
    name: "DXtrade",
    description: "Connect your DXtrade account to track your trading performance and analyze your trades",
  },
  tradingview: {
    name: "TradingView",
    description: "Connect your TradingView account to track your trading performance and analyze your trades",
  },
  ninjatrader: {
    name: "NinjaTrader",
    description: "Connect your NinjaTrader account to track your trading performance and analyze your trades",
  },
  tradestation: {
    name: "TradeStation",
    description: "Connect your TradeStation account to track your trading performance and analyze your trades",
  },
  thinkorswim: {
    name: "ThinkOrSwim",
    description: "Connect your ThinkOrSwim account to track your trading performance and analyze your trades",
  },
  interactivebrokers: {
    name: "Interactive Brokers",
    description: "Connect your Interactive Brokers account to track your trading performance and analyze your trades",
  },
  tradelocker: {
    name: "TradeLocker",
    description: "Connect your TradeLocker account to track your trading performance and analyze your trades",
  },
  matchtrader: {
    name: "MatchTrader",
    description: "Connect your MatchTrader account to track your trading performance and analyze your trades",
  },
  tradovate: {
    name: "Tradovate",
    description: "Connect your Tradovate account to track your trading performance and analyze your trades",
  },
  rithmic: {
    name: "Rithmic",
    description: "Connect your Rithmic account to track your trading performance and analyze your trades",
  },
  sierrachart: {
    name: "Sierra Chart",
    description: "Connect your Sierra Chart account to track your trading performance and analyze your trades",
  },
  dxfeed: {
    name: "DXfeed",
    description: "Connect your DXfeed account to track your trading performance and analyze your trades",
  },
}

export default function UniversalPlatformConnector({ platform }: { platform: string }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Normalize platform name
  const normalizedPlatform = platform.toLowerCase()

  // Get platform info
  const info = platformInfo[normalizedPlatform] || {
    name: normalizedPlatform.charAt(0).toUpperCase() + normalizedPlatform.slice(1),
    description: `Connect your ${normalizedPlatform} account to track your trading performance`,
  }

  // Get platform component
  const PlatformComponent = platformComponents[normalizedPlatform]

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
      if (!platformComponents[normalizedPlatform]) {
        setError(`Platform "${platform}" is not fully supported yet`)
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [normalizedPlatform, platform])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 max-w-3xl">
      <Button variant="ghost" className="mb-6" asChild>
        <Link href="/trading-accounts">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Platform Selection
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Connect {info.name} Account</CardTitle>
          <CardDescription>{info.description}</CardDescription>
        </CardHeader>
        <CardContent>
          {error ? (
            <div className="space-y-4">
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
              <p className="text-muted-foreground">
                We're working on adding full support for {info.name}. Please check back soon or try another platform.
              </p>
              <div className="flex justify-center">
                <Button asChild>
                  <Link href="/trading-accounts">Go Back to Platform Selection</Link>
                </Button>
              </div>
            </div>
          ) : PlatformComponent ? (
            <PlatformComponent platformName={info.name} />
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">
                Connection for {info.name} is coming soon. Please check back later.
              </p>
              <Button asChild>
                <Link href="/trading-accounts">Go Back</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

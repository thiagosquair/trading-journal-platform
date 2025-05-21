"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle, AlertTriangle, HelpCircle } from "lucide-react"
import { getSupportedFeatures } from "@/lib/trading-actions"
import type { PlatformFeatures } from "@/lib/platforms/platform-adapter"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface PlatformFeaturesComparisonProps {
  platforms: string[]
}

export function PlatformFeaturesComparison({ platforms }: PlatformFeaturesComparisonProps) {
  const [featuresMap, setFeaturesMap] = useState<Record<string, PlatformFeatures>>({})
  const [isLoading, setIsLoading] = useState(true)

  // Fetch features for all platforms
  useEffect(() => {
    const fetchFeatures = async () => {
      setIsLoading(true)

      const features: Record<string, PlatformFeatures> = {}

      for (const platform of platforms) {
        try {
          const platformFeatures = await getSupportedFeatures(platform)
          features[platform] = platformFeatures
        } catch (error) {
          console.error(`Error fetching features for ${platform}:`, error)
        }
      }

      setFeaturesMap(features)
      setIsLoading(false)
    }

    fetchFeatures()
  }, [platforms])

  // Get platform display name
  const getPlatformDisplayName = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "mt4":
        return "MetaTrader 4"
      case "mt5":
        return "MetaTrader 5"
      case "tradingview":
        return "TradingView"
      case "dxtrade":
        return "DXtrade"
      case "ninjatrader":
        return "NinjaTrader"
      case "ctrader":
        return "cTrader"
      case "dxfeed":
        return "DX Trade"
      case "tradestation":
        return "TradeStation"
      case "thinkorswim":
        return "thinkorswim"
      case "interactivebrokers":
        return "Interactive Brokers"
      case "matchtrader":
        return "Match Trader"
      case "tradovate":
        return "Tradovate"
      case "rithmic":
        return "Rithmic"
      case "sierrachart":
        return "Sierra Chart"
      default:
        return platform
    }
  }

  // Render feature cell
  const renderFeatureCell = (platform: string, feature: keyof PlatformFeatures) => {
    if (!featuresMap[platform]) {
      return <AlertTriangle className="h-5 w-5 text-yellow-500" />
    }

    const value = featuresMap[platform][feature]

    if (typeof value === "boolean") {
      return value ? <CheckCircle2 className="h-5 w-5 text-green-500" /> : <XCircle className="h-5 w-5 text-red-500" />
    }

    if (Array.isArray(value)) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Badge variant="outline">{value.length}</Badge>
            </TooltipTrigger>
            <TooltipContent>
              <ul className="list-disc pl-5">
                {value.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }

    if (typeof value === "number") {
      return <span>{value}</span>
    }

    return <span>-</span>
  }

  // Feature descriptions for tooltips
  const featureDescriptions: Record<string, string> = {
    realTimeData: "Ability to receive real-time market data",
    historicalData: "Access to historical price and volume data",
    orderExecution: "Ability to place and manage orders",
    paperTrading: "Simulated trading with virtual money",
    readOnly: "Read-only access to account data",
    multipleAccounts: "Support for connecting multiple accounts",
    supportedTimeframes: "Available chart timeframes",
    supportedOrderTypes: "Types of orders that can be placed",
    supportedAssetClasses: "Asset classes available for trading",
    apiRateLimit: "Maximum number of API requests per minute",
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Platform Features Comparison</CardTitle>
        <CardDescription>Compare features across different trading platforms</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Feature</TableHead>
                  {platforms.map((platform) => (
                    <TableHead key={platform} className="text-center">
                      {getPlatformDisplayName(platform)}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.keys(featureDescriptions).map((feature) => (
                  <TableRow key={feature}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        {feature.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <HelpCircle className="h-4 w-4 ml-1 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{featureDescriptions[feature]}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </TableCell>
                    {platforms.map((platform) => (
                      <TableCell key={`${platform}-${feature}`} className="text-center">
                        {renderFeatureCell(platform, feature as keyof PlatformFeatures)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

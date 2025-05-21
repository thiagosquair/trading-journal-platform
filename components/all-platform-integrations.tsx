"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search, Info } from "lucide-react"
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Platform data with status and descriptions
const platforms = [
  {
    id: "mt4",
    name: "MetaTrader 4/5",
    description: "Connect to the world's most popular trading platform",
    status: "stable",
    category: "forex",
    features: ["real-time-data", "historical-data", "read-only-access"],
  },
  {
    id: "dxtrade",
    name: "DXtrade",
    description: "Multi-asset trading platform for brokers and traders",
    status: "stable",
    category: "multi-asset",
    features: ["real-time-data", "historical-data"],
  },
  {
    id: "tradingview",
    name: "TradingView",
    description: "Connect your TradingView account for advanced charting",
    status: "stable",
    category: "charting",
    features: ["historical-data", "read-only-access"],
  },
  {
    id: "ctrader",
    name: "cTrader",
    description: "Advanced trading platform with direct market access",
    status: "stable",
    category: "forex",
    features: ["real-time-data", "historical-data", "read-only-access"],
  },
  {
    id: "matchtrader",
    name: "Match Trader",
    description: "Modern trading platform for forex and CFD trading",
    status: "beta",
    category: "forex",
    features: ["real-time-data", "historical-data"],
  },
  {
    id: "ninjatrader",
    name: "NinjaTrader 8",
    description: "Advanced trading platform for futures and forex",
    status: "stable",
    category: "futures",
    features: ["real-time-data", "historical-data", "read-only-access"],
  },
  {
    id: "interactivebrokers",
    name: "Interactive Brokers",
    description: "Connect to IBKR for global market access",
    status: "stable",
    category: "stocks",
    features: ["real-time-data", "historical-data", "read-only-access"],
  },
  {
    id: "thinkorswim",
    name: "thinkorswim",
    description: "TD Ameritrade's advanced trading platform",
    status: "beta",
    category: "stocks",
    features: ["historical-data", "read-only-access"],
  },
  {
    id: "tradestation",
    name: "TradeStation",
    description: "Professional-grade trading platform",
    status: "stable",
    category: "stocks",
    features: ["real-time-data", "historical-data", "read-only-access"],
  },
  {
    id: "tradovate",
    name: "Tradovate",
    description: "Modern cloud-based futures trading",
    status: "beta",
    category: "futures",
    features: ["real-time-data", "historical-data"],
  },
  {
    id: "rithmic",
    name: "Rithmic",
    description: "Professional futures trading platform",
    status: "beta",
    category: "futures",
    features: ["real-time-data", "historical-data"],
  },
  {
    id: "sierrachart",
    name: "Sierra Chart",
    description: "Professional charting and trading software",
    status: "beta",
    category: "futures",
    features: ["historical-data", "read-only-access"],
  },
  {
    id: "dxfeed",
    name: "DX Trade",
    description: "Multi-asset trading platform with advanced features",
    status: "beta",
    category: "multi-asset",
    features: ["real-time-data", "historical-data"],
  },
  {
    id: "tradelocker",
    name: "TradeLocker",
    description: "Secure trading platform with advanced risk management",
    status: "beta",
    category: "multi-asset",
    features: ["real-time-data", "historical-data", "risk-management"],
  },
]

// Feature labels for display
const featureLabels = {
  "real-time-data": "Real-time Data",
  "historical-data": "Historical Data",
  "read-only-access": "Read-only Access",
  "paper-trading": "Paper Trading",
  "multi-account": "Multiple Accounts",
  "risk-management": "Risk Management",
}

export default function AllPlatformIntegrations() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Filter platforms based on search query and selected category
  const filteredPlatforms = platforms.filter((platform) => {
    const matchesSearch =
      platform.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      platform.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || platform.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search platforms..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs
          defaultValue="all"
          value={selectedCategory}
          onValueChange={setSelectedCategory}
          className="w-full sm:w-auto"
        >
          <TabsList className="grid grid-cols-3 sm:grid-cols-5 w-full sm:w-auto">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="forex">Forex</TabsTrigger>
            <TabsTrigger value="stocks">Stocks</TabsTrigger>
            <TabsTrigger value="futures">Futures</TabsTrigger>
            <TabsTrigger value="charting">Charting</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPlatforms.map((platform) => (
          <Card key={platform.id} className="flex flex-col">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center mb-4 overflow-hidden">
                  {platform.id === "mt4" && <div className="text-blue-600 font-bold">MT4</div>}
                  {platform.id === "dxtrade" && <div className="text-indigo-600 font-bold">DX</div>}
                  {platform.id === "tradingview" && <div className="text-blue-600 font-bold">TV</div>}
                  {platform.id === "ctrader" && <div className="text-green-600 font-bold">CT</div>}
                  {platform.id === "matchtrader" && <div className="text-orange-600 font-bold">MT</div>}
                  {platform.id === "ninjatrader" && <div className="text-teal-600 font-bold">NT</div>}
                  {platform.id === "interactivebrokers" && <div className="text-purple-600 font-bold">IB</div>}
                  {platform.id === "thinkorswim" && <div className="text-red-600 font-bold">TS</div>}
                  {platform.id === "tradestation" && <div className="text-yellow-600 font-bold">TS</div>}
                  {platform.id === "tradovate" && <div className="text-pink-600 font-bold">TV</div>}
                  {platform.id === "rithmic" && <div className="text-cyan-600 font-bold">RM</div>}
                  {platform.id === "sierrachart" && <div className="text-emerald-600 font-bold">SC</div>}
                  {platform.id === "dxfeed" && <div className="text-violet-600 font-bold">DF</div>}
                  {platform.id === "tradelocker" && <div className="text-amber-600 font-bold">TL</div>}
                </div>
                {platform.status === "beta" && (
                  <Badge variant="outline" className="text-xs">
                    Beta
                  </Badge>
                )}
              </div>
              <CardTitle className="text-lg mt-2">{platform.name}</CardTitle>
              <CardDescription>{platform.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow pb-2">
              <div className="flex flex-wrap gap-2">
                {platform.features.map((feature) => (
                  <TooltipProvider key={feature}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge variant="secondary" className="text-xs">
                          {featureLabels[feature as keyof typeof featureLabels]}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{getFeatureDescription(feature)}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link href={`/platform-guides/${platform.id}`}>Learn More</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredPlatforms.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No platforms found matching your search criteria.</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setSearchQuery("")
              setSelectedCategory("all")
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}

      <div className="bg-muted p-4 rounded-lg">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium mb-1">Don't see your platform?</h3>
            <p className="text-sm text-muted-foreground">
              We're constantly adding support for new platforms. If your platform isn't listed, you can still manually
              log your trades or request platform integration.
            </p>
            <div className="flex gap-4 mt-3">
              <Button variant="outline" size="sm" asChild>
                <Link href="/contact">Request Platform</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/journal/new">Manual Entry</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper function to get feature descriptions
function getFeatureDescription(feature: string): string {
  switch (feature) {
    case "real-time-data":
      return "Provides real-time updates of your trading activity"
    case "historical-data":
      return "Imports your historical trading data"
    case "read-only-access":
      return "Supports read-only access for enhanced security"
    case "paper-trading":
      return "Supports paper trading accounts"
    case "multi-account":
      return "Supports connecting multiple accounts"
    case "risk-management":
      return "Advanced risk management and position sizing tools"
    default:
      return ""
  }
}

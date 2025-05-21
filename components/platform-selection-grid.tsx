"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const platforms = [
  {
    id: "mt5",
    name: "MetaTrader 5",
    description: "Connect your MT5 account to track performance and analyze trades",
    icon: "📊",
    popular: true,
  },
  {
    id: "mt4",
    name: "MetaTrader 4",
    description: "Connect your MT4 account to track performance and analyze trades",
    icon: "📈",
    popular: true,
  },
  {
    id: "ctrader",
    name: "cTrader",
    description: "Connect your cTrader account to track performance and analyze trades",
    icon: "🔄",
    popular: true,
  },
  {
    id: "tradingview",
    name: "TradingView",
    description: "Connect your TradingView account to track performance and analyze trades",
    icon: "📱",
    popular: true,
  },
  {
    id: "ninjatrader",
    name: "NinjaTrader",
    description: "Connect your NinjaTrader account to track performance and analyze trades",
    icon: "🥷",
    popular: false,
  },
  {
    id: "dxtrade",
    name: "DXtrade",
    description: "Connect your DXtrade account to track performance and analyze trades",
    icon: "🔄",
    popular: true,
  },
  {
    id: "tradestation",
    name: "TradeStation",
    description: "Connect your TradeStation account to track performance and analyze trades",
    icon: "🚉",
    popular: false,
  },
  {
    id: "thinkorswim",
    name: "ThinkOrSwim",
    description: "Connect your ThinkOrSwim account to track performance and analyze trades",
    icon: "🏊",
    popular: false,
  },
  {
    id: "interactivebrokers",
    name: "Interactive Brokers",
    description: "Connect your Interactive Brokers account to track performance and analyze trades",
    icon: "🏢",
    popular: true,
  },
  {
    id: "tradelocker",
    name: "TradeLocker",
    description: "Connect your TradeLocker account to track performance and analyze trades",
    icon: "🔒",
    popular: false,
  },
  {
    id: "matchtrader",
    name: "MatchTrader",
    description: "Connect your MatchTrader account to track performance and analyze trades",
    icon: "🤝",
    popular: false,
  },
  {
    id: "tradovate",
    name: "Tradovate",
    description: "Connect your Tradovate account to track performance and analyze trades",
    icon: "📡",
    popular: false,
  },
  {
    id: "rithmic",
    name: "Rithmic",
    description: "Connect your Rithmic account to track performance and analyze trades",
    icon: "📊",
    popular: false,
  },
  {
    id: "sierrachart",
    name: "Sierra Chart",
    description: "Connect your Sierra Chart account to track performance and analyze trades",
    icon: "📉",
    popular: false,
  },
  {
    id: "dxfeed",
    name: "DXfeed",
    description: "Connect your DXfeed account to track performance and analyze trades",
    icon: "📡",
    popular: false,
  },
]

export default function PlatformSelectionGrid() {
  const router = useRouter()

  const handleConnect = (platformId: string) => {
    router.push(`/trading-accounts/connect/${platformId}`)
  }

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Popular Platforms</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {platforms
            .filter((platform) => platform.popular)
            .map((platform) => (
              <PlatformCard key={platform.id} platform={platform} onConnect={handleConnect} />
            ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">All Platforms</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {platforms
            .filter((platform) => !platform.popular)
            .map((platform) => (
              <PlatformCard key={platform.id} platform={platform} onConnect={handleConnect} />
            ))}
        </div>
      </div>
    </div>
  )
}

function PlatformCard({ platform, onConnect }: { platform: any; onConnect: (platformId: string) => void }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{platform.icon}</span>
            <CardTitle className="text-lg">{platform.name}</CardTitle>
          </div>
          {platform.popular && <Badge>Popular</Badge>}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <CardDescription>{platform.description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button onClick={() => onConnect(platform.id)} className="w-full">
          Connect {platform.name}
        </Button>
      </CardFooter>
    </Card>
  )
}

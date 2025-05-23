"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ConnectAccountModal from "@/components/connect-account-modal"

const platforms = [
  {
    id: "mt5",
    name: "MetaTrader 5",
    description: "Connect your MT5 account to track performance and analyze trades",
    icon: "📊",
    popular: true,
    status: "stable",
  },
  {
    id: "mt4",
    name: "MetaTrader 4",
    description: "Connect your MT4 account to track performance and analyze trades",
    icon: "📈",
    popular: true,
    status: "stable",
  },
  {
    id: "ctrader",
    name: "cTrader",
    description: "Connect your cTrader account to track performance and analyze trades",
    icon: "🔄",
    popular: true,
    status: "stable",
  },
  {
    id: "tradingview",
    name: "TradingView",
    description: "Connect your TradingView account for advanced charting",
    icon: "📱",
    popular: true,
    status: "stable",
  },
  {
    id: "dxtrade",
    name: "DXtrade",
    description: "Connect your DXtrade account to track performance and analyze trades",
    icon: "🔄",
    popular: true,
    status: "stable",
  },
  {
    id: "interactivebrokers",
    name: "Interactive Brokers",
    description: "Connect your Interactive Brokers account for global market access",
    icon: "🏢",
    popular: true,
    status: "stable",
  },
  {
    id: "ninjatrader",
    name: "NinjaTrader",
    description: "Connect your NinjaTrader account for futures and forex trading",
    icon: "🥷",
    popular: false,
    status: "stable",
  },
  {
    id: "tradestation",
    name: "TradeStation",
    description: "Connect your TradeStation account for professional trading",
    icon: "🚉",
    popular: false,
    status: "stable",
  },
  {
    id: "thinkorswim",
    name: "ThinkOrSwim",
    description: "Connect your TD Ameritrade ThinkOrSwim account",
    icon: "🏊",
    popular: false,
    status: "beta",
  },
  {
    id: "tradelocker",
    name: "TradeLocker",
    description: "Connect your TradeLocker account with advanced risk management",
    icon: "🔒",
    popular: false,
    status: "beta",
  },
  {
    id: "matchtrader",
    name: "MatchTrader",
    description: "Connect your MatchTrader account for forex and CFD trading",
    icon: "🤝",
    popular: false,
    status: "beta",
  },
  {
    id: "tradovate",
    name: "Tradovate",
    description: "Connect your Tradovate account for cloud-based futures trading",
    icon: "📡",
    popular: false,
    status: "beta",
  },
  {
    id: "rithmic",
    name: "Rithmic",
    description: "Connect your Rithmic account for professional futures trading",
    icon: "📊",
    popular: false,
    status: "beta",
  },
  {
    id: "sierrachart",
    name: "Sierra Chart",
    description: "Connect your Sierra Chart account for advanced charting",
    icon: "📉",
    popular: false,
    status: "beta",
  },
  {
    id: "dxfeed",
    name: "DXfeed",
    description: "Connect your DXfeed account for multi-asset trading",
    icon: "📡",
    popular: false,
    status: "beta",
  },
]

function PlatformCard({ platform, onConnect }: { platform: any; onConnect: (platformId: string) => void }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{platform.icon}</span>
            <CardTitle className="text-lg">{platform.name}</CardTitle>
          </div>
          <div className="flex gap-2">
            {platform.popular && <Badge>Popular</Badge>}
            {platform.status === "beta" && <Badge variant="outline">Beta</Badge>}
          </div>
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

export default function PlatformSelectionGrid() {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)

  const handleConnect = (platformId: string) => {
    console.log("Platform selected:", platformId)
    setSelectedPlatform(platformId)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedPlatform(null)
  }

  const handleAccountConnected = () => {
    console.log("Account connected from platform grid")
    // Refresh the page or update the accounts list
    router.refresh()
    window.location.reload() // Force a full refresh for now
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {platforms.map((platform) => (
          <PlatformCard key={platform.id} platform={platform} onConnect={handleConnect} />
        ))}
      </div>

      <ConnectAccountModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConnect={handleAccountConnected}
        initialPlatform={selectedPlatform}
      />
    </>
  )
}

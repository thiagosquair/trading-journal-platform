"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"
import Link from "next/link"

// Platform data with status, descriptions and logo paths
const platforms = [
  {
    id: "mt4",
    name: "MetaTrader 4",
    description: "Connect your MT4 accounts for automatic trade synchronization and performance tracking.",
    status: "stable",
    features: ["Secure API connection", "Real-time trade synchronization", "Historical trade import"],
    logo: "/public/metatrader4.png",
  },
  {
    id: "mt5",
    name: "MetaTrader 5",
    description: "Next generation multi-asset trading platform with advanced features.",
    status: "stable",
    features: ["Multi-asset trading", "Advanced charting", "Automated trading"],
    logo: "/public/metatrader5.png",
  },
  {
    id: "dxtrade",
    name: "DXtrade",
    description: "Connect your DXtrade Standard or Pro accounts for seamless trade tracking and analysis.",
    status: "stable",
    features: ["OAuth authentication", "Automatic position tracking", "Account performance metrics"],
    logo: "/public/dxtrade.png",
  },
  {
    id: "tradingview",
    name: "TradingView",
    description: "Import your TradingView charts and analysis directly into your trading journal.",
    status: "stable",
    features: ["Chart screenshot import", "Pine Script strategy import", "Indicator settings sync"],
    logo: "/public/tradingview48.png",
  },
  {
    id: "ctrader",
    name: "cTrader",
    description: "Advanced trading platform with direct market access.",
    status: "stable",
    features: ["Open API integration", "Automated trade import", "Real-time account monitoring"],
    logo: "/public/ctrader (1).png",
  },
  {
    id: "interactivebrokers",
    name: "Interactive Brokers",
    description: "Connect to IBKR for global market access.",
    status: "stable",
    features: ["Client Portal API integration", "Multi-asset class support", "Portfolio performance tracking"],
    logo: "/public/interactive brokers (1).png",
  },
  {
    id: "matchtrader",
    name: "Match Trader",
    description: "Modern trading platform for forex and CFD trading.",
    status: "beta",
    features: ["REST API integration", "Real-time data feed", "Multi-account support"],
    logo: "/public/matchtrader.png",
  },
  {
    id: "ninjatrader",
    name: "NinjaTrader 8",
    description: "Advanced trading platform for futures and forex.",
    status: "stable",
    features: ["DLL integration", "Historical data import", "Strategy automation"],
    logo: "/public/ninjatrader.png",
  },
  {
    id: "thinkorswim",
    name: "thinkorswim",
    description: "TD Ameritrade's advanced trading platform.",
    status: "beta",
    features: ["API integration", "Options analysis", "Advanced charting"],
    logo: "/public/thinkorswim.png",
  },
  {
    id: "tradelocker",
    name: "TradeLocker",
    description: "Secure trading platform with advanced risk management.",
    status: "beta",
    features: ["Risk management", "Trade journaling", "Performance analytics"],
    logo: "/public/tradelocker (1).png",
  },
  {
    id: "tradovate",
    name: "Tradovate",
    description: "Modern cloud-based futures trading.",
    status: "beta",
    features: ["Cloud-based platform", "Commission-free trading", "Advanced order types"],
    logo: "/public/tradovate (1).png",
  },
]

export default function PlatformIntegrationsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(3)
  const [isPaused, setIsPaused] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null)

  // Create a duplicate array for infinite scrolling effect
  const extendedPlatforms = [...platforms, ...platforms]

  // Determine how many cards to show based on container width
  useEffect(() => {
    const updateVisibleCount = () => {
      if (!containerRef.current) return

      const containerWidth = containerRef.current.offsetWidth
      if (containerWidth >= 1200) {
        setVisibleCount(4)
      } else if (containerWidth >= 900) {
        setVisibleCount(3)
      } else if (containerWidth >= 640) {
        setVisibleCount(2)
      } else {
        setVisibleCount(1)
      }
    }

    updateVisibleCount()
    window.addEventListener("resize", updateVisibleCount)
    return () => window.removeEventListener("resize", updateVisibleCount)
  }, [])

  // Auto-scroll effect
  useEffect(() => {
    const startAutoScroll = () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current)
      }

      autoScrollRef.current = setInterval(() => {
        if (!isPaused) {
          setCurrentIndex((prevIndex) => {
            // When we reach the end of the original array, reset to beginning
            if (prevIndex >= platforms.length) {
              return 0
            }
            return prevIndex + 1
          })
        }
      }, 3000) // Scroll every 3 seconds
    }

    startAutoScroll()

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current)
      }
    }
  }, [isPaused, platforms.length])

  // Pause auto-scroll when hovering
  const handleMouseEnter = () => setIsPaused(true)
  const handleMouseLeave = () => setIsPaused(false)

  return (
    <div className="w-full space-y-6">
      <div>
        <div className="inline-block mb-4 px-4 py-1 rounded-full bg-indigo-100 text-indigo-700 font-medium text-sm">
          NEW INTEGRATIONS
        </div>
        <h2 className="text-3xl font-bold tracking-tight">
          <span className="text-blue-600">Trading Platform</span> Integrations
        </h2>
        <p className="mt-2 text-slate-600 max-w-3xl">
          Connect your trading accounts directly to TradeLinx for automatic trade synchronization and real-time
          performance tracking.
        </p>
      </div>

      <div
        ref={containerRef}
        className="relative overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="flex transition-transform duration-1000 ease-in-out gap-6"
          style={{ transform: `translateX(-${currentIndex * (100 / visibleCount)}%)` }}
        >
          {extendedPlatforms.map((platform, index) => (
            <div
              key={`${platform.id}-${index}`}
              className="flex-none"
              style={{ width: `calc(${100 / visibleCount}% - ${((visibleCount - 1) * 6) / visibleCount}px)` }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-4 overflow-hidden">
                      {platform.id === "mt4" && <div className="text-blue-600 font-bold">MT4</div>}
                      {platform.id === "mt5" && <div className="text-blue-600 font-bold">MT5</div>}
                      {platform.id === "dxtrade" && <div className="text-indigo-600 font-bold">DX</div>}
                      {platform.id === "tradingview" && <div className="text-blue-600 font-bold">TV</div>}
                      {platform.id === "ctrader" && <div className="text-green-600 font-bold">CT</div>}
                      {platform.id === "interactivebrokers" && <div className="text-purple-600 font-bold">IB</div>}
                      {platform.id === "matchtrader" && <div className="text-orange-600 font-bold">MT</div>}
                      {platform.id === "ninjatrader" && <div className="text-teal-600 font-bold">NT</div>}
                      {platform.id === "thinkorswim" && <div className="text-red-600 font-bold">TS</div>}
                      {platform.id === "tradelocker" && <div className="text-yellow-600 font-bold">TL</div>}
                      {platform.id === "tradovate" && <div className="text-pink-600 font-bold">TV</div>}
                    </div>
                    {platform.status === "beta" && (
                      <Badge variant="outline" className="text-xs">
                        Beta
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl mb-2">{platform.name}</CardTitle>
                  <CardDescription>{platform.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {platform.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <div className="mr-2 mt-1 text-indigo-600">✓</div>
                        <span className="text-slate-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <Button
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          asChild
        >
          <Link href="/integrations">
            View All Integrations <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}

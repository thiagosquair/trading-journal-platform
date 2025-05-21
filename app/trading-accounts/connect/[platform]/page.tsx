import type { Metadata } from "next"
import { notFound } from "next/navigation"
import UniversalPlatformConnector from "@/components/universal-platform-connector"

export const metadata: Metadata = {
  title: "Connect Trading Account",
  description: "Connect your trading account to track your performance",
}

// Update the list of supported platforms to include all platforms
const supportedPlatforms = [
  "mt4",
  "mt5",
  "ctrader",
  "dxtrade",
  "tradingview",
  "ninjatrader",
  "tradestation",
  "thinkorswim",
  "interactivebrokers",
  "tradelocker",
  "matchtrader",
  "tradovate",
  "rithmic",
  "sierrachart",
  "dxfeed",
]

export default function ConnectPlatformPage({ params }: { params: { platform: string } }) {
  const platform = params.platform.toLowerCase()

  // Check if platform is supported
  if (!supportedPlatforms.includes(platform)) {
    notFound()
  }

  return <UniversalPlatformConnector platform={platform} />
}

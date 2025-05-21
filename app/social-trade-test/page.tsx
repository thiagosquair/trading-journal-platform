"use client"

import { useState } from "react"
import { SocialTradeShare } from "@/components/social-trade-share"
import { AITradeAnalysis } from "@/components/ai-trade-analysis"

export default function SocialTradeTestPage() {
  const [showAnalysis, setShowAnalysis] = useState(false)

  // Use the provided TradingView screenshot
  const imageUrl = "/tradingview-eurusd.png"

  const handleAnalyze = () => {
    setShowAnalysis(true)
  }

  const handleCloseAnalysis = () => {
    setShowAnalysis(false)
  }

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">Social Trade Sharing & AI Analysis</h1>

      {showAnalysis ? (
        <AITradeAnalysis imageUrl={imageUrl} onClose={handleCloseAnalysis} />
      ) : (
        <SocialTradeShare
          imageUrl={imageUrl}
          initialCaption="Looking at EUR/USD 1H chart, I'm seeing a potential short opportunity. The price has been in a downtrend and recently rejected from the resistance zone around 1.1210. I'm considering a short position with a target at 1.1080. What do you think?"
          onAnalyze={handleAnalyze}
        />
      )}
    </div>
  )
}

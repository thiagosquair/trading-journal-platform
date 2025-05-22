"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Trade } from "@/lib/trading-types"
import { formatCurrency, formatDateTime } from "@/lib/utils"
import { Loader2 } from "lucide-react"

interface AiTradeAnalysisProps {
  trade?: Trade
  isLoading?: boolean
}

export function AiTradeAnalysis({ trade, isLoading = false }: AiTradeAnalysisProps) {
  const [analyzing, setAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<{
    strengths: string[]
    weaknesses: string[]
    opportunities: string[]
    recommendations: string[]
  } | null>(null)

  const handleAnalyze = async () => {
    if (!trade) return

    setAnalyzing(true)

    // Simulate AI analysis with a delay
    setTimeout(() => {
      setAnalysis({
        strengths: [
          "Good entry point at a key support level",
          "Position size was appropriate for account balance",
          "Trade was executed according to your trading plan",
        ],
        weaknesses: [
          "Exit was slightly premature, leaving some profit on the table",
          "Trade management could have been more dynamic",
        ],
        opportunities: [
          "Consider using trailing stops to capture more of the move",
          "This setup appears frequently on this pair - look for similar patterns",
        ],
        recommendations: [
          "Continue using this entry strategy as it shows good results",
          "Work on exit strategies to maximize profit potential",
          "Document this trade pattern for future reference",
        ],
      })
      setAnalyzing(false)
    }, 2000)
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>AI Trade Analysis</CardTitle>
          <CardDescription>Loading trade data...</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    )
  }

  if (!trade) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>AI Trade Analysis</CardTitle>
          <CardDescription>Select a trade to analyze</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            No trade selected. Please select a trade to perform AI analysis.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Trade Analysis</CardTitle>
        <CardDescription>
          Get AI-powered insights for your {trade.symbol} {trade.type.toLowerCase()} trade
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm font-medium">Symbol</p>
            <p className="text-lg">{trade.symbol}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Type</p>
            <p className={`text-lg ${trade.type === "BUY" ? "text-green-600" : "text-red-600"}`}>{trade.type}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Open Time</p>
            <p className="text-lg">{formatDateTime(trade.openTime)}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Close Time</p>
            <p className="text-lg">{formatDateTime(trade.closeTime)}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Volume</p>
            <p className="text-lg">{trade.volume.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Profit</p>
            <p className={`text-lg ${trade.profit >= 0 ? "text-green-600" : "text-red-600"}`}>
              {formatCurrency(trade.profit)}
            </p>
          </div>
        </div>

        {!analysis && (
          <Button onClick={handleAnalyze} disabled={analyzing} className="w-full">
            {analyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing Trade...
              </>
            ) : (
              "Analyze This Trade"
            )}
          </Button>
        )}

        {analysis && (
          <Tabs defaultValue="strengths">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="strengths">Strengths</TabsTrigger>
              <TabsTrigger value="weaknesses">Weaknesses</TabsTrigger>
              <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            </TabsList>
            <TabsContent value="strengths" className="mt-4">
              <ul className="space-y-2">
                {analysis.strengths.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 text-green-500">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="weaknesses" className="mt-4">
              <ul className="space-y-2">
                {analysis.weaknesses.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 text-red-500">✗</span>
                    {item}
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="opportunities" className="mt-4">
              <ul className="space-y-2">
                {analysis.opportunities.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 text-blue-500">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="recommendations" className="mt-4">
              <ul className="space-y-2">
                {analysis.recommendations.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 text-purple-500">★</span>
                    {item}
                  </li>
                ))}
              </ul>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  )
}

export { AiTradeAnalysis as AITradeAnalysis }

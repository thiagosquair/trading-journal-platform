"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Trade } from "@/lib/trading-types"
import { formatCurrency, formatDateTime } from "@/lib/utils"
import { Loader2, Save, Share2, FileText } from "lucide-react"

interface AiTradeAnalysisFullProps {
  trade?: Trade
  isLoading?: boolean
  onSaveToJournal?: (trade: Trade, analysis: any) => void
}

export function AiTradeAnalysisFull({ trade, isLoading = false, onSaveToJournal }: AiTradeAnalysisFullProps) {
  const [analyzing, setAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<{
    summary: string
    strengths: string[]
    weaknesses: string[]
    marketContext: string
    technicalAnalysis: string
    psychologyInsights: string[]
    riskManagement: {
      assessment: string
      suggestions: string[]
    }
    recommendations: string[]
    similarPatterns: {
      description: string
      frequency: string
      successRate: string
    }[]
  } | null>(null)

  const handleAnalyze = async () => {
    if (!trade) return

    setAnalyzing(true)

    // Simulate AI analysis with a delay
    setTimeout(() => {
      setAnalysis({
        summary:
          "This EURUSD buy trade was executed during a strong uptrend following a pullback to a key support level. The entry was well-timed, but the exit was slightly premature, leaving some potential profit on the table. Overall, this trade demonstrates good technical analysis and entry execution.",
        strengths: [
          "Excellent entry at a key support level with confluence of multiple indicators",
          "Position size was appropriate for account balance and risk parameters",
          "Trade was executed according to your documented trading plan",
          "Stop loss was placed at a logical level below structure",
        ],
        weaknesses: [
          "Exit was slightly premature, leaving approximately 15 pips of potential profit",
          "Trade management could have been more dynamic with market volatility",
          "No partial profit taking strategy was implemented",
        ],
        marketContext:
          "This trade was executed during the European session when EURUSD typically shows higher volatility. Market sentiment was bullish following positive economic data from the Eurozone. The broader market was in a risk-on mode, supporting EUR strength against USD.",
        technicalAnalysis:
          "Price was in an established uptrend on the H4 timeframe with higher highs and higher lows. The entry occurred at the 61.8% Fibonacci retracement level, which coincided with the 20 EMA. RSI showed bullish divergence at entry, and volume confirmed the move. The trade followed the trend continuation pattern that has been historically profitable in your trading history.",
        psychologyInsights: [
          "You demonstrated patience by waiting for confirmation before entry",
          "Exiting early suggests some hesitation or fear of losing profits",
          "Your trading journal notes indicate you were feeling confident during entry but became anxious as profit grew",
        ],
        riskManagement: {
          assessment:
            "Risk was well-managed at 1.5% of account balance. The risk-reward ratio was set at 1:2.5, which aligns with your trading plan.",
          suggestions: [
            "Consider implementing a trailing stop to capture more of the trend",
            "A partial profit-taking strategy could have secured some gains while letting the remainder run",
            "Given the strong technical setup, a slightly larger position size could have been justified",
          ],
        },
        recommendations: [
          "Continue using this entry strategy as it shows consistently good results",
          "Develop a more robust exit strategy, possibly using trailing stops",
          "Document this trade pattern in detail for future reference",
          "Practice holding winning trades longer through simulation exercises",
          "Review your emotional state during trade management to address premature exits",
        ],
        similarPatterns: [
          {
            description: "EURUSD pullback to 61.8% Fibonacci in uptrend",
            frequency: "Appears approximately 2-3 times per month",
            successRate: "76% success rate based on your trading history",
          },
          {
            description: "20 EMA bounce during European session",
            frequency: "Appears approximately 5-6 times per month",
            successRate: "68% success rate based on your trading history",
          },
        ],
      })
      setAnalyzing(false)
    }, 2500)
  }

  const handleSaveToJournal = () => {
    if (trade && analysis && onSaveToJournal) {
      onSaveToJournal(trade, analysis)
    }
  }

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Comprehensive AI Trade Analysis</CardTitle>
          <CardDescription>Loading trade data...</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    )
  }

  if (!trade) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Comprehensive AI Trade Analysis</CardTitle>
          <CardDescription>Select a trade to analyze</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground p-8">
            No trade selected. Please select a trade to perform comprehensive AI analysis.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>Comprehensive AI Trade Analysis</CardTitle>
            <CardDescription>
              In-depth AI-powered insights for your {trade.symbol} {trade.type.toLowerCase()} trade
            </CardDescription>
          </div>
          {analysis && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleSaveToJournal}>
                <Save className="h-4 w-4 mr-2" />
                Save to Journal
              </Button>
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Symbol</p>
            <p className="text-lg font-semibold">{trade.symbol}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Type</p>
            <p className={`text-lg font-semibold ${trade.type === "BUY" ? "text-green-600" : "text-red-600"}`}>
              {trade.type}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Volume</p>
            <p className="text-lg font-semibold">{trade.volume.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Profit</p>
            <p className={`text-lg font-semibold ${trade.profit >= 0 ? "text-green-600" : "text-red-600"}`}>
              {formatCurrency(trade.profit)}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Open Time</p>
            <p className="text-lg font-semibold">{formatDateTime(trade.openTime)}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Close Time</p>
            <p className="text-lg font-semibold">{formatDateTime(trade.closeTime)}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Open Price</p>
            <p className="text-lg font-semibold">{trade.openPrice}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Close Price</p>
            <p className="text-lg font-semibold">{trade.closePrice}</p>
          </div>
        </div>

        {!analysis && (
          <Button onClick={handleAnalyze} disabled={analyzing} className="w-full">
            {analyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Performing Comprehensive Analysis...
              </>
            ) : (
              "Analyze This Trade"
            )}
          </Button>
        )}

        {analysis && (
          <>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Summary</h3>
              <p className="text-muted-foreground">{analysis.summary}</p>
            </div>

            <Tabs defaultValue="strengths">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
                <TabsTrigger value="strengths">Strengths</TabsTrigger>
                <TabsTrigger value="weaknesses">Weaknesses</TabsTrigger>
                <TabsTrigger value="market">Market Context</TabsTrigger>
                <TabsTrigger value="technical">Technical</TabsTrigger>
                <TabsTrigger value="psychology">Psychology</TabsTrigger>
                <TabsTrigger value="risk">Risk Management</TabsTrigger>
                <TabsTrigger value="patterns">Similar Patterns</TabsTrigger>
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

              <TabsContent value="market" className="mt-4">
                <p>{analysis.marketContext}</p>
              </TabsContent>

              <TabsContent value="technical" className="mt-4">
                <p>{analysis.technicalAnalysis}</p>
              </TabsContent>

              <TabsContent value="psychology" className="mt-4">
                <ul className="space-y-2">
                  {analysis.psychologyInsights.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2 text-blue-500">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </TabsContent>

              <TabsContent value="risk" className="mt-4">
                <p className="mb-2">{analysis.riskManagement.assessment}</p>
                <h4 className="font-semibold mt-4 mb-2">Suggestions:</h4>
                <ul className="space-y-2">
                  {analysis.riskManagement.suggestions.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2 text-purple-500">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </TabsContent>

              <TabsContent value="patterns" className="mt-4">
                <div className="space-y-4">
                  {analysis.similarPatterns.map((pattern, index) => (
                    <div key={index} className="border rounded-md p-3">
                      <h4 className="font-semibold">{pattern.description}</h4>
                      <p className="text-sm text-muted-foreground">Frequency: {pattern.frequency}</p>
                      <p className="text-sm text-muted-foreground">Success Rate: {pattern.successRate}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Recommendations</h3>
              <ul className="space-y-2">
                {analysis.recommendations.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 text-purple-500">★</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

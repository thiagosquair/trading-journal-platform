"use client"

import { cn } from "@/lib/utils"

import { useState } from "react"
import Image from "next/image"
import { Loader2, ArrowUp, ArrowDown, AlertTriangle, BarChart2, TrendingDown, Percent } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface AITradeAnalysisProps {
  imageUrl: string
  onClose?: () => void
}

export function AITradeAnalysis({ imageUrl, onClose }: AITradeAnalysisProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isAnalyzed, setIsAnalyzed] = useState(false)
  const [activeTab, setActiveTab] = useState("summary")

  // Simulate AI analysis
  const runAnalysis = async () => {
    setIsAnalyzing(true)

    try {
      // Simulate API call to AI service
      await new Promise((resolve) => setTimeout(resolve, 3000))
      setIsAnalyzed(true)
    } catch (error) {
      console.error("Error analyzing trade:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  // Run analysis on component mount
  useState(() => {
    runAnalysis()
  })

  // Mock analysis results for EUR/USD based on the image
  const analysisResults = {
    pair: "EUR/USD",
    direction: "bearish",
    confidence: 78,
    timeframe: "1H",
    keyLevels: [
      { price: 1.12106, type: "resistance", strength: "strong" },
      { price: 1.11654, type: "current", strength: "current" },
      { price: 1.10818, type: "support", strength: "medium" },
    ],
    riskReward: 1.8,
    winProbability: 68,
    patterns: ["Downtrend continuation", "Resistance rejection"],
    technicalIndicators: {
      rsi: "Bearish (42)",
      macd: "Bearish crossover",
      movingAverages: "Below 50 EMA",
    },
    suggestion: "Consider short position with tight stop loss above 1.12106",
    warnings: ["Potential support at 1.10818 may cause a bounce"],
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center">
              <BarChart2 className="h-5 w-5 mr-2" />
              AI Trade Analysis
            </CardTitle>
            <CardDescription>
              {isAnalyzing ? "Analyzing your trade setup..." : "Analysis of EUR/USD 1H chart"}
            </CardDescription>
          </div>
          {!isAnalyzing && (
            <Badge variant={analysisResults.direction === "bullish" ? "default" : "destructive"}>
              {analysisResults.direction === "bullish" ? (
                <ArrowUp className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDown className="h-3 w-3 mr-1" />
              )}
              {analysisResults.direction.toUpperCase()}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {isAnalyzing ? (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Analyzing chart patterns and indicators...</p>
            <Progress value={45} className="w-full max-w-md" />
          </div>
        ) : (
          <>
            <div className="relative w-full h-48 rounded-lg overflow-hidden mb-6">
              <Image src="/ai-analysis-interface.png" alt="AI Trade Analysis" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/70 to-indigo-600/30 flex items-center">
                <div className="px-6">
                  <h1 className="text-2xl font-bold text-white">AI Trade Analysis</h1>
                  <p className="text-indigo-50">Get intelligent insights on your trading setups</p>
                </div>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="technical">Technical</TabsTrigger>
                <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
              </TabsList>

              <TabsContent value="summary" className="space-y-4 pt-4">
                <div className="flex flex-col space-y-2">
                  <h3 className="text-sm font-medium">Key Insights</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center p-2 rounded-md bg-muted/50">
                      <TrendingDown className="h-4 w-4 mr-2 text-red-500" />
                      <div className="text-sm">
                        <p className="font-medium">Bearish Bias</p>
                        <p className="text-xs text-muted-foreground">Confidence: {analysisResults.confidence}%</p>
                      </div>
                    </div>
                    <div className="flex items-center p-2 rounded-md bg-muted/50">
                      <Percent className="h-4 w-4 mr-2 text-blue-500" />
                      <div className="text-sm">
                        <p className="font-medium">Win Probability</p>
                        <p className="text-xs text-muted-foreground">{analysisResults.winProbability}%</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Key Levels</h3>
                  <div className="space-y-2">
                    {analysisResults.keyLevels.map((level, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <span
                          className={cn(
                            "font-mono",
                            level.type === "resistance"
                              ? "text-red-500"
                              : level.type === "support"
                                ? "text-green-500"
                                : "text-blue-500",
                          )}
                        >
                          {level.price}
                        </span>
                        <Badge variant="outline">
                          {level.type.charAt(0).toUpperCase() + level.type.slice(1)}
                          {level.type !== "current" && ` (${level.strength})`}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Patterns Detected</h3>
                  <div className="flex flex-wrap gap-2">
                    {analysisResults.patterns.map((pattern, index) => (
                      <Badge key={index} variant="secondary">
                        {pattern}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="p-3 border rounded-md bg-amber-50 border-amber-200">
                  <div className="flex items-start">
                    <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
                    <p className="text-sm text-amber-800">{analysisResults.warnings[0]}</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="technical" className="space-y-4 pt-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Technical Indicators</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 rounded-md bg-muted/50">
                      <span className="text-sm">RSI</span>
                      <Badge variant="outline" className="text-red-500">
                        {analysisResults.technicalIndicators.rsi}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-md bg-muted/50">
                      <span className="text-sm">MACD</span>
                      <Badge variant="outline" className="text-red-500">
                        {analysisResults.technicalIndicators.macd}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-md bg-muted/50">
                      <span className="text-sm">Moving Averages</span>
                      <Badge variant="outline" className="text-red-500">
                        {analysisResults.technicalIndicators.movingAverages}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Price Action Analysis</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Price is in a clear downtrend on the 1H timeframe</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Recent rejection from the 1.12106 resistance level</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Potential continuation to test the 1.10818 support level</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Volume profile suggests strong selling pressure</span>
                    </li>
                  </ul>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-medium mb-2">Market Context</h3>
                  <p className="text-sm text-muted-foreground">
                    EUR/USD is currently influenced by diverging monetary policies between the ECB and the Fed. Recent
                    economic data from the US has been stronger than expected, supporting the USD.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="risk" className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 border rounded-md">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium">Risk/Reward</h3>
                      <Badge variant={analysisResults.riskReward >= 2 ? "default" : "outline"}>
                        1:{analysisResults.riskReward}
                      </Badge>
                    </div>
                    <Progress value={analysisResults.riskReward * 20} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-2">
                      {analysisResults.riskReward >= 2
                        ? "Favorable risk/reward ratio"
                        : "Consider adjusting targets for better R:R"}
                    </p>
                  </div>

                  <div className="p-3 border rounded-md">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium">Win Probability</h3>
                      <Badge variant={analysisResults.winProbability >= 60 ? "default" : "outline"}>
                        {analysisResults.winProbability}%
                      </Badge>
                    </div>
                    <Progress value={analysisResults.winProbability} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-2">Based on historical pattern performance</p>
                  </div>
                </div>

                <div className="p-3 border rounded-md">
                  <h3 className="text-sm font-medium mb-2">Suggested Trade Setup</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Entry</span>
                      <span className="font-mono">1.11650</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Stop Loss</span>
                      <span className="font-mono text-red-500">1.12150</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Take Profit</span>
                      <span className="font-mono text-green-500">1.10750</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Direction</span>
                      <span className="flex items-center text-red-500">
                        <ArrowDown className="h-3 w-3 mr-1" />
                        Short
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-3 border rounded-md bg-muted/50">
                  <h3 className="text-sm font-medium mb-2">Position Sizing Recommendation</h3>
                  <p className="text-sm mb-2">Based on a 1% risk per trade on a $10,000 account:</p>
                  <div className="p-2 bg-background rounded-md text-sm">
                    <div className="flex justify-between mb-1">
                      <span>Risk Amount:</span>
                      <span className="font-medium">$100.00</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span>Position Size:</span>
                      <span className="font-medium">0.20 lots</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pip Risk:</span>
                      <span className="font-medium">50 pips</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onClose}>
          Back to Post
        </Button>
        {!isAnalyzing && <Button variant="default">Save Analysis</Button>}
      </CardFooter>
    </Card>
  )
}

// Alias for AITradeAnalysis for backward compatibility
export const AiTradeAnalysis = AITradeAnalysis

// Default export for backward compatibility
export default AITradeAnalysis

"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import {
  Loader2,
  ArrowDown,
  AlertTriangle,
  BarChart2,
  Percent,
  Clock,
  Target,
  Shield,
  Award,
  Info,
  CheckCircle,
  XCircle,
  Zap,
  LineChart,
  BarChart,
  PieChart,
  BookOpen,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { SaveAnalysisToJournal } from "@/components/save-analysis-to-journal"

export default function TradeAnalysisPage() {
  const [isAnalyzing, setIsAnalyzing] = useState(true)
  const [isAnalyzed, setIsAnalyzed] = useState(false)
  const [activeTab, setActiveTab] = useState("summary")
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState("Detecting chart type and timeframe...")
  const [showAnnotatedChart, setShowAnnotatedChart] = useState(false)
  const [showSaveDialog, setShowSaveDialog] = useState(false)

  // Simulate AI analysis with progress updates
  useEffect(() => {
    const runAnalysis = async () => {
      try {
        // Simulate API call to AI service with progress updates
        await new Promise((resolve) => setTimeout(resolve, 800))
        setAnalysisProgress(15)
        setCurrentStep("Identifying key price levels...")

        await new Promise((resolve) => setTimeout(resolve, 700))
        setAnalysisProgress(30)
        setCurrentStep("Analyzing price action patterns...")

        await new Promise((resolve) => setTimeout(resolve, 900))
        setAnalysisProgress(45)
        setCurrentStep("Calculating technical indicators...")

        await new Promise((resolve) => setTimeout(resolve, 800))
        setAnalysisProgress(60)
        setCurrentStep("Evaluating market context...")

        await new Promise((resolve) => setTimeout(resolve, 700))
        setAnalysisProgress(75)
        setCurrentStep("Determining risk/reward ratio...")

        await new Promise((resolve) => setTimeout(resolve, 600))
        setAnalysisProgress(90)
        setCurrentStep("Generating trade recommendations...")

        await new Promise((resolve) => setTimeout(resolve, 500))
        setAnalysisProgress(100)
        setCurrentStep("Analysis complete!")

        await new Promise((resolve) => setTimeout(resolve, 300))
        setIsAnalyzed(true)
        setIsAnalyzing(false)
      } catch (error) {
        console.error("Error analyzing trade:", error)
        setIsAnalyzing(false)
      }
    }

    runAnalysis()
  }, [])

  // Analysis results for the specific EUR/USD chart
  const analysisResults = {
    pair: "EUR/USD",
    direction: "bearish",
    confidence: 82,
    timeframe: "1H",
    keyLevels: [
      {
        price: 1.12106,
        type: "resistance",
        strength: "strong",
        description: "Upper boundary of the red box, strong resistance zone with multiple rejections",
      },
      {
        price: 1.11654,
        type: "current",
        strength: "current",
        description: "Current price level, just below recent consolidation",
      },
      {
        price: 1.10818,
        type: "support",
        strength: "medium",
        description: "Lower boundary of the blue box, projected target zone",
      },
    ],
    riskReward: 2.1,
    winProbability: 74,
    expectedValue: 0.32, // (0.74 * 1.0) - (0.26 * 1.0) = 0.48
    patterns: [
      {
        name: "Bearish rectangle breakdown",
        confidence: 86,
        description: "Price has broken down from a consolidation rectangle pattern",
      },
      {
        name: "Resistance rejection",
        confidence: 82,
        description: "Multiple rejections from the upper resistance zone (red box)",
      },
      {
        name: "Downtrend continuation",
        confidence: 78,
        description: "Price is making lower highs and lower lows in an established downtrend",
      },
    ],
    technicalIndicators: {
      rsi: { value: 38, interpretation: "Bearish", description: "Below 50, indicating bearish momentum" },
      macd: {
        value: "Bearish crossover",
        interpretation: "Bearish",
        description: "MACD line crossed below signal line",
      },
      movingAverages: {
        value: "Below 50 EMA",
        interpretation: "Bearish",
        description: "Price trading below key moving averages",
      },
      bollingerBands: {
        value: "Lower half",
        interpretation: "Bearish",
        description: "Price in lower half of Bollinger Bands",
      },
      atr: {
        value: "0.00128",
        interpretation: "Moderate volatility",
        description: "Average True Range indicates moderate volatility",
      },
    },
    volumeAnalysis: {
      trend: "Increasing on downmoves",
      interpretation: "Bearish",
      description: "Higher volume on down candles confirms bearish pressure",
    },
    marketContext: {
      fundamentals: "USD strength due to hawkish Fed stance",
      sentiment: "Bearish",
      description: "Recent economic data supports USD strength against EUR",
    },
    tradeSetup: {
      entry: 1.1165,
      stopLoss: 1.121,
      takeProfit: 1.1082,
      direction: "short",
      description: "Short at current market price with stop above recent resistance (red box)",
    },
    riskManagement: {
      accountSize: 10000,
      riskPercentage: 1,
      riskAmount: 100,
      positionSize: 0.22,
      pipRisk: 45,
      description: "1% risk on account with 45 pip stop loss",
    },
    warnings: [
      "Price is approaching oversold conditions on lower timeframes",
      "Weekend gap risk if holding position over weekend",
      "Economic news releases could increase volatility",
    ],
    alternativeScenarios: [
      {
        scenario: "Bullish reversal",
        probability: 18,
        trigger: "Break above 1.12106 resistance",
        target: 1.125,
        description: "If price breaks above the red box resistance, expect move to 1.12500",
      },
      {
        scenario: "Range-bound",
        probability: 8,
        trigger: "Failure to break 1.10818 support",
        target: "1.10818-1.12106",
        description: "Price could consolidate between the blue and red boxes",
      },
    ],
    timeAnalysis: {
      optimalHoldTime: "1-3 days",
      historicalPatternDuration: "36 hours average",
      description: "Based on similar patterns, target should be reached within 36-48 hours",
    },
  }

  return (
    <div className="container py-8 max-w-5xl">
      <h1 className="text-2xl font-bold mb-2">EUR/USD Trade Analysis</h1>
      <p className="text-muted-foreground mb-6">AI analysis of the EUR/USD 1H chart with projected short trade setup</p>

      <Card className="w-full">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center">
                <BarChart2 className="h-5 w-5 mr-2" />
                AI Trade Analysis
              </CardTitle>
              <CardDescription>
                {isAnalyzing ? currentStep : `Analysis of ${analysisResults.pair} ${analysisResults.timeframe} chart`}
              </CardDescription>
            </div>
            {!isAnalyzing && isAnalyzed && (
              <div className="flex items-center gap-2">
                <Badge variant="destructive" className="text-xs">
                  <ArrowDown className="h-3 w-3 mr-1" />
                  BEARISH
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <Clock className="h-3 w-3 mr-1" />
                  {analysisResults.timeframe}
                </Badge>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge variant="secondary" className="text-xs">
                        <Percent className="h-3 w-3 mr-1" />
                        {analysisResults.confidence}% Confidence
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">AI confidence in this analysis</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {isAnalyzing ? (
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">{currentStep}</p>
              <Progress value={analysisProgress} className="w-full max-w-md" />
              <p className="text-xs text-muted-foreground">{analysisProgress}% complete</p>
            </div>
          ) : (
            <>
              <div className="relative aspect-video w-full overflow-hidden rounded-md border">
                <Image
                  src={showAnnotatedChart ? "/tradingview-eurusd-annotated.png" : "/ai-analysis-interface.png"}
                  alt="AI Trade Analysis"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-2 right-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setShowAnnotatedChart(!showAnnotatedChart)}
                    className="text-xs"
                  >
                    {showAnnotatedChart ? "Show Original" : "Show Annotations"}
                  </Button>
                </div>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-5 w-full">
                  <TabsTrigger value="summary">Summary</TabsTrigger>
                  <TabsTrigger value="technical">Technical</TabsTrigger>
                  <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
                  <TabsTrigger value="setup">Trade Setup</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced</TabsTrigger>
                </TabsList>

                <TabsContent value="summary" className="space-y-4 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="py-3">
                        <CardTitle className="text-sm font-medium">Trade Direction</CardTitle>
                      </CardHeader>
                      <CardContent className="py-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="p-2 rounded-full mr-3 bg-red-100">
                              <ArrowDown className="h-5 w-5 text-red-600" />
                            </div>
                            <div>
                              <p className="font-medium">Bearish</p>
                              <p className="text-xs text-muted-foreground">Recommended direction</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{analysisResults.confidence}%</p>
                            <p className="text-xs text-muted-foreground">Confidence</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="py-3">
                        <CardTitle className="text-sm font-medium">Win Probability</CardTitle>
                      </CardHeader>
                      <CardContent className="py-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="p-2 rounded-full mr-3 bg-green-100">
                              <Target className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                              <p className="font-medium">{analysisResults.winProbability}%</p>
                              <p className="text-xs text-muted-foreground">Historical success rate</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">+{(analysisResults.expectedValue * 100).toFixed(1)}%</p>
                            <p className="text-xs text-muted-foreground">Expected value</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Key Price Levels</h3>
                    <div className="space-y-2">
                      {analysisResults.keyLevels.map((level, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center text-sm p-2 rounded-md bg-muted/50"
                        >
                          <div className="flex items-center">
                            <span
                              className={cn(
                                "font-mono mr-2",
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
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="h-4 w-4 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-xs max-w-[200px]">{level.description}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Patterns Detected</h3>
                    <div className="space-y-2">
                      {analysisResults.patterns.map((pattern, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center text-sm p-2 rounded-md bg-muted/50"
                        >
                          <div className="flex items-center">
                            <Badge variant="secondary" className="mr-2">
                              {pattern.name}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{pattern.confidence}% confidence</span>
                          </div>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="h-4 w-4 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-xs max-w-[200px]">{pattern.description}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 border rounded-md bg-amber-50 border-amber-200">
                    <div className="flex items-start">
                      <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-amber-800 mb-1">Key Warnings</p>
                        <ul className="text-xs text-amber-800 space-y-1">
                          {analysisResults.warnings.map((warning, index) => (
                            <li key={index} className="flex items-start">
                              <span className="mr-1">•</span>
                              <span>{warning}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="technical" className="space-y-4 pt-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Technical Indicators</h3>
                    <div className="space-y-2">
                      {Object.entries(analysisResults.technicalIndicators).map(([key, indicator], index) => (
                        <div key={index} className="flex justify-between items-center p-2 rounded-md bg-muted/50">
                          <div className="flex items-center">
                            <span className="text-sm capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                          </div>
                          <div className="flex items-center">
                            <Badge
                              variant="outline"
                              className={cn(
                                indicator.interpretation === "Bearish"
                                  ? "text-red-500"
                                  : indicator.interpretation === "Bullish"
                                    ? "text-green-500"
                                    : "text-blue-500",
                              )}
                            >
                              {indicator.value}
                            </Badge>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <Info className="h-4 w-4 text-muted-foreground ml-2" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="text-xs max-w-[200px]">{indicator.description}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Volume Analysis</h3>
                    <div className="p-3 rounded-md bg-muted/50">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Volume Trend</span>
                        <Badge variant="outline" className="text-red-500">
                          {analysisResults.volumeAnalysis.trend}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{analysisResults.volumeAnalysis.description}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Price Action Analysis</h3>
                    <Accordion type="single" collapsible className="w-full">
                      {analysisResults.patterns.map((pattern, index) => (
                        <AccordionItem key={index} value={`pattern-${index}`}>
                          <AccordionTrigger className="text-sm py-2">
                            <div className="flex items-center">
                              <Badge variant="secondary" className="mr-2">
                                {pattern.name}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{pattern.confidence}% confidence</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <p className="text-sm text-muted-foreground">{pattern.description}</p>
                            <div className="mt-2 p-2 bg-muted rounded-md">
                              <p className="text-xs">Trading implications:</p>
                              <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                                <li className="flex items-start">
                                  <span className="mr-1">•</span>
                                  <span>Suggests continuation of the current downtrend</span>
                                </li>
                                <li className="flex items-start">
                                  <span className="mr-1">•</span>
                                  <span>Higher probability of reaching the blue box target zone</span>
                                </li>
                                <li className="flex items-start">
                                  <span className="mr-1">•</span>
                                  <span>Consider tighter stop loss above the red box resistance</span>
                                </li>
                              </ul>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-sm font-medium mb-2">Market Context</h3>
                    <div className="p-3 rounded-md bg-muted/50">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Fundamental Factors</span>
                        <Badge variant="outline" className="text-red-500">
                          {analysisResults.marketContext.sentiment}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{analysisResults.marketContext.description}</p>
                      <p className="text-xs font-medium mt-2">{analysisResults.marketContext.fundamentals}</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="risk" className="space-y-4 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="py-3">
                        <CardTitle className="text-sm font-medium">Risk/Reward Ratio</CardTitle>
                      </CardHeader>
                      <CardContent className="py-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <div className="p-2 rounded-full mr-3 bg-green-100">
                              <Shield className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                              <p className="font-medium">1:{analysisResults.riskReward}</p>
                              <p className="text-xs text-muted-foreground">Favorable risk/reward ratio</p>
                            </div>
                          </div>
                        </div>
                        <Progress
                          value={analysisResults.riskReward * 20}
                          className="h-2"
                          indicatorClassName="bg-green-500"
                        />
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="py-3">
                        <CardTitle className="text-sm font-medium">Win Probability</CardTitle>
                      </CardHeader>
                      <CardContent className="py-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <div className="p-2 rounded-full mr-3 bg-green-100">
                              <Award className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                              <p className="font-medium">{analysisResults.winProbability}%</p>
                              <p className="text-xs text-muted-foreground">Based on historical patterns</p>
                            </div>
                          </div>
                        </div>
                        <Progress
                          value={analysisResults.winProbability}
                          className="h-2"
                          indicatorClassName="bg-green-500"
                        />
                      </CardContent>
                    </Card>
                  </div>

                  <div className="p-3 border rounded-md">
                    <h3 className="text-sm font-medium mb-2">Position Sizing Recommendation</h3>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Account Size:</span>
                          <span className="font-medium">
                            ${analysisResults.riskManagement.accountSize.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Risk Percentage:</span>
                          <span className="font-medium">{analysisResults.riskManagement.riskPercentage}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Risk Amount:</span>
                          <span className="font-medium">
                            ${analysisResults.riskManagement.riskAmount.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Position Size:</span>
                          <span className="font-medium">{analysisResults.riskManagement.positionSize} lots</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Pip Risk:</span>
                          <span className="font-medium">{analysisResults.riskManagement.pipRisk} pips</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Per Pip Value:</span>
                          <span className="font-medium">
                            $
                            {(
                              analysisResults.riskManagement.riskAmount / analysisResults.riskManagement.pipRisk
                            ).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{analysisResults.riskManagement.description}</p>
                  </div>

                  <div className="p-3 border rounded-md">
                    <h3 className="text-sm font-medium mb-2">Expected Value Calculation</h3>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div className="p-2 bg-muted/50 rounded-md">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Win Probability:</span>
                          <span className="font-medium">{analysisResults.winProbability}%</span>
                        </div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Win Return:</span>
                          <span className="font-medium">+100%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Expected Win:</span>
                          <span className="font-medium text-green-500">
                            +{(analysisResults.winProbability / 100).toFixed(2) * 100}%
                          </span>
                        </div>
                      </div>
                      <div className="p-2 bg-muted/50 rounded-md">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Loss Probability:</span>
                          <span className="font-medium">{100 - analysisResults.winProbability}%</span>
                        </div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Loss Return:</span>
                          <span className="font-medium">-100%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Expected Loss:</span>
                          <span className="font-medium text-red-500">
                            -{((100 - analysisResults.winProbability) / 100).toFixed(2) * 100}%
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-2 bg-muted rounded-md flex justify-between items-center">
                      <span className="text-sm font-medium">Expected Value:</span>
                      <span className="text-sm font-medium text-green-500">
                        +{(analysisResults.expectedValue * 100).toFixed(1)}%
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      A positive expected value indicates a profitable trade over the long run.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="setup" className="space-y-4 pt-4">
                  <div className="p-3 border rounded-md">
                    <h3 className="text-sm font-medium mb-2">Suggested Trade Setup</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Direction:</span>
                          <span className="flex items-center font-medium text-red-500">
                            <ArrowDown className="h-3 w-3 mr-1" />
                            Short
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Entry Price:</span>
                          <span className="font-mono font-medium">{analysisResults.tradeSetup.entry}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Stop Loss:</span>
                          <span className="font-mono font-medium text-red-500">
                            {analysisResults.tradeSetup.stopLoss}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Take Profit:</span>
                          <span className="font-mono font-medium text-green-500">
                            {analysisResults.tradeSetup.takeProfit}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Risk (pips):</span>
                          <span className="font-medium">
                            {Math.abs(analysisResults.tradeSetup.entry - analysisResults.tradeSetup.stopLoss).toFixed(
                              5,
                            ) * 10000}{" "}
                            pips
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Reward (pips):</span>
                          <span className="font-medium">
                            {Math.abs(analysisResults.tradeSetup.entry - analysisResults.tradeSetup.takeProfit).toFixed(
                              5,
                            ) * 10000}{" "}
                            pips
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Risk/Reward:</span>
                          <span className="font-medium">1:{analysisResults.riskReward}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Win Probability:</span>
                          <span className="font-medium">{analysisResults.winProbability}%</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">{analysisResults.tradeSetup.description}</p>
                  </div>

                  <div className="p-3 border rounded-md">
                    <h3 className="text-sm font-medium mb-2">Entry Timing</h3>
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium">Immediate Entry</p>
                          <p className="text-xs text-muted-foreground">
                            Enter at current market price of {analysisResults.tradeSetup.entry}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium">Alternative Entry</p>
                          <p className="text-xs text-muted-foreground">
                            Wait for a small pullback to 1.11750 for a better entry
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <XCircle className="h-4 w-4 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium">Invalidation</p>
                          <p className="text-xs text-muted-foreground">
                            Cancel trade idea if price breaks above 1.12106 (red box)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 border rounded-md">
                    <h3 className="text-sm font-medium mb-2">Trade Management</h3>
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <Zap className="h-4 w-4 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium">Partial Take Profit</p>
                          <p className="text-xs text-muted-foreground">
                            Consider taking 50% profit at 1.11200 (halfway to target)
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Zap className="h-4 w-4 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium">Trailing Stop</p>
                          <p className="text-xs text-muted-foreground">
                            Move stop to breakeven after price moves 25 pips in your favor
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Zap className="h-4 w-4 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium">Time-Based Exit</p>
                          <p className="text-xs text-muted-foreground">
                            Consider closing the trade if target not reached within 36 hours
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="advanced" className="space-y-4 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Alternative Scenarios</h3>
                      <Accordion type="single" collapsible className="w-full">
                        {analysisResults.alternativeScenarios.map((scenario, index) => (
                          <AccordionItem key={index} value={`scenario-${index}`}>
                            <AccordionTrigger className="text-sm py-2">
                              <div className="flex items-center">
                                <Badge variant="outline" className="mr-2">
                                  {scenario.scenario}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {scenario.probability}% probability
                                </span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span className="text-muted-foreground">Trigger:</span>
                                  <span className="font-medium">{scenario.trigger}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-muted-foreground">Target:</span>
                                  <span className="font-medium">{scenario.target}</span>
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">{scenario.description}</p>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-2">Time Analysis</h3>
                      <div className="p-3 border rounded-md">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Optimal Hold Time:</span>
                            <span className="font-medium">{analysisResults.timeAnalysis.optimalHoldTime}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Pattern Duration:</span>
                            <span className="font-medium">
                              {analysisResults.timeAnalysis.historicalPatternDuration}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {analysisResults.timeAnalysis.description}
                          </p>
                        </div>
                      </div>

                      <h3 className="text-sm font-medium mb-2 mt-4">Correlation Analysis</h3>
                      <div className="p-3 border rounded-md">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">USD Index:</span>
                            <Badge variant="outline" className="text-green-500">
                              Strong positive
                            </Badge>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">EUR/GBP:</span>
                            <Badge variant="outline" className="text-amber-500">
                              Moderate negative
                            </Badge>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">US 10Y Yield:</span>
                            <Badge variant="outline" className="text-green-500">
                              Strong positive
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Monitor USD Index for confirmation of this trade direction.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Performance Metrics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-3 border rounded-md flex flex-col items-center justify-center">
                        <LineChart className="h-5 w-5 text-primary mb-1" />
                        <p className="text-sm font-medium">76%</p>
                        <p className="text-xs text-muted-foreground text-center">Similar pattern win rate</p>
                      </div>
                      <div className="p-3 border rounded-md flex flex-col items-center justify-center">
                        <BarChart className="h-5 w-5 text-primary mb-1" />
                        <p className="text-sm font-medium">2.1:1</p>
                        <p className="text-xs text-muted-foreground text-center">Average R:R ratio</p>
                      </div>
                      <div className="p-3 border rounded-md flex flex-col items-center justify-center">
                        <PieChart className="h-5 w-5 text-primary mb-1" />
                        <p className="text-sm font-medium">+0.32R</p>
                        <p className="text-xs text-muted-foreground text-center">Expected value per trade</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Market Sentiment</h3>
                    <div className="p-3 border rounded-md">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm">Retail Sentiment</span>
                        <div className="flex items-center">
                          <div className="w-24 h-3 bg-muted rounded-full overflow-hidden mr-2">
                            <div className="h-full bg-red-500" style={{ width: "68%" }}></div>
                          </div>
                          <span className="text-xs">68% Short</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm">Institutional Positioning</span>
                        <div className="flex items-center">
                          <div className="w-24 h-3 bg-muted rounded-full overflow-hidden mr-2">
                            <div className="h-full bg-red-500" style={{ width: "75%" }}></div>
                          </div>
                          <span className="text-xs">75% Short</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Options Put/Call Ratio</span>
                        <div className="flex items-center">
                          <span className="text-xs font-medium mr-2">1.9</span>
                          <Badge variant="outline" className="text-red-500">
                            Bearish
                          </Badge>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-3">
                        Sentiment analysis suggests institutional positioning strongly aligns with the bearish bias.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => window.history.back()}>
            Back
          </Button>
          {!isAnalyzing && isAnalyzed && (
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowSaveDialog(true)}>
                <BookOpen className="h-4 w-4 mr-2" />
                Save to Journal
              </Button>
              <Button variant="default">
                <Zap className="h-4 w-4 mr-2" />
                Apply to Trade
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>

      <SaveAnalysisToJournal
        open={showSaveDialog}
        onOpenChange={setShowSaveDialog}
        analysisData={analysisResults}
        chartUrl="/tradingview-eurusd.png"
        annotatedChartUrl="/tradingview-eurusd-annotated.png"
      />
    </div>
  )
}

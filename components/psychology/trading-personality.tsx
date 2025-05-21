"use client"

import { useState } from "react"
import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Lightbulb,
  Zap,
  Clock,
  Target,
  Compass,
  BarChart3,
  Download,
  Share2,
  Printer,
  AlertTriangle,
  CheckCircle,
  Info,
} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type TraitType = {
  name: string
  score: number
  icon: React.ReactNode
  description: string
  strengths: string[]
  challenges: string[]
  tips: string[]
}

const personalityTraits: TraitType[] = [
  {
    name: "Risk Tolerance",
    score: 65,
    icon: <Zap className="h-5 w-5 text-amber-500" />,
    description: "Your comfort level with uncertainty and potential losses",
    strengths: ["Comfortable with calculated risks", "Can handle moderate volatility", "Willing to try new strategies"],
    challenges: ["May become too conservative after losses", "Occasional hesitation on high-conviction trades"],
    tips: [
      "Use position sizing to manage risk exposure",
      "Consider scaling into positions rather than all-in entries",
      "Document your comfort level after each trade",
    ],
  },
  {
    name: "Time Horizon",
    score: 42,
    icon: <Clock className="h-5 w-5 text-blue-500" />,
    description: "Your preferred trading timeframe and patience level",
    strengths: ["Balanced approach to different timeframes", "Can adapt to market conditions"],
    challenges: [
      "Sometimes exit trades too early",
      "May struggle with longer-term positions",
      "Occasional overtrading in ranging markets",
    ],
    tips: [
      "Match your timeframe to your strategy",
      "Set clear time-based exit criteria",
      "Practice holding winning trades longer",
    ],
  },
  {
    name: "Decision Making",
    score: 78,
    icon: <Compass className="h-5 w-5 text-green-500" />,
    description: "How you analyze information and make trading decisions",
    strengths: [
      "Strong analytical approach",
      "Good at processing multiple data points",
      "Disciplined decision-making process",
    ],
    challenges: ["May experience analysis paralysis", "Sometimes overthinking simple setups"],
    tips: ["Create a pre-trade checklist", "Set time limits for analysis", "Trust your system once decisions are made"],
  },
  {
    name: "Emotional Reactivity",
    score: 53,
    icon: <Lightbulb className="h-5 w-5 text-purple-500" />,
    description: "How strongly emotions influence your trading decisions",
    strengths: ["Generally balanced emotional approach", "Can remain calm in moderate volatility"],
    challenges: ["Occasional emotional reactions to large losses", "FOMO during strong market trends"],
    tips: [
      "Practice mindfulness techniques before trading",
      "Journal emotional reactions to identify patterns",
      "Take short breaks after emotional trades",
    ],
  },
  {
    name: "Discipline",
    score: 71,
    icon: <Target className="h-5 w-5 text-red-500" />,
    description: "Your ability to follow rules and trading plans",
    strengths: [
      "Generally good at following trading plans",
      "Consistent application of risk management",
      "Keeps detailed trading records",
    ],
    challenges: ["Occasional deviation from plans during drawdowns", "Sometimes adjusts stops impulsively"],
    tips: [
      "Review plan adherence after each trading session",
      "Use automation where possible",
      "Create accountability mechanisms",
    ],
  },
]

// Trading style compatibility data
const tradingStyleCompatibility = [
  { style: "Day Trading", compatibility: 65, description: "Short-term trades completed within a single day" },
  { style: "Swing Trading", compatibility: 85, description: "Positions held for several days to weeks" },
  { style: "Position Trading", compatibility: 70, description: "Longer-term trades lasting weeks to months" },
  { style: "Scalping", compatibility: 40, description: "Ultra-short-term trades lasting minutes to hours" },
  { style: "Trend Following", compatibility: 80, description: "Following established market trends" },
  { style: "Mean Reversion", compatibility: 60, description: "Trading price returns to historical average" },
  { style: "Breakout Trading", compatibility: 75, description: "Entering when price breaks support/resistance" },
  { style: "News Trading", compatibility: 45, description: "Trading based on news and economic events" },
]

// Market compatibility data
const marketCompatibility = [
  { market: "Forex", compatibility: 75, description: "Currency pairs trading" },
  { market: "Stocks", compatibility: 80, description: "Equity markets" },
  { market: "Futures", compatibility: 65, description: "Standardized futures contracts" },
  { market: "Options", compatibility: 50, description: "Derivatives with right to buy/sell" },
  { market: "Crypto", compatibility: 60, description: "Cryptocurrency markets" },
  { market: "Commodities", compatibility: 70, description: "Physical goods like gold, oil" },
  { market: "Indices", compatibility: 75, description: "Market index trading" },
]

export function TradingPersonality() {
  const [activeTab, setActiveTab] = useState("traits")
  const [showFullAssessment, setShowFullAssessment] = useState(false)

  // Calculate overall personality type based on trait scores
  const calculatePersonalityType = () => {
    const riskScore = personalityTraits.find((t) => t.name === "Risk Tolerance")?.score || 0
    const timeScore = personalityTraits.find((t) => t.name === "Time Horizon")?.score || 0
    const decisionScore = personalityTraits.find((t) => t.name === "Decision Making")?.score || 0
    const emotionScore = personalityTraits.find((t) => t.name === "Emotional Reactivity")?.score || 0
    const disciplineScore = personalityTraits.find((t) => t.name === "Discipline")?.score || 0

    const traits = []

    if (decisionScore > 70) traits.push("Analytical")
    if (disciplineScore > 70) traits.push("Methodical")
    if (riskScore > 70) traits.push("Aggressive")
    if (riskScore < 40) traits.push("Conservative")
    if (timeScore < 50) traits.push("Short-term")
    if (timeScore > 70) traits.push("Patient")
    if (emotionScore < 40) traits.push("Rational")
    if (emotionScore > 70) traits.push("Intuitive")
    if (disciplineScore < 40 && emotionScore > 60) traits.push("Impulsive")
    if (decisionScore > 60 && timeScore < 40) traits.push("Adaptive")

    return traits.slice(0, 3) // Return top 3 traits
  }

  const personalityType = calculatePersonalityType()

  // Calculate overall score
  const overallScore = Math.round(
    personalityTraits.reduce((sum, trait) => sum + trait.score, 0) / personalityTraits.length,
  )

  // Get color based on compatibility score
  const getCompatibilityColor = (score: number) => {
    if (score >= 75) return "bg-green-500"
    if (score >= 60) return "bg-amber-500"
    return "bg-red-500"
  }

  // Get badge variant based on compatibility score
  const getCompatibilityBadge = (score: number) => {
    if (score >= 75) return "default"
    if (score >= 60) return "secondary"
    return "destructive"
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Trading Personality Profile</CardTitle>
            <CardDescription>Understanding your unique trading psychology and tendencies</CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="font-medium text-lg">Your Personality Type</h3>
            <div className="flex items-center flex-wrap gap-2 mt-2">
              {personalityType.map((trait, index) => (
                <Badge
                  key={index}
                  className={index === 0 ? "bg-blue-600 hover:bg-blue-700" : ""}
                  variant={index === 0 ? "default" : index === 1 ? "outline" : "secondary"}
                >
                  {trait}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold">
              {overallScore}
              <span className="text-lg text-muted-foreground">/100</span>
            </div>
            <div className="text-sm text-muted-foreground">Overall Score</div>
          </div>

          <Dialog open={showFullAssessment} onOpenChange={setShowFullAssessment}>
            <DialogTrigger asChild>
              <Button>Take Full Assessment</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Trading Personality Assessment</DialogTitle>
                <DialogDescription>
                  Complete this comprehensive assessment to get a detailed analysis of your trading personality.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <Alert className="mb-4">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Assessment Information</AlertTitle>
                  <AlertDescription>
                    This assessment contains 25 questions and takes approximately 10-15 minutes to complete.
                  </AlertDescription>
                </Alert>
                <div className="text-center py-8">
                  <BarChart3 className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">The full assessment will open in a new page</p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowFullAssessment(false)}>
                  Cancel
                </Button>
                <Button>Start Assessment</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="traits">Key Traits</TabsTrigger>
              <TabsTrigger value="strengths">Strengths & Challenges</TabsTrigger>
              <TabsTrigger value="compatibility">Strategy Compatibility</TabsTrigger>
              <TabsTrigger value="development">Development Plan</TabsTrigger>
            </TabsList>

            <TabsContent value="traits" className="space-y-4 pt-4">
              {personalityTraits.map((trait) => (
                <div key={trait.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {trait.icon}
                      <span className="font-medium ml-2">{trait.name}</span>
                    </div>
                    <span className="text-sm">{trait.score}/100</span>
                  </div>
                  <Progress value={trait.score} className="h-2" />
                  <p className="text-sm text-muted-foreground">{trait.description}</p>
                </div>
              ))}

              <Alert className="mt-6">
                <Info className="h-4 w-4" />
                <AlertTitle>Personality Insights</AlertTitle>
                <AlertDescription>
                  Your profile shows strong analytical skills with moderate risk tolerance. You excel at methodical
                  decision-making but may benefit from developing more patience with trades and emotional discipline
                  during market volatility.
                </AlertDescription>
              </Alert>
            </TabsContent>

            <TabsContent value="strengths" className="pt-4">
              <div className="grid gap-4 md:grid-cols-2">
                {personalityTraits.map((trait) => (
                  <Card key={trait.name} className="border">
                    <CardHeader className="pb-2">
                      <div className="flex items-center">
                        {trait.icon}
                        <CardTitle className="text-base ml-2">{trait.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-1">Strengths</h4>
                        <ul className="text-sm space-y-1">
                          {trait.strengths.map((strength, i) => (
                            <li key={i} className="flex items-start">
                              <span className="bg-green-500 rounded-full h-2 w-2 mt-1.5 mr-2"></span>
                              {strength}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-1">Challenges</h4>
                        <ul className="text-sm space-y-1">
                          {trait.challenges.map((challenge, i) => (
                            <li key={i} className="flex items-start">
                              <span className="bg-amber-500 rounded-full h-2 w-2 mt-1.5 mr-2"></span>
                              {challenge}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-1">Improvement Tips</h4>
                        <ul className="text-sm space-y-1">
                          {trait.tips.map((tip, i) => (
                            <li key={i} className="flex items-start">
                              <span className="bg-blue-500 rounded-full h-2 w-2 mt-1.5 mr-2"></span>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="compatibility" className="pt-4">
              <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Trading Style Compatibility</CardTitle>
                      <CardDescription>How well different trading approaches match your personality</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {tradingStyleCompatibility.map((style) => (
                        <div key={style.style} className="space-y-1">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <Badge variant={getCompatibilityBadge(style.compatibility)} className="mr-2">
                                {style.compatibility}%
                              </Badge>
                              <span className="font-medium">{style.style}</span>
                            </div>
                          </div>
                          <Progress
                            value={style.compatibility}
                            className={`h-2 ${getCompatibilityColor(style.compatibility)}`}
                          />
                          <p className="text-xs text-muted-foreground">{style.description}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Market Compatibility</CardTitle>
                      <CardDescription>Which markets best suit your trading personality</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {marketCompatibility.map((market) => (
                        <div key={market.market} className="space-y-1">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <Badge variant={getCompatibilityBadge(market.compatibility)} className="mr-2">
                                {market.compatibility}%
                              </Badge>
                              <span className="font-medium">{market.market}</span>
                            </div>
                          </div>
                          <Progress
                            value={market.compatibility}
                            className={`h-2 ${getCompatibilityColor(market.compatibility)}`}
                          />
                          <p className="text-xs text-muted-foreground">{market.description}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Compatibility Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Alert className="bg-green-50 border-green-200">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <AlertTitle>Highly Compatible</AlertTitle>
                        <AlertDescription>
                          Your personality is best suited for swing trading, trend following, and breakout strategies in
                          stock and forex markets.
                        </AlertDescription>
                      </Alert>

                      <Alert className="bg-amber-50 border-amber-200">
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                        <AlertTitle>Moderately Compatible</AlertTitle>
                        <AlertDescription>
                          You may find moderate success with position trading, mean reversion strategies, and commodity
                          markets.
                        </AlertDescription>
                      </Alert>

                      <Alert className="bg-red-50 border-red-200">
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                        <AlertTitle>Less Compatible</AlertTitle>
                        <AlertDescription>
                          Your personality may struggle with scalping, news trading, and options trading due to your
                          time horizon and decision-making traits.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="development" className="pt-4">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Personalized Development Plan</CardTitle>
                    <CardDescription>Targeted improvements based on your personality profile</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h3 className="font-medium">Short-term Goals (1-3 months)</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <span className="bg-blue-500 rounded-full h-2 w-2 mt-1.5 mr-2 flex-shrink-0"></span>
                            <div>
                              <span className="font-medium">Improve Time Horizon Score</span>
                              <p className="text-sm text-muted-foreground">
                                Practice holding winning trades 20% longer than your current average
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <span className="bg-blue-500 rounded-full h-2 w-2 mt-1.5 mr-2 flex-shrink-0"></span>
                            <div>
                              <span className="font-medium">Enhance Emotional Reactivity</span>
                              <p className="text-sm text-muted-foreground">
                                Implement a 5-minute "cooling off" period before entering trades after a loss
                              </p>
                            </div>
                          </li>
                        </ul>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-medium">Medium-term Goals (3-6 months)</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <span className="bg-purple-500 rounded-full h-2 w-2 mt-1.5 mr-2 flex-shrink-0"></span>
                            <div>
                              <span className="font-medium">Develop Trading System Alignment</span>
                              <p className="text-sm text-muted-foreground">
                                Refine your trading system to better match your analytical strengths and risk tolerance
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <span className="bg-purple-500 rounded-full h-2 w-2 mt-1.5 mr-2 flex-shrink-0"></span>
                            <div>
                              <span className="font-medium">Expand Market Knowledge</span>
                              <p className="text-sm text-muted-foreground">
                                Focus on deepening knowledge in your most compatible markets (Stocks, Forex)
                              </p>
                            </div>
                          </li>
                        </ul>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-medium">Long-term Goals (6-12 months)</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <span className="bg-green-500 rounded-full h-2 w-2 mt-1.5 mr-2 flex-shrink-0"></span>
                            <div>
                              <span className="font-medium">Master Your Optimal Trading Style</span>
                              <p className="text-sm text-muted-foreground">
                                Develop expertise in swing trading and trend following strategies
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <span className="bg-green-500 rounded-full h-2 w-2 mt-1.5 mr-2 flex-shrink-0"></span>
                            <div>
                              <span className="font-medium">Balance Analytical and Intuitive Approaches</span>
                              <p className="text-sm text-muted-foreground">
                                Integrate both systematic and discretionary elements into your trading approach
                              </p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Recommended Resources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="border rounded-lg p-4">
                        <h3 className="font-medium mb-2">Books & Articles</h3>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <span className="bg-blue-500 rounded-full h-2 w-2 mt-1.5 mr-2"></span>
                            <span>"Trading in the Zone" by Mark Douglas</span>
                          </li>
                          <li className="flex items-start">
                            <span className="bg-blue-500 rounded-full h-2 w-2 mt-1.5 mr-2"></span>
                            <span>"The Disciplined Trader" by Mark Douglas</span>
                          </li>
                          <li className="flex items-start">
                            <span className="bg-blue-500 rounded-full h-2 w-2 mt-1.5 mr-2"></span>
                            <span>"Thinking, Fast and Slow" by Daniel Kahneman</span>
                          </li>
                        </ul>
                      </div>

                      <div className="border rounded-lg p-4">
                        <h3 className="font-medium mb-2">Courses & Exercises</h3>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <span className="bg-purple-500 rounded-full h-2 w-2 mt-1.5 mr-2"></span>
                            <span>"Mindfulness for Traders" - Platform Course</span>
                          </li>
                          <li className="flex items-start">
                            <span className="bg-purple-500 rounded-full h-2 w-2 mt-1.5 mr-2"></span>
                            <span>"Trading Psychology Mastery" - Platform Course</span>
                          </li>
                          <li className="flex items-start">
                            <span className="bg-purple-500 rounded-full h-2 w-2 mt-1.5 mr-2"></span>
                            <span>Daily Trading Journal Exercise Templates</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <div className="text-sm text-muted-foreground">
          Your trading personality profile is based on your assessment responses and trading behavior. Take the full
          assessment for more detailed insights.
        </div>
      </CardFooter>
    </Card>
  )
}

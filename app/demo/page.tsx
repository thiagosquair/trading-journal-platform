"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, LineChart, ChevronRight } from "lucide-react"

export default function DemoPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 4

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <LineChart className="h-6 w-6 mr-2 text-blue-600" />
            <span className="text-xl font-bold text-blue-900">TradingJournal</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm font-medium text-blue-700 hover:text-blue-900 hover:underline">
              <ArrowLeft className="h-4 w-4 inline mr-1" />
              Back to Home
            </Link>
            <Button className="bg-blue-600 hover:bg-blue-700" asChild>
              <Link href="/register">Sign Up Free</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Interactive Product Demo</h1>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Experience the power of our trading journal platform with this interactive demo. Follow the steps below to
              explore key features.
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <div className="flex items-center">
              {Array.from({ length: totalSteps }).map((_, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index + 1 === currentStep
                        ? "bg-blue-600 text-white"
                        : index + 1 < currentStep
                          ? "bg-blue-100 text-blue-600"
                          : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {index + 1}
                  </div>
                  {index < totalSteps - 1 && (
                    <div className={`w-12 h-1 ${index + 1 < currentStep ? "bg-blue-600" : "bg-slate-200"}`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>
                {currentStep === 1 && "Dashboard Overview"}
                {currentStep === 2 && "Trading Journal"}
                {currentStep === 3 && "Performance Analytics"}
                {currentStep === 4 && "AI Trade Analysis"}
              </CardTitle>
              <CardDescription>
                {currentStep === 1 && "Get a quick overview of your trading performance"}
                {currentStep === 2 && "Document your trades and insights"}
                {currentStep === 3 && "Analyze your trading patterns and performance"}
                {currentStep === 4 && "Get AI-powered insights on your trades"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {currentStep === 1 && (
                <div>
                  <div className="rounded-lg overflow-hidden border border-slate-200 mb-6">
                    <Image
                      src="/trading-dashboard.png"
                      alt="Dashboard Demo"
                      width={800}
                      height={500}
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Key Dashboard Features:</h3>
                    <ul className="list-disc pl-5 space-y-2 text-slate-600">
                      <li>Real-time account balance and P&L tracking</li>
                      <li>Performance metrics including win rate and risk/reward ratio</li>
                      <li>Recent trade history and open positions</li>
                      <li>Trading activity calendar and patterns</li>
                      <li>Top performing instruments and strategies</li>
                    </ul>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div>
                  <div className="rounded-lg overflow-hidden border border-slate-200 mb-6">
                    <Image
                      src="/trading-chart-profit.png"
                      alt="Journal Demo"
                      width={800}
                      height={500}
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Journal Features:</h3>
                    <ul className="list-disc pl-5 space-y-2 text-slate-600">
                      <li>Document trades with screenshots, annotations, and notes</li>
                      <li>Track emotional state and decision-making process</li>
                      <li>Tag entries for easy filtering and pattern recognition</li>
                      <li>Link journal entries to specific trades</li>
                      <li>Search and filter journal entries by various criteria</li>
                    </ul>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div>
                  <Tabs defaultValue="performance" className="w-full">
                    <TabsList className="mb-4">
                      <TabsTrigger value="performance">Performance</TabsTrigger>
                      <TabsTrigger value="patterns">Patterns</TabsTrigger>
                      <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
                    </TabsList>
                    <TabsContent value="performance">
                      <div className="rounded-lg overflow-hidden border border-slate-200 mb-6">
                        <Image
                          src="/trading-chart-profit.png"
                          alt="Performance Analytics"
                          width={800}
                          height={500}
                          className="w-full h-auto"
                        />
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Performance Analytics:</h3>
                        <ul className="list-disc pl-5 space-y-2 text-slate-600">
                          <li>Comprehensive performance metrics and trends</li>
                          <li>Profit/loss analysis by instrument, timeframe, and strategy</li>
                          <li>Win rate and average win/loss tracking</li>
                          <li>Drawdown analysis and recovery patterns</li>
                          <li>Performance comparison across different time periods</li>
                        </ul>
                      </div>
                    </TabsContent>
                    <TabsContent value="patterns">
                      <div className="rounded-lg overflow-hidden border border-slate-200 mb-6">
                        <Image
                          src="/gbp-usd-chart.png"
                          alt="Pattern Analysis"
                          width={800}
                          height={500}
                          className="w-full h-auto"
                        />
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Pattern Analysis:</h3>
                        <ul className="list-disc pl-5 space-y-2 text-slate-600">
                          <li>Identify your most profitable trading patterns</li>
                          <li>Analyze performance by day of week and time of day</li>
                          <li>Discover correlations between market conditions and results</li>
                          <li>Track emotional patterns and their impact on trading</li>
                          <li>Identify recurring mistakes and areas for improvement</li>
                        </ul>
                      </div>
                    </TabsContent>
                    <TabsContent value="risk">
                      <div className="rounded-lg overflow-hidden border border-slate-200 mb-6">
                        <Image
                          src="/trading-chart-profit.png"
                          alt="Risk Analysis"
                          width={800}
                          height={500}
                          className="w-full h-auto"
                        />
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Risk Analysis:</h3>
                        <ul className="list-disc pl-5 space-y-2 text-slate-600">
                          <li>Risk/reward ratio analysis across all trades</li>
                          <li>Position sizing recommendations based on account size</li>
                          <li>Maximum drawdown tracking and analysis</li>
                          <li>Risk-adjusted return calculations</li>
                          <li>Correlation analysis between different instruments</li>
                        </ul>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              )}

              {currentStep === 4 && (
                <div>
                  <div className="rounded-lg overflow-hidden border border-slate-200 mb-6">
                    <Image
                      src="/tradingview-eurusd-annotated.png"
                      alt="AI Analysis"
                      width={800}
                      height={500}
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">AI Trade Analysis:</h3>
                    <ul className="list-disc pl-5 space-y-2 text-slate-600">
                      <li>Upload chart screenshots for instant AI analysis</li>
                      <li>Automatic support/resistance level identification</li>
                      <li>Pattern recognition and trend analysis</li>
                      <li>Risk/reward calculation and optimization</li>
                      <li>Entry and exit point suggestions</li>
                      <li>Save analysis directly to your trading journal</li>
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
              Previous
            </Button>

            {currentStep < totalSteps ? (
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={nextStep}>
                Next
              </Button>
            ) : (
              <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                <Link href="/register">
                  Start Free Trial <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

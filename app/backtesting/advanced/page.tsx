"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { History, Layers, Shuffle, ArrowRight, GitCompare } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AdvancedBacktestingPage() {
  const [activeTab, setActiveTab] = useState("monte-carlo")

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Advanced Backtesting</h1>
          <p className="text-muted-foreground mt-2">
            Powerful tools for comprehensive strategy testing and optimization
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/backtesting">
            <ArrowRight className="mr-2 h-4 w-4" />
            Back to Backtesting
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="monte-carlo" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
          <TabsTrigger value="monte-carlo" className="flex items-center gap-2">
            <Shuffle className="h-4 w-4" />
            <span className="hidden md:inline">Monte Carlo</span>
            <span className="md:hidden">Monte Carlo</span>
          </TabsTrigger>
          <TabsTrigger value="walk-forward" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            <span className="hidden md:inline">Walk-Forward</span>
            <span className="md:hidden">Walk-Forward</span>
          </TabsTrigger>
          <TabsTrigger value="multi-market" className="flex items-center gap-2">
            <Layers className="h-4 w-4" />
            <span className="hidden md:inline">Multi-Market</span>
            <span className="md:hidden">Multi-Market</span>
          </TabsTrigger>
          <TabsTrigger value="comparison" className="flex items-center gap-2">
            <GitCompare className="h-4 w-4" />
            <span className="hidden md:inline">Comparison</span>
            <span className="md:hidden">Comparison</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="monte-carlo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shuffle className="h-5 w-5 text-blue-600" />
                Monte Carlo Simulation
              </CardTitle>
              <CardDescription>Analyze the statistical probability of various performance outcomes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="aspect-video relative rounded-lg overflow-hidden border">
                    <Image
                      src="/monte-carlo-confidence-intervals.png"
                      alt="Monte Carlo Simulation"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="p-4">
                        <CardTitle className="text-sm font-medium">Confidence Level</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="text-2xl font-bold">95%</div>
                        <p className="text-xs text-muted-foreground">Statistical confidence</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="p-4">
                        <CardTitle className="text-sm font-medium">Simulations</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="text-2xl font-bold">10,000</div>
                        <p className="text-xs text-muted-foreground">Random sequences</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-medium">Simulation Results</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <Card>
                        <CardHeader className="p-4">
                          <CardTitle className="text-sm font-medium">Expected Return</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="text-2xl font-bold text-green-600">+42.8%</div>
                          <p className="text-xs text-muted-foreground">Mean annual return</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="p-4">
                          <CardTitle className="text-sm font-medium">Max Drawdown</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="text-2xl font-bold text-red-600">-18.3%</div>
                          <p className="text-xs text-muted-foreground">95% confidence</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="p-4">
                          <CardTitle className="text-sm font-medium">Value at Risk</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="text-2xl font-bold">12.4%</div>
                          <p className="text-xs text-muted-foreground">95% VaR (monthly)</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="p-4">
                          <CardTitle className="text-sm font-medium">Profit Probability</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="text-2xl font-bold">78.6%</div>
                          <p className="text-xs text-muted-foreground">Profitable simulations</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-medium">Simulation Controls</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <Button className="w-full">Run Simulation</Button>
                      <Button variant="outline" className="w-full">
                        Export Results
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="walk-forward" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5 text-blue-600" />
                Walk-Forward Analysis
              </CardTitle>
              <CardDescription>
                Test strategy robustness by optimizing on in-sample data and validating on out-of-sample data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="aspect-video relative rounded-lg overflow-hidden border">
                    <Image
                      src="/placeholder.svg?height=400&width=600&query=walk forward optimization chart with in-sample and out-of-sample periods"
                      alt="Walk-Forward Analysis"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="p-4">
                        <CardTitle className="text-sm font-medium">Optimization Windows</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="text-2xl font-bold">6</div>
                        <p className="text-xs text-muted-foreground">Testing periods</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="p-4">
                        <CardTitle className="text-sm font-medium">Efficiency Ratio</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="text-2xl font-bold">0.82</div>
                        <p className="text-xs text-muted-foreground">Out/In-sample performance</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-medium">Analysis Results</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <Card>
                        <CardHeader className="p-4">
                          <CardTitle className="text-sm font-medium">Parameter Stability</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="text-2xl font-bold text-amber-600">Medium</div>
                          <p className="text-xs text-muted-foreground">Parameter consistency</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="p-4">
                          <CardTitle className="text-sm font-medium">Robustness Score</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="text-2xl font-bold text-green-600">76%</div>
                          <p className="text-xs text-muted-foreground">Strategy robustness</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="p-4">
                          <CardTitle className="text-sm font-medium">Curve-Fitting Risk</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="text-2xl font-bold text-green-600">Low</div>
                          <p className="text-xs text-muted-foreground">Overfitting assessment</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="p-4">
                          <CardTitle className="text-sm font-medium">Optimal Window</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="text-2xl font-bold">6 months</div>
                          <p className="text-xs text-muted-foreground">Reoptimization period</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-medium">Analysis Controls</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <Button className="w-full">Run Analysis</Button>
                      <Button variant="outline" className="w-full">
                        Export Results
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="multi-market" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-blue-600" />
                Multi-Market Testing
              </CardTitle>
              <CardDescription>Test your strategy across multiple markets and analyze correlations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="aspect-video relative rounded-lg overflow-hidden border">
                    <Image
                      src="/placeholder.svg?height=400&width=600&query=multi-market correlation heatmap for forex pairs"
                      alt="Multi-Market Correlation"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="p-4">
                        <CardTitle className="text-sm font-medium">Markets Tested</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="text-2xl font-bold">8</div>
                        <p className="text-xs text-muted-foreground">Forex pairs</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="p-4">
                        <CardTitle className="text-sm font-medium">Avg. Correlation</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="text-2xl font-bold">0.38</div>
                        <p className="text-xs text-muted-foreground">Between markets</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-medium">Performance By Market</h3>
                    <div className="space-y-4">
                      <Card>
                        <CardContent className="p-4">
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <div className="font-medium">EUR/USD</div>
                              <div className="text-green-600 font-medium">+28.4%</div>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-green-600 h-2 rounded-full" style={{ width: "72%" }}></div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <div className="font-medium">GBP/USD</div>
                              <div className="text-green-600 font-medium">+32.1%</div>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-green-600 h-2 rounded-full" style={{ width: "80%" }}></div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <div className="font-medium">USD/JPY</div>
                              <div className="text-red-600 font-medium">-8.2%</div>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-red-600 h-2 rounded-full" style={{ width: "20%" }}></div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <div className="font-medium">AUD/USD</div>
                              <div className="text-green-600 font-medium">+18.7%</div>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-green-600 h-2 rounded-full" style={{ width: "47%" }}></div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-medium">Testing Controls</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <Button className="w-full">Run Multi-Market Test</Button>
                      <Button variant="outline" className="w-full">
                        Export Results
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitCompare className="h-5 w-5 text-blue-600" />
                Strategy Comparison
              </CardTitle>
              <CardDescription>Compare multiple strategies side by side to identify the best performer</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="aspect-video relative rounded-lg overflow-hidden border">
                    <Image
                      src="/placeholder.svg?height=400&width=600&query=trading strategy comparison chart with multiple equity curves"
                      alt="Strategy Comparison"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="p-4">
                        <CardTitle className="text-sm font-medium">Strategies</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-muted-foreground">Being compared</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="p-4">
                        <CardTitle className="text-sm font-medium">Test Period</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="text-2xl font-bold">2 years</div>
                        <p className="text-xs text-muted-foreground">Historical data</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-medium">Strategy Performance</h3>
                    <div className="space-y-4">
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-medium">Trend Following</div>
                              <div className="text-xs text-muted-foreground">Moving average crossover</div>
                            </div>
                            <div className="text-green-600 font-medium">+42.8%</div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-medium">Mean Reversion</div>
                              <div className="text-xs text-muted-foreground">RSI-based strategy</div>
                            </div>
                            <div className="text-green-600 font-medium">+28.3%</div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-medium">Breakout</div>
                              <div className="text-xs text-muted-foreground">Volatility expansion</div>
                            </div>
                            <div className="text-green-600 font-medium">+36.5%</div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-medium">Comparison Metrics</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <Card>
                        <CardHeader className="p-4">
                          <CardTitle className="text-sm font-medium">Best Sharpe Ratio</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="text-2xl font-bold">1.82</div>
                          <p className="text-xs text-muted-foreground">Trend Following</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="p-4">
                          <CardTitle className="text-sm font-medium">Lowest Drawdown</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="text-2xl font-bold">-12.4%</div>
                          <p className="text-xs text-muted-foreground">Mean Reversion</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Button className="w-full">Add Strategy</Button>
                      <Button variant="outline" className="w-full">
                        Export Comparison
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

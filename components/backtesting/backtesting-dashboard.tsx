"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StrategyBuilder } from "@/components/backtesting/strategy-builder"
import { BacktestResults } from "@/components/backtesting/backtest-results"
import { HistoricalDataSelector } from "@/components/backtesting/historical-data-selector"
import { BacktestParameters } from "@/components/backtesting/backtest-parameters"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, Play, Save, FileDown, BarChart4, Layers, Shuffle, Zap, BookOpen } from "lucide-react"
import { AdvancedOptimization } from "@/components/backtesting/advanced-optimization"
import { MonteCarloSimulation } from "@/components/backtesting/monte-carlo-simulation"
import { MultiMarketTesting } from "@/components/backtesting/multi-market-testing"
import { StrategyComparison } from "@/components/backtesting/strategy-comparison"

export function BacktestingDashboard() {
  const [activeTab, setActiveTab] = useState("setup")
  const [isRunning, setIsRunning] = useState(false)
  const [hasResults, setHasResults] = useState(false)
  const [strategy, setStrategy] = useState<any>(null)
  const [advancedMode, setAdvancedMode] = useState(false)
  const [parameters, setParameters] = useState<any>({
    initialCapital: 10000,
    riskPerTrade: 2,
    timeframe: "H1",
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    includeCommissions: true,
    includeSlippage: true,
    slippagePips: 1,
    commissionPerLot: 7,
    usePositionSizing: true,
    maxOpenPositions: 5,
    maxDrawdownPercent: 20,
  })

  const runBacktest = async () => {
    setIsRunning(true)

    // Simulate backtesting process
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setIsRunning(false)
    setHasResults(true)
    setActiveTab("results")
  }

  const saveStrategy = () => {
    // Implementation for saving strategy
    alert("Strategy saved successfully!")
  }

  const exportResults = () => {
    // Implementation for exporting results
    alert("Results exported successfully!")
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Strategy Backtesting</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground mr-2">Advanced Mode</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={advancedMode}
              onChange={() => setAdvancedMode(!advancedMode)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="setup">Setup</TabsTrigger>
            <TabsTrigger value="results" disabled={!hasResults}>
              Results
            </TabsTrigger>
            <TabsTrigger value="optimization" disabled={!advancedMode}>
              Optimization
            </TabsTrigger>
            <TabsTrigger value="monte-carlo" disabled={!advancedMode}>
              Monte Carlo
            </TabsTrigger>
            <TabsTrigger value="multi-market" disabled={!advancedMode}>
              Multi-Market
            </TabsTrigger>
            <TabsTrigger value="comparison" disabled={!advancedMode}>
              Comparison
            </TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={saveStrategy}>
              <Save className="h-4 w-4 mr-2" />
              Save Strategy
            </Button>
            {hasResults && (
              <Button variant="outline" size="sm" onClick={exportResults}>
                <FileDown className="h-4 w-4 mr-2" />
                Export Results
              </Button>
            )}
            <Button size="sm" onClick={runBacktest} disabled={isRunning}>
              {isRunning ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Running...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Run Backtest
                </>
              )}
            </Button>
          </div>
        </div>

        <TabsContent value="setup" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StrategyBuilder strategy={strategy} onChange={setStrategy} advancedMode={advancedMode} />

            <div className="space-y-6">
              <BacktestParameters parameters={parameters} onChange={setParameters} advancedMode={advancedMode} />
              <HistoricalDataSelector advancedMode={advancedMode} />
            </div>
          </div>

          {advancedMode && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <BarChart4 className="h-4 w-4 mr-2" />
                    Advanced Risk Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Position Sizing Method</span>
                      <span className="font-medium">Risk-based</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Max Drawdown Limit</span>
                      <span className="font-medium">20%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Max Open Positions</span>
                      <span className="font-medium">5</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Correlation Filter</span>
                      <span className="font-medium">Enabled</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <Layers className="h-4 w-4 mr-2" />
                    Market Conditions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Volatility Scenarios</span>
                      <span className="font-medium">3 Levels</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Trend Filters</span>
                      <span className="font-medium">Enabled</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Seasonal Analysis</span>
                      <span className="font-medium">Enabled</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">News Impact</span>
                      <span className="font-medium">Simulated</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Strategy Templates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Zap className="h-4 w-4 mr-2" />
                      Trend Following
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Shuffle className="h-4 w-4 mr-2" />
                      Mean Reversion
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <BarChart4 className="h-4 w-4 mr-2" />
                      Breakout
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="results">{hasResults && <BacktestResults advancedMode={advancedMode} />}</TabsContent>

        <TabsContent value="optimization">{advancedMode && <AdvancedOptimization />}</TabsContent>

        <TabsContent value="monte-carlo">{advancedMode && <MonteCarloSimulation />}</TabsContent>

        <TabsContent value="multi-market">{advancedMode && <MultiMarketTesting />}</TabsContent>

        <TabsContent value="comparison">{advancedMode && <StrategyComparison />}</TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Backtest History</CardTitle>
              <CardDescription>View and compare your previous backtest results</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-8">
                You haven't run any backtests yet. Configure a strategy and run your first backtest.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

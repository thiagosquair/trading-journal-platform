"use client"

import { Button } from "@/components/ui/button"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ResponsiveChart } from "@/components/responsive-chart"

export function BacktestResults() {
  // Mock data for demonstration
  const performanceMetrics = {
    netProfit: 3245.75,
    profitFactor: 2.8,
    winRate: 68.5,
    maxDrawdown: 12.3,
    sharpeRatio: 1.75,
    totalTrades: 47,
    winningTrades: 32,
    losingTrades: 15,
    averageWin: 215.5,
    averageLoss: 125.3,
    largestWin: 520.75,
    largestLoss: 310.25,
    averageHoldingTime: "2.3 days",
    returnOnInvestment: 32.46,
  }

  // Mock function for chart rendering
  const renderEquityCurve = (container: HTMLDivElement, isDarkMode: boolean) => {
    // In a real implementation, this would use a charting library
    // For now, we'll just add a placeholder
    container.innerHTML = `
      <div style="display: flex; justify-content: center; align-items: center; height: 100%; background: ${
        isDarkMode ? "#1f2937" : "#f1f5f9"
      }; border-radius: 8px;">
        <p style="color: ${isDarkMode ? "white" : "black"}; text-align: center;">Equity Curve Chart<br>(Placeholder)</p>
      </div>
    `
  }

  const renderMonthlyReturns = (container: HTMLDivElement, isDarkMode: boolean) => {
    container.innerHTML = `
      <div style="display: flex; justify-content: center; align-items: center; height: 100%; background: ${
        isDarkMode ? "#1f2937" : "#f1f5f9"
      }; border-radius: 8px;">
        <p style="color: ${
          isDarkMode ? "white" : "black"
        }; text-align: center;">Monthly Returns Chart<br>(Placeholder)</p>
      </div>
    `
  }

  const renderDrawdownChart = (container: HTMLDivElement, isDarkMode: boolean) => {
    container.innerHTML = `
      <div style="display: flex; justify-content: center; align-items: center; height: 100%; background: ${
        isDarkMode ? "#1f2937" : "#f1f5f9"
      }; border-radius: 8px;">
        <p style="color: ${isDarkMode ? "white" : "black"}; text-align: center;">Drawdown Chart<br>(Placeholder)</p>
      </div>
    `
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Net Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${performanceMetrics.netProfit.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {performanceMetrics.returnOnInvestment}% Return on Investment
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Win Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceMetrics.winRate}%</div>
            <p className="text-xs text-muted-foreground">
              {performanceMetrics.winningTrades} wins / {performanceMetrics.losingTrades} losses
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Max Drawdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{performanceMetrics.maxDrawdown}%</div>
            <p className="text-xs text-muted-foreground">Profit Factor: {performanceMetrics.profitFactor}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trades">Trades</TabsTrigger>
          <TabsTrigger value="metrics">Detailed Metrics</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 pt-4">
          <ResponsiveChart title="Equity Curve" renderChart={renderEquityCurve} height={300} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ResponsiveChart title="Monthly Returns" renderChart={renderMonthlyReturns} height={250} />

            <ResponsiveChart title="Drawdown" renderChart={renderDrawdownChart} height={250} />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Strategy Performance Summary</CardTitle>
              <CardDescription>Overall performance metrics for your strategy</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Total Trades</h4>
                  <p className="text-lg font-semibold">{performanceMetrics.totalTrades}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Profit Factor</h4>
                  <p className="text-lg font-semibold">{performanceMetrics.profitFactor}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Sharpe Ratio</h4>
                  <p className="text-lg font-semibold">{performanceMetrics.sharpeRatio}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Avg Holding Time</h4>
                  <p className="text-lg font-semibold">{performanceMetrics.averageHoldingTime}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Average Win</h4>
                  <p className="text-lg font-semibold text-green-600">${performanceMetrics.averageWin}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Average Loss</h4>
                  <p className="text-lg font-semibold text-red-600">${performanceMetrics.averageLoss}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Largest Win</h4>
                  <p className="text-lg font-semibold text-green-600">${performanceMetrics.largestWin}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Largest Loss</h4>
                  <p className="text-lg font-semibold text-red-600">${performanceMetrics.largestLoss}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trades" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Trade List</CardTitle>
              <CardDescription>Detailed list of all trades executed during the backtest</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="min-w-full divide-y divide-border">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">#</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Date</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Symbol</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Type</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Size</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Entry</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Exit</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">P/L</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-background">
                    {[
                      {
                        id: 1,
                        date: "2023-01-05",
                        symbol: "EURUSD",
                        type: "BUY",
                        size: 0.1,
                        entry: 1.0725,
                        exit: 1.0825,
                        pl: 100.0,
                      },
                      {
                        id: 2,
                        date: "2023-01-12",
                        symbol: "EURUSD",
                        type: "SELL",
                        size: 0.1,
                        entry: 1.085,
                        exit: 1.075,
                        pl: 100.0,
                      },
                      {
                        id: 3,
                        date: "2023-01-18",
                        symbol: "EURUSD",
                        type: "BUY",
                        size: 0.1,
                        entry: 1.071,
                        exit: 1.069,
                        pl: -20.0,
                      },
                      {
                        id: 4,
                        date: "2023-01-25",
                        symbol: "EURUSD",
                        type: "BUY",
                        size: 0.1,
                        entry: 1.068,
                        exit: 1.078,
                        pl: 100.0,
                      },
                      {
                        id: 5,
                        date: "2023-02-02",
                        symbol: "EURUSD",
                        type: "SELL",
                        size: 0.1,
                        entry: 1.083,
                        exit: 1.073,
                        pl: 100.0,
                      },
                    ].map((trade) => (
                      <tr key={trade.id}>
                        <td className="px-4 py-2 text-sm">{trade.id}</td>
                        <td className="px-4 py-2 text-sm">{trade.date}</td>
                        <td className="px-4 py-2 text-sm">{trade.symbol}</td>
                        <td className="px-4 py-2 text-sm">
                          <Badge variant={trade.type === "BUY" ? "success" : "destructive"}>{trade.type}</Badge>
                        </td>
                        <td className="px-4 py-2 text-sm">{trade.size}</td>
                        <td className="px-4 py-2 text-sm">{trade.entry}</td>
                        <td className="px-4 py-2 text-sm">{trade.exit}</td>
                        <td
                          className={`px-4 py-2 text-sm font-medium ${trade.pl >= 0 ? "text-green-600" : "text-red-600"}`}
                        >
                          ${trade.pl.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Performance Metrics</CardTitle>
              <CardDescription>Detailed statistical analysis of your strategy performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Return Metrics</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Annualized Return</span>
                      <span className="font-medium">28.4%</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Monthly Return</span>
                      <span className="font-medium">2.1%</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Daily Return</span>
                      <span className="font-medium">0.07%</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Return Volatility</span>
                      <span className="font-medium">12.3%</span>
                    </div>
                  </div>

                  <h3 className="text-sm font-medium">Risk Metrics</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Sharpe Ratio</span>
                      <span className="font-medium">1.75</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Sortino Ratio</span>
                      <span className="font-medium">2.31</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Calmar Ratio</span>
                      <span className="font-medium">2.05</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Max Drawdown</span>
                      <span className="font-medium">12.3%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Trade Metrics</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Win Rate</span>
                      <span className="font-medium">68.5%</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Profit Factor</span>
                      <span className="font-medium">2.8</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Average Win/Loss Ratio</span>
                      <span className="font-medium">1.72</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Expectancy</span>
                      <span className="font-medium">$69.05 per trade</span>
                    </div>
                  </div>

                  <h3 className="text-sm font-medium">Time Metrics</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Average Holding Time</span>
                      <span className="font-medium">2.3 days</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Average Winning Trade Time</span>
                      <span className="font-medium">2.8 days</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Average Losing Trade Time</span>
                      <span className="font-medium">1.5 days</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Time in Market</span>
                      <span className="font-medium">68.2%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="optimization" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Strategy Optimization</CardTitle>
              <CardDescription>Optimize your strategy parameters for better performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">
                  Strategy optimization is available on Pro and Premium plans.
                </p>
                <Button>Upgrade to Pro</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

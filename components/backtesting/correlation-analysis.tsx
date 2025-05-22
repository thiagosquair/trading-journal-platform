"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveChart } from "@/components/responsive-chart"

export function CorrelationAnalysis() {
  // Mock function for chart rendering
  const renderCorrelationMatrix = (container: HTMLDivElement, isDarkMode: boolean) => {
    container.innerHTML = `
      <div style="display: flex; justify-content: center; align-items: center; height: 100%; background: ${
        isDarkMode ? "#1f2937" : "#f1f5f9"
      }; border-radius: 8px;">
        <p style="color: ${isDarkMode ? "white" : "black"}; text-align: center;">Correlation Matrix<br>(Placeholder)</p>
      </div>
    `
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Correlation Analysis</h3>

      <ResponsiveChart title="Strategy Correlation Matrix" renderChart={renderCorrelationMatrix} height={400} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Correlation Summary</CardTitle>
            <CardDescription>Correlation between different strategies and markets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Strategy Correlations</h4>
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Strategy 1 vs Strategy 2</span>
                    <span className="font-medium">0.32</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Strategy 1 vs Strategy 3</span>
                    <span className="font-medium">0.18</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Strategy 2 vs Strategy 3</span>
                    <span className="font-medium">0.45</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Market Correlations</h4>
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">EUR/USD vs GBP/USD</span>
                    <span className="font-medium">0.78</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">EUR/USD vs USD/JPY</span>
                    <span className="font-medium">-0.42</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">GBP/USD vs USD/JPY</span>
                    <span className="font-medium">-0.35</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Portfolio Metrics</h4>
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Average Correlation</span>
                    <span className="font-medium">0.32</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Diversification Ratio</span>
                    <span className="font-medium">1.85</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Portfolio Efficiency</span>
                    <span className="font-medium text-green-600">+28%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Diversification Benefits</CardTitle>
            <CardDescription>Potential benefits from combining strategies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Risk Reduction</h4>
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Volatility Reduction</span>
                    <span className="font-medium text-green-600">-24.5%</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Maximum Drawdown Reduction</span>
                    <span className="font-medium text-green-600">-18.7%</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Downside Deviation Reduction</span>
                    <span className="font-medium text-green-600">-22.3%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Performance Improvement</h4>
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Sharpe Ratio Improvement</span>
                    <span className="font-medium text-green-600">+32.4%</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Sortino Ratio Improvement</span>
                    <span className="font-medium text-green-600">+38.7%</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Calmar Ratio Improvement</span>
                    <span className="font-medium text-green-600">+27.9%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Optimal Allocation</h4>
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Strategy 1</span>
                    <span className="font-medium">40%</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Strategy 2</span>
                    <span className="font-medium">35%</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Strategy 3</span>
                    <span className="font-medium">25%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

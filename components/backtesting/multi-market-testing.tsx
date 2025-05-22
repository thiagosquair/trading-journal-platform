"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveChart } from "@/components/responsive-chart"
import { Button } from "@/components/ui/button"
import { FileDown, Play, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export function MultiMarketTesting() {
  // Mock function for chart rendering
  const renderPerformanceComparison = (container: HTMLDivElement, isDarkMode: boolean) => {
    container.innerHTML = `
      <div style="display: flex; justify-content: center; align-items: center; height: 100%; background: ${
        isDarkMode ? "#1f2937" : "#f1f5f9"
      }; border-radius: 8px;">
        <p style="color: ${
          isDarkMode ? "white" : "black"
        }; text-align: center;">Performance Comparison Chart<br>(Placeholder)</p>
      </div>
    `
  }

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
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Multi-Market Testing</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <FileDown className="h-4 w-4 mr-2" />
            Export Results
          </Button>
          <Button size="sm">
            <Play className="h-4 w-4 mr-2" />
            Run Tests
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Markets to Test</CardTitle>
            <CardDescription>Select markets to test your strategy on</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Forex Pairs</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="eurusd" defaultChecked />
                      <Label htmlFor="eurusd" className="text-sm">
                        EUR/USD
                      </Label>
                      <Badge className="ml-auto">Selected</Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="gbpusd" defaultChecked />
                      <Label htmlFor="gbpusd" className="text-sm">
                        GBP/USD
                      </Label>
                      <Badge className="ml-auto">Selected</Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="usdjpy" defaultChecked />
                      <Label htmlFor="usdjpy" className="text-sm">
                        USD/JPY
                      </Label>
                      <Badge className="ml-auto">Selected</Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="audusd" />
                      <Label htmlFor="audusd" className="text-sm">
                        AUD/USD
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="usdcad" />
                      <Label htmlFor="usdcad" className="text-sm">
                        USD/CAD
                      </Label>
                    </div>
                    <Button variant="outline" size="sm" className="mt-2">
                      <Plus className="h-3 w-3 mr-1" />
                      Add More
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Cryptocurrencies</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="btcusd" defaultChecked />
                      <Label htmlFor="btcusd" className="text-sm">
                        BTC/USD
                      </Label>
                      <Badge className="ml-auto">Selected</Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="ethusd" />
                      <Label htmlFor="ethusd" className="text-sm">
                        ETH/USD
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="xrpusd" />
                      <Label htmlFor="xrpusd" className="text-sm">
                        XRP/USD
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="ltcusd" />
                      <Label htmlFor="ltcusd" className="text-sm">
                        LTC/USD
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="solusd" />
                      <Label htmlFor="solusd" className="text-sm">
                        SOL/USD
                      </Label>
                    </div>
                    <Button variant="outline" size="sm" className="mt-2">
                      <Plus className="h-3 w-3 mr-1" />
                      Add More
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Indices & Commodities</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="us500" />
                    <Label htmlFor="us500" className="text-sm">
                      US500
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="nas100" />
                    <Label htmlFor="nas100" className="text-sm">
                      NAS100
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="gold" />
                    <Label htmlFor="gold" className="text-sm">
                      GOLD
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="oil" />
                    <Label htmlFor="oil" className="text-sm">
                      OIL
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Test Configuration</CardTitle>
            <CardDescription>Configure multi-market test settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="normalize-results" defaultChecked />
                <Label htmlFor="normalize-results" className="text-sm">
                  Normalize Results
                </Label>
              </div>
              <p className="text-xs text-muted-foreground">Adjust results for different market volatilities</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="correlation-analysis" defaultChecked />
                <Label htmlFor="correlation-analysis" className="text-sm">
                  Correlation Analysis
                </Label>
              </div>
              <p className="text-xs text-muted-foreground">Analyze correlation between market performances</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="portfolio-simulation" defaultChecked />
                <Label htmlFor="portfolio-simulation" className="text-sm">
                  Portfolio Simulation
                </Label>
              </div>
              <p className="text-xs text-muted-foreground">Simulate portfolio with equal allocation</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="optimize-allocation" />
                <Label htmlFor="optimize-allocation" className="text-sm">
                  Optimize Allocation
                </Label>
              </div>
              <p className="text-xs text-muted-foreground">Find optimal capital allocation across markets</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <ResponsiveChart
        title="Performance Comparison Across Markets"
        renderChart={renderPerformanceComparison}
        height={400}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Market Performance Summary</CardTitle>
            <CardDescription>Strategy performance across different markets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <table className="min-w-full divide-y divide-border">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Market</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Profit</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Win %</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Sharpe</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-background">
                  {[
                    { market: "EUR/USD", profit: "+28.4%", winRate: 68, sharpe: 1.85 },
                    { market: "GBP/USD", profit: "+22.7%", winRate: 65, sharpe: 1.62 },
                    { market: "USD/JPY", profit: "+18.9%", winRate: 62, sharpe: 1.45 },
                    { market: "BTC/USD", profit: "+35.2%", winRate: 58, sharpe: 1.92 },
                  ].map((result, i) => (
                    <tr key={i}>
                      <td className="px-3 py-2 text-sm">{result.market}</td>
                      <td className="px-3 py-2 text-sm font-medium text-green-600">{result.profit}</td>
                      <td className="px-3 py-2 text-sm">{result.winRate}%</td>
                      <td className="px-3 py-2 text-sm">{result.sharpe}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Correlation Analysis</CardTitle>
            <CardDescription>Strategy performance correlation between markets</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveChart title="" renderChart={renderCorrelationMatrix} height={200} />
            <div className="mt-2 text-sm text-muted-foreground">
              <p>
                Average Correlation: <span className="font-medium">0.42</span>
              </p>
              <p>
                Portfolio Sharpe Ratio: <span className="font-medium">2.35</span>
              </p>
              <p>
                Diversification Benefit: <span className="font-medium text-green-600">+27%</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

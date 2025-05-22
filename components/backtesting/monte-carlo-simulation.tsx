"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveChart } from "@/components/responsive-chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { FileDown, RefreshCw } from "lucide-react"

export function MonteCarloSimulation() {
  // Mock function for chart rendering
  const renderEquityCurves = (container: HTMLDivElement, isDarkMode: boolean) => {
    container.innerHTML = `
      <div style="display: flex; justify-content: center; align-items: center; height: 100%; background: ${
        isDarkMode ? "#1f2937" : "#f1f5f9"
      }; border-radius: 8px;">
        <p style="color: ${
          isDarkMode ? "white" : "black"
        }; text-align: center;">Monte Carlo Equity Curves<br>(Placeholder)</p>
      </div>
    `
  }

  const renderDrawdownDistribution = (container: HTMLDivElement, isDarkMode: boolean) => {
    container.innerHTML = `
      <div style="display: flex; justify-content: center; align-items: center; height: 100%; background: ${
        isDarkMode ? "#1f2937" : "#f1f5f9"
      }; border-radius: 8px;">
        <p style="color: ${
          isDarkMode ? "white" : "black"
        }; text-align: center;">Drawdown Distribution<br>(Placeholder)</p>
      </div>
    `
  }

  const renderProfitDistribution = (container: HTMLDivElement, isDarkMode: boolean) => {
    container.innerHTML = `
      <div style="display: flex; justify-content: center; align-items: center; height: 100%; background: ${
        isDarkMode ? "#1f2937" : "#f1f5f9"
      }; border-radius: 8px;">
        <p style="color: ${
          isDarkMode ? "white" : "black"
        }; text-align: center;">Profit Distribution<br>(Placeholder)</p>
      </div>
    `
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Monte Carlo Simulation</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Run Simulation
          </Button>
          <Button variant="outline" size="sm">
            <FileDown className="h-4 w-4 mr-2" />
            Export Results
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Confidence Interval</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">95%</div>
            <p className="text-xs text-muted-foreground">Based on 1,000 simulations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Expected Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">$3,245 - $4,890</div>
            <p className="text-xs text-muted-foreground">95% confidence range</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Max Drawdown Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">15.8% - 24.3%</div>
            <p className="text-xs text-muted-foreground">95% confidence range</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="equity">
        <TabsList>
          <TabsTrigger value="equity">Equity Curves</TabsTrigger>
          <TabsTrigger value="drawdown">Drawdown Distribution</TabsTrigger>
          <TabsTrigger value="profit">Profit Distribution</TabsTrigger>
          <TabsTrigger value="metrics">Statistical Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="equity" className="pt-4">
          <ResponsiveChart title="Monte Carlo Equity Curves" renderChart={renderEquityCurves} height={400} />

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Best Case</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold text-green-600">$5,120</div>
                <p className="text-xs text-muted-foreground">51.2% Return</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Average Case</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">$3,850</div>
                <p className="text-xs text-muted-foreground">38.5% Return</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Worst Case</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold text-red-600">$1,230</div>
                <p className="text-xs text-muted-foreground">12.3% Return</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="drawdown" className="pt-4">
          <ResponsiveChart title="Drawdown Distribution" renderChart={renderDrawdownDistribution} height={400} />

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Average Drawdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold text-amber-600">18.4%</div>
                <p className="text-xs text-muted-foreground">Across all simulations</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">95% VaR</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold text-amber-600">24.3%</div>
                <p className="text-xs text-muted-foreground">Value at Risk</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Maximum Drawdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold text-red-600">32.7%</div>
                <p className="text-xs text-muted-foreground">Worst case scenario</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="profit" className="pt-4">
          <ResponsiveChart title="Profit Distribution" renderChart={renderProfitDistribution} height={400} />

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Probability of Profit</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold text-green-600">94.3%</div>
                <p className="text-xs text-muted-foreground">Chance of positive return</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Expected Return</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">38.5%</div>
                <p className="text-xs text-muted-foreground">Average across simulations</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Return Volatility</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">12.8%</div>
                <p className="text-xs text-muted-foreground">Standard deviation</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="metrics" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Statistical Analysis</CardTitle>
              <CardDescription>Detailed statistical metrics from Monte Carlo simulations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Return Statistics</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Mean Return</span>
                      <span className="font-medium">38.5%</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Median Return</span>
                      <span className="font-medium">36.9%</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Standard Deviation</span>
                      <span className="font-medium">12.8%</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Skewness</span>
                      <span className="font-medium">0.43</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Kurtosis</span>
                      <span className="font-medium">2.87</span>
                    </div>
                  </div>

                  <h3 className="text-sm font-medium">Percentiles</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">5th Percentile</span>
                      <span className="font-medium">18.2%</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">25th Percentile</span>
                      <span className="font-medium">29.7%</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">50th Percentile</span>
                      <span className="font-medium">36.9%</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">75th Percentile</span>
                      <span className="font-medium">45.8%</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">95th Percentile</span>
                      <span className="font-medium">58.9%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Drawdown Statistics</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Mean Drawdown</span>
                      <span className="font-medium">18.4%</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Median Drawdown</span>
                      <span className="font-medium">17.8%</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Standard Deviation</span>
                      <span className="font-medium">4.3%</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">95% VaR</span>
                      <span className="font-medium">24.3%</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">99% VaR</span>
                      <span className="font-medium">29.8%</span>
                    </div>
                  </div>

                  <h3 className="text-sm font-medium">Risk Metrics</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Sharpe Ratio</span>
                      <span className="font-medium">1.75 - 2.12</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Sortino Ratio</span>
                      <span className="font-medium">2.31 - 2.87</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Calmar Ratio</span>
                      <span className="font-medium">1.58 - 2.35</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Profit Factor</span>
                      <span className="font-medium">2.45 - 3.12</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Recovery Factor</span>
                      <span className="font-medium">2.12 - 3.45</span>
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

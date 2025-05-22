"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveChart } from "@/components/responsive-chart"
import { Button } from "@/components/ui/button"
import { FileDown, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function StrategyComparison() {
  // Mock function for chart rendering
  const renderEquityCurveComparison = (container: HTMLDivElement, isDarkMode: boolean) => {
    container.innerHTML = `
      <div style="display: flex; justify-content: center; align-items: center; height: 100%; background: ${
        isDarkMode ? "#1f2937" : "#f1f5f9"
      }; border-radius: 8px;">
        <p style="color: ${
          isDarkMode ? "white" : "black"
        }; text-align: center;">Equity Curve Comparison<br>(Placeholder)</p>
      </div>
    `
  }

  const renderDrawdownComparison = (container: HTMLDivElement, isDarkMode: boolean) => {
    container.innerHTML = `
      <div style="display: flex; justify-content: center; align-items: center; height: 100%; background: ${
        isDarkMode ? "#1f2937" : "#f1f5f9"
      }; border-radius: 8px;">
        <p style="color: ${
          isDarkMode ? "white" : "black"
        }; text-align: center;">Drawdown Comparison<br>(Placeholder)</p>
      </div>
    `
  }

  const renderMonthlyReturnsComparison = (container: HTMLDivElement, isDarkMode: boolean) => {
    container.innerHTML = `
      <div style="display: flex; justify-content: center; align-items: center; height: 100%; background: ${
        isDarkMode ? "#1f2937" : "#f1f5f9"
      }; border-radius: 8px;">
        <p style="color: ${
          isDarkMode ? "white" : "black"
        }; text-align: center;">Monthly Returns Comparison<br>(Placeholder)</p>
      </div>
    `
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Strategy Comparison</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Strategy
          </Button>
          <Button variant="outline" size="sm">
            <FileDown className="h-4 w-4 mr-2" />
            Export Comparison
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base font-medium">Strategy 1</CardTitle>
              <Badge>Current</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Net Profit</span>
                <span className="font-medium text-green-600">$3,245</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Win Rate</span>
                <span className="font-medium">68.5%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Sharpe Ratio</span>
                <span className="font-medium">1.75</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Max Drawdown</span>
                <span className="font-medium text-amber-600">12.3%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base font-medium">Strategy 2</CardTitle>
              <Badge variant="outline">Saved</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Net Profit</span>
                <span className="font-medium text-green-600">$2,870</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Win Rate</span>
                <span className="font-medium">72.1%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Sharpe Ratio</span>
                <span className="font-medium">1.62</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Max Drawdown</span>
                <span className="font-medium text-amber-600">10.8%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base font-medium">Strategy 3</CardTitle>
              <Badge variant="outline">Saved</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Net Profit</span>
                <span className="font-medium text-green-600">$3,980</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Win Rate</span>
                <span className="font-medium">58.7%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Sharpe Ratio</span>
                <span className="font-medium">1.92</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Max Drawdown</span>
                <span className="font-medium text-amber-600">15.4%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <ResponsiveChart title="Equity Curve Comparison" renderChart={renderEquityCurveComparison} height={400} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ResponsiveChart title="Drawdown Comparison" renderChart={renderDrawdownComparison} height={300} />
        <ResponsiveChart title="Monthly Returns Comparison" renderChart={renderMonthlyReturnsComparison} height={300} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detailed Comparison</CardTitle>
          <CardDescription>Side-by-side comparison of strategy performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="min-w-full divide-y divide-border">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Metric</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Strategy 1</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Strategy 2</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Strategy 3</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-background">
                {[
                  { metric: "Net Profit", s1: "$3,245", s2: "$2,870", s3: "$3,980" },
                  { metric: "Return on Investment", s1: "32.5%", s2: "28.7%", s3: "39.8%" },
                  { metric: "Win Rate", s1: "68.5%", s2: "72.1%", s3: "58.7%" },
                  { metric: "Profit Factor", s1: "2.8", s2: "2.5", s3: "3.1" },
                  { metric: "Sharpe Ratio", s1: "1.75", s2: "1.62", s3: "1.92" },
                  { metric: "Sortino Ratio", s1: "2.31", s2: "2.18", s3: "2.45" },
                  { metric: "Max Drawdown", s1: "12.3%", s2: "10.8%", s3: "15.4%" },
                  { metric: "Recovery Factor", s1: "2.64", s2: "2.66", s3: "2.58" },
                  { metric: "Average Trade", s1: "$69.05", s2: "$58.57", s3: "$84.68" },
                  { metric: "Expectancy Ratio", s1: "0.37", s2: "0.42", s3: "0.32" },
                ].map((row, i) => (
                  <tr key={i}>
                    <td className="px-3 py-2 text-sm font-medium">{row.metric}</td>
                    <td className="px-3 py-2 text-sm">{row.s1}</td>
                    <td className="px-3 py-2 text-sm">{row.s2}</td>
                    <td className="px-3 py-2 text-sm">{row.s3}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

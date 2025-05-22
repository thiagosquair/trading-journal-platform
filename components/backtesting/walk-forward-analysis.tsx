"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveChart } from "@/components/responsive-chart"
import { Button } from "@/components/ui/button"
import { FileDown, Play } from "lucide-react"

export function WalkForwardAnalysis() {
  // Mock function for chart rendering
  const renderWalkForwardResults = (container: HTMLDivElement, isDarkMode: boolean) => {
    container.innerHTML = `
      <div style="display: flex; justify-content: center; align-items: center; height: 100%; background: ${
        isDarkMode ? "#1f2937" : "#f1f5f9"
      }; border-radius: 8px;">
        <p style="color: ${
          isDarkMode ? "white" : "black"
        }; text-align: center;">Walk-Forward Analysis Results<br>(Placeholder)</p>
      </div>
    `
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Walk-Forward Analysis</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <FileDown className="h-4 w-4 mr-2" />
            Export Results
          </Button>
          <Button size="sm">
            <Play className="h-4 w-4 mr-2" />
            Run Analysis
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Walk-Forward Efficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">87.3%</div>
            <p className="text-xs text-muted-foreground">Out-of-sample performance relative to in-sample</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Robustness Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.4/10</div>
            <p className="text-xs text-muted-foreground">Strategy consistency across time periods</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Parameter Stability</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">Medium</div>
            <p className="text-xs text-muted-foreground">Consistency of optimal parameters</p>
          </CardContent>
        </Card>
      </div>

      <ResponsiveChart title="Walk-Forward Analysis Results" renderChart={renderWalkForwardResults} height={400} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Walk-Forward Windows</CardTitle>
            <CardDescription>Performance across different time windows</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <table className="min-w-full divide-y divide-border">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Window</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">In-Sample</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Out-of-Sample</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Efficiency</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-background">
                  {[
                    { window: "Window 1", inSample: "+12.4%", outSample: "+10.8%", efficiency: "87.1%" },
                    { window: "Window 2", inSample: "+14.7%", outSample: "+13.2%", efficiency: "89.8%" },
                    { window: "Window 3", inSample: "+11.9%", outSample: "+9.8%", efficiency: "82.4%" },
                    { window: "Window 4", inSample: "+13.5%", outSample: "+12.1%", efficiency: "89.6%" },
                  ].map((result, i) => (
                    <tr key={i}>
                      <td className="px-3 py-2 text-sm">{result.window}</td>
                      <td className="px-3 py-2 text-sm font-medium text-green-600">{result.inSample}</td>
                      <td className="px-3 py-2 text-sm font-medium text-green-600">{result.outSample}</td>
                      <td className="px-3 py-2 text-sm">{result.efficiency}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Parameter Stability</CardTitle>
            <CardDescription>Optimal parameters across different windows</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <table className="min-w-full divide-y divide-border">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Window</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">MA Period</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">RSI Period</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Take Profit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-background">
                  {[
                    { window: "Window 1", ma: 20, rsi: 14, tp: 50 },
                    { window: "Window 2", ma: 25, rsi: 14, tp: 60 },
                    { window: "Window 3", ma: 20, rsi: 12, tp: 50 },
                    { window: "Window 4", ma: 20, rsi: 14, tp: 55 },
                  ].map((result, i) => (
                    <tr key={i}>
                      <td className="px-3 py-2 text-sm">{result.window}</td>
                      <td className="px-3 py-2 text-sm">{result.ma}</td>
                      <td className="px-3 py-2 text-sm">{result.rsi}</td>
                      <td className="px-3 py-2 text-sm">{result.tp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

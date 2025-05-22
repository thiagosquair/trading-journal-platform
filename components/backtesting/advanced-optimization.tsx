"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveChart } from "@/components/responsive-chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { FileDown, Play, Settings, Sliders } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"

export function AdvancedOptimization() {
  // Mock function for chart rendering
  const renderOptimizationHeatmap = (container: HTMLDivElement, isDarkMode: boolean) => {
    container.innerHTML = `
      <div style="display: flex; justify-content: center; align-items: center; height: 100%; background: ${
        isDarkMode ? "#1f2937" : "#f1f5f9"
      }; border-radius: 8px;">
        <p style="color: ${
          isDarkMode ? "white" : "black"
        }; text-align: center;">Parameter Optimization Heatmap<br>(Placeholder)</p>
      </div>
    `
  }

  const renderOptimizationSurface = (container: HTMLDivElement, isDarkMode: boolean) => {
    container.innerHTML = `
      <div style="display: flex; justify-content: center; align-items: center; height: 100%; background: ${
        isDarkMode ? "#1f2937" : "#f1f5f9"
      }; border-radius: 8px;">
        <p style="color: ${
          isDarkMode ? "white" : "black"
        }; text-align: center;">3D Optimization Surface<br>(Placeholder)</p>
      </div>
    `
  }

  const renderOptimizationCurve = (container: HTMLDivElement, isDarkMode: boolean) => {
    container.innerHTML = `
      <div style="display: flex; justify-content: center; align-items: center; height: 100%; background: ${
        isDarkMode ? "#1f2937" : "#f1f5f9"
      }; border-radius: 8px;">
        <p style="color: ${
          isDarkMode ? "white" : "black"
        }; text-align: center;">Parameter Optimization Curve<br>(Placeholder)</p>
      </div>
    `
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Strategy Optimization</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Optimization Settings
          </Button>
          <Button variant="outline" size="sm">
            <FileDown className="h-4 w-4 mr-2" />
            Export Results
          </Button>
          <Button size="sm">
            <Play className="h-4 w-4 mr-2" />
            Run Optimization
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Parameters to Optimize</CardTitle>
            <CardDescription>Select parameters and their ranges</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Moving Average Period</Label>
                <Badge>Selected</Badge>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="ma-min" className="text-xs">
                    Min
                  </Label>
                  <Input id="ma-min" type="number" value="10" className="h-8" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="ma-max" className="text-xs">
                    Max
                  </Label>
                  <Input id="ma-max" type="number" value="50" className="h-8" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="ma-step" className="text-xs">
                    Step
                  </Label>
                  <Input id="ma-step" type="number" value="5" className="h-8" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>RSI Period</Label>
                <Badge>Selected</Badge>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="rsi-min" className="text-xs">
                    Min
                  </Label>
                  <Input id="rsi-min" type="number" value="7" className="h-8" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="rsi-max" className="text-xs">
                    Max
                  </Label>
                  <Input id="rsi-max" type="number" value="21" className="h-8" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="rsi-step" className="text-xs">
                    Step
                  </Label>
                  <Input id="rsi-step" type="number" value="2" className="h-8" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Take Profit (pips)</Label>
                <Badge>Selected</Badge>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="tp-min" className="text-xs">
                    Min
                  </Label>
                  <Input id="tp-min" type="number" value="20" className="h-8" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="tp-max" className="text-xs">
                    Max
                  </Label>
                  <Input id="tp-max" type="number" value="100" className="h-8" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="tp-step" className="text-xs">
                    Step
                  </Label>
                  <Input id="tp-step" type="number" value="10" className="h-8" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Stop Loss (pips)</Label>
                <Badge variant="outline">Not Selected</Badge>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                <Sliders className="h-4 w-4 mr-2" />
                Add Parameter
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Optimization Method</CardTitle>
            <CardDescription>Configure optimization algorithm</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="optimization-method">Method</Label>
              <Select defaultValue="grid">
                <SelectTrigger id="optimization-method">
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="grid">Grid Search</SelectItem>
                  <SelectItem value="genetic">Genetic Algorithm</SelectItem>
                  <SelectItem value="particle">Particle Swarm</SelectItem>
                  <SelectItem value="bayesian">Bayesian Optimization</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="optimization-metric">Optimization Metric</Label>
              <Select defaultValue="sharpe">
                <SelectTrigger id="optimization-metric">
                  <SelectValue placeholder="Select metric" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="profit">Net Profit</SelectItem>
                  <SelectItem value="sharpe">Sharpe Ratio</SelectItem>
                  <SelectItem value="sortino">Sortino Ratio</SelectItem>
                  <SelectItem value="profit-factor">Profit Factor</SelectItem>
                  <SelectItem value="custom">Custom Metric</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="avoid-overfitting">Avoid Overfitting</Label>
                <Switch id="avoid-overfitting" defaultChecked />
              </div>
              <p className="text-xs text-muted-foreground">Use walk-forward validation to prevent overfitting</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="max-iterations">Maximum Iterations</Label>
              <Input id="max-iterations" type="number" value="1000" />
              <p className="text-xs text-muted-foreground">For genetic and particle swarm algorithms</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Optimization Results</CardTitle>
            <CardDescription>Best parameter combinations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-md border">
                <table className="min-w-full divide-y divide-border">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="px-2 py-2 text-left text-xs font-medium text-muted-foreground">Rank</th>
                      <th className="px-2 py-2 text-left text-xs font-medium text-muted-foreground">MA</th>
                      <th className="px-2 py-2 text-left text-xs font-medium text-muted-foreground">RSI</th>
                      <th className="px-2 py-2 text-left text-xs font-medium text-muted-foreground">TP</th>
                      <th className="px-2 py-2 text-left text-xs font-medium text-muted-foreground">Sharpe</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-background">
                    {[
                      { rank: 1, ma: 20, rsi: 13, tp: 60, sharpe: 2.45 },
                      { rank: 2, ma: 25, rsi: 13, tp: 60, sharpe: 2.38 },
                      { rank: 3, ma: 20, rsi: 15, tp: 50, sharpe: 2.32 },
                      { rank: 4, ma: 25, rsi: 11, tp: 70, sharpe: 2.28 },
                      { rank: 5, ma: 15, rsi: 13, tp: 60, sharpe: 2.21 },
                    ].map((result) => (
                      <tr key={result.rank}>
                        <td className="px-2 py-1.5 text-sm">{result.rank}</td>
                        <td className="px-2 py-1.5 text-sm">{result.ma}</td>
                        <td className="px-2 py-1.5 text-sm">{result.rsi}</td>
                        <td className="px-2 py-1.5 text-sm">{result.tp}</td>
                        <td className="px-2 py-1.5 text-sm font-medium">{result.sharpe}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Combinations Tested</span>
                  <span className="font-medium">729</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Optimization Time</span>
                  <span className="font-medium">3m 42s</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Sharpe Improvement</span>
                  <span className="font-medium text-green-600">+38.2%</span>
                </div>
              </div>

              <Button className="w-full">Apply Best Parameters</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="heatmap">
        <TabsList>
          <TabsTrigger value="heatmap">Parameter Heatmap</TabsTrigger>
          <TabsTrigger value="surface">3D Surface</TabsTrigger>
          <TabsTrigger value="curve">Optimization Curve</TabsTrigger>
        </TabsList>

        <TabsContent value="heatmap" className="pt-4">
          <ResponsiveChart
            title="Parameter Optimization Heatmap"
            renderChart={renderOptimizationHeatmap}
            height={400}
          />
          <p className="text-sm text-muted-foreground mt-2">
            Heatmap showing the relationship between MA Period (x-axis) and RSI Period (y-axis) with color indicating
            Sharpe Ratio
          </p>
        </TabsContent>

        <TabsContent value="surface" className="pt-4">
          <ResponsiveChart title="3D Optimization Surface" renderChart={renderOptimizationSurface} height={400} />
          <p className="text-sm text-muted-foreground mt-2">
            3D surface showing the relationship between MA Period, RSI Period, and Sharpe Ratio
          </p>
        </TabsContent>

        <TabsContent value="curve" className="pt-4">
          <ResponsiveChart title="Parameter Optimization Curve" renderChart={renderOptimizationCurve} height={400} />
          <p className="text-sm text-muted-foreground mt-2">
            Optimization curve showing the relationship between MA Period and Sharpe Ratio with RSI Period fixed at 13
          </p>
        </TabsContent>
      </Tabs>
    </div>
  )
}

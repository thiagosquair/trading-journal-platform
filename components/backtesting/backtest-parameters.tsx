"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"

interface BacktestParametersProps {
  parameters: any
  onChange: (parameters: any) => void
  advancedMode?: boolean
}

export function BacktestParameters({ parameters, onChange, advancedMode = false }: BacktestParametersProps) {
  const updateParameter = (key: string, value: any) => {
    onChange({ ...parameters, [key]: value })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Backtest Parameters</CardTitle>
        <CardDescription>Configure the parameters for your backtest</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="basic">
          <TabsList className="mb-4">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="risk">Risk Management</TabsTrigger>
            {advancedMode && <TabsTrigger value="execution">Execution</TabsTrigger>}
            {advancedMode && <TabsTrigger value="advanced">Advanced</TabsTrigger>}
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="initial-capital">Initial Capital</Label>
                <Input
                  id="initial-capital"
                  type="number"
                  value={parameters.initialCapital}
                  onChange={(e) => updateParameter("initialCapital", Number.parseFloat(e.target.value))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="risk-per-trade">Risk Per Trade (%)</Label>
                <Input
                  id="risk-per-trade"
                  type="number"
                  value={parameters.riskPerTrade}
                  onChange={(e) => updateParameter("riskPerTrade", Number.parseFloat(e.target.value))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeframe">Timeframe</Label>
              <Select value={parameters.timeframe} onValueChange={(value) => updateParameter("timeframe", value)}>
                <SelectTrigger id="timeframe">
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="M1">1 Minute</SelectItem>
                  <SelectItem value="M5">5 Minutes</SelectItem>
                  <SelectItem value="M15">15 Minutes</SelectItem>
                  <SelectItem value="M30">30 Minutes</SelectItem>
                  <SelectItem value="H1">1 Hour</SelectItem>
                  <SelectItem value="H4">4 Hours</SelectItem>
                  <SelectItem value="D1">Daily</SelectItem>
                  <SelectItem value="W1">Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-date">Start Date</Label>
                <Input
                  id="start-date"
                  type="date"
                  value={parameters.startDate}
                  onChange={(e) => updateParameter("startDate", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="end-date">End Date</Label>
                <Input
                  id="end-date"
                  type="date"
                  value={parameters.endDate}
                  onChange={(e) => updateParameter("endDate", e.target.value)}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="risk" className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="use-position-sizing">Dynamic Position Sizing</Label>
                <Switch
                  id="use-position-sizing"
                  checked={parameters.usePositionSizing || false}
                  onCheckedChange={(checked) => updateParameter("usePositionSizing", checked)}
                />
              </div>
              <p className="text-xs text-muted-foreground">Adjust position size based on account balance and risk</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="max-drawdown">Maximum Drawdown (%)</Label>
              <Input
                id="max-drawdown"
                type="number"
                value={parameters.maxDrawdownPercent || 20}
                onChange={(e) => updateParameter("maxDrawdownPercent", Number.parseFloat(e.target.value))}
              />
              <p className="text-xs text-muted-foreground">Stop trading if drawdown exceeds this percentage</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="max-positions">Maximum Open Positions</Label>
              <Input
                id="max-positions"
                type="number"
                value={parameters.maxOpenPositions || 5}
                onChange={(e) => updateParameter("maxOpenPositions", Number.parseInt(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="compounding">Use Compounding</Label>
                <Switch
                  id="compounding"
                  checked={parameters.useCompounding || false}
                  onCheckedChange={(checked) => updateParameter("useCompounding", checked)}
                />
              </div>
              <p className="text-xs text-muted-foreground">Reinvest profits to increase position sizes</p>
            </div>
          </TabsContent>

          {advancedMode && (
            <TabsContent value="execution" className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="include-commissions">Include Commissions</Label>
                  <Switch
                    id="include-commissions"
                    checked={parameters.includeCommissions || false}
                    onCheckedChange={(checked) => updateParameter("includeCommissions", checked)}
                  />
                </div>
              </div>

              {parameters.includeCommissions && (
                <div className="space-y-2">
                  <Label htmlFor="commission-per-lot">Commission Per Lot</Label>
                  <Input
                    id="commission-per-lot"
                    type="number"
                    value={parameters.commissionPerLot || 7}
                    onChange={(e) => updateParameter("commissionPerLot", Number.parseFloat(e.target.value))}
                  />
                </div>
              )}

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="include-slippage">Include Slippage</Label>
                  <Switch
                    id="include-slippage"
                    checked={parameters.includeSlippage || false}
                    onCheckedChange={(checked) => updateParameter("includeSlippage", checked)}
                  />
                </div>
              </div>

              {parameters.includeSlippage && (
                <div className="space-y-2">
                  <Label htmlFor="slippage-pips">Slippage (Pips)</Label>
                  <Input
                    id="slippage-pips"
                    type="number"
                    value={parameters.slippagePips || 1}
                    onChange={(e) => updateParameter("slippagePips", Number.parseFloat(e.target.value))}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="execution-model">Execution Model</Label>
                <Select
                  value={parameters.executionModel || "market"}
                  onValueChange={(value) => updateParameter("executionModel", value)}
                >
                  <SelectTrigger id="execution-model">
                    <SelectValue placeholder="Select execution model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="market">Market Execution</SelectItem>
                    <SelectItem value="instant">Instant Execution</SelectItem>
                    <SelectItem value="realistic">Realistic (Variable Slippage)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="spread-model">Spread Model</Label>
                <Select
                  value={parameters.spreadModel || "fixed"}
                  onValueChange={(value) => updateParameter("spreadModel", value)}
                >
                  <SelectTrigger id="spread-model">
                    <SelectValue placeholder="Select spread model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fixed">Fixed Spread</SelectItem>
                    <SelectItem value="variable">Variable Spread</SelectItem>
                    <SelectItem value="historical">Historical Spread</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
          )}

          {advancedMode && (
            <TabsContent value="advanced" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="monte-carlo-simulations">Monte Carlo Simulations</Label>
                <Input
                  id="monte-carlo-simulations"
                  type="number"
                  value={parameters.monteCarloSimulations || 1000}
                  onChange={(e) => updateParameter("monteCarloSimulations", Number.parseInt(e.target.value))}
                />
                <p className="text-xs text-muted-foreground">Number of simulations for Monte Carlo analysis</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confidence-interval">Confidence Interval (%)</Label>
                <div className="pt-2">
                  <Slider
                    id="confidence-interval"
                    defaultValue={[parameters.confidenceInterval || 95]}
                    max={99}
                    min={50}
                    step={1}
                    onValueChange={(value) => updateParameter("confidenceInterval", value[0])}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>50%</span>
                  <span>{parameters.confidenceInterval || 95}%</span>
                  <span>99%</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="walk-forward-analysis">Walk-Forward Analysis</Label>
                  <Switch
                    id="walk-forward-analysis"
                    checked={parameters.useWalkForward || false}
                    onCheckedChange={(checked) => updateParameter("useWalkForward", checked)}
                  />
                </div>
                <p className="text-xs text-muted-foreground">Test strategy on out-of-sample data</p>
              </div>

              {parameters.useWalkForward && (
                <div className="space-y-2">
                  <Label htmlFor="walk-forward-ratio">In-Sample/Out-of-Sample Ratio</Label>
                  <Select
                    value={parameters.walkForwardRatio || "80-20"}
                    onValueChange={(value) => updateParameter("walkForwardRatio", value)}
                  >
                    <SelectTrigger id="walk-forward-ratio">
                      <SelectValue placeholder="Select ratio" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="70-30">70/30</SelectItem>
                      <SelectItem value="80-20">80/20</SelectItem>
                      <SelectItem value="90-10">90/10</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="correlation-analysis">Correlation Analysis</Label>
                  <Switch
                    id="correlation-analysis"
                    checked={parameters.useCorrelation || false}
                    onCheckedChange={(checked) => updateParameter("useCorrelation", checked)}
                  />
                </div>
                <p className="text-xs text-muted-foreground">Analyze correlation between multiple strategies</p>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </CardContent>
    </Card>
  )
}

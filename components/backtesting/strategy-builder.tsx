"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, Code, Settings, LineChart } from "lucide-react"

interface StrategyBuilderProps {
  strategy: any
  onChange: (strategy: any) => void
}

export function StrategyBuilder({ strategy, onChange }: StrategyBuilderProps) {
  const [activeTab, setActiveTab] = useState("visual")
  const [rules, setRules] = useState([
    { type: "entry", condition: "price_above_ma", parameters: { period: 20 } },
    { type: "exit", condition: "take_profit", parameters: { pips: 50 } },
    { type: "exit", condition: "stop_loss", parameters: { pips: 30 } },
  ])

  const addRule = () => {
    setRules([...rules, { type: "entry", condition: "price_above_ma", parameters: { period: 20 } }])
  }

  const removeRule = (index: number) => {
    const newRules = [...rules]
    newRules.splice(index, 1)
    setRules(newRules)
  }

  const updateRule = (index: number, field: string, value: any) => {
    const newRules = [...rules]
    newRules[index] = { ...newRules[index], [field]: value }
    setRules(newRules)
  }

  const updateRuleParameter = (index: number, param: string, value: any) => {
    const newRules = [...rules]
    newRules[index].parameters = { ...newRules[index].parameters, [param]: value }
    setRules(newRules)
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Strategy Builder</CardTitle>
        <CardDescription>Define your trading strategy with entry and exit rules</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="visual">
              <LineChart className="h-4 w-4 mr-2" />
              Visual
            </TabsTrigger>
            <TabsTrigger value="code">
              <Code className="h-4 w-4 mr-2" />
              Code
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="visual" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Strategy Rules</h3>
                <Button variant="outline" size="sm" onClick={addRule}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Rule
                </Button>
              </div>

              {rules.map((rule, index) => (
                <div key={index} className="border rounded-md p-3 space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Select value={rule.type} onValueChange={(value) => updateRule(index, "type", value)}>
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="entry">Entry</SelectItem>
                          <SelectItem value="exit">Exit</SelectItem>
                          <SelectItem value="filter">Filter</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select value={rule.condition} onValueChange={(value) => updateRule(index, "condition", value)}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="price_above_ma">Price Above MA</SelectItem>
                          <SelectItem value="price_below_ma">Price Below MA</SelectItem>
                          <SelectItem value="ma_crossover">MA Crossover</SelectItem>
                          <SelectItem value="rsi_overbought">RSI Overbought</SelectItem>
                          <SelectItem value="rsi_oversold">RSI Oversold</SelectItem>
                          <SelectItem value="take_profit">Take Profit</SelectItem>
                          <SelectItem value="stop_loss">Stop Loss</SelectItem>
                          <SelectItem value="trailing_stop">Trailing Stop</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button variant="ghost" size="icon" onClick={() => removeRule(index)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>

                  {/* Dynamic parameters based on condition */}
                  {rule.condition === "price_above_ma" || rule.condition === "price_below_ma" ? (
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <Label htmlFor={`period-${index}`}>Period</Label>
                        <Input
                          id={`period-${index}`}
                          type="number"
                          value={rule.parameters.period}
                          onChange={(e) => updateRuleParameter(index, "period", Number.parseInt(e.target.value))}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor={`type-${index}`}>MA Type</Label>
                        <Select
                          value={rule.parameters.type || "sma"}
                          onValueChange={(value) => updateRuleParameter(index, "type", value)}
                        >
                          <SelectTrigger id={`type-${index}`}>
                            <SelectValue placeholder="Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sma">SMA</SelectItem>
                            <SelectItem value="ema">EMA</SelectItem>
                            <SelectItem value="wma">WMA</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  ) : rule.condition === "take_profit" || rule.condition === "stop_loss" ? (
                    <div className="space-y-1">
                      <Label htmlFor={`pips-${index}`}>Pips</Label>
                      <Input
                        id={`pips-${index}`}
                        type="number"
                        value={rule.parameters.pips}
                        onChange={(e) => updateRuleParameter(index, "pips", Number.parseInt(e.target.value))}
                      />
                    </div>
                  ) : rule.condition === "rsi_overbought" || rule.condition === "rsi_oversold" ? (
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <Label htmlFor={`period-${index}`}>Period</Label>
                        <Input
                          id={`period-${index}`}
                          type="number"
                          value={rule.parameters.period || 14}
                          onChange={(e) => updateRuleParameter(index, "period", Number.parseInt(e.target.value))}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor={`level-${index}`}>Level</Label>
                        <Input
                          id={`level-${index}`}
                          type="number"
                          value={rule.parameters.level || (rule.condition === "rsi_overbought" ? 70 : 30)}
                          onChange={(e) => updateRuleParameter(index, "level", Number.parseInt(e.target.value))}
                        />
                      </div>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="code" className="pt-4">
            <div className="space-y-2">
              <Label htmlFor="strategy-code">Strategy Code</Label>
              <Textarea
                id="strategy-code"
                className="font-mono h-[300px]"
                placeholder="// Write your strategy code here
function onTick(data) {
  // Entry logic
  if (data.close > sma(data.close, 20)) {
    buy();
  }
  
  // Exit logic
  if (inPosition && (profit >= 50 || loss >= 30)) {
    closePosition();
  }
}"
              />
            </div>
          </TabsContent>

          <TabsContent value="settings" className="pt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="strategy-name">Strategy Name</Label>
                <Input id="strategy-name" placeholder="My Trading Strategy" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="strategy-description">Description</Label>
                <Textarea id="strategy-description" placeholder="Describe your strategy..." className="h-[100px]" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="position-sizing">Dynamic Position Sizing</Label>
                  <Switch id="position-sizing" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Automatically adjust position size based on account balance and risk parameters
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="compounding">Compounding</Label>
                  <Switch id="compounding" />
                </div>
                <p className="text-sm text-muted-foreground">Reinvest profits to increase position sizes over time</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

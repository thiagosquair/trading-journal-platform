"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowDown, ArrowUp, Calculator } from "lucide-react"

export function RiskRewardCalculator() {
  const [entryPrice, setEntryPrice] = useState<number | "">("")
  const [stopLoss, setStopLoss] = useState<number | "">("")
  const [takeProfit, setTakeProfit] = useState<number | "">("")
  const [riskRewardRatio, setRiskRewardRatio] = useState<string | null>(null)
  const [tradeType, setTradeType] = useState<"long" | "short">("long")

  const calculateRiskReward = () => {
    if (entryPrice === "" || stopLoss === "" || takeProfit === "") {
      return
    }

    let risk: number
    let reward: number

    if (tradeType === "long") {
      risk = Math.abs(entryPrice - stopLoss)
      reward = Math.abs(takeProfit - entryPrice)
    } else {
      // Short trade
      risk = Math.abs(stopLoss - entryPrice)
      reward = Math.abs(entryPrice - takeProfit)
    }

    if (risk === 0) {
      setRiskRewardRatio("Invalid: Risk cannot be zero")
      return
    }

    const ratio = reward / risk
    setRiskRewardRatio(`1:${ratio.toFixed(2)}`)
  }

  const resetCalculator = () => {
    setEntryPrice("")
    setStopLoss("")
    setTakeProfit("")
    setRiskRewardRatio(null)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Risk/Reward Calculator</CardTitle>
        <CardDescription>Calculate the risk/reward ratio for your trades</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="long" value={tradeType} onValueChange={(v) => setTradeType(v as "long" | "short")}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="long" className="flex items-center gap-1">
              <ArrowUp className="h-4 w-4" /> Long Trade
            </TabsTrigger>
            <TabsTrigger value="short" className="flex items-center gap-1">
              <ArrowDown className="h-4 w-4" /> Short Trade
            </TabsTrigger>
          </TabsList>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="entry-price">Entry Price</Label>
                <Input
                  id="entry-price"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="Enter price"
                  value={entryPrice}
                  onChange={(e) => setEntryPrice(e.target.value ? Number.parseFloat(e.target.value) : "")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stop-loss" className="text-destructive">
                  Stop Loss
                </Label>
                <Input
                  id="stop-loss"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder={tradeType === "long" ? "Below entry" : "Above entry"}
                  value={stopLoss}
                  onChange={(e) => setStopLoss(e.target.value ? Number.parseFloat(e.target.value) : "")}
                  className="border-destructive/30 focus-visible:ring-destructive/30"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="take-profit" className="text-green-600">
                Take Profit
              </Label>
              <Input
                id="take-profit"
                type="number"
                step="0.01"
                min="0"
                placeholder={tradeType === "long" ? "Above entry" : "Below entry"}
                value={takeProfit}
                onChange={(e) => setTakeProfit(e.target.value ? Number.parseFloat(e.target.value) : "")}
                className="border-green-600/30 focus-visible:ring-green-600/30"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <Button onClick={calculateRiskReward} className="flex-1">
                <Calculator className="mr-2 h-4 w-4" /> Calculate Ratio
              </Button>
              <Button variant="outline" onClick={resetCalculator}>
                Reset
              </Button>
            </div>

            {riskRewardRatio && (
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <div className="text-center">
                  <div className="text-sm font-medium mb-1">Risk/Reward Ratio</div>
                  <div className="text-2xl font-bold">{riskRewardRatio}</div>
                </div>
              </div>
            )}
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}

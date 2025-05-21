"use client"

import { useState } from "react"
import { Calculator, RefreshCw } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type AssetType = "forex" | "gold" | "silver" | "indices" | "crypto"

interface AssetInfo {
  name: string
  standardLotSize: string
  pipValue: string
  minLot: number
  lotStep: number
}

const assetInfo: Record<AssetType, AssetInfo> = {
  forex: {
    name: "Forex",
    standardLotSize: "100,000 units",
    pipValue: "$10 per pip (standard lot)",
    minLot: 0.01,
    lotStep: 0.01,
  },
  gold: {
    name: "Gold (XAU/USD)",
    standardLotSize: "100 oz",
    pipValue: "$1 per $0.01 move",
    minLot: 0.01,
    lotStep: 0.01,
  },
  silver: {
    name: "Silver (XAG/USD)",
    standardLotSize: "5,000 oz",
    pipValue: "$0.50 per $0.01 move",
    minLot: 0.01,
    lotStep: 0.01,
  },
  indices: {
    name: "Indices",
    standardLotSize: "Varies by broker",
    pipValue: "$1-$10 per point",
    minLot: 0.1,
    lotStep: 0.1,
  },
  crypto: {
    name: "Cryptocurrency",
    standardLotSize: "1 coin",
    pipValue: "Varies by coin",
    minLot: 0.001,
    lotStep: 0.001,
  },
}

export function PositionSizeCalculator() {
  const [assetType, setAssetType] = useState<AssetType>("forex")
  const [accountBalance, setAccountBalance] = useState<number>(10000)
  const [riskPercentage, setRiskPercentage] = useState<number>(1)
  const [stopLossPips, setStopLossPips] = useState<number>(20)
  const [pipValue, setPipValue] = useState<number>(10)
  const [calculatedLotSize, setCalculatedLotSize] = useState<number | null>(null)
  const [riskAmount, setRiskAmount] = useState<number | null>(null)

  const calculateLotSize = () => {
    const risk = accountBalance * (riskPercentage / 100)
    const calculatedRiskAmount = risk
    setRiskAmount(calculatedRiskAmount)

    const calculatedSize = risk / (stopLossPips * pipValue)

    // Round to appropriate lot step based on asset type
    const { lotStep } = assetInfo[assetType]
    const roundedLotSize = Math.floor(calculatedSize / lotStep) * lotStep

    setCalculatedLotSize(Number.parseFloat(roundedLotSize.toFixed(3)))
  }

  const resetCalculator = () => {
    setAccountBalance(10000)
    setRiskPercentage(1)
    setStopLossPips(20)
    setPipValue(10)
    setCalculatedLotSize(null)
    setRiskAmount(null)
  }

  const handleAssetTypeChange = (value: string) => {
    const newAssetType = value as AssetType
    setAssetType(newAssetType)

    // Reset pip value based on asset type
    if (newAssetType === "forex") setPipValue(10)
    else if (newAssetType === "gold") setPipValue(100)
    else if (newAssetType === "silver") setPipValue(50)
    else if (newAssetType === "indices") setPipValue(1)
    else if (newAssetType === "crypto") setPipValue(1)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calculator className="mr-2 h-5 w-5" />
          Position Size Calculator
        </CardTitle>
        <CardDescription>Calculate the appropriate lot size based on your risk parameters</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="standard" className="mb-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="standard">Standard</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
          <TabsContent value="standard" className="space-y-4 pt-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="assetType">Asset Type</Label>
                <Select value={assetType} onValueChange={handleAssetTypeChange}>
                  <SelectTrigger id="assetType">
                    <SelectValue placeholder="Select asset type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="forex">Forex</SelectItem>
                    <SelectItem value="gold">Gold (XAU/USD)</SelectItem>
                    <SelectItem value="silver">Silver (XAG/USD)</SelectItem>
                    <SelectItem value="indices">Indices</SelectItem>
                    <SelectItem value="crypto">Cryptocurrency</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  {assetInfo[assetType].standardLotSize} • {assetInfo[assetType].pipValue}
                </p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="accountBalance">Account Balance ($)</Label>
                <Input
                  id="accountBalance"
                  type="number"
                  value={accountBalance}
                  onChange={(e) => setAccountBalance(Number.parseFloat(e.target.value) || 0)}
                />
              </div>

              <div className="grid gap-2">
                <div className="flex justify-between">
                  <Label htmlFor="riskPercentage">Risk Percentage</Label>
                  <span className="text-sm">{riskPercentage}%</span>
                </div>
                <Slider
                  id="riskPercentage"
                  min={0.1}
                  max={5}
                  step={0.1}
                  value={[riskPercentage]}
                  onValueChange={(value) => setRiskPercentage(value[0])}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="stopLossPips">Stop Loss (in pips/points)</Label>
                <Input
                  id="stopLossPips"
                  type="number"
                  value={stopLossPips}
                  onChange={(e) => setStopLossPips(Number.parseFloat(e.target.value) || 0)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="pipValue">Value per Pip/Point ($)</Label>
                <Input
                  id="pipValue"
                  type="number"
                  value={pipValue}
                  onChange={(e) => setPipValue(Number.parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="pt-4">
            <p className="text-sm text-muted-foreground mb-4">
              Advanced options allow for more detailed position sizing calculations including spread costs, commission,
              and custom risk parameters.
            </p>
            <Button className="w-full">Coming Soon</Button>
          </TabsContent>
        </Tabs>

        {calculatedLotSize !== null && (
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <h3 className="font-semibold text-lg mb-2">Results</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Recommended Lot Size</p>
                <p className="text-2xl font-bold">{calculatedLotSize}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Risk Amount</p>
                <p className="text-2xl font-bold">${riskAmount?.toFixed(2)}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={resetCalculator} className="flex items-center">
          <RefreshCw className="mr-2 h-4 w-4" />
          Reset
        </Button>
        <Button onClick={calculateLotSize}>Calculate</Button>
      </CardFooter>
    </Card>
  )
}

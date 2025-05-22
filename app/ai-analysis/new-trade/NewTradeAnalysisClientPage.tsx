"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { AITradeAnalysisFull } from "@/components/ai-trade-analysis-full"
import { SidebarWrapper } from "@/components/sidebar-navigation"

export default function NewTradeAnalysisClientPage() {
  const [trade, setTrade] = useState<any>(null)
  const [formData, setFormData] = useState({
    symbol: "EURUSD",
    type: "BUY",
    openPrice: "1.0750",
    closePrice: "1.0785",
    volume: "0.5",
    openTime: "2023-05-01T10:30",
    closeTime: "2023-05-01T14:45",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Calculate profit and pips based on trade type and prices
    const openPrice = Number.parseFloat(formData.openPrice)
    const closePrice = Number.parseFloat(formData.closePrice)
    const volume = Number.parseFloat(formData.volume)

    let pips = 0
    let profit = 0

    if (formData.symbol.includes("JPY")) {
      // For JPY pairs, 1 pip = 0.01
      pips = formData.type === "BUY" ? (closePrice - openPrice) * 100 : (openPrice - closePrice) * 100
    } else {
      // For other pairs, 1 pip = 0.0001
      pips = formData.type === "BUY" ? (closePrice - openPrice) * 10000 : (openPrice - closePrice) * 10000
    }

    // Simple profit calculation (not accounting for proper lot size calculations)
    profit = pips * volume * 10

    const newTrade = {
      id: "manual1",
      accountId: "manual",
      symbol: formData.symbol,
      pair: formData.symbol.slice(0, 3) + "/" + formData.symbol.slice(3), // Add the pair property
      type: formData.type,
      openTime: new Date(formData.openTime).toISOString(),
      closeTime: new Date(formData.closeTime).toISOString(),
      openPrice: openPrice,
      closePrice: closePrice,
      volume: volume,
      profit: profit,
      commission: 0,
      swap: 0,
      pips: Math.round(pips),
      status: "CLOSED",
    }

    setTrade(newTrade)
  }

  return (
    <SidebarWrapper>
      <div className="container mx-auto py-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" asChild className="mr-4">
            <Link href="/ai-analysis">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to AI Analysis
            </Link>
          </Button>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold">New Trade Analysis</h1>
            <p className="text-muted-foreground">Enter trade details to get AI-powered insights and analysis.</p>
          </div>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Trade Details</CardTitle>
              <CardDescription>Enter the details of your trade</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="symbol">Symbol</Label>
                  <Select
                    name="symbol"
                    value={formData.symbol}
                    onValueChange={(value) => handleSelectChange("symbol", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select symbol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EURUSD">EUR/USD</SelectItem>
                      <SelectItem value="GBPUSD">GBP/USD</SelectItem>
                      <SelectItem value="USDJPY">USD/JPY</SelectItem>
                      <SelectItem value="AUDUSD">AUD/USD</SelectItem>
                      <SelectItem value="USDCAD">USD/CAD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Trade Type</Label>
                  <Select
                    name="type"
                    value={formData.type}
                    onValueChange={(value) => handleSelectChange("type", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BUY">BUY</SelectItem>
                      <SelectItem value="SELL">SELL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="openPrice">Open Price</Label>
                    <Input
                      id="openPrice"
                      name="openPrice"
                      type="text"
                      value={formData.openPrice}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="closePrice">Close Price</Label>
                    <Input
                      id="closePrice"
                      name="closePrice"
                      type="text"
                      value={formData.closePrice}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="volume">Volume (Lots)</Label>
                  <Input
                    id="volume"
                    name="volume"
                    type="text"
                    value={formData.volume}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="openTime">Open Time</Label>
                    <Input
                      id="openTime"
                      name="openTime"
                      type="datetime-local"
                      value={formData.openTime}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="closeTime">Close Time</Label>
                    <Input
                      id="closeTime"
                      name="closeTime"
                      type="datetime-local"
                      value={formData.closeTime}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  Analyze Trade
                </Button>
              </form>
            </CardContent>
          </Card>

          <div>
            <AITradeAnalysisFull trade={trade} />
          </div>
        </div>
      </div>
    </SidebarWrapper>
  )
}

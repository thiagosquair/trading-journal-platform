"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatCurrency } from "@/lib/utils"
import MonthlyMetricsSummary from "./monthly-metrics-summary"
import DailyMetricsDetail from "./daily-metrics-detail"
import { useState } from "react"

export function JournalStatisticsDashboard() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  // Sample data for demonstration
  const monthlyData = [
    {
      date: "2023-05-01",
      profit: 450,
      trades: 8,
      winRate: 75,
      winCount: 6,
      lossCount: 2,
      rMultiple: 2.1,
      avgTradeSize: 5000,
      maxDrawdown: 320,
      sharpeRatio: 1.8,
      avgTradeDuration: 45,
      volume: 4.2,
      commissions: 32,
      bestTrade: 280,
      worstTrade: -180,
      tradingSession: "morning",
    },
    {
      date: "2023-05-02",
      profit: -120,
      trades: 5,
      winRate: 40,
      winCount: 2,
      lossCount: 3,
      rMultiple: -0.8,
      avgTradeSize: 4800,
      maxDrawdown: 280,
      sharpeRatio: 0.6,
      avgTradeDuration: 38,
      volume: 3.5,
      commissions: 25,
      bestTrade: 150,
      worstTrade: -220,
      tradingSession: "afternoon",
    },
    {
      date: "2023-05-03",
      profit: 320,
      trades: 6,
      winRate: 67,
      winCount: 4,
      lossCount: 2,
      rMultiple: 1.6,
      avgTradeSize: 5200,
      maxDrawdown: 180,
      sharpeRatio: 1.5,
      avgTradeDuration: 52,
      volume: 3.8,
      commissions: 28,
      bestTrade: 240,
      worstTrade: -140,
      tradingSession: "morning",
    },
    {
      date: "2023-05-04",
      profit: 180,
      trades: 4,
      winRate: 75,
      winCount: 3,
      lossCount: 1,
      rMultiple: 1.2,
      avgTradeSize: 4500,
      maxDrawdown: 120,
      sharpeRatio: 1.3,
      avgTradeDuration: 35,
      volume: 2.5,
      commissions: 18,
      bestTrade: 160,
      worstTrade: -90,
      tradingSession: "evening",
    },
    {
      date: "2023-05-05",
      profit: -80,
      trades: 3,
      winRate: 33,
      winCount: 1,
      lossCount: 2,
      rMultiple: -0.5,
      avgTradeSize: 4200,
      maxDrawdown: 150,
      sharpeRatio: 0.4,
      avgTradeDuration: 42,
      volume: 1.8,
      commissions: 15,
      bestTrade: 120,
      worstTrade: -160,
      tradingSession: "afternoon",
    },
    {
      date: "2023-05-08",
      profit: 280,
      trades: 7,
      winRate: 71,
      winCount: 5,
      lossCount: 2,
      rMultiple: 1.8,
      avgTradeSize: 5100,
      maxDrawdown: 200,
      sharpeRatio: 1.6,
      avgTradeDuration: 48,
      volume: 4.0,
      commissions: 30,
      bestTrade: 220,
      worstTrade: -130,
      tradingSession: "morning",
    },
    {
      date: "2023-05-09",
      profit: 150,
      trades: 5,
      winRate: 60,
      winCount: 3,
      lossCount: 2,
      rMultiple: 1.0,
      avgTradeSize: 4800,
      maxDrawdown: 160,
      sharpeRatio: 1.2,
      avgTradeDuration: 40,
      volume: 3.2,
      commissions: 22,
      bestTrade: 180,
      worstTrade: -110,
      tradingSession: "afternoon",
    },
    {
      date: "2023-05-10",
      profit: -200,
      trades: 6,
      winRate: 33,
      winCount: 2,
      lossCount: 4,
      rMultiple: -1.2,
      avgTradeSize: 5000,
      maxDrawdown: 250,
      sharpeRatio: 0.5,
      avgTradeDuration: 45,
      volume: 3.6,
      commissions: 26,
      bestTrade: 140,
      worstTrade: -190,
      tradingSession: "morning",
    },
    {
      date: "2023-05-11",
      profit: 380,
      trades: 8,
      winRate: 75,
      winCount: 6,
      lossCount: 2,
      rMultiple: 2.2,
      avgTradeSize: 5200,
      maxDrawdown: 180,
      sharpeRatio: 1.9,
      avgTradeDuration: 50,
      volume: 4.5,
      commissions: 35,
      bestTrade: 260,
      worstTrade: -120,
      tradingSession: "afternoon",
    },
    {
      date: "2023-05-12",
      profit: 220,
      trades: 5,
      winRate: 80,
      winCount: 4,
      lossCount: 1,
      rMultiple: 1.5,
      avgTradeSize: 4900,
      maxDrawdown: 140,
      sharpeRatio: 1.7,
      avgTradeDuration: 43,
      volume: 3.0,
      commissions: 24,
      bestTrade: 200,
      worstTrade: -100,
      tradingSession: "morning",
    },
  ]

  // Calculate monthly totals
  const totalProfit = monthlyData.reduce((sum, day) => sum + day.profit, 0)
  const totalTrades = monthlyData.reduce((sum, day) => sum + day.trades, 0)
  const winningDays = monthlyData.filter((day) => day.profit > 0).length
  const losingDays = monthlyData.filter((day) => day.profit < 0).length

  // Calculate win rate
  const winRate = (winningDays / monthlyData.length) * 100

  // Handle date selection
  const handleDateSelect = (date: string) => {
    setSelectedDate(date === selectedDate ? null : date)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Profit/Loss</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totalProfit >= 0 ? "text-green-500" : "text-red-500"}`}>
              {formatCurrency(totalProfit)}
            </div>
            <p className="text-xs text-muted-foreground">For May 2023</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Trades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTrades}</div>
            <p className="text-xs text-muted-foreground">For May 2023</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{winRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">For May 2023</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Profitable Days</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {winningDays} / {monthlyData.length}
            </div>
            <p className="text-xs text-muted-foreground">Winning/Total Days</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="monthly" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="monthly">Monthly Overview</TabsTrigger>
          <TabsTrigger value="daily">Daily Breakdown</TabsTrigger>
        </TabsList>
        <TabsContent value="monthly">
          <MonthlyMetricsSummary month={new Date("2023-05-01")} data={monthlyData} />
        </TabsContent>
        <TabsContent value="daily">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {monthlyData.map((day) => (
                <Card
                  key={day.date}
                  className={`cursor-pointer transition-all ${selectedDate === day.date ? "ring-2 ring-primary" : ""}`}
                  onClick={() => handleDateSelect(day.date)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="font-medium">
                        {new Date(day.date).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                      <div className={`font-bold ${day.profit >= 0 ? "text-green-500" : "text-red-500"}`}>
                        {formatCurrency(day.profit)}
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      {day.trades} trades • {day.winRate}% win rate
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {selectedDate && (
              <div className="mt-6">
                <DailyMetricsDetail
                  date={selectedDate}
                  data={monthlyData.find((day) => day.date === selectedDate) || monthlyData[0]}
                />
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

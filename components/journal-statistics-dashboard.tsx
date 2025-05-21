"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { JournalTradeStats } from "@/components/journal-trade-stats"
import { JournalTagsStats } from "@/components/journal-tags-stats"
import { JournalTimeStats } from "@/components/journal-time-stats"
import { JournalOverviewStats } from "@/components/journal-overview-stats"
import { PerformanceShareCard } from "@/components/social/performance-share-card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Share2 } from "lucide-react"
import { getJournalStatistics } from "@/lib/journal-statistics"
import Image from "next/image"

export function JournalStatisticsDashboard() {
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const stats = getJournalStatistics()

  const shareableStats = {
    winRate: {
      value: `${stats.winRate}%`,
      label: "Win Rate",
      trend: stats.winRate > 50 ? "up" : "down",
    },
    profitFactor: {
      value: stats.profitFactor.toFixed(2),
      label: "Profit Factor",
      trend: stats.profitFactor > 1.5 ? "up" : stats.profitFactor < 1 ? "down" : "neutral",
    },
    avgRRR: {
      value: stats.avgRiskRewardRatio.toFixed(2),
      label: "Avg. RRR",
      trend: stats.avgRiskRewardRatio > 1 ? "up" : "down",
    },
    totalTrades: {
      value: stats.totalTrades,
      label: "Total Trades",
    },
    netProfit: {
      value: `$${stats.netProfit.toLocaleString()}`,
      label: "Net Profit",
      trend: stats.netProfit > 0 ? "up" : "down",
    },
    bestTrade: {
      value: `$${stats.bestTrade.toLocaleString()}`,
      label: "Best Trade",
    },
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Trading Statistics</h2>
        <div className="relative w-full h-48 rounded-lg overflow-hidden mb-6">
          <Image src="/performance-analytics.png" alt="Journal Statistics" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-blue-600/30 flex items-center">
            <div className="px-6">
              <h1 className="text-2xl font-bold text-white">Journal Statistics</h1>
              <p className="text-blue-50">Insights from your trading journal</p>
            </div>
          </div>
        </div>
        <Button variant="outline" size="sm" className="gap-2" onClick={() => setShareDialogOpen(true)}>
          <Share2 className="h-4 w-4" />
          Share Stats
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trades">Trades</TabsTrigger>
          <TabsTrigger value="tags">Tags</TabsTrigger>
          <TabsTrigger value="time">Time Analysis</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <JournalOverviewStats />
        </TabsContent>
        <TabsContent value="trades" className="space-y-4">
          <JournalTradeStats />
        </TabsContent>
        <TabsContent value="tags" className="space-y-4">
          <JournalTagsStats />
        </TabsContent>
        <TabsContent value="time" className="space-y-4">
          <JournalTimeStats />
        </TabsContent>
      </Tabs>

      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share Your Trading Performance</DialogTitle>
          </DialogHeader>
          <PerformanceShareCard
            title="My Trading Performance"
            description="My trading statistics tracked with TradeLinx"
            stats={shareableStats}
            chartImageUrl="/trading-chart-profit.png"
            period="Last 30 days"
            username="trader_john"
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

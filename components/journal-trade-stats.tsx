"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import type { JournalStatistics } from "@/lib/journal-statistics"

interface JournalTradeStatsProps {
  statistics: JournalStatistics
}

export function JournalTradeStats({ statistics }: JournalTradeStatsProps) {
  const { tradeStatistics } = statistics

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Trade Performance</CardTitle>
          <CardDescription>Overall trading statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Win Rate</p>
              <p className="text-2xl font-bold">{tradeStatistics.winRate.toFixed(1)}%</p>
              <Progress
                value={tradeStatistics.winRate}
                className="h-2"
                indicatorClassName={tradeStatistics.winRate >= 50 ? "bg-green-500" : "bg-red-500"}
              />
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Avg. Risk/Reward</p>
              <p className="text-2xl font-bold">1:{tradeStatistics.averageRiskReward.toFixed(1)}</p>
              <Progress
                value={Math.min(tradeStatistics.averageRiskReward * 33, 100)}
                className="h-2"
                indicatorClassName={tradeStatistics.averageRiskReward >= 1.5 ? "bg-green-500" : "bg-amber-500"}
              />
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Trade Plans</span>
              <Badge variant="outline">{tradeStatistics.totalTradePlans}</Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Trade Reviews</span>
              <Badge variant="outline">{tradeStatistics.totalTradeReviews}</Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Execution Rate</span>
              <Badge variant="outline">
                {tradeStatistics.totalTradePlans > 0
                  ? `${Math.round((tradeStatistics.totalTradeReviews / tradeStatistics.totalTradePlans) * 100)}%`
                  : "N/A"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Performance by Pair</CardTitle>
          <CardDescription>Win rates for different currency pairs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(tradeStatistics.successByPair).length > 0 ? (
              Object.entries(tradeStatistics.successByPair)
                .sort((a, b) => b[1].winRate - a[1].winRate)
                .map(([pair, stats]) => (
                  <div key={pair} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{pair}</span>
                      <div className="flex items-center">
                        <Badge variant="outline" className={stats.winRate >= 50 ? "text-green-500" : "text-red-500"}>
                          {stats.winRate.toFixed(0)}%
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <span>
                        {stats.wins} / {stats.total} trades
                      </span>
                    </div>
                    <Progress
                      value={stats.winRate}
                      className="h-1.5"
                      indicatorClassName={stats.winRate >= 50 ? "bg-green-500" : "bg-red-500"}
                    />
                  </div>
                ))
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                <p>No trade data by pair available</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Pattern Performance</CardTitle>
          <CardDescription>Success rates for different patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(tradeStatistics.successByPattern).length > 0 ? (
              Object.entries(tradeStatistics.successByPattern)
                .sort((a, b) => b[1].winRate - a[1].winRate)
                .map(([pattern, stats]) => (
                  <div key={pattern} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{pattern}</span>
                      <div className="flex items-center">
                        <Badge variant="outline" className={stats.winRate >= 50 ? "text-green-500" : "text-red-500"}>
                          {stats.winRate.toFixed(0)}%
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <span>
                        {stats.wins} / {stats.total} trades
                      </span>
                    </div>
                    <Progress
                      value={stats.winRate}
                      className="h-1.5"
                      indicatorClassName={stats.winRate >= 50 ? "bg-green-500" : "bg-red-500"}
                    />
                  </div>
                ))
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                <p>No pattern data available</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2 lg:col-span-3">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Monthly Profit</CardTitle>
          <CardDescription>Profit distribution by month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] w-full">
            {tradeStatistics.profitByMonth.length > 0 ? (
              <div className="flex h-full items-end gap-2">
                {tradeStatistics.profitByMonth.map((month) => {
                  const isPositive = month.profit >= 0
                  const heightPercent = Math.min((Math.abs(month.profit) / 500) * 100, 100)

                  return (
                    <div key={month.month} className="flex flex-1 flex-col items-center">
                      <div className="w-full flex-1 flex items-end justify-center">
                        <div
                          className={`w-full ${isPositive ? "bg-green-500" : "bg-red-500"} rounded-t-sm`}
                          style={{ height: `${heightPercent}%` }}
                        ></div>
                      </div>
                      <div className="mt-2 flex flex-col items-center">
                        <span className={`text-sm font-medium ${isPositive ? "text-green-600" : "text-red-600"}`}>
                          ${Math.abs(month.profit).toFixed(0)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(month.month + "-01").toLocaleDateString(undefined, {
                            month: "short",
                            year: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground">
                <p>No profit data available</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

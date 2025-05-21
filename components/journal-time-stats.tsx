"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, TrendingUp, TrendingDown } from "lucide-react"
import type { JournalStatistics } from "@/lib/journal-statistics"

interface JournalTimeStatsProps {
  statistics: JournalStatistics
}

export function JournalTimeStats({ statistics }: JournalTimeStatsProps) {
  // Format months for display
  const formattedMonths = Object.entries(statistics.entriesByMonth).map(([month, count]) => {
    const [year, monthNum] = month.split("-")
    const date = new Date(Number.parseInt(year), Number.parseInt(monthNum) - 1, 1)
    const formattedMonth = date.toLocaleDateString(undefined, { month: "long", year: "numeric" })
    return { month: formattedMonth, originalMonth: month, count }
  })

  // Sort months chronologically
  formattedMonths.sort((a, b) => a.originalMonth.localeCompare(b.originalMonth))

  // Calculate month-to-month growth
  const monthlyGrowth = formattedMonths.map((month, index, array) => {
    if (index === 0) return { ...month, growth: 0, percentage: 0 }

    const prevCount = array[index - 1].count
    const growth = month.count - prevCount
    const percentage = prevCount === 0 ? 0 : (growth / prevCount) * 100

    return { ...month, growth, percentage }
  })

  // Calculate sentiment trend
  const sentimentByMonth: Record<string, { count: number; total: number }> = {}

  statistics.sentimentTrend.forEach(({ date, sentiment }) => {
    const yearMonth = date.substring(0, 7) // YYYY-MM format
    if (!sentimentByMonth[yearMonth]) {
      sentimentByMonth[yearMonth] = { count: 0, total: 0 }
    }
    sentimentByMonth[yearMonth].count += sentiment
    sentimentByMonth[yearMonth].total += 1
  })

  const monthlySentiment = Object.entries(sentimentByMonth).map(([month, data]) => {
    const [year, monthNum] = month.split("-")
    const date = new Date(Number.parseInt(year), Number.parseInt(monthNum) - 1, 1)
    const formattedMonth = date.toLocaleDateString(undefined, { month: "long", year: "numeric" })

    const averageSentiment = data.total > 0 ? data.count / data.total : 0

    return {
      month: formattedMonth,
      originalMonth: month,
      averageSentiment,
      total: data.total,
    }
  })

  // Sort sentiment months chronologically
  monthlySentiment.sort((a, b) => a.originalMonth.localeCompare(b.originalMonth))

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Monthly Activity</CardTitle>
          <CardDescription>Journal entries by month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monthlyGrowth.length > 0 ? (
              monthlyGrowth.map((item) => (
                <div key={item.originalMonth} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CalendarDays className="h-4 w-4 text-muted-foreground mr-2" />
                    <span className="text-sm font-medium">{item.month}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{item.count} entries</Badge>
                    {item.growth !== 0 && (
                      <Badge variant="outline" className={item.growth > 0 ? "text-green-500" : "text-red-500"}>
                        {item.growth > 0 ? (
                          <TrendingUp className="h-3 w-3 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 mr-1" />
                        )}
                        {item.growth > 0 ? "+" : ""}
                        {item.growth} ({Math.abs(item.percentage).toFixed(0)}%)
                      </Badge>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                <p>No monthly data available</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Sentiment Trend</CardTitle>
          <CardDescription>Average mood by month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monthlySentiment.length > 0 ? (
              monthlySentiment.map((item) => (
                <div key={item.originalMonth} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.month}</span>
                    <Badge variant="outline">{item.total} entries</Badge>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        item.averageSentiment > 0
                          ? "bg-green-500"
                          : item.averageSentiment < 0
                            ? "bg-red-500"
                            : "bg-blue-500"
                      }`}
                      style={{
                        width: `${Math.abs(item.averageSentiment) * 50 + 50}%`,
                        marginLeft: item.averageSentiment < 0 ? "0" : `${50 - Math.abs(item.averageSentiment) * 50}%`,
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Negative</span>
                    <span>Neutral</span>
                    <span>Positive</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                <p>No sentiment data available</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Activity Heatmap</CardTitle>
          <CardDescription>Journal entry frequency over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-center justify-center text-muted-foreground">
            <p>Activity heatmap visualization</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

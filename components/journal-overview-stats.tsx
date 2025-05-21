"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Calendar, CheckCircle, FileText, LineChart, PieChart, Target } from "lucide-react"
import type { JournalStatistics } from "@/lib/journal-statistics"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface JournalOverviewStatsProps {
  statistics: JournalStatistics
}

export function JournalOverviewStats({ statistics }: JournalOverviewStatsProps) {
  const entryTypeLabels: Record<string, string> = {
    "market-analysis": "Market Analysis",
    "trade-review": "Trade Review",
    "trade-plan": "Trade Plan",
    general: "General Note",
    "lesson-learned": "Lesson Learned",
  }

  const entryTypeIcons: Record<string, React.ReactNode> = {
    "market-analysis": <LineChart className="h-4 w-4" />,
    "trade-review": <CheckCircle className="h-4 w-4" />,
    "trade-plan": <Calendar className="h-4 w-4" />,
    general: <FileText className="h-4 w-4" />,
    "lesson-learned": <BookOpen className="h-4 w-4" />,
  }

  const moodLabels: Record<string, string> = {
    positive: "Positive",
    neutral: "Neutral",
    negative: "Negative",
  }

  const moodColors: Record<string, string> = {
    positive: "bg-green-100 text-green-800",
    neutral: "bg-blue-100 text-blue-800",
    negative: "bg-red-100 text-red-800",
  }

  const totalByMood = Object.values(statistics.entriesByMood).reduce((sum, count) => sum + count, 0)

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Total Journal Entries</CardTitle>
          <CardDescription>All entries in your trading journal</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">{statistics.totalEntries}</div>
          <div className="mt-4 space-y-2">
            {Object.entries(statistics.entriesByType).map(([type, count]) => (
              <div key={type} className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  {entryTypeIcons[type]}
                  <span className="ml-2">{entryTypeLabels[type] || type}</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">{count}</span>
                  <Progress
                    value={(count / statistics.totalEntries) * 100}
                    className="h-2 w-16"
                    indicatorClassName="bg-primary"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Trading Sentiment</CardTitle>
          <CardDescription>Your mood distribution across entries</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-4">
            <div className="relative h-32 w-32">
              <PieChart className="h-full w-full text-muted-foreground/30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-sm font-medium">Sentiment</div>
                  <div className="text-xs text-muted-foreground">Balance</div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-2 space-y-1">
            {Object.entries(statistics.entriesByMood).map(([mood, count]) => (
              <div key={mood} className="flex items-center justify-between text-sm">
                <Badge variant="outline" className={moodColors[mood]}>
                  {moodLabels[mood] || mood}
                </Badge>
                <div className="flex items-center">
                  <span className="mr-2">{count}</span>
                  <span className="text-xs text-muted-foreground">
                    ({totalByMood > 0 ? Math.round((count / totalByMood) * 100) : 0}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Top Currency Pairs</CardTitle>
          <CardDescription>Most frequently mentioned in your journal</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {statistics.topCurrencyPairs.length > 0 ? (
              statistics.topCurrencyPairs.map((pair, index) => (
                <div key={pair.pair} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <span className="text-xs font-medium">{index + 1}</span>
                    </div>
                    <span className="ml-2 font-medium">{pair.pair}</span>
                  </div>
                  <Badge variant="outline">{pair.count} entries</Badge>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                <p>No currency pairs detected</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2 lg:col-span-3">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Recent Tags</CardTitle>
          <CardDescription>Tags from your most recent journal entries</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {statistics.recentTags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
            {statistics.recentTags.length === 0 && (
              <div className="text-center py-2 w-full text-muted-foreground">
                <p>No tags found in recent entries</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <div className="mt-8 flex justify-center">
        <Button asChild>
          <Link href="/goals">
            <Target className="mr-2 h-4 w-4" />
            Set Performance Goals
          </Link>
        </Button>
      </div>
    </div>
  )
}

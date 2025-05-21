"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import type { JournalStatistics } from "@/lib/journal-statistics"

interface JournalTagsStatsProps {
  statistics: JournalStatistics
}

export function JournalTagsStats({ statistics }: JournalTagsStatsProps) {
  // Get top tags
  const topTags = Object.entries(statistics.entriesByTag)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)

  // Group tags by category
  const tagCategories: Record<string, Array<{ tag: string; count: number }>> = {
    "Currency Pairs": [],
    "Trade Types": [],
    Patterns: [],
    Analysis: [],
    Other: [],
  }

  topTags.forEach(([tag, count]) => {
    if (
      tag.includes("USD") ||
      tag.includes("EUR") ||
      tag.includes("GBP") ||
      tag.includes("JPY") ||
      tag.includes("AUD") ||
      tag.includes("CAD") ||
      tag.includes("CHF") ||
      tag.includes("NZD") ||
      tag.includes("/")
    ) {
      tagCategories["Currency Pairs"].push({ tag, count })
    } else if (
      tag.includes("Long") ||
      tag.includes("Short") ||
      tag.includes("Buy") ||
      tag.includes("Sell") ||
      tag.includes("Scalp") ||
      tag.includes("Swing") ||
      tag.includes("Day") ||
      tag.includes("Position")
    ) {
      tagCategories["Trade Types"].push({ tag, count })
    } else if (
      tag.includes("Pattern") ||
      tag.includes("Breakout") ||
      tag.includes("Support") ||
      tag.includes("Resistance") ||
      tag.includes("Trend") ||
      tag.includes("Reversal") ||
      tag.includes("Head") ||
      tag.includes("Shoulder") ||
      tag.includes("Triangle") ||
      tag.includes("Flag") ||
      tag.includes("Pennant") ||
      tag.includes("Double") ||
      tag.includes("Triple")
    ) {
      tagCategories["Patterns"].push({ tag, count })
    } else if (
      tag.includes("Analysis") ||
      tag.includes("Indicator") ||
      tag.includes("RSI") ||
      tag.includes("MACD") ||
      tag.includes("MA") ||
      tag.includes("EMA") ||
      tag.includes("SMA") ||
      tag.includes("Fibonacci") ||
      tag.includes("Volume") ||
      tag.includes("Momentum") ||
      tag.includes("Divergence")
    ) {
      tagCategories["Analysis"].push({ tag, count })
    } else {
      tagCategories["Other"].push({ tag, count })
    }
  })

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {Object.entries(tagCategories).map(([category, tags]) => (
        <Card key={category}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">{category}</CardTitle>
            <CardDescription>Frequency of tags in this category</CardDescription>
          </CardHeader>
          <CardContent>
            {tags.length > 0 ? (
              <div className="space-y-3">
                {tags.map(({ tag, count }) => (
                  <div key={tag} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{tag}</span>
                      <Badge variant="outline">{count}</Badge>
                    </div>
                    <Progress
                      value={(count / statistics.totalEntries) * 100}
                      className="h-1.5"
                      indicatorClassName="bg-primary"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                <p>No tags in this category</p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

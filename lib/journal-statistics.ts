import type { JournalEntry } from "./journal-types"

export interface JournalStatistics {
  totalEntries: number
  entriesByType: Record<string, number>
  entriesByTag: Record<string, number>
  entriesByMood: Record<string, number>
  entriesByMonth: Record<string, number>
  tradeStatistics: TradeStatistics
  recentTags: string[]
  topCurrencyPairs: Array<{ pair: string; count: number }>
  sentimentTrend: Array<{ date: string; sentiment: number }>
}

export interface TradeStatistics {
  totalTradePlans: number
  totalTradeReviews: number
  winRate: number
  averageRiskReward: number
  profitFactor: number
  successByPair: Record<string, { total: number; wins: number; winRate: number }>
  successByPattern: Record<string, { total: number; wins: number; winRate: number }>
  profitByMonth: Array<{ month: string; profit: number }>
}

export function analyzeJournalEntries(entries: JournalEntry[]): JournalStatistics {
  // Initialize statistics object
  const stats: JournalStatistics = {
    totalEntries: entries.length,
    entriesByType: {},
    entriesByTag: {},
    entriesByMood: {},
    entriesByMonth: {},
    tradeStatistics: {
      totalTradePlans: 0,
      totalTradeReviews: 0,
      winRate: 0,
      averageRiskReward: 0,
      profitFactor: 0,
      successByPair: {},
      successByPattern: {},
      profitByMonth: [],
    },
    recentTags: [],
    topCurrencyPairs: [],
    sentimentTrend: [],
  }

  // Count entries by type
  entries.forEach((entry) => {
    // Count by entry type
    stats.entriesByType[entry.entryType] = (stats.entriesByType[entry.entryType] || 0) + 1

    // Count by mood
    if (entry.mood) {
      stats.entriesByMood[entry.mood] = (stats.entriesByMood[entry.mood] || 0) + 1
    }

    // Count by month
    const entryDate = new Date(entry.createdAt)
    const monthKey = `${entryDate.getFullYear()}-${(entryDate.getMonth() + 1).toString().padStart(2, "0")}`
    stats.entriesByMonth[monthKey] = (stats.entriesByMonth[monthKey] || 0) + 1

    // Count by tag
    entry.tags.forEach((tag) => {
      stats.entriesByTag[tag] = (stats.entriesByTag[tag] || 0) + 1
    })

    // Identify currency pairs
    const currencyPairTags = entry.tags.filter(
      (tag) =>
        tag.includes("/") ||
        tag.includes("USD") ||
        tag.includes("EUR") ||
        tag.includes("GBP") ||
        tag.includes("JPY") ||
        tag.includes("AUD") ||
        tag.includes("CAD") ||
        tag.includes("CHF") ||
        tag.includes("NZD"),
    )

    currencyPairTags.forEach((pair) => {
      const existingPairIndex = stats.topCurrencyPairs.findIndex((p) => p.pair === pair)
      if (existingPairIndex >= 0) {
        stats.topCurrencyPairs[existingPairIndex].count++
      } else {
        stats.topCurrencyPairs.push({ pair, count: 1 })
      }
    })

    // Calculate sentiment trend
    if (entry.mood) {
      const sentimentValue = entry.mood === "positive" ? 1 : entry.mood === "neutral" ? 0 : -1
      stats.sentimentTrend.push({
        date: entry.createdAt.split("T")[0],
        sentiment: sentimentValue,
      })
    }

    // Analyze trade plans and reviews
    if (entry.entryType === "trade-plan") {
      stats.tradeStatistics.totalTradePlans++

      // Extract risk-reward ratio if available
      const riskRewardMatch = entry.content.match(/risk[:-]reward\s*=?\s*1:(\d+\.?\d*)/i)
      if (riskRewardMatch && riskRewardMatch[1]) {
        const rr = Number.parseFloat(riskRewardMatch[1])
        if (!isNaN(rr)) {
          stats.tradeStatistics.averageRiskReward =
            (stats.tradeStatistics.averageRiskReward * (stats.tradeStatistics.totalTradePlans - 1) + rr) /
            stats.tradeStatistics.totalTradePlans
        }
      }

      // Extract currency pair
      const pairTag = entry.tags.find(
        (tag) =>
          tag.includes("/") || tag.includes("USD") || tag.includes("EUR") || tag.includes("GBP") || tag.includes("JPY"),
      )
      if (pairTag) {
        if (!stats.tradeStatistics.successByPair[pairTag]) {
          stats.tradeStatistics.successByPair[pairTag] = { total: 0, wins: 0, winRate: 0 }
        }
        stats.tradeStatistics.successByPair[pairTag].total++
      }

      // Extract pattern
      const patternTags = entry.tags.filter(
        (tag) =>
          tag.includes("Pattern") ||
          tag.includes("Breakout") ||
          tag.includes("Support") ||
          tag.includes("Resistance") ||
          tag.includes("Trend") ||
          tag.includes("Reversal"),
      )
      patternTags.forEach((pattern) => {
        if (!stats.tradeStatistics.successByPattern[pattern]) {
          stats.tradeStatistics.successByPattern[pattern] = { total: 0, wins: 0, winRate: 0 }
        }
        stats.tradeStatistics.successByPattern[pattern].total++
      })
    } else if (entry.entryType === "trade-review") {
      stats.tradeStatistics.totalTradeReviews++

      // Determine if trade was a win
      const isWin =
        entry.content.includes("profit") ||
        entry.content.includes("winner") ||
        entry.content.includes("successful") ||
        entry.mood === "positive"

      // Extract currency pair
      const pairTag = entry.tags.find(
        (tag) =>
          tag.includes("/") || tag.includes("USD") || tag.includes("EUR") || tag.includes("GBP") || tag.includes("JPY"),
      )
      if (pairTag && stats.tradeStatistics.successByPair[pairTag]) {
        if (isWin) {
          stats.tradeStatistics.successByPair[pairTag].wins++
        }
        stats.tradeStatistics.successByPair[pairTag].winRate =
          (stats.tradeStatistics.successByPair[pairTag].wins / stats.tradeStatistics.successByPair[pairTag].total) * 100
      }

      // Extract pattern
      const patternTags = entry.tags.filter(
        (tag) =>
          tag.includes("Pattern") ||
          tag.includes("Breakout") ||
          tag.includes("Support") ||
          tag.includes("Resistance") ||
          tag.includes("Trend") ||
          tag.includes("Reversal"),
      )
      patternTags.forEach((pattern) => {
        if (stats.tradeStatistics.successByPattern[pattern]) {
          if (isWin) {
            stats.tradeStatistics.successByPattern[pattern].wins++
          }
          stats.tradeStatistics.successByPattern[pattern].winRate =
            (stats.tradeStatistics.successByPattern[pattern].wins /
              stats.tradeStatistics.successByPattern[pattern].total) *
            100
        }
      })

      // Extract profit for monthly tracking
      const profitMatch = entry.content.match(/profit:?\s*\$?(\d+\.?\d*)/i)
      if (profitMatch && profitMatch[1]) {
        const profit = Number.parseFloat(profitMatch[1])
        if (!isNaN(profit)) {
          const entryDate = new Date(entry.createdAt)
          const monthKey = `${entryDate.getFullYear()}-${(entryDate.getMonth() + 1).toString().padStart(2, "0")}`

          const existingMonthIndex = stats.tradeStatistics.profitByMonth.findIndex((m) => m.month === monthKey)
          if (existingMonthIndex >= 0) {
            stats.tradeStatistics.profitByMonth[existingMonthIndex].profit += profit
          } else {
            stats.tradeStatistics.profitByMonth.push({ month: monthKey, profit })
          }
        }
      }
    }
  })

  // Calculate overall win rate
  if (stats.tradeStatistics.totalTradeReviews > 0) {
    const totalWins = Object.values(stats.tradeStatistics.successByPair).reduce((sum, pair) => sum + pair.wins, 0)
    stats.tradeStatistics.winRate = (totalWins / stats.tradeStatistics.totalTradeReviews) * 100
  }

  // Sort top currency pairs
  stats.topCurrencyPairs.sort((a, b) => b.count - a.count)
  stats.topCurrencyPairs = stats.topCurrencyPairs.slice(0, 5)

  // Get recent tags (last 20 entries)
  const recentEntries = [...entries]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 20)

  const recentTagsMap: Record<string, number> = {}
  recentEntries.forEach((entry) => {
    entry.tags.forEach((tag) => {
      recentTagsMap[tag] = (recentTagsMap[tag] || 0) + 1
    })
  })

  stats.recentTags = Object.entries(recentTagsMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([tag]) => tag)

  // Sort sentiment trend by date
  stats.sentimentTrend.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  // Sort profit by month chronologically
  stats.tradeStatistics.profitByMonth.sort((a, b) => a.month.localeCompare(b.month))

  return stats
}

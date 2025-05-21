import type { JournalEntry } from "./journal-types"

export function analyzeJournalEntries(entries: JournalEntry[] | undefined | null) {
  // Handle undefined or null entries
  if (!entries || entries.length === 0) {
    return {
      totalEntries: 0,
      winningTrades: 0,
      losingTrades: 0,
      winRate: 0,
      averageProfit: 0,
      averageLoss: 0,
      profitFactor: 0,
      totalProfit: 0,
      totalLoss: 0,
      netProfit: 0,
      largestWin: 0,
      largestLoss: 0,
      averageRiskReward: 0,
      byTimeOfDay: {},
      byDayOfWeek: {},
      byTags: {},
      byInstrument: {},
    }
  }

  // Continue with the existing implementation
  const winningTrades = entries.filter((entry) => entry.outcome === "win").length
  const losingTrades = entries.filter((entry) => entry.outcome === "loss").length

  const winRate = winningTrades / entries.length

  const profits = entries.filter((entry) => entry.outcome === "win").map((entry) => entry.profitAmount || 0)

  const losses = entries.filter((entry) => entry.outcome === "loss").map((entry) => entry.lossAmount || 0)

  const totalProfit = profits.reduce((sum, profit) => sum + profit, 0)
  const totalLoss = losses.reduce((sum, loss) => sum + loss, 0)

  const averageProfit = profits.length > 0 ? totalProfit / profits.length : 0
  const averageLoss = losses.length > 0 ? totalLoss / losses.length : 0

  const profitFactor = totalLoss !== 0 ? totalProfit / totalLoss : totalProfit > 0 ? Number.POSITIVE_INFINITY : 0

  const largestWin = profits.length > 0 ? Math.max(...profits) : 0
  const largestLoss = losses.length > 0 ? Math.max(...losses) : 0

  // Calculate average risk/reward ratio
  const riskRewards = entries.filter((entry) => entry.riskRewardRatio).map((entry) => entry.riskRewardRatio || 0)

  const averageRiskReward =
    riskRewards.length > 0 ? riskRewards.reduce((sum, ratio) => sum + ratio, 0) / riskRewards.length : 0

  // Analyze by time of day
  const byTimeOfDay: Record<string, number> = {}
  entries.forEach((entry) => {
    if (entry.timeOfDay) {
      byTimeOfDay[entry.timeOfDay] = (byTimeOfDay[entry.timeOfDay] || 0) + 1
    }
  })

  // Analyze by day of week
  const byDayOfWeek: Record<string, number> = {}
  entries.forEach((entry) => {
    if (entry.dayOfWeek) {
      byDayOfWeek[entry.dayOfWeek] = (byDayOfWeek[entry.dayOfWeek] || 0) + 1
    }
  })

  // Analyze by tags
  const byTags: Record<string, number> = {}
  entries.forEach((entry) => {
    if (entry.tags) {
      entry.tags.forEach((tag) => {
        byTags[tag] = (byTags[tag] || 0) + 1
      })
    }
  })

  // Analyze by instrument
  const byInstrument: Record<string, number> = {}
  entries.forEach((entry) => {
    if (entry.instrument) {
      byInstrument[entry.instrument] = (byInstrument[entry.instrument] || 0) + 1
    }
  })

  return {
    totalEntries: entries.length,
    winningTrades,
    losingTrades,
    winRate,
    averageProfit,
    averageLoss,
    profitFactor,
    totalProfit,
    totalLoss,
    netProfit: totalProfit - totalLoss,
    largestWin,
    largestLoss,
    averageRiskReward,
    byTimeOfDay,
    byDayOfWeek,
    byTags,
    byInstrument,
  }
}

// Export the function with an alias for backward compatibility
export const getJournalStatistics = analyzeJournalEntries

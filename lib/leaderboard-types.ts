export interface TraderProfile {
  id: string
  username: string
  name: string
  avatarUrl: string
  bio?: string
  joinedDate: string
  followers: number
  following: number
  verified: boolean
  badges?: string[]
  socialLinks?: {
    twitter?: string
    tradingview?: string
    website?: string
  }
}

export interface TraderPerformance {
  traderId: string
  winRate: number
  profitFactor: number
  totalIdeas: number
  successfulIdeas: number
  averageReturn: number
  popularity: number // Likes, comments, shares
  consistency: number // 0-100 score
  riskManagement: number // 0-100 score
  lastMonthRank?: number
  rankChange?: number
  bestPair?: string
  worstPair?: string
  totalLikes: number
  totalComments: number
  totalShares: number
}

export interface TradeIdea {
  id: string
  traderId: string
  title: string
  symbol: string
  direction: "long" | "short"
  entryPrice: number
  targetPrice: number
  stopLoss: number
  imageUrl: string
  createdAt: string
  outcome?: "win" | "loss" | "pending"
  actualReturn?: number
  likes: number
  comments: number
  shares: number
}

export interface LeaderboardEntry {
  rank: number
  trader: TraderProfile
  performance: TraderPerformance
  recentIdeas: TradeIdea[]
}

export type LeaderboardTimeframe = "weekly" | "monthly" | "quarterly" | "yearly" | "all-time"
export type LeaderboardCategory = "overall" | "win-rate" | "profit-factor" | "popularity" | "consistency"

import type {
  LeaderboardEntry,
  LeaderboardTimeframe,
  LeaderboardCategory,
  TraderProfile,
  TraderPerformance,
  TradeIdea,
} from "./leaderboard-types"

// Mock data for the leaderboard
const mockLeaderboardData: LeaderboardEntry[] = [
  {
    rank: 1,
    trader: {
      id: "trader-001",
      username: "forex_master",
      name: "Alex Thompson",
      avatarUrl: "/at-symbol-typography.png",
      bio: "Professional forex trader with 10+ years of experience. Specializing in swing trading major pairs.",
      joinedDate: "2022-01-15",
      followers: 5842,
      following: 124,
      verified: true,
      badges: ["Pro Trader", "Top Contributor", "Certified Analyst"],
      socialLinks: {
        twitter: "alexthompson",
        tradingview: "forex_master",
        website: "forexmastery.com",
      },
    },
    performance: {
      traderId: "trader-001",
      winRate: 76.4,
      profitFactor: 3.2,
      totalIdeas: 152,
      successfulIdeas: 116,
      averageReturn: 2.8,
      popularity: 92,
      consistency: 88,
      riskManagement: 94,
      lastMonthRank: 2,
      rankChange: 1,
      bestPair: "EUR/USD",
      worstPair: "GBP/JPY",
      totalLikes: 8742,
      totalComments: 2156,
      totalShares: 1843,
    },
    recentIdeas: [
      {
        id: "idea-001",
        traderId: "trader-001",
        title: "EUR/USD Bearish Continuation",
        symbol: "EUR/USD",
        direction: "short",
        entryPrice: 1.1165,
        targetPrice: 1.105,
        stopLoss: 1.121,
        imageUrl: "/tradingview-eurusd.png",
        createdAt: "2025-05-15T14:30:00Z",
        outcome: "win",
        actualReturn: 1.9,
        likes: 342,
        comments: 87,
        shares: 124,
      },
      {
        id: "idea-002",
        traderId: "trader-001",
        title: "GBP/USD Bullish Reversal",
        symbol: "GBP/USD",
        direction: "long",
        entryPrice: 1.265,
        targetPrice: 1.275,
        stopLoss: 1.26,
        imageUrl: "/gbp-usd-chart.png",
        createdAt: "2025-05-10T09:15:00Z",
        outcome: "win",
        actualReturn: 2.4,
        likes: 287,
        comments: 56,
        shares: 98,
      },
    ],
  },
  {
    rank: 2,
    trader: {
      id: "trader-002",
      username: "crypto_whale",
      name: "Sarah Chen",
      avatarUrl: "/stylized-initials-sc.png",
      bio: "Crypto analyst and trader. Focusing on Bitcoin, Ethereum, and emerging altcoins.",
      joinedDate: "2022-03-22",
      followers: 4921,
      following: 87,
      verified: true,
      badges: ["Crypto Expert", "Top Analyst"],
      socialLinks: {
        twitter: "sarahcrypto",
        tradingview: "crypto_whale",
      },
    },
    performance: {
      traderId: "trader-002",
      winRate: 68.9,
      profitFactor: 2.8,
      totalIdeas: 124,
      successfulIdeas: 85,
      averageReturn: 3.6,
      popularity: 95,
      consistency: 82,
      riskManagement: 86,
      lastMonthRank: 1,
      rankChange: -1,
      bestPair: "BTC/USD",
      worstPair: "XRP/USD",
      totalLikes: 7865,
      totalComments: 1987,
      totalShares: 1654,
    },
    recentIdeas: [
      {
        id: "idea-003",
        traderId: "trader-002",
        title: "BTC/USD Breakout Trade",
        symbol: "BTC/USD",
        direction: "long",
        entryPrice: 62500,
        targetPrice: 65000,
        stopLoss: 61000,
        imageUrl: "/btc-usd-chart.png",
        createdAt: "2025-05-16T10:45:00Z",
        outcome: "pending",
        likes: 421,
        comments: 112,
        shares: 187,
      },
    ],
  },
  {
    rank: 3,
    trader: {
      id: "trader-003",
      username: "stock_hunter",
      name: "Michael Rodriguez",
      avatarUrl: "/medical-resonance-image.png",
      bio: "Stock market trader specializing in growth stocks and swing trading strategies.",
      joinedDate: "2022-02-10",
      followers: 3876,
      following: 156,
      verified: true,
      badges: ["Stock Expert"],
      socialLinks: {
        twitter: "stockhunter",
        tradingview: "stock_hunter",
      },
    },
    performance: {
      traderId: "trader-003",
      winRate: 72.1,
      profitFactor: 2.6,
      totalIdeas: 118,
      successfulIdeas: 85,
      averageReturn: 2.4,
      popularity: 87,
      consistency: 90,
      riskManagement: 88,
      lastMonthRank: 4,
      rankChange: 1,
      bestPair: "AAPL",
      worstPair: "TSLA",
      totalLikes: 6543,
      totalComments: 1654,
      totalShares: 1432,
    },
    recentIdeas: [
      {
        id: "idea-004",
        traderId: "trader-003",
        title: "AAPL Bullish Pattern",
        symbol: "AAPL",
        direction: "long",
        entryPrice: 178.5,
        targetPrice: 185.0,
        stopLoss: 175.0,
        imageUrl: "/aapl-stock-chart.png",
        createdAt: "2025-05-14T15:20:00Z",
        outcome: "win",
        actualReturn: 2.1,
        likes: 312,
        comments: 76,
        shares: 98,
      },
    ],
  },
  {
    rank: 4,
    trader: {
      id: "trader-004",
      username: "forex_queen",
      name: "Emma Wilson",
      avatarUrl: "/graffiti-ew.png",
      bio: "Day trader focusing on forex majors and commodity currencies.",
      joinedDate: "2022-04-05",
      followers: 3254,
      following: 92,
      verified: true,
      badges: ["Rising Star"],
      socialLinks: {
        twitter: "emmaforex",
        tradingview: "forex_queen",
      },
    },
    performance: {
      traderId: "trader-004",
      winRate: 65.8,
      profitFactor: 2.3,
      totalIdeas: 98,
      successfulIdeas: 64,
      averageReturn: 2.2,
      popularity: 84,
      consistency: 78,
      riskManagement: 92,
      lastMonthRank: 3,
      rankChange: -1,
      bestPair: "USD/CAD",
      worstPair: "AUD/JPY",
      totalLikes: 5432,
      totalComments: 1321,
      totalShares: 987,
    },
    recentIdeas: [
      {
        id: "idea-005",
        traderId: "trader-004",
        title: "USD/CAD Support Bounce",
        symbol: "USD/CAD",
        direction: "long",
        entryPrice: 1.365,
        targetPrice: 1.375,
        stopLoss: 1.36,
        imageUrl: "/usd-cad-chart.png",
        createdAt: "2025-05-17T08:30:00Z",
        outcome: "pending",
        likes: 187,
        comments: 43,
        shares: 65,
      },
    ],
  },
  {
    rank: 5,
    trader: {
      id: "trader-005",
      username: "tech_trader",
      name: "David Kim",
      avatarUrl: "/abstract-geometric-dk.png",
      bio: "Technical analyst specializing in momentum trading strategies.",
      joinedDate: "2022-01-30",
      followers: 2987,
      following: 134,
      verified: true,
      badges: ["Technical Expert"],
      socialLinks: {
        twitter: "techtrader",
        tradingview: "tech_trader",
      },
    },
    performance: {
      traderId: "trader-005",
      winRate: 70.2,
      profitFactor: 2.5,
      totalIdeas: 104,
      successfulIdeas: 73,
      averageReturn: 2.0,
      popularity: 82,
      consistency: 85,
      riskManagement: 80,
      lastMonthRank: 6,
      rankChange: 1,
      bestPair: "NASDAQ",
      worstPair: "DOW",
      totalLikes: 4987,
      totalComments: 1243,
      totalShares: 876,
    },
    recentIdeas: [
      {
        id: "idea-006",
        traderId: "trader-005",
        title: "NASDAQ Bearish Divergence",
        symbol: "NASDAQ",
        direction: "short",
        entryPrice: 16750,
        targetPrice: 16500,
        stopLoss: 16850,
        imageUrl: "/nasdaq-chart.png",
        createdAt: "2025-05-16T14:15:00Z",
        outcome: "loss",
        actualReturn: -1.2,
        likes: 165,
        comments: 54,
        shares: 32,
      },
    ],
  },
  {
    rank: 6,
    trader: {
      id: "trader-006",
      username: "swing_master",
      name: "Robert Johnson",
      avatarUrl: "/placeholder.svg?height=40&width=40&query=RJ",
      bio: "Swing trader focusing on multi-day setups across forex and indices.",
      joinedDate: "2022-05-12",
      followers: 2654,
      following: 78,
      verified: false,
      badges: ["Consistent Trader"],
      socialLinks: {
        tradingview: "swing_master",
      },
    },
    performance: {
      traderId: "trader-006",
      winRate: 63.5,
      profitFactor: 2.1,
      totalIdeas: 85,
      successfulIdeas: 54,
      averageReturn: 1.9,
      popularity: 76,
      consistency: 82,
      riskManagement: 85,
      lastMonthRank: 5,
      rankChange: -1,
      bestPair: "EUR/JPY",
      worstPair: "GBP/USD",
      totalLikes: 3876,
      totalComments: 987,
      totalShares: 765,
    },
    recentIdeas: [
      {
        id: "idea-007",
        traderId: "trader-006",
        title: "EUR/JPY Range Breakout",
        symbol: "EUR/JPY",
        direction: "long",
        entryPrice: 164.5,
        targetPrice: 165.5,
        stopLoss: 164.0,
        imageUrl: "/placeholder.svg?height=300&width=500&query=EUR/JPY+chart",
        createdAt: "2025-05-15T11:30:00Z",
        outcome: "win",
        actualReturn: 1.8,
        likes: 198,
        comments: 45,
        shares: 67,
      },
    ],
  },
  {
    rank: 7,
    trader: {
      id: "trader-007",
      username: "options_guru",
      name: "Jennifer Lee",
      avatarUrl: "/placeholder.svg?height=40&width=40&query=JL",
      bio: "Options trader specializing in credit spreads and iron condors.",
      joinedDate: "2022-03-18",
      followers: 2432,
      following: 65,
      verified: true,
      badges: ["Options Expert"],
      socialLinks: {
        twitter: "optionsguru",
        website: "optionsstrategies.com",
      },
    },
    performance: {
      traderId: "trader-007",
      winRate: 78.3,
      profitFactor: 2.0,
      totalIdeas: 76,
      successfulIdeas: 59,
      averageReturn: 1.6,
      popularity: 72,
      consistency: 88,
      riskManagement: 90,
      lastMonthRank: 8,
      rankChange: 1,
      bestPair: "SPY",
      worstPair: "QQQ",
      totalLikes: 3542,
      totalComments: 876,
      totalShares: 654,
    },
    recentIdeas: [
      {
        id: "idea-008",
        traderId: "trader-007",
        title: "SPY Iron Condor Setup",
        symbol: "SPY",
        direction: "short",
        entryPrice: 495.0,
        targetPrice: 490.0,
        stopLoss: 500.0,
        imageUrl: "/placeholder.svg?height=300&width=500&query=SPY+options+chart",
        createdAt: "2025-05-14T09:45:00Z",
        outcome: "win",
        actualReturn: 1.5,
        likes: 176,
        comments: 43,
        shares: 54,
      },
    ],
  },
  {
    rank: 8,
    trader: {
      id: "trader-008",
      username: "chart_wizard",
      name: "Thomas Brown",
      avatarUrl: "/placeholder.svg?height=40&width=40&query=TB",
      bio: "Chart pattern specialist focusing on harmonic patterns and Elliott Wave theory.",
      joinedDate: "2022-02-25",
      followers: 2187,
      following: 112,
      verified: false,
      badges: ["Pattern Expert"],
      socialLinks: {
        tradingview: "chart_wizard",
      },
    },
    performance: {
      traderId: "trader-008",
      winRate: 67.2,
      profitFactor: 1.9,
      totalIdeas: 92,
      successfulIdeas: 62,
      averageReturn: 1.8,
      popularity: 70,
      consistency: 75,
      riskManagement: 82,
      lastMonthRank: 7,
      rankChange: -1,
      bestPair: "USD/JPY",
      worstPair: "EUR/GBP",
      totalLikes: 3210,
      totalComments: 765,
      totalShares: 543,
    },
    recentIdeas: [
      {
        id: "idea-009",
        traderId: "trader-008",
        title: "USD/JPY Bat Pattern",
        symbol: "USD/JPY",
        direction: "short",
        entryPrice: 154.8,
        targetPrice: 153.5,
        stopLoss: 155.3,
        imageUrl: "/placeholder.svg?height=300&width=500&query=USD/JPY+chart",
        createdAt: "2025-05-16T16:20:00Z",
        outcome: "pending",
        likes: 143,
        comments: 32,
        shares: 45,
      },
    ],
  },
  {
    rank: 9,
    trader: {
      id: "trader-009",
      username: "fundamental_trader",
      name: "Olivia Martinez",
      avatarUrl: "/placeholder.svg?height=40&width=40&query=OM",
      bio: "Fundamental analyst focusing on economic data and central bank policies.",
      joinedDate: "2022-04-10",
      followers: 1987,
      following: 54,
      verified: true,
      badges: ["Fundamental Expert"],
      socialLinks: {
        twitter: "oliviaecon",
        website: "economictrader.com",
      },
    },
    performance: {
      traderId: "trader-009",
      winRate: 62.8,
      profitFactor: 1.8,
      totalIdeas: 78,
      successfulIdeas: 49,
      averageReturn: 2.2,
      popularity: 68,
      consistency: 72,
      riskManagement: 78,
      lastMonthRank: 10,
      rankChange: 1,
      bestPair: "EUR/USD",
      worstPair: "AUD/USD",
      totalLikes: 2876,
      totalComments: 654,
      totalShares: 432,
    },
    recentIdeas: [
      {
        id: "idea-010",
        traderId: "trader-009",
        title: "EUR/USD Post-ECB Trade",
        symbol: "EUR/USD",
        direction: "long",
        entryPrice: 1.095,
        targetPrice: 1.105,
        stopLoss: 1.09,
        imageUrl: "/gbp-usd-chart.png",
        createdAt: "2025-05-13T13:10:00Z",
        outcome: "win",
        actualReturn: 2.3,
        likes: 165,
        comments: 43,
        shares: 56,
      },
    ],
  },
  {
    rank: 10,
    trader: {
      id: "trader-010",
      username: "scalp_king",
      name: "William Taylor",
      avatarUrl: "/placeholder.svg?height=40&width=40&query=WT",
      bio: "Scalp trader focusing on short-term price movements in forex and indices.",
      joinedDate: "2022-05-05",
      followers: 1765,
      following: 43,
      verified: false,
      badges: ["Scalping Expert"],
      socialLinks: {
        tradingview: "scalp_king",
      },
    },
    performance: {
      traderId: "trader-010",
      winRate: 59.6,
      profitFactor: 1.7,
      totalIdeas: 124,
      successfulIdeas: 74,
      averageReturn: 1.2,
      popularity: 65,
      consistency: 70,
      riskManagement: 75,
      lastMonthRank: 9,
      rankChange: -1,
      bestPair: "GBP/USD",
      worstPair: "USD/CHF",
      totalLikes: 2543,
      totalComments: 543,
      totalShares: 321,
    },
    recentIdeas: [
      {
        id: "idea-011",
        traderId: "trader-010",
        title: "GBP/USD Scalp Setup",
        symbol: "GBP/USD",
        direction: "short",
        entryPrice: 1.272,
        targetPrice: 1.268,
        stopLoss: 1.274,
        imageUrl: "/gbp-usd-chart.png",
        createdAt: "2025-05-17T10:05:00Z",
        outcome: "pending",
        likes: 98,
        comments: 21,
        shares: 34,
      },
    ],
  },
]

export function getLeaderboardData(
  timeframe: LeaderboardTimeframe = "monthly",
  category: LeaderboardCategory = "overall",
  limit = 10,
): LeaderboardEntry[] {
  // In a real implementation, this would filter based on timeframe and sort based on category
  // For this mock, we'll just return the data as is, limited to the requested number
  return mockLeaderboardData.slice(0, limit)
}

export function getTraderProfile(traderId: string): TraderProfile | undefined {
  const entry = mockLeaderboardData.find((entry) => entry.trader.id === traderId)
  return entry?.trader
}

export function getTraderPerformance(traderId: string): TraderPerformance | undefined {
  const entry = mockLeaderboardData.find((entry) => entry.trader.id === traderId)
  return entry?.performance
}

export function getTraderIdeas(traderId: string): TradeIdea[] {
  const entry = mockLeaderboardData.find((entry) => entry.trader.id === traderId)
  return entry?.recentIdeas || []
}

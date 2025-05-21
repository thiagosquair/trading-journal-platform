export type GoalTimeframe = "weekly" | "monthly" | "quarterly" | "yearly" | "custom"

export type GoalStatus = "not_started" | "in_progress" | "achieved" | "missed"

export interface PerformanceGoal {
  id: string
  userId: string
  metric: string
  target: number
  currentValue?: number
  unit: string
  timeframe: GoalTimeframe
  startDate: string
  endDate: string
  status: GoalStatus
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface CreateGoalParams {
  metric: string
  target: number
  unit: string
  timeframe: GoalTimeframe
  startDate: string
  endDate: string
  notes?: string
}

export interface UpdateGoalParams {
  id: string
  metric?: string
  target?: number
  currentValue?: number
  unit?: string
  timeframe?: GoalTimeframe
  startDate?: string
  endDate?: string
  status?: GoalStatus
  notes?: string
}

export interface GoalProgress {
  goal: PerformanceGoal
  progress: number // 0-100
  daysRemaining: number
  isOnTrack: boolean
}

export interface GoalCategory {
  name: string
  description: string
  metrics: GoalMetric[]
}

export interface GoalMetric {
  id: string
  name: string
  description: string
  unit: string
  defaultTimeframe: GoalTimeframe
  minValue?: number
  maxValue?: number
  goodDirection: "higher" | "lower"
  category: string
}

export const GOAL_METRICS: GoalMetric[] = [
  {
    id: "win_rate",
    name: "Win Rate",
    description: "Percentage of winning trades",
    unit: "%",
    defaultTimeframe: "monthly",
    minValue: 0,
    maxValue: 100,
    goodDirection: "higher",
    category: "performance",
  },
  {
    id: "profit_factor",
    name: "Profit Factor",
    description: "Ratio of gross profits to gross losses",
    unit: "ratio",
    defaultTimeframe: "monthly",
    minValue: 0,
    goodDirection: "higher",
    category: "performance",
  },
  {
    id: "risk_reward",
    name: "Risk/Reward Ratio",
    description: "Average ratio of profit to loss per trade",
    unit: "ratio",
    defaultTimeframe: "monthly",
    minValue: 0,
    goodDirection: "higher",
    category: "risk",
  },
  {
    id: "max_drawdown",
    name: "Maximum Drawdown",
    description: "Largest percentage drop from peak to trough",
    unit: "%",
    defaultTimeframe: "monthly",
    minValue: 0,
    maxValue: 100,
    goodDirection: "lower",
    category: "risk",
  },
  {
    id: "sharpe_ratio",
    name: "Sharpe Ratio",
    description: "Measure of risk-adjusted return",
    unit: "ratio",
    defaultTimeframe: "monthly",
    goodDirection: "higher",
    category: "performance",
  },
  {
    id: "trade_frequency",
    name: "Trade Frequency",
    description: "Number of trades per period",
    unit: "trades",
    defaultTimeframe: "weekly",
    minValue: 0,
    goodDirection: "higher",
    category: "activity",
  },
  {
    id: "journal_entries",
    name: "Journal Entries",
    description: "Number of journal entries created",
    unit: "entries",
    defaultTimeframe: "weekly",
    minValue: 0,
    goodDirection: "higher",
    category: "activity",
  },
  {
    id: "profit_target",
    name: "Profit Target",
    description: "Target profit amount",
    unit: "$",
    defaultTimeframe: "monthly",
    minValue: 0,
    goodDirection: "higher",
    category: "performance",
  },
  {
    id: "trade_duration",
    name: "Average Trade Duration",
    description: "Average time in market per trade",
    unit: "hours",
    defaultTimeframe: "monthly",
    minValue: 0,
    goodDirection: "lower",
    category: "activity",
  },
  {
    id: "win_streak",
    name: "Longest Win Streak",
    description: "Most consecutive winning trades",
    unit: "trades",
    defaultTimeframe: "monthly",
    minValue: 0,
    goodDirection: "higher",
    category: "performance",
  },
]

export const GOAL_CATEGORIES: GoalCategory[] = [
  {
    name: "Performance",
    description: "Metrics related to trading performance and profitability",
    metrics: GOAL_METRICS.filter((metric) => metric.category === "performance"),
  },
  {
    name: "Risk Management",
    description: "Metrics related to risk control and management",
    metrics: GOAL_METRICS.filter((metric) => metric.category === "risk"),
  },
  {
    name: "Activity",
    description: "Metrics related to trading and journaling activity",
    metrics: GOAL_METRICS.filter((metric) => metric.category === "activity"),
  },
]

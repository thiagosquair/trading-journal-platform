"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Info, Settings } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import DailyMetricsDetail from "./daily-metrics-detail"
// Import the MonthlyMetricsSummary component
import MonthlyMetricsSummary from "./monthly-metrics-summary"

// Types for our daily performance data
interface DailyPerformance {
  date: string
  profit: number
  trades: number
  winRate?: number
  rMultiple?: number
  avgTradeSize?: number
  maxDrawdown?: number
  sharpeRatio?: number
  tradingSession?: "morning" | "afternoon" | "evening" | "multiple"
  instruments?: string[]
  avgTradeDuration?: number
  volatility?: number
  winCount?: number
  lossCount?: number
  riskPerTrade?: number
  volume?: number
  commissions?: number
  bestTrade?: number
  worstTrade?: number
}

interface WeeklyPerformance {
  weekNumber: number
  totalProfit: number
  tradedDays: number
}

interface MonthlyPerformance {
  totalProfit: number
  tradedDays: number
}

interface DailyPerformanceCalendarProps {
  month?: Date
  data?: DailyPerformance[]
}

export default function DailyPerformanceCalendar({ month = new Date(), data = [] }: DailyPerformanceCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(month)
  const [displayOptions, setDisplayOptions] = useState({
    rMultiple: true,
    dailyPL: true,
    numberOfTrades: true,
    winRate: true,
    avgTradeSize: false,
    maxDrawdown: false,
    tradingSession: false,
    instruments: false,
    tradeDuration: false,
    bestWorstTrade: false,
    volume: false,
    commissions: false,
  })

  // Add a new state for the selected day
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  // Add a state for toggling between calendar and summary views
  const [view, setView] = useState<"calendar" | "summary">("calendar")

  // Helper to get month name and year
  const getMonthName = (date: Date) => {
    return date.toLocaleString("default", { month: "long", year: "numeric" })
  }

  // Navigate to previous month
  const prevMonth = () => {
    const newMonth = new Date(currentMonth)
    newMonth.setMonth(newMonth.getMonth() - 1)
    setCurrentMonth(newMonth)
  }

  // Navigate to next month
  const nextMonth = () => {
    const newMonth = new Date(currentMonth)
    newMonth.setMonth(newMonth.getMonth() + 1)
    setCurrentMonth(newMonth)
  }

  // Navigate to today
  const goToToday = () => {
    setCurrentMonth(new Date())
  }

  // Generate calendar days for the current month
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()

    // First day of the month
    const firstDay = new Date(year, month, 1)
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0)

    // Day of the week for the first day (0 = Sunday, 6 = Saturday)
    const firstDayOfWeek = firstDay.getDay()

    // Total days in the month
    const daysInMonth = lastDay.getDate()

    // Generate array of day numbers with empty slots for the start of the month
    const days = []

    // Add empty slots for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }

    return days
  }

  // Mock data for demonstration
  const mockDailyData: Record<string, DailyPerformance> = {
    "2024-07-01": {
      date: "2024-07-01",
      profit: 400,
      trades: 1,
      winRate: 100,
      rMultiple: 2,
      avgTradeSize: 5000,
      maxDrawdown: 120,
      sharpeRatio: 1.8,
      tradingSession: "morning",
      instruments: ["EURUSD"],
      avgTradeDuration: 45,
      volatility: 0.8,
      winCount: 1,
      lossCount: 0,
      riskPerTrade: 200,
      volume: 1.5,
      commissions: 12,
      bestTrade: 400,
      worstTrade: 400,
    },
    "2024-07-02": {
      date: "2024-07-02",
      profit: 400,
      trades: 1,
      winRate: 100,
      rMultiple: 2,
      avgTradeSize: 5000,
      maxDrawdown: 80,
      sharpeRatio: 2.1,
      tradingSession: "morning",
      instruments: ["GBPUSD"],
      avgTradeDuration: 32,
      volatility: 0.7,
      winCount: 1,
      lossCount: 0,
      riskPerTrade: 200,
      volume: 1.5,
      commissions: 12,
      bestTrade: 400,
      worstTrade: 400,
    },
    "2024-07-05": {
      date: "2024-07-05",
      profit: 400,
      trades: 1,
      winRate: 100,
      rMultiple: 2,
      avgTradeSize: 5000,
      maxDrawdown: 120,
      sharpeRatio: 1.8,
      tradingSession: "morning",
      instruments: ["EURUSD"],
      avgTradeDuration: 45,
      volatility: 0.8,
      winCount: 1,
      lossCount: 0,
      riskPerTrade: 200,
      volume: 1.5,
      commissions: 12,
      bestTrade: 400,
      worstTrade: 400,
    },
    "2024-07-08": {
      date: "2024-07-08",
      profit: 400,
      trades: 1,
      winRate: 100,
      rMultiple: 2,
      avgTradeSize: 5000,
      maxDrawdown: 120,
      sharpeRatio: 1.8,
      tradingSession: "morning",
      instruments: ["EURUSD"],
      avgTradeDuration: 45,
      volatility: 0.8,
      winCount: 1,
      lossCount: 0,
      riskPerTrade: 200,
      volume: 1.5,
      commissions: 12,
      bestTrade: 400,
      worstTrade: 400,
    },
    "2024-07-09": {
      date: "2024-07-09",
      profit: 400,
      trades: 1,
      winRate: 100,
      rMultiple: 2,
      avgTradeSize: 5000,
      maxDrawdown: 120,
      sharpeRatio: 1.8,
      tradingSession: "morning",
      instruments: ["EURUSD"],
      avgTradeDuration: 45,
      volatility: 0.8,
      winCount: 1,
      lossCount: 0,
      riskPerTrade: 200,
      volume: 1.5,
      commissions: 12,
      bestTrade: 400,
      worstTrade: 400,
    },
    "2024-07-10": {
      date: "2024-07-10",
      profit: 400,
      trades: 1,
      winRate: 100,
      rMultiple: 2,
      avgTradeSize: 5000,
      maxDrawdown: 120,
      sharpeRatio: 1.8,
      tradingSession: "morning",
      instruments: ["EURUSD"],
      avgTradeDuration: 45,
      volatility: 0.8,
      winCount: 1,
      lossCount: 0,
      riskPerTrade: 200,
      volume: 1.5,
      commissions: 12,
      bestTrade: 400,
      worstTrade: 400,
    },
    "2024-07-11": {
      date: "2024-07-11",
      profit: -500,
      trades: 1,
      winRate: 0,
      rMultiple: -2.5,
      avgTradeSize: 5000,
      maxDrawdown: 500,
      sharpeRatio: -2.1,
      tradingSession: "afternoon",
      instruments: ["USDJPY"],
      avgTradeDuration: 65,
      volatility: 1.2,
      winCount: 0,
      lossCount: 1,
      riskPerTrade: 200,
      volume: 1.5,
      commissions: 12,
      bestTrade: -500,
      worstTrade: -500,
    },
    "2024-07-12": {
      date: "2024-07-12",
      profit: 440,
      trades: 2,
      winRate: 100,
      rMultiple: 2.2,
      avgTradeSize: 4500,
      maxDrawdown: 120,
      sharpeRatio: 1.9,
      tradingSession: "multiple",
      instruments: ["EURUSD", "GBPUSD"],
      avgTradeDuration: 38,
      volatility: 0.9,
      winCount: 2,
      lossCount: 0,
      riskPerTrade: 200,
      volume: 3.0,
      commissions: 24,
      bestTrade: 240,
      worstTrade: 200,
    },
    "2024-07-16": {
      date: "2024-07-16",
      profit: 400,
      trades: 1,
      winRate: 100,
      rMultiple: 2,
      avgTradeSize: 5000,
      maxDrawdown: 120,
      sharpeRatio: 1.8,
      tradingSession: "morning",
      instruments: ["EURUSD"],
      avgTradeDuration: 45,
      volatility: 0.8,
      winCount: 1,
      lossCount: 0,
      riskPerTrade: 200,
      volume: 1.5,
      commissions: 12,
      bestTrade: 400,
      worstTrade: 400,
    },
    "2024-07-17": {
      date: "2024-07-17",
      profit: -515,
      trades: 1,
      winRate: 0,
      rMultiple: -2.58,
      avgTradeSize: 5000,
      maxDrawdown: 120,
      sharpeRatio: 1.8,
      tradingSession: "morning",
      instruments: ["EURUSD"],
      avgTradeDuration: 45,
      volatility: 0.8,
      winCount: 1,
      lossCount: 0,
      riskPerTrade: 200,
      volume: 1.5,
      commissions: 12,
      bestTrade: 400,
      worstTrade: 400,
    },
    "2024-07-18": {
      date: "2024-07-18",
      profit: 365,
      trades: 4,
      winRate: 75,
      rMultiple: 1.83,
      avgTradeSize: 5000,
      maxDrawdown: 120,
      sharpeRatio: 1.8,
      tradingSession: "morning",
      instruments: ["EURUSD"],
      avgTradeDuration: 45,
      volatility: 0.8,
      winCount: 1,
      lossCount: 0,
      riskPerTrade: 200,
      volume: 1.5,
      commissions: 12,
      bestTrade: 400,
      worstTrade: 400,
    },
    "2024-07-19": {
      date: "2024-07-19",
      profit: 400,
      trades: 1,
      winRate: 100,
      rMultiple: 2,
      avgTradeSize: 5000,
      maxDrawdown: 120,
      sharpeRatio: 1.8,
      tradingSession: "morning",
      instruments: ["EURUSD"],
      avgTradeDuration: 45,
      volatility: 0.8,
      winCount: 1,
      lossCount: 0,
      riskPerTrade: 200,
      volume: 1.5,
      commissions: 12,
      bestTrade: 400,
      worstTrade: 400,
    },
    "2024-07-22": {
      date: "2024-07-22",
      profit: 400,
      trades: 1,
      winRate: 100,
      rMultiple: 2,
      avgTradeSize: 5000,
      maxDrawdown: 120,
      sharpeRatio: 1.8,
      tradingSession: "morning",
      instruments: ["EURUSD"],
      avgTradeDuration: 45,
      volatility: 0.8,
      winCount: 1,
      lossCount: 0,
      riskPerTrade: 200,
      volume: 1.5,
      commissions: 12,
      bestTrade: 400,
      worstTrade: 400,
    },
    "2024-07-23": {
      date: "2024-07-23",
      profit: 500,
      trades: 1,
      winRate: 100,
      rMultiple: 2.5,
      avgTradeSize: 5000,
      maxDrawdown: 120,
      sharpeRatio: 1.8,
      tradingSession: "morning",
      instruments: ["EURUSD"],
      avgTradeDuration: 45,
      volatility: 0.8,
      winCount: 1,
      lossCount: 0,
      riskPerTrade: 200,
      volume: 1.5,
      commissions: 12,
      bestTrade: 400,
      worstTrade: 400,
    },
    "2024-07-24": {
      date: "2024-07-24",
      profit: 400,
      trades: 1,
      winRate: 100,
      rMultiple: 2,
      avgTradeSize: 5000,
      maxDrawdown: 120,
      sharpeRatio: 1.8,
      tradingSession: "morning",
      instruments: ["EURUSD"],
      avgTradeDuration: 45,
      volatility: 0.8,
      winCount: 1,
      lossCount: 0,
      riskPerTrade: 200,
      volume: 1.5,
      commissions: 12,
      bestTrade: 400,
      worstTrade: 400,
    },
    "2024-07-25": {
      date: "2024-07-25",
      profit: 410,
      trades: 1,
      winRate: 100,
      rMultiple: 2.05,
      avgTradeSize: 5000,
      maxDrawdown: 120,
      sharpeRatio: 1.8,
      tradingSession: "morning",
      instruments: ["EURUSD"],
      avgTradeDuration: 45,
      volatility: 0.8,
      winCount: 1,
      lossCount: 0,
      riskPerTrade: 200,
      volume: 1.5,
      commissions: 12,
      bestTrade: 400,
      worstTrade: 400,
    },
    "2024-07-26": {
      date: "2024-07-26",
      profit: 400,
      trades: 1,
      winRate: 100,
      rMultiple: 2,
      avgTradeSize: 5000,
      maxDrawdown: 120,
      sharpeRatio: 1.8,
      tradingSession: "morning",
      instruments: ["EURUSD"],
      avgTradeDuration: 45,
      volatility: 0.8,
      winCount: 1,
      lossCount: 0,
      riskPerTrade: 200,
      volume: 1.5,
      commissions: 12,
      bestTrade: 400,
      worstTrade: 400,
    },
  }

  // Get data for a specific day
  const getDayData = (day: number) => {
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return mockDailyData[dateStr]
  }

  // Calculate weekly performance
  const calculateWeeklyPerformance = (): WeeklyPerformance[] => {
    const weeks: Record<number, WeeklyPerformance> = {}
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()

    // For each day in the month
    for (let day = 1; day <= new Date(year, month + 1, 0).getDate(); day++) {
      const date = new Date(year, month, day)
      const weekNumber = Math.ceil((day + new Date(year, month, 1).getDay()) / 7)

      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
      const dayData = mockDailyData[dateStr]

      if (!weeks[weekNumber]) {
        weeks[weekNumber] = {
          weekNumber,
          totalProfit: 0,
          tradedDays: 0,
        }
      }

      if (dayData) {
        weeks[weekNumber].totalProfit += dayData.profit
        weeks[weekNumber].tradedDays += 1
      }
    }

    return Object.values(weeks)
  }

  // Calculate monthly performance
  const calculateMonthlyPerformance = (): MonthlyPerformance => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    let totalProfit = 0
    let tradedDays = 0

    // For each day in the month
    for (let day = 1; day <= new Date(year, month + 1, 0).getDate(); day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
      const dayData = mockDailyData[dateStr]

      if (dayData) {
        totalProfit += dayData.profit
        tradedDays += 1
      }
    }

    return { totalProfit, tradedDays }
  }

  // Add a function to handle day click
  const handleDayClick = (day: number) => {
    if (!day) return

    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    const dayData = mockDailyData[dateStr]

    if (dayData) {
      setSelectedDay(dateStr)
    }
  }

  const weeklyPerformance = calculateWeeklyPerformance()
  const monthlyPerformance = calculateMonthlyPerformance()
  const calendarDays = generateCalendarDays()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={goToToday}>
            TODAY
          </Button>
          <Button variant="outline" size="sm" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-bold">{getMonthName(currentMonth)}</h2>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Monthly stats:</span>
            <Badge variant="outline" className="bg-green-500/10 text-green-500">
              ${monthlyPerformance.totalProfit.toLocaleString()}
            </Badge>
            <span className="text-sm">{monthlyPerformance.tradedDays} days</span>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant={view === "calendar" ? "default" : "outline"} size="sm" onClick={() => setView("calendar")}>
              Calendar
            </Button>
            <Button variant={view === "summary" ? "default" : "outline"} size="sm" onClick={() => setView("summary")}>
              Summary
            </Button>
          </div>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View your daily trading performance</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="p-2">
                <p className="font-medium mb-2">Display stats</p>
                <DropdownMenuCheckboxItem
                  checked={displayOptions.rMultiple}
                  onCheckedChange={(checked) => setDisplayOptions({ ...displayOptions, rMultiple: !!checked })}
                >
                  R Multiple
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={displayOptions.dailyPL}
                  onCheckedChange={(checked) => setDisplayOptions({ ...displayOptions, dailyPL: !!checked })}
                >
                  Daily P/L
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={displayOptions.numberOfTrades}
                  onCheckedChange={(checked) => setDisplayOptions({ ...displayOptions, numberOfTrades: !!checked })}
                >
                  Number of trades
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={displayOptions.winRate}
                  onCheckedChange={(checked) => setDisplayOptions({ ...displayOptions, winRate: !!checked })}
                >
                  Day Winrate
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={displayOptions.avgTradeSize}
                  onCheckedChange={(checked) => setDisplayOptions({ ...displayOptions, avgTradeSize: !!checked })}
                >
                  Avg Trade Size
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={displayOptions.maxDrawdown}
                  onCheckedChange={(checked) => setDisplayOptions({ ...displayOptions, maxDrawdown: !!checked })}
                >
                  Max Drawdown
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={displayOptions.tradingSession}
                  onCheckedChange={(checked) => setDisplayOptions({ ...displayOptions, tradingSession: !!checked })}
                >
                  Trading Session
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={displayOptions.instruments}
                  onCheckedChange={(checked) => setDisplayOptions({ ...displayOptions, instruments: !!checked })}
                >
                  Instruments
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={displayOptions.tradeDuration}
                  onCheckedChange={(checked) => setDisplayOptions({ ...displayOptions, tradeDuration: !!checked })}
                >
                  Avg Trade Duration
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={displayOptions.bestWorstTrade}
                  onCheckedChange={(checked) => setDisplayOptions({ ...displayOptions, bestWorstTrade: !!checked })}
                >
                  Best/Worst Trade
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={displayOptions.volume}
                  onCheckedChange={(checked) => setDisplayOptions({ ...displayOptions, volume: !!checked })}
                >
                  Volume
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={displayOptions.commissions}
                  onCheckedChange={(checked) => setDisplayOptions({ ...displayOptions, commissions: !!checked })}
                >
                  Commissions
                </DropdownMenuCheckboxItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {view === "calendar" ? (
        <>
          <div className="grid grid-cols-7 gap-1">
            {/* Day headers */}
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="p-2 text-center font-medium">
                {day}
              </div>
            ))}

            {/* Calendar days */}
            {calendarDays.map((day, index) => {
              if (day === null) {
                return <div key={`empty-${index}`} className="aspect-square p-2 bg-muted/20 rounded-md"></div>
              }

              const dayData = getDayData(day)
              const hasData = !!dayData
              const isProfit = hasData && dayData.profit > 0
              const isLoss = hasData && dayData.profit < 0

              return (
                <div
                  key={`day-${day}`}
                  className={cn(
                    "aspect-square p-2 rounded-md flex flex-col cursor-pointer hover:opacity-90 transition-opacity",
                    hasData ? (isProfit ? "bg-green-950 text-green-50" : "bg-red-950 text-red-50") : "bg-muted/20",
                  )}
                  onClick={() => handleDayClick(day)}
                >
                  <div className="text-right font-medium">{day}</div>
                  {hasData && (
                    <div className="flex flex-col justify-center items-center flex-grow text-center">
                      {displayOptions.dailyPL && (
                        <div className={cn("text-lg font-bold", isProfit ? "text-green-400" : "text-red-400")}>
                          {isProfit ? "$" : "-$"}
                          {Math.abs(dayData.profit).toLocaleString()}
                        </div>
                      )}

                      {displayOptions.numberOfTrades && (
                        <div className="text-sm">
                          {dayData.trades} {dayData.trades === 1 ? "trade" : "trades"}
                        </div>
                      )}

                      {displayOptions.rMultiple && displayOptions.winRate && (
                        <div className="text-xs mt-1">
                          {dayData.rMultiple?.toFixed(2)}R, {dayData.winRate}%
                        </div>
                      )}

                      {displayOptions.avgTradeSize && dayData.avgTradeSize && (
                        <div className="text-xs mt-1">Avg: ${dayData.avgTradeSize.toLocaleString()}</div>
                      )}

                      {displayOptions.maxDrawdown && dayData.maxDrawdown && (
                        <div className="text-xs mt-1">DD: ${dayData.maxDrawdown.toLocaleString()}</div>
                      )}

                      {displayOptions.tradingSession && dayData.tradingSession && (
                        <div className="text-xs mt-1">
                          {dayData.tradingSession === "morning"
                            ? "🌅"
                            : dayData.tradingSession === "afternoon"
                              ? "☀️"
                              : dayData.tradingSession === "evening"
                                ? "🌙"
                                : "⏱️"}
                        </div>
                      )}

                      {displayOptions.instruments && dayData.instruments && dayData.instruments.length > 0 && (
                        <div className="text-xs mt-1">
                          {dayData.instruments.length > 1
                            ? `${dayData.instruments.length} pairs`
                            : dayData.instruments[0]}
                        </div>
                      )}

                      {displayOptions.tradeDuration && dayData.avgTradeDuration && (
                        <div className="text-xs mt-1">{dayData.avgTradeDuration} min</div>
                      )}

                      {displayOptions.bestWorstTrade && dayData.bestTrade && dayData.worstTrade && (
                        <div className="text-xs mt-1">
                          B: ${dayData.bestTrade} / W: ${dayData.worstTrade}
                        </div>
                      )}

                      {displayOptions.volume && dayData.volume && (
                        <div className="text-xs mt-1">Vol: {dayData.volume} lots</div>
                      )}

                      {displayOptions.commissions && dayData.commissions && (
                        <div className="text-xs mt-1">Com: ${dayData.commissions}</div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Weekly performance */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-6">
            {weeklyPerformance.map((week) => (
              <Card key={`week-${week.weekNumber}`} className="bg-muted/10">
                <CardContent className="p-4">
                  <div className="text-sm font-medium mb-1">Week {week.weekNumber}</div>
                  <div className={cn("text-lg font-bold", week.totalProfit >= 0 ? "text-green-500" : "text-red-500")}>
                    ${week.totalProfit.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">{week.tradedDays} days</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Add the detailed metrics view when a day is selected */}
          {selectedDay && mockDailyData[selectedDay] && (
            <div className="mt-8">
              <DailyMetricsDetail date={selectedDay} data={mockDailyData[selectedDay]} />
            </div>
          )}
        </>
      ) : (
        <MonthlyMetricsSummary
          month={currentMonth}
          data={Object.values(mockDailyData).filter((day) => {
            const dayDate = new Date(day.date)
            return (
              dayDate.getMonth() === currentMonth.getMonth() && dayDate.getFullYear() === currentMonth.getFullYear()
            )
          })}
        />
      )}
    </div>
  )
}

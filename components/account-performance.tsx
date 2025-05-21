"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Trade } from "@/lib/trading-types"
import { formatCurrency } from "@/lib/utils"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

interface AccountPerformanceProps {
  accountId: string
  trades: Trade[]
}

export default function AccountPerformance({ accountId, trades }: AccountPerformanceProps) {
  // Calculate performance metrics
  const closedTrades = trades.filter((trade) => trade.status === "closed")

  const totalTrades = closedTrades.length
  const winningTrades = closedTrades.filter((trade) => (trade.profit || 0) > 0).length
  const losingTrades = closedTrades.filter((trade) => (trade.profit || 0) < 0).length

  const winRate = totalTrades > 0 ? (winningTrades / totalTrades) * 100 : 0

  const totalProfit = closedTrades.reduce((sum, trade) => sum + (trade.profit || 0), 0)

  const grossProfit = closedTrades
    .filter((trade) => (trade.profit || 0) > 0)
    .reduce((sum, trade) => sum + (trade.profit || 0), 0)

  const grossLoss = closedTrades
    .filter((trade) => (trade.profit || 0) < 0)
    .reduce((sum, trade) => sum + (trade.profit || 0), 0)

  const profitFactor =
    grossLoss !== 0 ? Math.abs(grossProfit / grossLoss) : grossProfit > 0 ? Number.POSITIVE_INFINITY : 0

  const averageWin =
    winningTrades > 0
      ? closedTrades.filter((trade) => (trade.profit || 0) > 0).reduce((sum, trade) => sum + (trade.profit || 0), 0) /
        winningTrades
      : 0

  const averageLoss =
    losingTrades > 0
      ? closedTrades.filter((trade) => (trade.profit || 0) < 0).reduce((sum, trade) => sum + (trade.profit || 0), 0) /
        losingTrades
      : 0

  const largestWin = closedTrades.length > 0 ? Math.max(...closedTrades.map((trade) => trade.profit || 0)) : 0

  const largestLoss = closedTrades.length > 0 ? Math.min(...closedTrades.map((trade) => trade.profit || 0)) : 0

  // Prepare chart data
  const monthlyPerformance = closedTrades.reduce((acc: any, trade) => {
    if (!trade.closeDate) return acc

    const date = new Date(trade.closeDate)
    const month = date.toLocaleString("default", { month: "short" })
    const year = date.getFullYear()
    const key = `${month} ${year}`

    if (!acc[key]) {
      acc[key] = { month: key, profit: 0, trades: 0 }
    }

    acc[key].profit += trade.profit || 0
    acc[key].trades += 1

    return acc
  }, {})

  const monthlyData = Object.values(monthlyPerformance)

  // Prepare pie chart data
  const pieData = [
    { name: "Winning Trades", value: winningTrades },
    { name: "Losing Trades", value: losingTrades },
  ]

  const COLORS = ["#10b981", "#ef4444"]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total P/L</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totalProfit >= 0 ? "text-green-600" : "text-red-600"}`}>
              {formatCurrency(totalProfit)}
            </div>
            <p className="text-xs text-muted-foreground">From {totalTrades} closed trades</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{winRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              {winningTrades} wins, {losingTrades} losses
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Profit Factor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {profitFactor === Number.POSITIVE_INFINITY ? "∞" : profitFactor.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">Gross profit / Gross loss</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Trade</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totalProfit / totalTrades >= 0 ? "text-green-600" : "text-red-600"}`}>
              {totalTrades > 0 ? formatCurrency(totalProfit / totalTrades) : "$0.00"}
            </div>
            <p className="text-xs text-muted-foreground">Per closed trade</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Monthly Performance</CardTitle>
            <CardDescription>Profit/loss by month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              {monthlyData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      formatter={(value: number) => [`${formatCurrency(value)}`, "Profit/Loss"]}
                      labelFormatter={(label) => `Month: ${label}`}
                    />
                    <Bar
                      dataKey="profit"
                      fill="#10b981"
                      name="Profit/Loss"
                      // @ts-ignore - recharts types are incorrect
                      fill={(entry: any) => (entry.profit >= 0 ? "#10b981" : "#ef4444")}
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="text-muted-foreground">Not enough data to display chart</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Win/Loss Ratio</CardTitle>
            <CardDescription>Distribution of trades</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              {totalTrades > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => [value, "Trades"]} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="text-muted-foreground">Not enough data to display chart</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Profit Metrics</CardTitle>
            <CardDescription>Key performance indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Gross Profit</p>
                  <p className="text-lg font-medium text-green-600">{formatCurrency(grossProfit)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Gross Loss</p>
                  <p className="text-lg font-medium text-red-600">{formatCurrency(grossLoss)}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Average Win</p>
                  <p className="text-lg font-medium text-green-600">{formatCurrency(averageWin)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Average Loss</p>
                  <p className="text-lg font-medium text-red-600">{formatCurrency(averageLoss)}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Largest Win</p>
                  <p className="text-lg font-medium text-green-600">{formatCurrency(largestWin)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Largest Loss</p>
                  <p className="text-lg font-medium text-red-600">{formatCurrency(largestLoss)}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Trade Statistics</CardTitle>
            <CardDescription>Analysis of your trading activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Trades</p>
                <p className="text-lg font-medium">{totalTrades}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Winning Trades</p>
                  <p className="text-lg font-medium">
                    {winningTrades} ({winRate.toFixed(1)}%)
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Losing Trades</p>
                  <p className="text-lg font-medium">
                    {losingTrades} ({(100 - winRate).toFixed(1)}%)
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Risk-Reward Ratio</p>
                <p className="text-lg font-medium">
                  {averageLoss !== 0 ? Math.abs(averageWin / averageLoss).toFixed(2) : "N/A"}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Expectancy</p>
                <p className="text-lg font-medium">
                  {formatCurrency((winRate / 100) * averageWin + ((100 - winRate) / 100) * averageLoss)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

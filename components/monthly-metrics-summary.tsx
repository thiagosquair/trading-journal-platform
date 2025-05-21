import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"

interface MonthlyMetricsSummaryProps {
  month: Date
  data: any[] // Array of daily performance data
}

export default function MonthlyMetricsSummary({ month, data }: MonthlyMetricsSummaryProps) {
  // Calculate monthly metrics
  const totalProfit = data.reduce((sum, day) => sum + day.profit, 0)
  const totalTrades = data.reduce((sum, day) => sum + day.trades, 0)
  const tradingDays = data.length
  const profitableDays = data.filter((day) => day.profit > 0).length
  const unprofitableDays = data.filter((day) => day.profit < 0).length
  const winRate = tradingDays > 0 ? (profitableDays / tradingDays) * 100 : 0

  // Calculate average metrics
  const avgDailyProfit = tradingDays > 0 ? totalProfit / tradingDays : 0
  const avgTradesPerDay = tradingDays > 0 ? totalTrades / tradingDays : 0

  // Prepare data for charts
  const profitByDay = data.map((day) => ({
    date: new Date(day.date).getDate(),
    profit: day.profit,
  }))

  const profitByDayOfWeek = [
    { name: "Mon", profit: 0, trades: 0 },
    { name: "Tue", profit: 0, trades: 0 },
    { name: "Wed", profit: 0, trades: 0 },
    { name: "Thu", profit: 0, trades: 0 },
    { name: "Fri", profit: 0, trades: 0 },
  ]

  // Calculate profit by day of week
  data.forEach((day) => {
    const date = new Date(day.date)
    const dayOfWeek = date.getDay() - 1 // 0 = Monday, 4 = Friday
    if (dayOfWeek >= 0 && dayOfWeek <= 4) {
      profitByDayOfWeek[dayOfWeek].profit += day.profit
      profitByDayOfWeek[dayOfWeek].trades += day.trades
    }
  })

  // Prepare data for win/loss pie chart
  const winLossData = [
    { name: "Profitable Days", value: profitableDays },
    { name: "Unprofitable Days", value: unprofitableDays },
  ]

  const COLORS = ["#4CAF50", "#F44336"]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground">Total Profit/Loss</div>
            <div className={`text-2xl font-bold ${totalProfit >= 0 ? "text-green-500" : "text-red-500"}`}>
              ${totalProfit.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground">Trading Days</div>
            <div className="text-2xl font-bold">{tradingDays}</div>
            <div className="text-xs text-muted-foreground">
              {profitableDays} profitable, {unprofitableDays} unprofitable
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground">Win Rate</div>
            <div className="text-2xl font-bold">{winRate.toFixed(1)}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground">Total Trades</div>
            <div className="text-2xl font-bold">{totalTrades}</div>
            <div className="text-xs text-muted-foreground">Avg {avgTradesPerDay.toFixed(1)} per day</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Daily Profit/Loss</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={profitByDay}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${value}`} />
                  <Bar
                    dataKey="profit"
                    fill="#8884d8"
                    name="Profit/Loss"
                    isAnimationActive={false}
                    // Color bars based on profit/loss
                    fill={(entry) => (entry.profit >= 0 ? "#4CAF50" : "#F44336")}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance by Day of Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={profitByDayOfWeek}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${value}`} />
                  <Bar
                    dataKey="profit"
                    name="Profit/Loss"
                    isAnimationActive={false}
                    // Color bars based on profit/loss
                    fill={(entry) => (entry.profit >= 0 ? "#4CAF50" : "#F44336")}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Profitable vs Unprofitable Days</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={winLossData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {winLossData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cumulative Profit/Loss</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={profitByDay.reduce((acc, day, index) => {
                    const prevValue = index > 0 ? acc[index - 1].cumulative : 0
                    return [
                      ...acc,
                      {
                        date: day.date,
                        cumulative: prevValue + day.profit,
                      },
                    ]
                  }, [])}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${value}`} />
                  <Line
                    type="monotone"
                    dataKey="cumulative"
                    stroke="#8884d8"
                    name="Cumulative P/L"
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

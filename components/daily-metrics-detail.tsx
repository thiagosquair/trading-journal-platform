import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { formatCurrency } from "@/lib/utils"

interface DailyMetricsDetailProps {
  date: string
  data: any // Using any for simplicity, but should match the DailyPerformance interface
}

export default function DailyMetricsDetail({ date, data }: DailyMetricsDetailProps) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Sample trade data for the selected day
  const trades = [
    { id: 1, time: "09:30", instrument: "EURUSD", direction: "long", profit: 240, duration: 45, rr: 2.4 },
    { id: 2, time: "11:15", instrument: "GBPUSD", direction: "short", profit: 160, duration: 30, rr: 1.6 },
    { id: 3, time: "14:45", instrument: "USDJPY", direction: "long", profit: -120, duration: 25, rr: -1.2 },
    { id: 4, time: "16:30", instrument: "AUDUSD", direction: "short", profit: 180, duration: 40, rr: 1.8 },
  ]

  // Prepare data for charts
  const profitByInstrument = [
    { name: "EURUSD", value: 240 },
    { name: "GBPUSD", value: 160 },
    { name: "USDJPY", value: -120 },
    { name: "AUDUSD", value: 180 },
  ]

  const profitByTimeOfDay = [
    { name: "09:00", profit: 0 },
    { name: "10:00", profit: 240 },
    { name: "11:00", profit: 0 },
    { name: "12:00", profit: 160 },
    { name: "13:00", profit: 0 },
    { name: "14:00", profit: 0 },
    { name: "15:00", profit: -120 },
    { name: "16:00", profit: 0 },
    { name: "17:00", profit: 180 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Trading Day: {formattedDate}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-muted/20 p-4 rounded-lg">
            <div className="text-sm text-muted-foreground">Net Profit/Loss</div>
            <div className={`text-2xl font-bold ${data.profit >= 0 ? "text-green-500" : "text-red-500"}`}>
              {formatCurrency(data.profit)}
            </div>
          </div>
          <div className="bg-muted/20 p-4 rounded-lg">
            <div className="text-sm text-muted-foreground">Win Rate</div>
            <div className="text-2xl font-bold">{data.winRate}%</div>
            <div className="text-xs text-muted-foreground">
              {data.winCount} wins, {data.lossCount} losses
            </div>
          </div>
          <div className="bg-muted/20 p-4 rounded-lg">
            <div className="text-sm text-muted-foreground">R-Multiple</div>
            <div className={`text-2xl font-bold ${data.rMultiple >= 0 ? "text-green-500" : "text-red-500"}`}>
              {data.rMultiple.toFixed(2)}R
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Profit by Instrument</h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={profitByInstrument}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {profitByInstrument.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value as number)} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Profit by Time of Day</h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={profitByTimeOfDay}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(value as number)} />
                  <Line type="monotone" dataKey="profit" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Trades</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4">Time</th>
                  <th className="text-left py-2 px-4">Instrument</th>
                  <th className="text-left py-2 px-4">Direction</th>
                  <th className="text-right py-2 px-4">Profit/Loss</th>
                  <th className="text-right py-2 px-4">Duration</th>
                  <th className="text-right py-2 px-4">R:R</th>
                </tr>
              </thead>
              <tbody>
                {trades.map((trade) => (
                  <tr key={trade.id} className="border-b hover:bg-muted/10">
                    <td className="py-2 px-4">{trade.time}</td>
                    <td className="py-2 px-4">{trade.instrument}</td>
                    <td className="py-2 px-4">
                      <Badge variant={trade.direction === "long" ? "default" : "secondary"}>{trade.direction}</Badge>
                    </td>
                    <td className={`py-2 px-4 text-right ${trade.profit >= 0 ? "text-green-500" : "text-red-500"}`}>
                      {formatCurrency(trade.profit)}
                    </td>
                    <td className="py-2 px-4 text-right">{trade.duration} min</td>
                    <td className="py-2 px-4 text-right">{trade.rr}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="font-medium">
                  <td colSpan={3} className="py-2 px-4 text-right">
                    Total:
                  </td>
                  <td className={`py-2 px-4 text-right ${data.profit >= 0 ? "text-green-500" : "text-red-500"}`}>
                    {formatCurrency(data.profit)}
                  </td>
                  <td colSpan={2}></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-muted/20 p-4 rounded-lg">
            <h3 className="text-md font-medium mb-2">Trading Metrics</h3>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="text-xs text-muted-foreground">Avg Trade Size</div>
                <div className="text-sm font-medium">{formatCurrency(data.avgTradeSize || 0)}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Max Drawdown</div>
                <div className="text-sm font-medium">{formatCurrency(data.maxDrawdown || 0)}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Sharpe Ratio</div>
                <div className="text-sm font-medium">{data.sharpeRatio?.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Avg Trade Duration</div>
                <div className="text-sm font-medium">{data.avgTradeDuration} min</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Volume</div>
                <div className="text-sm font-medium">{data.volume} lots</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Commissions</div>
                <div className="text-sm font-medium">{formatCurrency(data.commissions || 0)}</div>
              </div>
            </div>
          </div>
          <div className="bg-muted/20 p-4 rounded-lg">
            <h3 className="text-md font-medium mb-2">Best & Worst</h3>
            <div className="space-y-2">
              <div>
                <div className="text-xs text-muted-foreground">Best Trade</div>
                <div className="text-sm font-medium text-green-500">{formatCurrency(data.bestTrade || 0)}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Worst Trade</div>
                <div className="text-sm font-medium text-red-500">{formatCurrency(data.worstTrade || 0)}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Trading Session</div>
                <div className="text-sm font-medium">
                  {data.tradingSession === "morning"
                    ? "Morning"
                    : data.tradingSession === "afternoon"
                      ? "Afternoon"
                      : data.tradingSession === "evening"
                        ? "Evening"
                        : "Multiple Sessions"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

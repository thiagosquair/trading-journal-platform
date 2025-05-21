"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, TrendingUp, Calendar, PiggyBank, DollarSign, LineChart } from "lucide-react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js"
import { Line, Bar } from "react-chartjs-2"

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend)

interface ProjectionResultsProps {
  data: any
}

export function ProjectionResults({ data }: ProjectionResultsProps) {
  const [timeframe, setTimeframe] = useState("3month")
  const [chartView, setChartView] = useState("profit")

  if (!data) return null

  const { inputs, monthlyData, summary } = data
  const isFundedAccount = data.type === "funded"

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  // Format percentage
  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`
  }

  // Get summary data based on selected timeframe
  const getSummaryData = () => {
    switch (timeframe) {
      case "3month":
        return summary.threeMonth
      case "6month":
        return summary.sixMonth
      case "12month":
        return summary.twelveMonth
      default:
        return summary.threeMonth
    }
  }

  const summaryData = getSummaryData()

  // Prepare chart data
  const getChartData = () => {
    const months = monthlyData.map((d: any) => `Month ${d.month}`)
    const monthsForTimeframe = months.slice(0, timeframe === "3month" ? 3 : timeframe === "6month" ? 6 : 12)

    if (chartView === "profit") {
      return {
        labels: monthsForTimeframe,
        datasets: [
          {
            label: "Monthly Profit",
            data: monthlyData
              .slice(0, timeframe === "3month" ? 3 : timeframe === "6month" ? 6 : 12)
              .map((d: any) => (isFundedAccount ? d.netProfit : d.monthlyProfit)),
            borderColor: "rgb(34, 197, 94)",
            backgroundColor: "rgba(34, 197, 94, 0.5)",
          },
          {
            label: "Cumulative Profit",
            data: monthlyData
              .slice(0, timeframe === "3month" ? 3 : timeframe === "6month" ? 6 : 12)
              .map((d: any) => d.cumulativeProfit),
            borderColor: "rgb(59, 130, 246)",
            backgroundColor: "rgba(59, 130, 246, 0.5)",
            type: "line" as const,
          },
        ],
      }
    } else if (chartView === "cashflow") {
      return {
        labels: monthsForTimeframe,
        datasets: [
          {
            label: "Net Cashflow",
            data: monthlyData
              .slice(0, timeframe === "3month" ? 3 : timeframe === "6month" ? 6 : 12)
              .map((d: any) => (isFundedAccount ? d.cashflow : d.netCashflow)),
            borderColor: "rgb(34, 197, 94)",
            backgroundColor: "rgba(34, 197, 94, 0.5)",
          },
        ],
      }
    } else {
      // Capital growth chart (for personal capital only)
      return {
        labels: monthsForTimeframe,
        datasets: [
          {
            label: "Capital Growth",
            data: monthlyData
              .slice(0, timeframe === "3month" ? 3 : timeframe === "6month" ? 6 : 12)
              .map((d: any) =>
                isFundedAccount ? d.accountSizes.reduce((sum: number, size: number) => sum + size, 0) : d.capital,
              ),
            borderColor: "rgb(59, 130, 246)",
            backgroundColor: "rgba(59, 130, 246, 0.5)",
          },
        ],
      }
    }
  }

  const chartOptions: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text:
          chartView === "profit"
            ? "Profit Projection"
            : chartView === "cashflow"
              ? "Cashflow Projection"
              : "Capital Growth Projection",
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (value) => formatCurrency(value as number),
        },
      },
    },
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Projection Results</h2>
        <p className="text-muted-foreground">
          {isFundedAccount
            ? "Projected earnings from your funded trading accounts"
            : "Projected growth of your personal trading capital"}
        </p>
      </div>

      <Tabs value={timeframe} onValueChange={setTimeframe} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="3month" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>3 Months</span>
          </TabsTrigger>
          <TabsTrigger value="6month" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>6 Months</span>
          </TabsTrigger>
          <TabsTrigger value="12month" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>12 Months</span>
          </TabsTrigger>
        </TabsList>

        {["3month", "6month", "12month"].map((period) => (
          <TabsContent key={period} value={period} className="pt-4 space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatCurrency(isFundedAccount ? summaryData.totalProfit : summaryData.totalProfit)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Avg. {formatCurrency(summaryData.averageMonthly)}/month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {isFundedAccount ? "Net Cashflow" : "Final Capital"}
                  </CardTitle>
                  <PiggyBank className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatCurrency(isFundedAccount ? summaryData.netCashflow : summaryData.finalCapital)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {isFundedAccount
                      ? `After expenses: ${formatCurrency(summaryData.totalExpenses)}`
                      : `Initial: ${formatCurrency(inputs.initialCapital)}`}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {isFundedAccount ? "Reinvestment" : "Contributions"}
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatCurrency(isFundedAccount ? summaryData.totalReinvestment : summaryData.totalContributions)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {isFundedAccount
                      ? inputs.reinvestProfits
                        ? `${inputs.reinvestmentRate}% of profits`
                        : "No reinvestment"
                      : `${formatCurrency(inputs.monthlyContribution)}/month`}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{isFundedAccount ? "Account Growth" : "ROI"}</CardTitle>
                  <LineChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {isFundedAccount
                      ? formatCurrency(
                          summaryData.finalAccountSizes.reduce((sum: number, size: number) => sum + size, 0) -
                            inputs.accounts.reduce((sum: any, account: any) => sum + account.accountSize, 0),
                        )
                      : formatPercentage(summaryData.roi)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {isFundedAccount
                      ? `From ${formatCurrency(
                          inputs.accounts.reduce((sum: any, account: any) => sum + account.accountSize, 0),
                        )} initial`
                      : `${formatCurrency(summaryData.cumulativeProfit)} profit`}
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Projection Chart</CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => setChartView("profit")}>
                      Profit
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setChartView("cashflow")}>
                      Cashflow
                    </Button>
                    {!isFundedAccount && (
                      <Button variant="outline" size="sm" onClick={() => setChartView("capital")}>
                        Capital
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardDescription>
                  {chartView === "profit"
                    ? "Monthly and cumulative profit projections"
                    : chartView === "cashflow"
                      ? "Net cashflow after expenses and reinvestment"
                      : "Growth of your trading capital over time"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  {chartView === "profit" ? (
                    <Bar options={chartOptions} data={getChartData()} />
                  ) : (
                    <Line options={chartOptions} data={getChartData()} />
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Detailed Projection</CardTitle>
                <CardDescription>Month-by-month breakdown of your projection</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-muted/50 font-medium">
                          <th className="h-10 px-4 text-left">Month</th>
                          {isFundedAccount ? (
                            <>
                              <th className="h-10 px-4 text-right">Account Size</th>
                              <th className="h-10 px-4 text-right">Gross Profit</th>
                              <th className="h-10 px-4 text-right">Your Profit</th>
                              <th className="h-10 px-4 text-right">Reinvestment</th>
                              <th className="h-10 px-4 text-right">Expenses</th>
                              <th className="h-10 px-4 text-right">Cashflow</th>
                              <th className="h-10 px-4 text-right">Cumulative</th>
                            </>
                          ) : (
                            <>
                              <th className="h-10 px-4 text-right">Capital</th>
                              <th className="h-10 px-4 text-right">Profit</th>
                              <th className="h-10 px-4 text-right">Contribution</th>
                              <th className="h-10 px-4 text-right">Withdrawal</th>
                              <th className="h-10 px-4 text-right">Expenses</th>
                              <th className="h-10 px-4 text-right">Net Cashflow</th>
                              <th className="h-10 px-4 text-right">Cumulative</th>
                            </>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {monthlyData
                          .slice(0, timeframe === "3month" ? 3 : timeframe === "6month" ? 6 : 12)
                          .map((month: any, index: number) => (
                            <tr key={index} className="border-b">
                              <td className="p-2 px-4 align-middle font-medium">Month {month.month}</td>
                              {isFundedAccount ? (
                                <>
                                  <td className="p-2 px-4 align-middle text-right">
                                    {formatCurrency(
                                      month.accountSizes.reduce((sum: number, size: number) => sum + size, 0),
                                    )}
                                  </td>
                                  <td className="p-2 px-4 align-middle text-right">
                                    {formatCurrency(month.grossProfit)}
                                  </td>
                                  <td className="p-2 px-4 align-middle text-right">
                                    {formatCurrency(month.netProfit)}
                                  </td>
                                  <td className="p-2 px-4 align-middle text-right">
                                    {formatCurrency(month.reinvestment)}
                                  </td>
                                  <td className="p-2 px-4 align-middle text-right">{formatCurrency(month.expenses)}</td>
                                  <td className="p-2 px-4 align-middle text-right">{formatCurrency(month.cashflow)}</td>
                                  <td className="p-2 px-4 align-middle text-right">
                                    {formatCurrency(month.cumulativeProfit)}
                                  </td>
                                </>
                              ) : (
                                <>
                                  <td className="p-2 px-4 align-middle text-right">{formatCurrency(month.capital)}</td>
                                  <td className="p-2 px-4 align-middle text-right">
                                    {formatCurrency(month.monthlyProfit)}
                                  </td>
                                  <td className="p-2 px-4 align-middle text-right">
                                    {formatCurrency(month.contribution)}
                                  </td>
                                  <td className="p-2 px-4 align-middle text-right">
                                    {formatCurrency(month.withdrawal)}
                                  </td>
                                  <td className="p-2 px-4 align-middle text-right">{formatCurrency(month.expenses)}</td>
                                  <td className="p-2 px-4 align-middle text-right">
                                    {formatCurrency(month.netCashflow)}
                                  </td>
                                  <td className="p-2 px-4 align-middle text-right">
                                    {formatCurrency(month.cumulativeProfit)}
                                  </td>
                                </>
                              )}
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

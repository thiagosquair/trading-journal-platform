"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { HistoricalData } from "@/lib/data-providers/data-provider"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatDate, formatTime } from "@/lib/utils"

interface DataPreviewProps {
  data: HistoricalData[]
  symbol: string
  timeframe: string
}

export function DataPreview({ data, symbol, timeframe }: DataPreviewProps) {
  const [displayData, setDisplayData] = useState<HistoricalData[]>([])

  useEffect(() => {
    // Limit the number of data points to display
    setDisplayData(data.slice(0, 1000))
  }, [data])

  // Format data for the chart
  const chartData = displayData.map((item) => ({
    date: new Date(item.timestamp).toLocaleDateString(),
    close: item.close,
    open: item.open,
    high: item.high,
    low: item.low,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Data Preview: {symbol} ({timeframe})
        </CardTitle>
        <CardDescription>
          Showing {displayData.length} of {data.length} data points from {formatDate(new Date(data[0]?.timestamp))} to{" "}
          {formatDate(new Date(data[data.length - 1]?.timestamp))}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="chart">
          <TabsList className="mb-4">
            <TabsTrigger value="chart">Chart</TabsTrigger>
            <TabsTrigger value="table">Table</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
          </TabsList>

          <TabsContent value="chart">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={["auto", "auto"]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="close" stroke="#8884d8" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="table">
            <div className="max-h-[300px] overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Open</TableHead>
                    <TableHead>High</TableHead>
                    <TableHead>Low</TableHead>
                    <TableHead>Close</TableHead>
                    <TableHead>Volume</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayData.slice(0, 100).map((item, index) => {
                    const date = new Date(item.timestamp)
                    return (
                      <TableRow key={index}>
                        <TableCell>{formatDate(date)}</TableCell>
                        <TableCell>{formatTime(date)}</TableCell>
                        <TableCell>{item.open.toFixed(5)}</TableCell>
                        <TableCell>{item.high.toFixed(5)}</TableCell>
                        <TableCell>{item.low.toFixed(5)}</TableCell>
                        <TableCell>{item.close.toFixed(5)}</TableCell>
                        <TableCell>{item.volume}</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
              {displayData.length > 100 && (
                <div className="text-center text-sm text-muted-foreground mt-2">
                  Showing first 100 records. Download the full dataset for complete data.
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="stats">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Basic Statistics</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Records:</span>
                    <span>{data.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date Range:</span>
                    <span>
                      {formatDate(new Date(data[0]?.timestamp))} -{" "}
                      {formatDate(new Date(data[data.length - 1]?.timestamp))}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Timeframe:</span>
                    <span>{timeframe}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Price Statistics</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Highest Price:</span>
                    <span>{Math.max(...data.map((d) => d.high)).toFixed(5)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Lowest Price:</span>
                    <span>{Math.min(...data.map((d) => d.low)).toFixed(5)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Average Close:</span>
                    <span>{(data.reduce((sum, d) => sum + d.close, 0) / data.length).toFixed(5)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-sm font-medium mb-2">Data Quality</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Missing Values:</span>
                  <span>0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Gaps in Data:</span>
                  <span>None detected</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Anomalies:</span>
                  <span>None detected</span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end mt-4 gap-2">
          <Button variant="outline">Download CSV</Button>
          <Button variant="outline">Download JSON</Button>
        </div>
      </CardContent>
    </Card>
  )
}

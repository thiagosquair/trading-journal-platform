"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface ResponsiveChartProps {
  title: string
  renderChart: (container: HTMLDivElement, isDarkMode: boolean) => void
  height?: number
  className?: string
}

export function ResponsiveChart({ title, renderChart, height = 300, className }: ResponsiveChartProps) {
  const chartRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)
  const { resolvedTheme } = useTheme()
  const isDarkMode = resolvedTheme === "dark"

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isClient && chartRef.current) {
      // Clear previous chart
      chartRef.current.innerHTML = ""
      renderChart(chartRef.current, isDarkMode)
    }
  }, [isClient, renderChart, isDarkMode])

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {!isClient ? (
          <Skeleton className="h-[300px] w-full" />
        ) : (
          <div ref={chartRef} style={{ height: `${height}px`, width: "100%" }} />
        )}
      </CardContent>
    </Card>
  )
}

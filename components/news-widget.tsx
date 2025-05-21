"use client"

import React from "react"

import Link from "next/link"
import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

interface NewsItem {
  id: string
  title: string
  summary: string
  url: string
  source: string
  publishedAt: string
}

export function NewsWidget() {
  const [news, setNews] = React.useState<NewsItem[]>([])
  const [loading, setLoading] = React.useState(true)

  useEffect(() => {
    // Fetch market news
    const fetchNews = async () => {
      try {
        // In a real app, this would be an API call
        // For demo purposes, we'll use mock data
        setTimeout(() => {
          setNews([
            {
              id: "1",
              title: "Fed Signals Potential Rate Cut",
              summary: "Federal Reserve hints at possible interest rate reduction in upcoming meeting",
              url: "#",
              source: "Financial Times",
              publishedAt: "2 hours ago",
            },
            {
              id: "2",
              title: "EUR/USD Breaks Key Resistance",
              summary: "The euro surges against the dollar after breaking through important technical level",
              url: "#",
              source: "Trading View",
              publishedAt: "4 hours ago",
            },
            {
              id: "3",
              title: "Oil Prices Stabilize After Volatility",
              summary: "Crude oil markets find equilibrium following a week of significant price swings",
              url: "#",
              source: "Bloomberg",
              publishedAt: "Yesterday",
            },
          ])
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching news:", error)
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Market News</CardTitle>
        <CardDescription>Latest financial and market updates</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-1"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {news.map((item) => (
              <div key={item.id} className="border-b pb-3 last:border-0 last:pb-0">
                <h4 className="font-medium">{item.title}</h4>
                <p className="text-sm text-gray-500 mt-1">{item.summary}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-400">
                    {item.source} • {item.publishedAt}
                  </span>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={item.url}>
                      <ExternalLink className="h-3 w-3 mr-1" />
                      <span>Read</span>
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

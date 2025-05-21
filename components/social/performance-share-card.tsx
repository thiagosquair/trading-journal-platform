"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShareButton } from "@/components/social/share-button"
import { Download, Camera, Lock } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import html2canvas from "html2canvas"
import { getUserPrivacySettings, type PrivacySettings } from "@/lib/privacy-settings"

interface PerformanceShareCardProps {
  title: string
  description?: string
  stats: Record<string, { value: string | number; label: string; trend?: "up" | "down" | "neutral" }>
  chartImageUrl?: string
  period?: string
  username?: string
  userId?: string
}

export function PerformanceShareCard({
  title,
  description = "My trading performance tracked with TradeLinx",
  stats,
  chartImageUrl,
  period = "Last 30 days",
  username = "Trader",
  userId = "current-user", // In a real app, this would be the actual user ID
}: PerformanceShareCardProps) {
  const { toast } = useToast()
  const [activeTemplate, setActiveTemplate] = useState("minimal")
  const [privacySettings, setPrivacySettings] = useState<PrivacySettings | null>(null)
  const [filteredStats, setFilteredStats] = useState<
    Record<string, { value: string | number; label: string; trend?: "up" | "down" | "neutral" }>
  >({})
  const cardRef = useState<HTMLDivElement | null>(null)[1]

  useEffect(() => {
    async function loadPrivacySettings() {
      const settings = await getUserPrivacySettings(userId)
      setPrivacySettings(settings)

      // Filter stats based on privacy settings
      if (stats && settings) {
        const filtered: Record<string, { value: string | number; label: string; trend?: "up" | "down" | "neutral" }> =
          {}

        // Only include stats that are allowed to be shared based on privacy settings
        Object.entries(stats).forEach(([key, stat]) => {
          // Map stat keys to privacy setting keys
          const settingKey = mapStatToPrivacySetting(stat.label)

          if (!settingKey || settings[settingKey as keyof PrivacySettings]) {
            filtered[key] = stat
          }
        })

        setFilteredStats(filtered)
      } else {
        setFilteredStats(stats || {})
      }
    }

    loadPrivacySettings()
  }, [userId, stats])

  const handleDownload = async () => {
    try {
      const element = document.getElementById("share-card")
      if (!element) return

      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: null,
        logging: false,
      })

      const image = canvas.toDataURL("image/png")
      const link = document.createElement("a")
      link.href = image
      link.download = `tradelinx-performance-${new Date().getTime()}.png`
      link.click()

      toast({
        title: "Image downloaded",
        description: "Your performance card has been downloaded successfully.",
      })
    } catch (error) {
      console.error("Error generating image:", error)
      toast({
        title: "Download failed",
        description: "There was an error generating your image. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleCapture = async () => {
    try {
      const element = document.getElementById("share-card")
      if (!element) return

      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: null,
        logging: false,
      })

      const image = canvas.toDataURL("image/png")

      // Create a blob from the data URL
      const blobData = await (await fetch(image)).blob()

      // Check if the Web Share API supports sharing files
      if (
        navigator.share &&
        navigator.canShare &&
        navigator.canShare({ files: [new File([blobData], "performance.png", { type: "image/png" })] })
      ) {
        await navigator.share({
          files: [new File([blobData], "performance.png", { type: "image/png" })],
          title: title,
          text: description,
        })
      } else {
        // Fallback to clipboard
        await navigator.clipboard.write([
          new ClipboardItem({
            "image/png": blobData,
          }),
        ])

        toast({
          title: "Image copied",
          description: "Performance card copied to clipboard. You can now paste it in your social media.",
        })
      }
    } catch (error) {
      console.error("Error sharing image:", error)
      toast({
        title: "Sharing failed",
        description: "There was an error sharing your image. Please try the download option instead.",
        variant: "destructive",
      })
    }
  }

  // Function to map stat labels to privacy setting keys
  function mapStatToPrivacySetting(statLabel: string): string | null {
    const mapping: Record<string, keyof PrivacySettings> = {
      "Win Rate": "displayWinRate",
      "Profit Factor": "displayProfitFactor",
      "Total Trades": "displayTotalTrades",
      "Net Profit": "displayProfitLoss",
      "Avg. RRR": "displayRiskRewardRatio",
      "Average Trade": "displayAverageTrade",
      Balance: "displayBalances",
      Equity: "displayEquity",
    }

    return mapping[statLabel] || null
  }

  const formattedStats = Object.entries(filteredStats).map(([key, stat]) => ({
    key,
    value: stat.value,
    label: stat.label,
    trend: stat.trend,
  }))

  const canShareStats = privacySettings?.tradingStatsVisibility !== "private"
  const canShareScreenshots = privacySettings?.displayScreenshots !== false

  return (
    <div className="space-y-6">
      {!canShareStats && (
        <div className="bg-amber-50 border border-amber-200 rounded-md p-4 text-sm text-amber-800">
          <p className="font-medium">Privacy Settings Notice</p>
          <p>
            Your trading statistics are currently set to private. To share your performance, update your privacy
            settings.
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => (window.location.href = "/settings/privacy")}
          >
            Update Privacy Settings
          </Button>
        </div>
      )}

      <Tabs defaultValue="minimal" value={activeTemplate} onValueChange={setActiveTemplate} className="w-full">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="minimal">Minimal</TabsTrigger>
          <TabsTrigger value="detailed">Detailed</TabsTrigger>
          <TabsTrigger value="chart">Chart</TabsTrigger>
        </TabsList>

        <div className="mt-4 p-6 border rounded-lg bg-card">
          <div id="share-card" className="w-full max-w-md mx-auto">
            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Image src="/tradelinx-logo.png" alt="TradeLinx" width={24} height={24} />
                  <span className="text-xs text-muted-foreground">{period}</span>
                </div>
                <CardTitle className="text-xl mt-2">{title}</CardTitle>
                {activeTemplate !== "minimal" && <CardDescription>{description}</CardDescription>}
              </CardHeader>

              <CardContent>
                {activeTemplate === "chart" && chartImageUrl && canShareScreenshots ? (
                  <div className="relative w-full h-32 rounded-t-lg overflow-hidden">
                    <Image src="/performance-analytics.png" alt="Trading Performance" fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-blue-600/30"></div>
                  </div>
                ) : (
                  activeTemplate === "chart" &&
                  (!chartImageUrl || !canShareScreenshots) && (
                    <div className="mb-4 aspect-video w-full overflow-hidden rounded-md bg-muted flex items-center justify-center">
                      <Lock className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )
                )}

                {canShareStats ? (
                  <div className={`grid ${activeTemplate === "minimal" ? "grid-cols-2" : "grid-cols-3"} gap-3`}>
                    {formattedStats.slice(0, activeTemplate === "minimal" ? 4 : 6).map((stat) => (
                      <div key={stat.key} className="bg-muted/50 p-2 rounded-md">
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                        <p
                          className={`font-medium ${
                            stat.trend === "up" ? "text-green-500" : stat.trend === "down" ? "text-red-500" : ""
                          }`}
                        >
                          {stat.value}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-muted/50 p-4 rounded-md flex flex-col items-center justify-center">
                    <Lock className="h-6 w-6 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground text-center">Stats are private</p>
                  </div>
                )}
              </CardContent>

              <CardFooter className="pt-1 flex justify-between items-center text-xs text-muted-foreground">
                <span>@{username}</span>
                <span>tradelinx.com</span>
              </CardFooter>
            </Card>
          </div>
        </div>
      </Tabs>

      <div className="flex flex-wrap gap-2">
        <Button variant="outline" className="flex-1 gap-2" onClick={handleDownload}>
          <Download className="h-4 w-4" />
          Download
        </Button>
        <Button variant="outline" className="flex-1 gap-2" onClick={handleCapture}>
          <Camera className="h-4 w-4" />
          Capture
        </Button>
        <ShareButton
          title={title}
          description={description}
          imageUrl={canShareScreenshots ? chartImageUrl : undefined}
          stats={canShareStats ? Object.fromEntries(formattedStats.map((stat) => [stat.label, stat.value])) : {}}
          className="flex-1"
          userId={userId}
        />
      </div>
    </div>
  )
}

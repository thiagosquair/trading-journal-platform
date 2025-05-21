"use client"

import { useState, useEffect } from "react"
import { Share2, X, Copy, Check, Twitter, Facebook, Linkedin, Mail } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { getUserPrivacySettings, type PrivacySettings } from "@/lib/privacy-settings"

interface ShareButtonProps {
  title?: string
  url?: string
  description?: string
  imageUrl?: string
  stats?: Record<string, string | number>
  className?: string
  variant?: "default" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  userId?: string
}

export function ShareButton({
  title = "Check out my trading performance on TradeLinx!",
  url = typeof window !== "undefined" ? window.location.href : "",
  description = "I'm tracking my trading journey with TradeLinx. Join me!",
  imageUrl,
  stats,
  className,
  variant = "outline",
  size = "default",
  userId = "current-user", // In a real app, this would be the actual user ID
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState("social")
  const [privacySettings, setPrivacySettings] = useState<PrivacySettings | null>(null)
  const [filteredStats, setFilteredStats] = useState<Record<string, string | number>>({})

  useEffect(() => {
    async function loadPrivacySettings() {
      const settings = await getUserPrivacySettings(userId)
      setPrivacySettings(settings)

      // Filter stats based on privacy settings
      if (stats && settings) {
        const filtered: Record<string, string | number> = {}

        // Only include stats that are allowed to be shared based on privacy settings
        Object.entries(stats).forEach(([key, value]) => {
          // Map stat keys to privacy setting keys
          const settingKey = mapStatToPrivacySetting(key)

          if (!settingKey || settings[settingKey as keyof PrivacySettings]) {
            filtered[key] = value
          }
        })

        setFilteredStats(filtered)
      } else {
        setFilteredStats(stats || {})
      }
    }

    loadPrivacySettings()
  }, [userId, stats])

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  const encodedTitle = encodeURIComponent(title)
  const encodedUrl = encodeURIComponent(url)
  const encodedDescription = encodeURIComponent(description)

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
  }

  // Function to map stat keys to privacy setting keys
  function mapStatToPrivacySetting(statKey: string): string | null {
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

    return mapping[statKey] || null
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={variant} size={size} className={cn("gap-2", className)}>
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share your trading results</DialogTitle>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>

        <Tabs defaultValue="social" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="social">Social Media</TabsTrigger>
            <TabsTrigger value="embed">Embed Card</TabsTrigger>
          </TabsList>

          <TabsContent value="social" className="space-y-4">
            <div className="flex flex-wrap gap-2 justify-center py-2">
              <Button
                variant="outline"
                size="lg"
                className="gap-2 flex-1"
                onClick={() => window.open(shareUrls.twitter, "_blank")}
              >
                <Twitter className="h-5 w-5 text-[#1DA1F2]" />
                Twitter
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="gap-2 flex-1"
                onClick={() => window.open(shareUrls.facebook, "_blank")}
              >
                <Facebook className="h-5 w-5 text-[#4267B2]" />
                Facebook
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="gap-2 flex-1"
                onClick={() => window.open(shareUrls.linkedin, "_blank")}
              >
                <Linkedin className="h-5 w-5 text-[#0077B5]" />
                LinkedIn
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="gap-2 flex-1"
                onClick={() => window.open(shareUrls.email, "_blank")}
              >
                <Mail className="h-5 w-5" />
                Email
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <div className="flex items-center justify-between rounded-md border px-4 py-2">
                  <p className="text-sm text-muted-foreground truncate">{url}</p>
                </div>
              </div>
              <Button type="submit" size="sm" className="px-3" onClick={handleCopyLink}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span className="sr-only">Copy</span>
              </Button>
            </div>

            {privacySettings?.tradingStatsVisibility === "private" && (
              <div className="bg-amber-50 border border-amber-200 rounded-md p-3 text-sm text-amber-800">
                <p className="font-medium">Privacy Notice</p>
                <p>
                  Your trading statistics are currently set to private. Change your privacy settings to share more
                  details.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="embed" className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <img src="/tradelinx-logo.png" alt="TradeLinx" className="h-8 w-8" />
                <div>
                  <h3 className="font-semibold">TradeLinx Trading Performance</h3>
                  <p className="text-sm text-muted-foreground">
                    Shared by {typeof window !== "undefined" ? localStorage.getItem("username") || "Trader" : "Trader"}
                  </p>
                </div>
              </div>

              {Object.keys(filteredStats).length > 0 && (
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {Object.entries(filteredStats).map(([key, value]) => (
                    <div key={key} className="bg-muted p-2 rounded">
                      <p className="text-xs text-muted-foreground">{key}</p>
                      <p className="font-medium">{value}</p>
                    </div>
                  ))}
                </div>
              )}

              {imageUrl && privacySettings?.displayScreenshots && (
                <div className="relative aspect-video w-full overflow-hidden rounded-md mb-3">
                  <img
                    src={imageUrl || "/placeholder.svg"}
                    alt="Performance Chart"
                    className="object-cover w-full h-full"
                  />
                </div>
              )}

              <p className="text-sm text-muted-foreground">{description}</p>
            </div>

            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <div className="flex items-center justify-between rounded-md border px-4 py-2">
                  <p className="text-sm text-muted-foreground truncate">{'<iframe src="' + url + '/embed" />'}</p>
                </div>
              </div>
              <Button
                type="submit"
                size="sm"
                className="px-3"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `<iframe src="${url}/embed" width="100%" height="400" frameborder="0"></iframe>`,
                  )
                  setCopied(true)
                  setTimeout(() => setCopied(false), 2000)
                }}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span className="sr-only">Copy</span>
              </Button>
            </div>

            {privacySettings?.tradingStatsVisibility === "private" && (
              <div className="bg-amber-50 border border-amber-200 rounded-md p-3 text-sm text-amber-800">
                <p className="font-medium">Privacy Notice</p>
                <p>
                  Your trading statistics are currently set to private. Change your privacy settings to share more
                  details.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

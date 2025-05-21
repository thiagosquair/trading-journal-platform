"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Heart, MessageCircle, Share2, Bookmark, BarChart2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

interface SocialTradeShareProps {
  imageUrl: string
  initialCaption?: string
  username?: string
  avatarUrl?: string
  onAnalyze?: () => void
}

export function SocialTradeShare({
  imageUrl,
  initialCaption = "",
  username = "trader_john",
  avatarUrl = "",
  onAnalyze,
}: SocialTradeShareProps) {
  const router = useRouter()
  const [caption, setCaption] = useState(initialCaption)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isShared, setIsShared] = useState(false)
  const [likes, setLikes] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const handleShare = async () => {
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setIsShared(true)
      toast({
        title: "Trade shared successfully",
        description: "Your trade analysis has been shared with the community.",
      })
    } catch (error) {
      console.error("Error sharing trade:", error)
      toast({
        title: "Error",
        description: "Failed to share trade. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikes(isLiked ? likes - 1 : likes + 1)
  }

  const handleSave = () => {
    setIsSaved(!isSaved)
    toast({
      title: isSaved ? "Removed from saved" : "Saved to collection",
      description: isSaved
        ? "Trade has been removed from your saved collection"
        : "Trade has been saved to your collection for future reference",
    })
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={avatarUrl || "/placeholder.svg"} />
            <AvatarFallback>{username.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">{username}</CardTitle>
            <CardDescription>{isShared ? "Shared just now" : "Draft - Not shared yet"}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isShared && (
          <Textarea
            placeholder="Add your analysis or thoughts about this trade..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="min-h-[100px]"
          />
        )}

        {isShared && caption && <p className="text-sm text-gray-700 whitespace-pre-wrap">{caption}</p>}

        <div className="relative aspect-video w-full overflow-hidden rounded-md border">
          <Image src={imageUrl || "/placeholder.svg"} alt="TradingView Chart" fill className="object-cover" />
        </div>

        <div className="flex items-center text-sm text-muted-foreground">
          <span className="font-medium text-foreground">EUR/USD</span>
          <span className="mx-2">•</span>
          <span>1H Timeframe</span>
          <span className="mx-2">•</span>
          <span>TradingView</span>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        {isShared ? (
          <div className="flex justify-between items-center w-full">
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className={cn(isLiked && "text-red-500")} onClick={handleLike}>
                <Heart className="h-4 w-4 mr-1" />
                {likes > 0 && <span>{likes}</span>}
              </Button>
              <Button variant="ghost" size="sm">
                <MessageCircle className="h-4 w-4 mr-1" />
                <span>0</span>
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4 mr-1" />
              </Button>
            </div>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" className={cn(isSaved && "text-yellow-500")} onClick={handleSave}>
                <Bookmark className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={onAnalyze}>
                <BarChart2 className="h-4 w-4 mr-1" />
                Analyze
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex justify-between w-full">
            <Button variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={onAnalyze}>
                <BarChart2 className="h-4 w-4 mr-1" />
                Analyze
              </Button>
              <Button onClick={handleShare} disabled={isSubmitting}>
                {isSubmitting ? "Sharing..." : "Share"}
              </Button>
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}

"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Share2, Copy, Twitter, Facebook, Linkedin } from "lucide-react"
import { formatDateTime } from "@/lib/utils"

interface SharePostPageClientProps {
  initialData?: any
}

export default function SharePostPageClient({ initialData }: SharePostPageClientProps) {
  const params = useParams()
  const [post, setPost] = useState(initialData)
  const [loading, setLoading] = useState(!initialData)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!initialData && params.id) {
      // Fetch post data if not provided
      setLoading(true)
      // Simulate API call
      setTimeout(() => {
        setPost({
          id: params.id,
          title: "My EURUSD Analysis",
          content: "This is a detailed analysis of the EURUSD pair showing a bullish trend continuation pattern.",
          author: "John Trader",
          createdAt: new Date().toISOString(),
          imageUrl: "/tradingview-eurusd-annotated.png",
          likes: 24,
          comments: 8,
          shares: 12,
        })
        setLoading(false)
      }, 1000)
    }
  }, [initialData, params.id])

  const handleCopyLink = () => {
    const shareUrl = `${window.location.origin}/social/share/${post.id}`
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = (platform: string) => {
    const shareUrl = `${window.location.origin}/social/share/${post.id}`
    let shareLink = ""

    switch (platform) {
      case "twitter":
        shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`
        break
      case "facebook":
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
        break
      case "linkedin":
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
        break
      default:
        return
    }

    window.open(shareLink, "_blank")
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-2">Post Not Found</h1>
        <p className="text-muted-foreground">The post you're looking for doesn't exist or has been removed.</p>
      </div>
    )
  }

  return (
    <div className="container max-w-4xl py-8">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl">{post.title}</CardTitle>
              <CardDescription>
                Shared by {post.author} on {formatDateTime(post.createdAt)}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCopyLink}>
                <Copy className="h-4 w-4 mr-2" />
                {copied ? "Copied!" : "Copy Link"}
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {post.imageUrl && (
            <div className="mb-6 rounded-md overflow-hidden">
              <img src={post.imageUrl || "/placeholder.svg"} alt={post.title} className="w-full h-auto object-cover" />
            </div>
          )}

          <p className="mb-8">{post.content}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">{post.likes} Likes</span>
              <span className="text-sm text-muted-foreground">{post.comments} Comments</span>
              <span className="text-sm text-muted-foreground">{post.shares} Shares</span>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={() => handleShare("twitter")} title="Share on Twitter">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => handleShare("facebook")} title="Share on Facebook">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => handleShare("linkedin")} title="Share on LinkedIn">
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

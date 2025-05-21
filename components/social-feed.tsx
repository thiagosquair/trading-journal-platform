"use client"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, ThumbsUp, Share, PlusCircle } from "lucide-react"

// Mock data for social feed
const posts = [
  {
    id: "1",
    user: {
      name: "Sarah Chen",
      avatar: "/stylized-initials-sc.png",
      handle: "@sarahtrader",
    },
    content:
      "Just closed a great trade on EUR/USD! The price action at the 1.0850 support level was textbook perfect. Here's my analysis and why I think we might see further upside in the coming days.",
    image: "/tradingview-eurusd.png",
    likes: 24,
    comments: 5,
    time: "2 hours ago",
    tags: ["forex", "eurusd", "technicalanalysis"],
  },
  {
    id: "2",
    user: {
      name: "David Kim",
      avatar: "/abstract-geometric-dk.png",
      handle: "@dktrader",
    },
    content:
      "My weekly market outlook: I'm seeing potential for a pullback in the S&P 500 as we approach resistance. Key levels to watch are 4,200 and 4,150. What are your thoughts on the market this week?",
    image: "/nasdaq-chart.png",
    likes: 18,
    comments: 12,
    time: "5 hours ago",
    tags: ["stocks", "marketoutlook", "sp500"],
  },
  {
    id: "3",
    user: {
      name: "Emma Wilson",
      avatar: "/graffiti-ew.png",
      handle: "@emmatrader",
    },
    content:
      "Bitcoin showing strong momentum after breaking above the 50-day moving average. I'm looking for continuation toward the $45K level if we can hold above $40K. Who else is watching crypto this week?",
    image: "/btc-usd-chart.png",
    likes: 32,
    comments: 8,
    time: "1 day ago",
    tags: ["crypto", "bitcoin", "technicalanalysis"],
  },
]

export function SocialFeed() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Trading Community</h2>
        <Link href="/social/new-post">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Post
          </Button>
        </Link>
      </div>

      {posts.map((post) => (
        <Card key={post.id} className="overflow-hidden">
          <CardHeader className="p-4">
            <div className="flex items-center">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={post.user.avatar || "/placeholder.svg"} alt={post.user.name} />
                <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{post.user.name}</div>
                <div className="text-sm text-gray-500">
                  {post.user.handle} · {post.time}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="mb-4">{post.content}</p>
            {post.image && (
              <div className="relative h-64 w-full rounded-md overflow-hidden mb-3">
                <Image src={post.image || "/placeholder.svg"} alt="Post image" fill className="object-cover" />
              </div>
            )}
            <div className="flex flex-wrap gap-2 mt-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex justify-between">
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="text-gray-500 flex items-center">
                <ThumbsUp className="h-4 w-4 mr-1" />
                {post.likes}
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-500 flex items-center">
                <MessageSquare className="h-4 w-4 mr-1" />
                {post.comments}
              </Button>
            </div>
            <Link href={`/social/share/${post.id}`}>
              <Button variant="ghost" size="sm" className="text-gray-500">
                <Share className="h-4 w-4 mr-1" />
                Share
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

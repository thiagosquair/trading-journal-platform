import Image from "next/image"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import {
  ArrowDown,
  ArrowUp,
  BarChart2,
  Bookmark,
  CheckCircle2,
  MessageSquare,
  Share2,
  ThumbsUp,
  XCircle,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import type { TradeIdea, TraderProfile } from "@/lib/leaderboard-types"
import { cn } from "@/lib/utils"

interface TradeIdeaCardProps {
  idea: TradeIdea
  trader: TraderProfile
  compact?: boolean
}

export function TradeIdeaCard({ idea, trader, compact = false }: TradeIdeaCardProps) {
  const createdAt = new Date(idea.createdAt)
  const timeAgo = formatDistanceToNow(createdAt, { addSuffix: true })

  return (
    <Card className="w-full transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={trader.avatarUrl || "/placeholder.svg"} alt={trader.name} />
              <AvatarFallback>{trader.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <Link href={`/traders/${trader.id}`} className="font-semibold text-sm hover:underline">
                {trader.name}
              </Link>
              <div className="text-xs text-muted-foreground">{timeAgo}</div>
            </div>
          </div>
          <Badge
            variant={idea.direction === "long" ? "default" : "destructive"}
            className="flex items-center gap-1 uppercase"
          >
            {idea.direction === "long" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
            {idea.direction}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-3 space-y-3">
        <div>
          <h3 className="font-medium text-sm">{idea.title}</h3>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline" className="text-xs">
              {idea.symbol}
            </Badge>
            {idea.outcome && (
              <Badge
                variant={idea.outcome === "win" ? "outline" : "outline"}
                className={cn(
                  "text-xs flex items-center gap-1",
                  idea.outcome === "win" ? "text-green-500 border-green-200" : "text-red-500 border-red-200",
                )}
              >
                {idea.outcome === "win" ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                {idea.outcome.toUpperCase()}
                {idea.actualReturn !== undefined && ` (${idea.actualReturn > 0 ? "+" : ""}${idea.actualReturn}%)`}
              </Badge>
            )}
          </div>
        </div>

        <div className="relative aspect-video w-full overflow-hidden rounded-md border">
          <Image src={idea.imageUrl || "/placeholder.svg"} alt={idea.title} fill className="object-cover" />
        </div>

        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="rounded-md bg-muted/50 p-2">
            <div className="text-muted-foreground">Entry</div>
            <div className="font-mono font-medium">{idea.entryPrice}</div>
          </div>
          <div className="rounded-md bg-muted/50 p-2">
            <div className="text-muted-foreground">Target</div>
            <div className="font-mono font-medium text-green-500">{idea.targetPrice}</div>
          </div>
          <div className="rounded-md bg-muted/50 p-2">
            <div className="text-muted-foreground">Stop</div>
            <div className="font-mono font-medium text-red-500">{idea.stopLoss}</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-0">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <ThumbsUp className="h-4 w-4 mr-1" />
            <span className="text-xs">{idea.likes}</span>
          </Button>
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <MessageSquare className="h-4 w-4 mr-1" />
            <span className="text-xs">{idea.comments}</span>
          </Button>
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <Share2 className="h-4 w-4 mr-1" />
            <span className="text-xs">{idea.shares}</span>
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Bookmark className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="h-8">
            <BarChart2 className="h-4 w-4 mr-1" />
            <span className="text-xs">Analyze</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

import Link from "next/link"
import { ArrowUp, ArrowDown, Award, BadgeCheck, MessageSquare, ThumbsUp, Share2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { TraderProfile, TraderPerformance } from "@/lib/leaderboard-types"
import { cn } from "@/lib/utils"

interface TraderProfileCardProps {
  rank: number
  trader: TraderProfile
  performance: TraderPerformance
  compact?: boolean
}

export function TraderProfileCard({ rank, trader, performance, compact = false }: TraderProfileCardProps) {
  return (
    <Card className={cn("transition-all hover:shadow-md", compact ? "w-full" : "w-full")}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
              {rank}
            </div>
            <Avatar className="h-10 w-10">
              <AvatarImage src={trader.avatarUrl || "/placeholder.svg"} alt={trader.name} />
              <AvatarFallback>{trader.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-1">
                <Link href={`/traders/${trader.id}`} className="font-semibold hover:underline">
                  {trader.name}
                </Link>
                {trader.verified && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <BadgeCheck className="h-4 w-4 text-blue-500" />
                      </TooltipTrigger>
                      <TooltipContent>Verified Trader</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
              <div className="text-xs text-muted-foreground">@{trader.username}</div>
            </div>
          </div>
          {performance.rankChange !== undefined && (
            <div
              className={cn(
                "flex items-center text-xs font-medium",
                performance.rankChange > 0
                  ? "text-green-500"
                  : performance.rankChange < 0
                    ? "text-red-500"
                    : "text-muted-foreground",
              )}
            >
              {performance.rankChange > 0 ? (
                <ArrowUp className="mr-1 h-3 w-3" />
              ) : performance.rankChange < 0 ? (
                <ArrowDown className="mr-1 h-3 w-3" />
              ) : null}
              {performance.rankChange !== 0 && Math.abs(performance.rankChange)}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        {!compact && (
          <div className="mb-3 text-sm text-muted-foreground line-clamp-2">{trader.bio || "No bio provided."}</div>
        )}

        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="flex flex-col space-y-1">
            <div className="text-xs text-muted-foreground">Win Rate</div>
            <div className="flex items-center">
              <span className="text-sm font-semibold">{performance.winRate}%</span>
              <Progress
                value={performance.winRate}
                className="h-1.5 ml-2 flex-1"
                indicatorClassName={cn(
                  performance.winRate >= 70
                    ? "bg-green-500"
                    : performance.winRate >= 50
                      ? "bg-amber-500"
                      : "bg-red-500",
                )}
              />
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            <div className="text-xs text-muted-foreground">Profit Factor</div>
            <div className="flex items-center">
              <span className="text-sm font-semibold">{performance.profitFactor.toFixed(1)}x</span>
              <Progress
                value={Math.min(performance.profitFactor * 20, 100)}
                className="h-1.5 ml-2 flex-1"
                indicatorClassName={cn(
                  performance.profitFactor >= 2.5
                    ? "bg-green-500"
                    : performance.profitFactor >= 1.5
                      ? "bg-amber-500"
                      : "bg-red-500",
                )}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="rounded-md bg-muted/50 p-2">
            <div className="text-xs text-muted-foreground">Ideas</div>
            <div className="text-sm font-semibold">{performance.totalIdeas}</div>
          </div>
          <div className="rounded-md bg-muted/50 p-2">
            <div className="text-xs text-muted-foreground">Avg Return</div>
            <div className="text-sm font-semibold">{performance.averageReturn.toFixed(1)}%</div>
          </div>
          <div className="rounded-md bg-muted/50 p-2">
            <div className="text-xs text-muted-foreground">Followers</div>
            <div className="text-sm font-semibold">{trader.followers.toLocaleString()}</div>
          </div>
        </div>

        {!compact && (
          <div className="mt-3 flex flex-wrap gap-1">
            {trader.badges?.map((badge, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                <Award className="h-3 w-3" />
                {badge}
              </Badge>
            ))}
          </div>
        )}

        {!compact && performance.bestPair && (
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center">
              <span className="text-muted-foreground mr-1">Best:</span>
              <Badge variant="outline" className="text-green-500">
                {performance.bestPair}
              </Badge>
            </div>
            {performance.worstPair && (
              <div className="flex items-center">
                <span className="text-muted-foreground mr-1">Worst:</span>
                <Badge variant="outline" className="text-red-500">
                  {performance.worstPair}
                </Badge>
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between pt-0">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <div className="flex items-center">
            <ThumbsUp className="mr-1 h-3 w-3" />
            {performance.totalLikes.toLocaleString()}
          </div>
          <div className="flex items-center">
            <MessageSquare className="mr-1 h-3 w-3" />
            {performance.totalComments.toLocaleString()}
          </div>
          <div className="flex items-center">
            <Share2 className="mr-1 h-3 w-3" />
            {performance.totalShares.toLocaleString()}
          </div>
        </div>
        <Button variant="outline" size="sm">
          Follow
        </Button>
      </CardFooter>
    </Card>
  )
}

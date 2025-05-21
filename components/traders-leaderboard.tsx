"use client"

import { useState } from "react"
import { Award, Calendar, Filter, Search, TrendingUp, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TraderProfileCard } from "@/components/trader-profile-card"
import { TradeIdeaCard } from "@/components/trade-idea-card"
import { getLeaderboardData } from "@/lib/mock-leaderboard-data"
import type { LeaderboardCategory, LeaderboardTimeframe } from "@/lib/leaderboard-types"

export function TradersLeaderboard() {
  const [timeframe, setTimeframe] = useState<LeaderboardTimeframe>("monthly")
  const [category, setCategory] = useState<LeaderboardCategory>("overall")
  const [searchQuery, setSearchQuery] = useState("")

  const leaderboardData = getLeaderboardData(timeframe, category)

  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center">
            <Award className="mr-2 h-8 w-8 text-yellow-500" />
            Trader Leaderboard
          </h1>
          <p className="text-muted-foreground">Top traders ranked by performance, win rate, and community engagement</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search traders..."
              className="pl-8 w-[200px] md:w-[260px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Filters</CardTitle>
              <CardDescription>Customize your leaderboard view</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  Time Period
                </label>
                <Select value={timeframe} onValueChange={(value) => setTimeframe(value as LeaderboardTimeframe)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                    <SelectItem value="all-time">All Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Ranking Criteria
                </label>
                <Select value={category} onValueChange={(value) => setCategory(value as LeaderboardCategory)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="overall">Overall Performance</SelectItem>
                    <SelectItem value="win-rate">Win Rate</SelectItem>
                    <SelectItem value="profit-factor">Profit Factor</SelectItem>
                    <SelectItem value="popularity">Popularity</SelectItem>
                    <SelectItem value="consistency">Consistency</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-2">
                <Button className="w-full">
                  <Filter className="mr-2 h-4 w-4" />
                  Apply Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Users className="mr-2 h-4 w-4" />
                Top Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  Forex Traders
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  Crypto Traders
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  Stock Traders
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  Options Traders
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  Day Traders
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-3">
          <Tabs defaultValue="traders">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="traders">Top Traders</TabsTrigger>
                <TabsTrigger value="ideas">Hot Ideas</TabsTrigger>
              </TabsList>
              <div className="text-sm text-muted-foreground">Showing {leaderboardData.length} results</div>
            </div>

            <TabsContent value="traders" className="space-y-4">
              {leaderboardData.map((entry) => (
                <TraderProfileCard
                  key={entry.trader.id}
                  rank={entry.rank}
                  trader={entry.trader}
                  performance={entry.performance}
                />
              ))}
            </TabsContent>

            <TabsContent value="ideas" className="space-y-6">
              {leaderboardData.flatMap((entry) =>
                entry.recentIdeas.map((idea) => <TradeIdeaCard key={idea.id} idea={idea} trader={entry.trader} />),
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  ArrowDown,
  ArrowUp,
  DollarSign,
  LineChart,
  TrendingDown,
  TrendingUp,
  Users,
  Brain,
  Sparkles,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function DashboardWithSidebar() {
  return (
    <div className="flex flex-col min-h-full">
      <header className="border-b bg-background">
        <div className="flex h-16 items-center px-4 gap-2">
          <SidebarTrigger />
          <div className="ml-2 flex-1">
            <h1 className="text-xl font-semibold">Dashboard</h1>
            <p className="text-sm text-muted-foreground">Your trading performance at a glance</p>
          </div>
        </div>
      </header>

      <div className="flex-1 p-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$10,247.35</div>
              <p className="text-xs text-muted-foreground">+$142.27 from open positions</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly P&L</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">+$583.21</div>
              <p className="text-xs text-muted-foreground">+5.7% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
              <LineChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">62.5%</div>
              <p className="text-xs text-muted-foreground">15 wins, 9 losses this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Risk/Reward</CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1:2.3</div>
              <p className="text-xs text-muted-foreground">Average across all trades</p>
            </CardContent>
          </Card>
        </div>

        {/* Featured Tools Section */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-700">
                <Sparkles className="h-5 w-5 mr-2 text-blue-500" />
                AI Trade Analysis
              </CardTitle>
              <CardDescription>Get AI-powered insights on your trades</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm">
                Analyze your trades with advanced AI to identify patterns and improvement areas.
              </p>
              <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                <Link href="/trade-analysis">Analyze My Trades</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100">
            <CardHeader>
              <CardTitle className="flex items-center text-purple-700">
                <Users className="h-5 w-5 mr-2 text-purple-500" />
                Social Trading
              </CardTitle>
              <CardDescription>Connect with other traders</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm">Share your trades, follow top performers, and learn from the community.</p>
              <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
                <Link href="/social-trade-test">Explore Social Trading</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-teal-50 border-green-100">
            <CardHeader>
              <CardTitle className="flex items-center text-green-700">
                <Brain className="h-5 w-5 mr-2 text-green-500" />
                Trading Psychology
              </CardTitle>
              <CardDescription>Improve your mental game</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm">
                Track emotional states, identify psychological patterns, and build mental resilience.
              </p>
              <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                <Link href="/psychology">Psychology Tools</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="positions">Open Positions</TabsTrigger>
            <TabsTrigger value="history">Trade History</TabsTrigger>
            <TabsTrigger value="journal">Journal Entries</TabsTrigger>
            <TabsTrigger value="social">Social Feed</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-6 space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Performance</CardTitle>
                  <CardDescription>Your trading results for the past 30 days</CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <LineChart className="mx-auto h-16 w-16 mb-2" />
                    <p>Performance chart will appear here</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Top Instruments</CardTitle>
                  <CardDescription>Your best performing instruments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-full">
                        <div className="flex items-center justify-between mb-1">
                          <div className="font-medium">EURUSD</div>
                          <div className="text-green-500 flex items-center">
                            <ArrowUp className="h-3 w-3 mr-1" />
                            $245.32
                          </div>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: "78%" }}></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-full">
                        <div className="flex items-center justify-between mb-1">
                          <div className="font-medium">GBPUSD</div>
                          <div className="text-green-500 flex items-center">
                            <ArrowUp className="h-3 w-3 mr-1" />
                            $187.45
                          </div>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: "65%" }}></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-full">
                        <div className="flex items-center justify-between mb-1">
                          <div className="font-medium">USDJPY</div>
                          <div className="text-red-500 flex items-center">
                            <ArrowDown className="h-3 w-3 mr-1" />
                            $78.21
                          </div>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-red-500 h-2 rounded-full" style={{ width: "32%" }}></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-full">
                        <div className="flex items-center justify-between mb-1">
                          <div className="font-medium">XAUUSD</div>
                          <div className="text-green-500 flex items-center">
                            <ArrowUp className="h-3 w-3 mr-1" />
                            $156.78
                          </div>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: "54%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Trading Activity</CardTitle>
                  <CardDescription>Your trading frequency</CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <LineChart className="mx-auto h-16 w-16 mb-2" />
                    <p>Activity chart will appear here</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="positions" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Open Positions</CardTitle>
                <CardDescription>Your currently active trades</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <p>Your open positions will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="history" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Trade History</CardTitle>
                <CardDescription>Your past trades</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <p>Your trade history will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="journal" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Journal Entries</CardTitle>
                <CardDescription>Your trading notes and reflections</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <p>Your journal entries will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="social" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Social Trading Feed</CardTitle>
                <CardDescription>Latest updates from traders you follow</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <p>Connect with other traders to see their updates here</p>
                  <Button className="mt-4" asChild>
                    <Link href="/social-trade-test">Explore Social Trading</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

"use client"

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, BarChart3, BookOpen, Calendar, LineChart, PieChart, Users } from "lucide-react"
import Link from "next/link"
import PlatformIntegrationsCarousel from "./platform-integrations-carousel"

export default function FeatureOverview() {
  return (
    <div className="container mx-auto py-10 space-y-10">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Trading Journal Platform</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Track your trades, analyze your performance, and improve your trading strategy with our comprehensive trading
          journal.
        </p>
      </div>

      <Tabs defaultValue="features" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="features">Key Features</TabsTrigger>
          <TabsTrigger value="integrations">Platform Integrations</TabsTrigger>
          <TabsTrigger value="tools">Trading Tools</TabsTrigger>
        </TabsList>

        <TabsContent value="features" className="space-y-8 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <LineChart className="h-8 w-8 text-primary" />
                  <Badge variant="outline">Core</Badge>
                </div>
                <CardTitle className="mt-4">Trade Tracking</CardTitle>
                <CardDescription>
                  Log and track all your trades with detailed entry and exit points, risk/reward ratios, and more.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/journal">
                    Open Journal
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <BarChart3 className="h-8 w-8 text-primary" />
                  <Badge variant="outline">Analytics</Badge>
                </div>
                <CardTitle className="mt-4">Performance Analytics</CardTitle>
                <CardDescription>
                  Analyze your trading performance with advanced metrics, charts, and statistics.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/journal/statistics">
                    View Statistics
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <PieChart className="h-8 w-8 text-primary" />
                  <Badge variant="outline">Goals</Badge>
                </div>
                <CardTitle className="mt-4">Trading Goals</CardTitle>
                <CardDescription>
                  Set and track your trading goals with progress tracking and performance metrics.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/goals">
                    Set Goals
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Calendar className="h-8 w-8 text-primary" />
                  <Badge variant="outline">Planning</Badge>
                </div>
                <CardTitle className="mt-4">Economic Calendar</CardTitle>
                <CardDescription>
                  Stay informed about important economic events and plan your trades accordingly.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/calendar">
                    View Calendar
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Users className="h-8 w-8 text-primary" />
                  <Badge variant="outline">Community</Badge>
                </div>
                <CardTitle className="mt-4">Social Trading</CardTitle>
                <CardDescription>
                  Share your trades, follow other traders, and learn from the community.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/social">
                    Explore Social
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <BookOpen className="h-8 w-8 text-primary" />
                  <Badge variant="outline">Education</Badge>
                </div>
                <CardTitle className="mt-4">Trading Psychology</CardTitle>
                <CardDescription>Improve your trading mindset with psychology tools and resources.</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/psychology">
                    Explore Psychology
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="flex justify-center">
            <Button asChild>
              <Link href="/dashboard">
                Go to Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="integrations" className="pt-6">
          <PlatformIntegrationsCarousel />
        </TabsContent>

        <TabsContent value="tools" className="space-y-8 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Position Size Calculator</CardTitle>
                <CardDescription>
                  Calculate the optimal position size based on your risk tolerance and account size.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/tools/position-calculator">
                    Open Calculator
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk/Reward Calculator</CardTitle>
                <CardDescription>
                  Calculate the risk/reward ratio for your trades to ensure they meet your criteria.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/tools/risk-reward-calculator">
                    Open Calculator
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Profit Calculator</CardTitle>
                <CardDescription>
                  Calculate potential profits based on entry price, exit price, and position size.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/tools/profit-calculator">
                    Open Calculator
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Correlation Matrix</CardTitle>
                <CardDescription>
                  Analyze the correlation between different assets to diversify your portfolio.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/tools/correlation-matrix">
                    Open Matrix
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Fibonacci Calculator</CardTitle>
                <CardDescription>Calculate Fibonacci retracement and extension levels for your trades.</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/tools/fibonacci-calculator">
                    Open Calculator
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pivot Point Calculator</CardTitle>
                <CardDescription>
                  Calculate pivot points for different timeframes to identify support and resistance levels.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/tools/pivot-calculator">
                    Open Calculator
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="flex justify-center">
            <Button asChild>
              <Link href="/tools">
                View All Tools
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

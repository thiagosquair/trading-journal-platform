import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Becoming a Funded Trader | TradeLinx Courses",
  description: "Prepare for and pass prop firm challenges",
}

export default function FundedTraderPage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link href="/courses">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Courses
          </Link>
        </Button>
        <div>
          <div className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">Advanced</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold tracking-tight mb-4">Becoming a Funded Trader</h1>
          <p className="text-muted-foreground mb-6">
            Prepare for and pass prop firm challenges. This advanced course will guide you through the process of
            becoming a funded trader with a proprietary trading firm.
          </p>

          <div className="relative rounded-xl overflow-hidden h-[300px] mb-8">
            <Image src="/prop-trading-dashboard.png" alt="Funded Trading" fill className="object-cover" />
          </div>

          <h2 className="text-2xl font-bold mb-4">Course Overview</h2>
          <p className="mb-6">
            This advanced course is designed for traders who want to take their trading to the professional level by
            securing funding from a proprietary trading firm. You'll learn how to prepare for and pass prop firm
            challenges, manage funded accounts, and scale your trading business.
          </p>

          <h3 className="text-xl font-semibold mb-3">What You'll Learn</h3>
          <ul className="space-y-2 mb-6">
            <li className="flex items-center">
              <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
              <span>Understanding the prop firm business model</span>
            </li>
            <li className="flex items-center">
              <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
              <span>Comparing different prop firms and their requirements</span>
            </li>
            <li className="flex items-center">
              <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
              <span>Developing a challenge-specific trading plan</span>
            </li>
            <li className="flex items-center">
              <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
              <span>Risk management for prop firm challenges</span>
            </li>
            <li className="flex items-center">
              <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
              <span>Psychological preparation for evaluation phases</span>
            </li>
            <li className="flex items-center">
              <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
              <span>Managing funded accounts effectively</span>
            </li>
            <li className="flex items-center">
              <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
              <span>Scaling with multiple funded accounts</span>
            </li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">Prerequisites</h3>
          <p className="mb-6">This is an advanced course that assumes you already have:</p>
          <ul className="space-y-2 mb-8">
            <li className="flex items-center">
              <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
              <span>Solid understanding of technical and/or fundamental analysis</span>
            </li>
            <li className="flex items-center">
              <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
              <span>Experience with risk management</span>
            </li>
            <li className="flex items-center">
              <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
              <span>A developed trading strategy with positive expectancy</span>
            </li>
            <li className="flex items-center">
              <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
              <span>Trading experience (at least 6 months)</span>
            </li>
          </ul>

          <Separator className="my-8" />

          <h2 className="text-2xl font-bold mb-6">Course Modules</h2>

          <div className="space-y-4 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Module 1: Prop Firm Selection</h3>
                  <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Completed</div>
                </div>
                <p className="text-muted-foreground mb-4">
                  Understanding different prop firms, their models, and how to choose the right one for you.
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">5 Lessons • 50 min</span>
                  </div>
                  <Button size="sm" variant="outline" asChild>
                    <Link href="/courses/funded-trader/module-1">
                      Continue <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Module 2: Challenge Preparation</h3>
                  <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">In Progress</div>
                </div>
                <p className="text-muted-foreground mb-4">
                  Developing a specific plan to pass prop firm challenges and evaluations.
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">6 Lessons • 65 min</span>
                  </div>
                  <Button size="sm" asChild>
                    <Link href="/courses/funded-trader/module-2">
                      Continue <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Module 3: Risk Management for Challenges</h3>
                  <div className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">Locked</div>
                </div>
                <p className="text-muted-foreground mb-4">
                  Specialized risk management techniques for passing prop firm evaluations.
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">5 Lessons • 55 min</span>
                  </div>
                  <Button size="sm" variant="outline" disabled>
                    Start <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* More modules would be listed here */}
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="bg-gray-50 rounded-xl p-6 sticky top-20">
            {/* Additional content for the sidebar can be added here */}
          </div>
        </div>
      </div>
    </div>
  )
}

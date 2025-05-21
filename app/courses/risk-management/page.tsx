import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Shield, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Risk Management Mastery | TradeLinx Courses",
  description: "Learn to protect your capital and manage risk effectively",
}

export default function RiskManagementPage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link href="/courses">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Courses
          </Link>
        </Button>
        <div>
          <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Beginner</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold tracking-tight mb-4">Risk Management Mastery</h1>
          <p className="text-muted-foreground mb-6">
            Learn to protect your capital and manage risk effectively. This course covers essential risk management
            principles that will help you survive and thrive in the markets.
          </p>

          <div className="relative rounded-xl overflow-hidden h-[300px] mb-8">
            <Image src="/risk-management-header.png" alt="Risk management" fill className="object-cover" />
          </div>

          <h2 className="text-2xl font-bold mb-4">Course Overview</h2>
          <p className="mb-6">
            Risk management is the foundation of successful trading. This course will teach you how to protect your
            capital, size positions correctly, and implement risk controls that keep you in the game long enough to
            become profitable.
          </p>

          <h3 className="text-xl font-semibold mb-3">What You'll Learn</h3>
          <ul className="space-y-2 mb-6">
            <li className="flex items-center">
              <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
              <span>How to determine appropriate risk per trade</span>
            </li>
            <li className="flex items-center">
              <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
              <span>Position sizing across different markets</span>
            </li>
            <li className="flex items-center">
              <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
              <span>Stop loss placement strategies</span>
            </li>
            <li className="flex items-center">
              <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
              <span>Risk-reward ratios and expectancy</span>
            </li>
            <li className="flex items-center">
              <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
              <span>Managing drawdowns effectively</span>
            </li>
            <li className="flex items-center">
              <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
              <span>Portfolio-level risk management</span>
            </li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">Prerequisites</h3>
          <p className="mb-6">This course is suitable for beginners, but you'll get more value if you:</p>
          <ul className="space-y-2 mb-8">
            <li className="flex items-center">
              <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
              <span>Have basic knowledge of trading terminology</span>
            </li>
            <li className="flex items-center">
              <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
              <span>Understand what stop losses and take profits are</span>
            </li>
            <li className="flex items-center">
              <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
              <span>Have a trading account (demo or live)</span>
            </li>
          </ul>

          <Separator className="my-8" />

          <h2 className="text-2xl font-bold mb-6">Course Modules</h2>

          <div className="space-y-4 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Module 1: Introduction to Risk Management</h3>
                  <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Completed</div>
                </div>
                <p className="text-muted-foreground mb-4">
                  Understanding why risk management is the foundation of trading success.
                </p>
                <div className="flex items-center justify-between">
                  <Button variant="link" size="sm">
                    Continue
                  </Button>
                  <Progress value={100} />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Module 2: Risk Management: Calculating Lots</h3>
                  <div className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">Locked</div>
                </div>
                <p className="text-muted-foreground mb-4">
                  Learn how to calculate the appropriate lot size for your trades.
                </p>
                <Button variant="link" size="sm">
                  Unlock
                </Button>
              </CardContent>
            </Card>
          </div>

          <Button variant="default" className="w-full">
            Next Module <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div>
          <aside className="sticky top-16">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Course Details</h2>
                <dl className="space-y-2">
                  <div className="flex items-center">
                    <Shield className="mr-2 h-5 w-5 text-gray-500" />
                    <dt className="text-muted-foreground">Risk Level</dt>
                    <dd className="ml-auto">Beginner</dd>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="mr-2 h-5 w-5 text-gray-500" />
                    <dt className="text-muted-foreground">Lessons</dt>
                    <dd className="ml-auto">2</dd>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-gray-500" />
                    <dt className="text-muted-foreground">Estimated Time</dt>
                    <dd className="ml-auto">2h 30m</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  )
}

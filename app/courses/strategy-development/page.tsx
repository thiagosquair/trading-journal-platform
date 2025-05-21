import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Strategy Development | TradeLinx Courses",
  description: "Create, test, and optimize your trading strategies",
}

export default function StrategyDevelopmentPage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link href="/courses">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Courses
          </Link>
        </Button>
        <div>
          <div className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">Intermediate</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold tracking-tight mb-4">Strategy Development</h1>
          <p className="text-muted-foreground mb-6">
            Create, test, and optimize your trading strategies. This course teaches you how to develop robust trading
            strategies that align with your goals and trading style.
          </p>

          <div className="relative rounded-xl overflow-hidden h-[300px] mb-8">
            <Image src="/placeholder.svg?key=bp3pc" alt="Strategy Development" fill className="object-cover" />
          </div>

          <h2 className="text-2xl font-bold mb-4">Course Overview</h2>
          <p className="mb-6">
            This intermediate-level course guides you through the process of developing, testing, and optimizing trading
            strategies. You'll learn how to create strategies based on your trading style, backtest them effectively,
            and refine them for real-world trading conditions.
          </p>

          <h3 className="text-xl font-semibold mb-3">What You'll Learn</h3>
          <ul className="space-y-2 mb-6">
            <li className="flex items-center">
              <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
              <span>The key components of a robust trading strategy</span>
            </li>
            <li className="flex items-center">
              <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
              <span>How to define clear entry and exit rules</span>
            </li>
            <li className="flex items-center">
              <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
              <span>Backtesting methodologies and tools</span>
            </li>
            <li className="flex items-center">
              <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
              <span>Evaluating strategy performance metrics</span>
            </li>
            <li className="flex items-center">
              <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
              <span>Optimizing strategies without curve-fitting</span>
            </li>
            <li className="flex items-center">
              <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
              <span>Forward testing and paper trading</span>
            </li>
            <li className="flex items-center">
              <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
              <span>Adapting strategies to changing market conditions</span>
            </li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">Prerequisites</h3>
          <p className="mb-6">
            This course assumes you already have a basic understanding of trading concepts. You should be familiar with:
          </p>
          <ul className="space-y-2 mb-8">
            <li className="flex items-center">
              <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
              <span>Basic technical analysis</span>
            </li>
            <li className="flex items-center">
              <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
              <span>Risk management principles</span>
            </li>
            <li className="flex items-center">
              <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
              <span>Trading terminology</span>
            </li>
            <li className="flex items-center">
              <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
              <span>Basic market mechanics</span>
            </li>
          </ul>

          <Separator className="my-8" />

          <h2 className="text-2xl font-bold mb-6">Course Modules</h2>

          <div className="space-y-4 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Module 1: Strategy Components</h3>
                  <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Completed</div>
                </div>
                <p className="text-muted-foreground mb-4">
                  Understanding the essential components that make up a complete trading strategy.
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">5 Lessons • 45 min</span>
                  </div>
                  <Button size="sm" variant="outline" asChild>
                    <Link href="/courses/strategy-development/module-1">
                      Continue <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Module 2: Backtesting Techniques</h3>
                  <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">In Progress</div>
                </div>
                <p className="text-muted-foreground mb-4">
                  Methods and tools for effectively testing your strategy on historical data.
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">6 Lessons • 60 min</span>
                  </div>
                  <Button size="sm" asChild>
                    <Link href="/courses/strategy-development/module-2">
                      Continue <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Module 3: Performance Metrics</h3>
                  <div className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">Locked</div>
                </div>
                <p className="text-muted-foreground mb-4">
                  Key metrics for evaluating the effectiveness and robustness of your trading strategy.
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">4 Lessons • 40 min</span>
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
          <div className="bg-gray-50 rounded-xl p-6 sticky top-8">
            <h3 className="font-semibold mb-4">Your Progress</h3>
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-1">
                <span>Course Completion</span>
                <span>18%</span>
              </div>
              <Progress value={18} className="h-2" />
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Module 1</span>
                  <span>100%</span>
                </div>
                <Progress value={100} className="h-1.5" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Module 2</span>
                  <span>40%</span>
                </div>
                <Progress value={40} className="h-1.5" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Module 3</span>
                  <span>0%</span>
                </div>
                <Progress value={0} className="h-1.5" />
              </div>
            </div>

            <Separator className="my-6" />

            <h3 className="font-semibold mb-4">Course Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration:</span>
                <span>7-9 hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Modules:</span>
                <span>8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Lessons:</span>
                <span>40</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Exercises:</span>
                <span>15</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Quizzes:</span>
                <span>8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Certificate:</span>
                <span>Yes</span>
              </div>
            </div>

            <Separator className="my-6" />

            <h3 className="font-semibold mb-4">Continue Learning</h3>
            <Button className="w-full mb-3" asChild>
              <Link href="/courses/strategy-development/module-2">
                Continue Course <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/courses">Browse All Courses</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

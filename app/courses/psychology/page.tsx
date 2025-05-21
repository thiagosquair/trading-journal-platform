import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Trading Psychology | TradeLinx Courses",
  description: "Develop the mindset of successful traders",
}

export default function TradingPsychologyPage() {
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
          <h1 className="text-3xl font-bold tracking-tight mb-4">Trading Psychology</h1>
          <p className="text-muted-foreground mb-6">
            Develop the mindset of successful traders. This course covers the psychological aspects of trading that
            separate consistently profitable traders from the rest.
          </p>

          <div className="relative rounded-xl overflow-hidden h-[300px] mb-8">
            <Image src="/trading-psychology-banner.png" alt="Trading psychology" fill className="object-cover" />
          </div>

          <h2 className="text-2xl font-bold mb-4">Course Overview</h2>
          <p className="mb-6">
            Trading psychology is often the most overlooked yet most important aspect of trading success. This course
            will help you understand the mental challenges of trading, recognize common psychological pitfalls, and
            develop strategies to maintain emotional discipline.
          </p>

          <h3 className="text-xl font-semibold mb-3">What You'll Learn</h3>
          <ul className="space-y-2 mb-6">
            <li className="flex items-center">
              <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
              <span>Understanding the trader's mindset</span>
            </li>
            <li className="flex items-center">
              <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
              <span>Recognizing and managing emotions in trading</span>
            </li>
            <li className="flex items-center">
              <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
              <span>Overcoming fear, greed, and other emotional biases</span>
            </li>
            <li className="flex items-center">
              <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
              <span>Developing a trading plan and sticking to it</span>
            </li>
            <li className="flex items-center">
              <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
              <span>Building confidence and resilience</span>
            </li>
            <li className="flex items-center">
              <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
              <span>Maintaining focus and discipline</span>
            </li>
            <li className="flex items-center">
              <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
              <span>Dealing with losses and drawdowns</span>
            </li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">Prerequisites</h3>
          <p className="mb-6">This course is suitable for traders of all levels. No prior knowledge is required.</p>

          <Separator className="my-8" />

          <h2 className="text-2xl font-bold mb-6">Course Modules</h2>

          <div className="space-y-4 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Module 1: The Trader's Mindset</h3>
                  <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Completed</div>
                </div>
                <p className="text-muted-foreground mb-4">
                  Understanding the psychological traits of successful traders and how to develop them.
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">5 Lessons • 45 min</span>
                  </div>
                  <Button size="sm" variant="outline" asChild>
                    <Link href="/courses/psychology/module-1">
                      Continue <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Module 2: Emotional Intelligence in Trading</h3>
                  <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">In Progress</div>
                </div>
                <p className="text-muted-foreground mb-4">
                  Recognizing and managing emotions that impact trading decisions.
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">6 Lessons • 50 min</span>
                  </div>
                  <Button size="sm" asChild>
                    <Link href="/courses/psychology/module-2">
                      Continue <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Module 3: Cognitive Biases in Trading</h3>
                  <div className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">Locked</div>
                </div>
                <p className="text-muted-foreground mb-4">
                  Understanding and overcoming common cognitive biases that affect trading decisions.
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">7 Lessons • 60 min</span>
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
                <span>22%</span>
              </div>
              <Progress value={22} className="h-2" />
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
                  <span>55%</span>
                </div>
                <Progress value={55} className="h-1.5" />
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
                <span>7</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Lessons:</span>
                <span>38</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Exercises:</span>
                <span>12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Quizzes:</span>
                <span>7</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Certificate:</span>
                <span>Yes</span>
              </div>
            </div>

            <Separator className="my-6" />

            <h3 className="font-semibold mb-4">Continue Learning</h3>
            <Button className="w-full mb-3" asChild>
              <Link href="/courses/psychology/module-2">
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

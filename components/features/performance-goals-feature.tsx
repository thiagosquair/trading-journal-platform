import Image from "next/image"
import { ArrowRight, Target, BarChart, Clock, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function PerformanceGoalsFeature() {
  return (
    <div className="grid md:grid-cols-2 gap-8 items-center py-12">
      <div className="order-2 md:order-1 rounded-lg overflow-hidden border shadow-lg">
        <Image
          src="/performance-analytics.png"
          alt="Performance Analytics Dashboard"
          width={600}
          height={400}
          className="w-full h-auto"
        />
      </div>
      <div className="order-1 md:order-2 space-y-6">
        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-blue-50 text-blue-600 border-blue-100">
          <Target className="h-3.5 w-3.5 mr-1" />
          NEW FEATURE
        </div>
        <h2 className="text-3xl font-bold tracking-tight">
          <span className="text-blue-600">Performance</span> Goals & Analytics
        </h2>
        <p className="text-muted-foreground">
          Set measurable trading goals and track your progress with our comprehensive analytics dashboard.
        </p>
        <ul className="space-y-3">
          <li className="flex items-start">
            <Target className="h-5 w-5 mr-2 text-blue-600 mt-0.5" />
            <span>Set win rate, profit, and risk/reward ratio targets</span>
          </li>
          <li className="flex items-start">
            <BarChart className="h-5 w-5 mr-2 text-blue-600 mt-0.5" />
            <span>Track progress with visual dashboards and reports</span>
          </li>
          <li className="flex items-start">
            <Clock className="h-5 w-5 mr-2 text-blue-600 mt-0.5" />
            <span>Set timeframes for short and long-term objectives</span>
          </li>
          <li className="flex items-start">
            <Lightbulb className="h-5 w-5 mr-2 text-blue-600 mt-0.5" />
            <span>Receive personalized guidance to achieve your goals</span>
          </li>
        </ul>
        <Button className="gap-2" asChild>
          <Link href="/goals">
            Set Your Goals
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}

"use client"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Target, BarChart3, Scale } from "lucide-react"

export function QuickGoalCreator() {
  const router = useRouter()

  const createWinRateGoal = () => {
    router.push("/goals/create/performance?metric=win_rate")
  }

  const createProfitTargetGoal = () => {
    router.push("/goals/create/performance?metric=profit_target")
  }

  const createRiskRewardGoal = () => {
    router.push("/goals/create/risk-management?metric=risk_reward")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Goal Setup</CardTitle>
        <CardDescription>Create your first trading goal</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 cursor-pointer"
          onClick={createWinRateGoal}
        >
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-full">
              <BarChart3 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Win Rate Goal</h3>
              <p className="text-sm text-muted-foreground">Track your percentage of winning trades</p>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            Select
          </Button>
        </div>

        <div
          className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 cursor-pointer"
          onClick={createProfitTargetGoal}
        >
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-full">
              <Target className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Profit Target Goal</h3>
              <p className="text-sm text-muted-foreground">Set a specific profit amount to achieve</p>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            Select
          </Button>
        </div>

        <div
          className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 cursor-pointer"
          onClick={createRiskRewardGoal}
        >
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-full">
              <Scale className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Risk/Reward Ratio Goal</h3>
              <p className="text-sm text-muted-foreground">Improve your trade risk management</p>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            Select
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={() => router.push("/goals")}>
          View All Goal Options
        </Button>
      </CardFooter>
    </Card>
  )
}

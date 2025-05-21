"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle } from "lucide-react"
import { GOAL_METRICS, type PerformanceGoal } from "@/lib/goals-types"
import { format } from "date-fns"

interface GoalHistoryProps {
  goals: PerformanceGoal[]
}

export function GoalHistory({ goals }: GoalHistoryProps) {
  const getMetricDetails = (metricId: string) => {
    return (
      GOAL_METRICS.find((m) => m.id === metricId) || {
        name: metricId,
        description: "",
        unit: "",
        goodDirection: "higher" as const,
      }
    )
  }

  if (goals.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No completed goals yet</h3>
        <p className="text-muted-foreground mt-2">Your completed goals will appear here</p>
      </div>
    )
  }

  // Sort goals by end date, most recent first
  const sortedGoals = [...goals].sort((a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime())

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedGoals.map((goal) => {
          const metricDetails = getMetricDetails(goal.metric)
          const isAchieved = goal.status === "achieved"

          return (
            <Card key={goal.id} className={`overflow-hidden ${isAchieved ? "border-green-200" : "border-red-200"}`}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle>{metricDetails.name}</CardTitle>
                  <Badge variant={isAchieved ? "success" : "destructive"}>
                    {isAchieved ? (
                      <>
                        <CheckCircle className="h-3 w-3 mr-1" /> Achieved
                      </>
                    ) : (
                      <>
                        <XCircle className="h-3 w-3 mr-1" /> Missed
                      </>
                    )}
                  </Badge>
                </div>
                <CardDescription>{metricDetails.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="font-medium">Target</div>
                    <div>
                      {goal.target}
                      {goal.unit === "%" ? "%" : goal.unit === "$" ? " USD" : ` ${goal.unit}`}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="font-medium">Final Value</div>
                    <div>
                      {goal.currentValue !== undefined ? goal.currentValue : 0}
                      {goal.unit === "%" ? "%" : goal.unit === "$" ? " USD" : ` ${goal.unit}`}
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <div>Time Period</div>
                    <div>
                      {format(new Date(goal.startDate), "MMM d, yyyy")} -{" "}
                      {format(new Date(goal.endDate), "MMM d, yyyy")}
                    </div>
                  </div>

                  {goal.notes && <div className="text-sm text-muted-foreground mt-2 italic">"{goal.notes}"</div>}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Clock, Edit, Trash2 } from "lucide-react"
import { GOAL_METRICS, type PerformanceGoal } from "@/lib/goals-types"
import { updateGoal, deleteGoal } from "@/lib/goals-actions"
import { differenceInDays } from "date-fns"

interface ActiveGoalsProps {
  goals: PerformanceGoal[]
}

export function ActiveGoals({ goals }: ActiveGoalsProps) {
  const [editingGoal, setEditingGoal] = useState<PerformanceGoal | null>(null)
  const [currentValue, setCurrentValue] = useState<number>(0)
  const [notes, setNotes] = useState<string>("")
  const [isUpdating, setIsUpdating] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleEditGoal = (goal: PerformanceGoal) => {
    setEditingGoal(goal)
    setCurrentValue(goal.currentValue || 0)
    setNotes(goal.notes || "")
  }

  const handleUpdateGoal = async () => {
    if (!editingGoal) return

    setIsUpdating(true)
    try {
      await updateGoal({
        id: editingGoal.id,
        currentValue,
        notes,
      })
      setEditingGoal(null)
    } catch (error) {
      console.error("Failed to update goal:", error)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDeleteGoal = async (id: string) => {
    setIsDeleting(true)
    try {
      await deleteGoal(id)
    } catch (error) {
      console.error("Failed to delete goal:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  const calculateProgress = (goal: PerformanceGoal) => {
    if (goal.currentValue === undefined) return 0
    const progress = (goal.currentValue / goal.target) * 100
    return Math.min(Math.max(progress, 0), 100) // Clamp between 0-100
  }

  const getTimeRemaining = (endDate: string) => {
    const end = new Date(endDate)
    const now = new Date()
    const daysRemaining = differenceInDays(end, now)

    if (daysRemaining < 0) return "Expired"
    if (daysRemaining === 0) return "Ends today"
    return `${daysRemaining} days remaining`
  }

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
        <h3 className="text-lg font-medium">No active goals</h3>
        <p className="text-muted-foreground mt-2">Set new goals to track your trading performance</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {goals.map((goal) => {
          const progress = calculateProgress(goal)
          const metricDetails = getMetricDetails(goal.metric)
          const timeRemaining = getTimeRemaining(goal.endDate)
          const isExpired = timeRemaining === "Expired"

          return (
            <Card key={goal.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle>{metricDetails.name}</CardTitle>
                  <Badge variant={goal.status === "not_started" ? "outline" : "default"}>
                    {goal.status === "not_started" ? "Not Started" : "In Progress"}
                  </Badge>
                </div>
                <CardDescription>{metricDetails.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="font-medium">Target</div>
                    <div>
                      {goal.target}
                      {goal.unit === "%" ? "%" : goal.unit === "$" ? " USD" : ` ${goal.unit}`}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="font-medium">Current</div>
                    <div>
                      {goal.currentValue !== undefined ? goal.currentValue : 0}
                      {goal.unit === "%" ? "%" : goal.unit === "$" ? " USD" : ` ${goal.unit}`}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>

                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-4 w-4" />
                    <span className={isExpired ? "text-destructive" : ""}>{timeRemaining}</span>
                  </div>

                  {goal.notes && <div className="text-sm text-muted-foreground mt-2 italic">"{goal.notes}"</div>}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-2">
                <Button variant="outline" size="sm" onClick={() => handleEditGoal(goal)}>
                  <Edit className="h-4 w-4 mr-1" /> Update
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive"
                  onClick={() => handleDeleteGoal(goal.id)}
                  disabled={isDeleting}
                >
                  <Trash2 className="h-4 w-4 mr-1" /> Delete
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>

      {/* Edit Goal Dialog */}
      {editingGoal && (
        <Dialog open={!!editingGoal} onOpenChange={(open) => !open && setEditingGoal(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Goal Progress</DialogTitle>
              <DialogDescription>
                Update your current progress for {getMetricDetails(editingGoal.metric).name}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="current-value">Current Value</Label>
                <div className="flex items-center">
                  <Input
                    id="current-value"
                    type="number"
                    value={currentValue}
                    onChange={(e) => setCurrentValue(Number(e.target.value))}
                    step="0.01"
                    min="0"
                  />
                  <span className="ml-2">{editingGoal.unit}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Target: {editingGoal.target} {editingGoal.unit}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add notes about your progress..."
                  rows={3}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingGoal(null)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateGoal} disabled={isUpdating}>
                {isUpdating ? "Updating..." : "Update Progress"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

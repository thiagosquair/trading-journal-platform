"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ActiveGoals } from "@/components/active-goals"
import { GoalHistory } from "@/components/goal-history"
import { CreateGoalForm } from "@/components/create-goal-form"
import { QuickGoalCreator } from "@/components/quick-goal-creator"
import { Button } from "@/components/ui/button"
import { Calculator, TrendingUp } from "lucide-react"
import type { PerformanceGoal } from "@/lib/goals-types"
import Image from "next/image"

interface GoalsDashboardProps {
  goals?: PerformanceGoal[]
}

export function GoalsDashboard({ goals = [] }: GoalsDashboardProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "active")

  const activeGoals = goals.filter((goal) => goal.status === "not_started" || goal.status === "in_progress")
  const completedGoals = goals.filter((goal) => goal.status === "achieved" || goal.status === "missed")

  // Handle URL parameters for tab selection
  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab) {
      setActiveTab(tab)
    }
  }, [searchParams])

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <div className="relative w-full h-48 rounded-lg overflow-hidden mb-6">
        <Image src="/performance-analytics.png" alt="Goals Dashboard" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-blue-600/30 flex items-center">
          <div className="px-6">
            <h1 className="text-2xl font-bold text-white">Performance Goals</h1>
            <p className="text-blue-50">Track your progress and achieve your trading targets</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <TabsList className="grid w-[400px] grid-cols-3">
          <TabsTrigger value="active">Active Goals</TabsTrigger>
          <TabsTrigger value="history">Goal History</TabsTrigger>
          <TabsTrigger value="create">Create Goal</TabsTrigger>
        </TabsList>

        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => router.push("/goals/wealth-projection")}
        >
          <Calculator className="h-4 w-4" />
          <span>Wealth Projection Calculator</span>
          <TrendingUp className="h-4 w-4 ml-1" />
        </Button>
      </div>

      <TabsContent value="active" className="pt-6">
        {activeGoals.length === 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">No Active Goals</h2>
              <p className="text-muted-foreground">
                You don't have any active goals yet. Create your first performance goal to start tracking your progress.
              </p>
            </div>
            <QuickGoalCreator />
          </div>
        ) : (
          <ActiveGoals goals={activeGoals} />
        )}
      </TabsContent>

      <TabsContent value="history" className="pt-6">
        <GoalHistory goals={completedGoals} />
      </TabsContent>

      <TabsContent value="create" className="pt-6">
        <CreateGoalForm />
      </TabsContent>
    </Tabs>
  )
}

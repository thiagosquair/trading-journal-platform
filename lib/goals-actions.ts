"use server"

import { revalidatePath } from "next/cache"
import { v4 as uuidv4 } from "uuid"
import type { CreateGoalParams, PerformanceGoal, UpdateGoalParams } from "./goals-types"

// Mock database for goals
let mockGoals: PerformanceGoal[] = [
  {
    id: "goal-1",
    userId: "user-1",
    metric: "win_rate",
    target: 60,
    currentValue: 52,
    unit: "%",
    timeframe: "monthly",
    startDate: "2023-05-01",
    endDate: "2023-05-31",
    status: "in_progress",
    notes: "Aiming to improve win rate by being more selective with trades",
    createdAt: "2023-04-28T10:00:00Z",
    updatedAt: "2023-05-15T14:30:00Z",
  },
  {
    id: "goal-2",
    userId: "user-1",
    metric: "risk_reward",
    target: 2.5,
    currentValue: 1.8,
    unit: "ratio",
    timeframe: "monthly",
    startDate: "2023-05-01",
    endDate: "2023-05-31",
    status: "in_progress",
    notes: "Working on letting winners run longer",
    createdAt: "2023-04-28T10:15:00Z",
    updatedAt: "2023-05-15T14:35:00Z",
  },
  {
    id: "goal-3",
    userId: "user-1",
    metric: "journal_entries",
    target: 15,
    currentValue: 12,
    unit: "entries",
    timeframe: "monthly",
    startDate: "2023-05-01",
    endDate: "2023-05-31",
    status: "in_progress",
    notes: "Commit to journaling every trading day",
    createdAt: "2023-04-28T10:30:00Z",
    updatedAt: "2023-05-15T14:40:00Z",
  },
]

export async function getGoals(): Promise<PerformanceGoal[]> {
  // In a real app, you would fetch from your database
  // and filter by the current user
  return mockGoals
}

export async function getGoalById(id: string): Promise<PerformanceGoal | null> {
  // In a real app, you would fetch from your database
  const goal = mockGoals.find((g) => g.id === id)
  return goal || null
}

export async function createGoal(params: CreateGoalParams): Promise<PerformanceGoal> {
  // In a real app, you would insert into your database
  const newGoal: PerformanceGoal = {
    id: uuidv4(),
    userId: "user-1", // In a real app, this would be the current user's ID
    metric: params.metric,
    target: params.target,
    currentValue: 0, // Start at 0 or appropriate initial value
    unit: params.unit,
    timeframe: params.timeframe,
    startDate: params.startDate,
    endDate: params.endDate,
    status: "not_started",
    notes: params.notes,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  mockGoals.push(newGoal)
  revalidatePath("/goals")
  return newGoal
}

export async function updateGoal(params: UpdateGoalParams): Promise<PerformanceGoal | null> {
  // In a real app, you would update your database
  const goalIndex = mockGoals.findIndex((g) => g.id === params.id)
  if (goalIndex === -1) return null

  const updatedGoal = {
    ...mockGoals[goalIndex],
    ...params,
    updatedAt: new Date().toISOString(),
  }

  mockGoals[goalIndex] = updatedGoal
  revalidatePath("/goals")
  return updatedGoal
}

export async function deleteGoal(id: string): Promise<boolean> {
  // In a real app, you would delete from your database
  const initialLength = mockGoals.length
  mockGoals = mockGoals.filter((g) => g.id !== id)

  const deleted = initialLength > mockGoals.length
  if (deleted) {
    revalidatePath("/goals")
  }

  return deleted
}

export async function calculateGoalProgress(goalId: string): Promise<number> {
  const goal = await getGoalById(goalId)
  if (!goal || goal.currentValue === undefined) return 0

  const progress = (goal.currentValue / goal.target) * 100
  return Math.min(Math.max(progress, 0), 100) // Clamp between 0-100
}

export async function updateGoalStatus(goalId: string): Promise<PerformanceGoal | null> {
  const goal = await getGoalById(goalId)
  if (!goal || goal.currentValue === undefined) return null

  let newStatus: "not_started" | "in_progress" | "achieved" | "missed" = goal.status

  const now = new Date()
  const endDate = new Date(goal.endDate)

  if (now > endDate) {
    // Goal timeframe has ended
    newStatus = goal.currentValue >= goal.target ? "achieved" : "missed"
  } else {
    // Goal timeframe is still active
    newStatus = goal.currentValue > 0 ? "in_progress" : "not_started"
  }

  if (newStatus !== goal.status) {
    return updateGoal({ id: goalId, status: newStatus })
  }

  return goal
}

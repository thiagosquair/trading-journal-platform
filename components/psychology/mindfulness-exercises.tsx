"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Brain, Clock, Play, Pause, RotateCcw, CheckCircle2, Star, Calendar, BarChart3 } from "lucide-react"
import { useState, useEffect } from "react"

type ExerciseType = {
  id: string
  name: string
  duration: number
  description: string
  benefits: string[]
  category: "breathing" | "focus" | "visualization" | "resilience"
  difficulty: "beginner" | "intermediate" | "advanced"
  completions: number
}

const exercises: ExerciseType[] = [
  {
    id: "breathing-1",
    name: "Box Breathing",
    duration: 300, // 5 minutes in seconds
    description: "A simple breathing technique to reduce stress and improve focus before trading.",
    benefits: ["Reduces pre-trade anxiety", "Improves decision-making clarity", "Helps maintain emotional balance"],
    category: "breathing",
    difficulty: "beginner",
    completions: 12,
  },
  {
    id: "focus-1",
    name: "Market Observation",
    duration: 600, // 10 minutes in seconds
    description: "A mindful observation exercise to improve your market awareness without acting.",
    benefits: ["Reduces impulsive trading", "Improves pattern recognition", "Builds patience"],
    category: "focus",
    difficulty: "intermediate",
    completions: 8,
  },
  {
    id: "visualization-1",
    name: "Successful Trading Visualization",
    duration: 480, // 8 minutes in seconds
    description: "Visualize yourself executing your trading plan with discipline and confidence.",
    benefits: ["Builds trading confidence", "Reinforces positive behaviors", "Reduces performance anxiety"],
    category: "visualization",
    difficulty: "intermediate",
    completions: 5,
  },
  {
    id: "resilience-1",
    name: "Loss Recovery Meditation",
    duration: 720, // 12 minutes in seconds
    description: "A guided meditation to help process and recover from trading losses.",
    benefits: ["Accelerates emotional recovery", "Prevents revenge trading", "Builds mental resilience"],
    category: "resilience",
    difficulty: "advanced",
    completions: 3,
  },
  {
    id: "breathing-2",
    name: "4-7-8 Breathing",
    duration: 240, // 4 minutes in seconds
    description: "A breathing technique to quickly calm your nervous system during market volatility.",
    benefits: ["Quickly reduces stress response", "Can be done during active trading", "Prevents emotional decisions"],
    category: "breathing",
    difficulty: "beginner",
    completions: 15,
  },
  {
    id: "focus-2",
    name: "Single-Point Focus",
    duration: 300, // 5 minutes in seconds
    description: "Improve concentration by focusing on a single point or object.",
    benefits: ["Enhances ability to focus on price action", "Reduces distractions", "Improves attention span"],
    category: "focus",
    difficulty: "beginner",
    completions: 7,
  },
]

type MindfulnessExercisesProps = {
  selectedExercise: string | null
  setSelectedExercise: (id: string | null) => void
}

export function MindfulnessExercises({ selectedExercise, setSelectedExercise }: MindfulnessExercisesProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [progress, setProgress] = useState(0)

  const selectedExerciseData = exercises.find((ex) => ex.id === selectedExercise)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isPlaying && selectedExercise) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setIsPlaying(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isPlaying, selectedExercise])

  useEffect(() => {
    if (selectedExerciseData) {
      setTimeRemaining(selectedExerciseData.duration)
    }
  }, [selectedExerciseData])

  useEffect(() => {
    if (selectedExerciseData) {
      const totalDuration = selectedExerciseData.duration
      const elapsed = totalDuration - timeRemaining
      const newProgress = (elapsed / totalDuration) * 100
      setProgress(newProgress)
    }
  }, [timeRemaining, selectedExerciseData])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleStart = () => {
    setIsPlaying(true)
  }

  const handlePause = () => {
    setIsPlaying(false)
  }

  const handleReset = () => {
    setIsPlaying(false)
    if (selectedExerciseData) {
      setTimeRemaining(selectedExerciseData.duration)
    }
    setProgress(0)
  }

  const handleComplete = () => {
    setIsPlaying(false)
    setSelectedExercise(null)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-500"
      case "intermediate":
        return "bg-amber-500"
      case "advanced":
        return "bg-red-500"
      default:
        return "bg-blue-500"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "breathing":
        return <Brain className="h-4 w-4 text-purple-500" />
      case "focus":
        return <Star className="h-4 w-4 text-amber-500" />
      case "visualization":
        return <BarChart3 className="h-4 w-4 text-blue-500" />
      case "resilience":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      default:
        return <Brain className="h-4 w-4" />
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Mindfulness Exercises</CardTitle>
          <CardDescription>Improve your trading psychology with these mindfulness practices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Exercise Library</h3>
                <p className="text-sm text-muted-foreground">Select an exercise to begin</p>
              </div>
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                <span className="text-sm">Streak: 5 days</span>
              </div>
            </div>

            <div className="space-y-2">
              {exercises.map((exercise) => (
                <div
                  key={exercise.id}
                  className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                    selectedExercise === exercise.id ? "bg-muted border-primary" : "hover:bg-muted/50"
                  }`}
                  onClick={() => setSelectedExercise(exercise.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {getCategoryIcon(exercise.category)}
                      <span className="font-medium ml-2">{exercise.name}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      <span className="text-xs">{formatTime(exercise.duration)}</span>
                    </div>
                  </div>

                  <div className="flex items-center mt-2">
                    <span className={`h-2 w-2 rounded-full mr-2 ${getDifficultyColor(exercise.difficulty)}`}></span>
                    <span className="text-xs capitalize">{exercise.difficulty}</span>
                    <Badge variant="outline" className="ml-auto text-xs">
                      {exercise.completions} {exercise.completions === 1 ? "completion" : "completions"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        {selectedExerciseData ? (
          <>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{selectedExerciseData.name}</CardTitle>
                  <CardDescription>
                    {selectedExerciseData.category.charAt(0).toUpperCase() + selectedExerciseData.category.slice(1)}{" "}
                    Exercise
                  </CardDescription>
                </div>
                <Badge variant="outline" className="capitalize">
                  {selectedExerciseData.difficulty}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>{selectedExerciseData.description}</p>

              <div>
                <h4 className="text-sm font-medium mb-2">Benefits:</h4>
                <ul className="space-y-1">
                  {selectedExerciseData.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start text-sm">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{formatTime(timeRemaining)}</span>
                  <span className="text-sm text-muted-foreground">{formatTime(selectedExerciseData.duration)}</span>
                </div>

                <Progress value={progress} className="h-2" />

                <div className="flex items-center justify-center space-x-4">
                  {isPlaying ? (
                    <Button variant="outline" size="icon" onClick={handlePause}>
                      <Pause className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button variant="outline" size="icon" onClick={handleStart}>
                      <Play className="h-4 w-4" />
                    </Button>
                  )}

                  <Button variant="outline" size="icon" onClick={handleReset}>
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <Button variant="ghost" onClick={() => setSelectedExercise(null)}>
                Back to Library
              </Button>
              <Button onClick={handleComplete}>Complete Exercise</Button>
            </CardFooter>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full py-16">
            <Brain className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">Select an Exercise</h3>
            <p className="text-sm text-muted-foreground text-center max-w-xs mt-2">
              Choose a mindfulness exercise from the library to improve your trading psychology
            </p>
          </div>
        )}
      </Card>
    </div>
  )
}

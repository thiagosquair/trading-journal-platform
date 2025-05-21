"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Lightbulb, Target, Scale } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { CognitiveAssessment } from "@/components/psychology/cognitive-assessment"
import { MoodTracker } from "@/components/psychology/mood-tracker"
import { TradingPersonality } from "@/components/psychology/trading-personality"
import { MindfulnessExercises } from "@/components/psychology/mindfulness-exercises"
import { PreTradeChecklist } from "@/components/psychology/pre-trade-checklist"
import Image from "next/image"

export function PsychologyDashboard() {
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null)

  return (
    <div className="flex flex-col min-h-full">
      <div className="relative w-full h-48 rounded-lg overflow-hidden mb-6">
        <Image
          src="/trading-psychology-banner.png"
          alt="Trading Psychology"
          width={1200}
          height={400}
          className="object-cover w-full h-full"
          priority
        />
        <div className="absolute inset-0 flex items-center">
          <div className="px-6">
            <h1 className="text-2xl font-bold text-white">Trading Psychology</h1>
            <p className="text-blue-50">Master your mind to master the markets</p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Emotional Balance</CardTitle>
              <Brain className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">72%</div>
              <p className="text-xs text-muted-foreground">+5% improvement this month</p>
              <Progress value={72} className="mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Discipline Score</CardTitle>
              <Target className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85/100</div>
              <p className="text-xs text-muted-foreground">Based on plan adherence</p>
              <Progress value={85} className="mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mindfulness</CardTitle>
              <Lightbulb className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8/10</div>
              <p className="text-xs text-muted-foreground">Based on your self-assessments</p>
              <Progress value={80} className="mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Risk Tolerance</CardTitle>
              <Scale className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Moderate</div>
              <p className="text-xs text-muted-foreground">Based on your risk assessment</p>
              <Progress value={60} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="cognitive" className="w-full">
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="cognitive">Cognitive Biases</TabsTrigger>
            <TabsTrigger value="mood">Mood Tracker</TabsTrigger>
            <TabsTrigger value="personality">Personality</TabsTrigger>
            <TabsTrigger value="mindfulness">Mindfulness</TabsTrigger>
            <TabsTrigger value="checklist">Pre-Trade Checklist</TabsTrigger>
          </TabsList>

          <TabsContent value="cognitive" className="mt-6">
            <CognitiveAssessment />
          </TabsContent>

          <TabsContent value="mood" className="mt-6">
            <MoodTracker />
          </TabsContent>

          <TabsContent value="personality" className="mt-6">
            <TradingPersonality />
          </TabsContent>

          <TabsContent value="mindfulness" className="mt-6">
            <MindfulnessExercises selectedExercise={selectedExercise} setSelectedExercise={setSelectedExercise} />
          </TabsContent>

          <TabsContent value="checklist" className="mt-6">
            <PreTradeChecklist />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

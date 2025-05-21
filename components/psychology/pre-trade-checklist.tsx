"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, ClipboardList, Edit } from "lucide-react"

type ChecklistItem = {
  id: string
  text: string
  checked: boolean
  category: "preparation" | "analysis" | "execution" | "risk" | "mindset"
}

const defaultChecklist: ChecklistItem[] = [
  {
    id: "prep-1",
    text: "I have reviewed my trading plan for the day",
    checked: false,
    category: "preparation",
  },
  {
    id: "prep-2",
    text: "I have checked major news events and announcements",
    checked: false,
    category: "preparation",
  },
  {
    id: "prep-3",
    text: "I have set clear goals for today's trading session",
    checked: false,
    category: "preparation",
  },
  {
    id: "analysis-1",
    text: "I have identified key support and resistance levels",
    checked: false,
    category: "analysis",
  },
  {
    id: "analysis-2",
    text: "I have analyzed multiple timeframes",
    checked: false,
    category: "analysis",
  },
  {
    id: "analysis-3",
    text: "I have confirmed my analysis with multiple indicators",
    checked: false,
    category: "analysis",
  },
  {
    id: "risk-1",
    text: "I have calculated my position size based on risk parameters",
    checked: false,
    category: "risk",
  },
  {
    id: "risk-2",
    text: "I have set my stop loss and take profit levels",
    checked: false,
    category: "risk",
  },
  {
    id: "risk-3",
    text: "This trade fits within my daily/weekly risk limits",
    checked: false,
    category: "risk",
  },
  {
    id: "mindset-1",
    text: "I am trading with a clear and focused mind",
    checked: false,
    category: "mindset",
  },
  {
    id: "mindset-2",
    text: "I am not feeling FOMO or revenge trading urges",
    checked: false,
    category: "mindset",
  },
  {
    id: "mindset-3",
    text: "I have done a quick mindfulness exercise before trading",
    checked: false,
    category: "mindset",
  },
  {
    id: "execution-1",
    text: "This trade aligns with my trading strategy",
    checked: false,
    category: "execution",
  },
  {
    id: "execution-2",
    text: "I have a clear exit strategy for both profit and loss",
    checked: false,
    category: "execution",
  },
  {
    id: "execution-3",
    text: "I have considered alternative scenarios if the trade doesn't go as planned",
    checked: false,
    category: "execution",
  },
]

export function PreTradeChecklist() {
  const [checklist, setChecklist] = useState<ChecklistItem[]>(defaultChecklist)
  const [notes, setNotes] = useState("")
  const [newItemText, setNewItemText] = useState("")
  const [newItemCategory, setNewItemCategory] = useState<ChecklistItem["category"]>("preparation")
  const [editMode, setEditMode] = useState(false)

  const handleCheckChange = (id: string, checked: boolean) => {
    setChecklist((prev) => prev.map((item) => (item.id === id ? { ...item, checked } : item)))
  }

  const addNewItem = () => {
    if (!newItemText.trim()) return

    const newItem: ChecklistItem = {
      id: `custom-${Date.now()}`,
      text: newItemText,
      checked: false,
      category: newItemCategory,
    }

    setChecklist((prev) => [...prev, newItem])
    setNewItemText("")
  }

  const deleteItem = (id: string) => {
    setChecklist((prev) => prev.filter((item) => item.id !== id))
  }

  const resetChecklist = () => {
    setChecklist((prev) => prev.map((item) => ({ ...item, checked: false })))
    setNotes("")
  }

  const saveChecklist = () => {
    // In a real app, this would save to a database
    alert("Checklist saved successfully!")
  }

  const getCompletionStatus = () => {
    const totalItems = checklist.length
    const checkedItems = checklist.filter((item) => item.checked).length
    return {
      percentage: totalItems > 0 ? Math.round((checkedItems / totalItems) * 100) : 0,
      checkedItems,
      totalItems,
    }
  }

  const { percentage, checkedItems, totalItems } = getCompletionStatus()

  const getCategoryItems = (category: ChecklistItem["category"]) => {
    return checklist.filter((item) => item.category === category)
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Pre-Trade Checklist</CardTitle>
              <CardDescription>Ensure you're prepared before entering a trade</CardDescription>
            </div>
            <div className="flex items-center">
              <Button variant="ghost" size="sm" className="mr-2" onClick={() => setEditMode(!editMode)}>
                {editMode ? (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Done
                  </>
                ) : (
                  <>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </>
                )}
              </Button>
              <Button variant="outline" size="sm" onClick={resetChecklist}>
                Reset
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <ClipboardList className="h-5 w-5 mr-2 text-blue-500" />
                <span className="font-medium">Completion Status</span>
              </div>
              <span
                className={`font-medium ${
                  percentage >= 80 ? "text-green-500" : percentage >= 50 ? "text-amber-500" : "text-red-500"
                }`}
              >
                {percentage}% ({checkedItems}/{totalItems})
              </span>
            </div>

            <Tabs defaultValue="preparation">
              <TabsList className="grid grid-cols-5">
                <TabsTrigger value="preparation">Prep</TabsTrigger>
                <TabsTrigger value="analysis">Analysis</TabsTrigger>
                <TabsTrigger value="risk">Risk</TabsTrigger>
                <TabsTrigger value="mindset">Mindset</TabsTrigger>
                <TabsTrigger value="execution">Execution</TabsTrigger>
              </TabsList>

              {(["preparation", "analysis", "risk", "mindset", "execution"] as const).map((category) => (
                <TabsContent key={category} value={category} className="space-y-4 pt-4">
                  {getCategoryItems(category).map((item) => (
                    <div key={item.id} className="flex items-start space-x-2">
                      <Checkbox
                        id={item.id}
                        checked={item.checked}
                        onCheckedChange={(checked) => handleCheckChange(item.id, checked === true)}
                      />
                      <div className="flex-1">
                        <Label
                          htmlFor={item.id}
                          className={`${item.checked ? "line-through text-muted-foreground" : ""}`}
                        >
                          {item.text}
                        </Label>
                      </div>
                      {editMode && (
                        <Button variant="ghost" size="sm" className="ml-2" onClick={() => deleteItem(item.id)}>
                          Delete
                        </Button>
                      )}
                    </div>
                  ))}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Enhanced Psychology Dashboard</CardTitle>
          <CardDescription>
            A comprehensive overview with mental resilience score, risk tolerance, decision quality, and emotional
            control.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="font-medium">Mental Resilience Score</span>
              </div>
              <span className="font-medium text-green-500">85%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="font-medium">Risk Tolerance</span>
              </div>
              <span className="font-medium text-amber-500">Medium</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="font-medium">Decision Quality</span>
              </div>
              <span className="font-medium text-green-500">High</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="font-medium">Emotional Control</span>
              </div>
              <span className="font-medium text-green-500">Strong</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="font-medium">Weekly Mental State Tracker</span>
              </div>
              <span className="font-medium text-blue-500">View Trends</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="font-medium">Quick Access to Psychology Tools</span>
              </div>
              <span className="font-medium text-blue-500">Access Tools</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Cognitive Bias Assessment</CardTitle>
          <CardDescription>
            Identifies 8 common trading biases and provides personalized bias profile with strengths and weaknesses.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="font-medium">Confirmation Bias</span>
              </div>
              <span className="font-medium text-red-500">Weakness</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="font-medium">Recency Bias</span>
              </div>
              <span className="font-medium text-green-500">Strength</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="font-medium">Anchoring Bias</span>
              </div>
              <span className="font-medium text-red-500">Weakness</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="font-medium">Overconfidence Bias</span>
              </div>
              <span className="font-medium text-red-500">Weakness</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="font-medium">Loss Aversion Bias</span>
              </div>
              <span className="font-medium text-green-500">Strength</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="font-medium">Hindsight Bias</span>
              </div>
              <span className="font-medium text-red-500">Weakness</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="font-medium">Availability Heuristic Bias</span>
              </div>
              <span className="font-medium text-green-500">Strength</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="font-medium">Representativeness Heuristic Bias</span>
              </div>
              <span className="font-medium text-red-500">Weakness</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Advanced Mood Tracker</CardTitle>
          <CardDescription>
            Correlates emotional states with trading performance and visualizes patterns.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="font-medium">Emotional State</span>
              </div>
              <span className="font-medium text-blue-500">Neutral</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="font-medium">Trading Performance</span>
              </div>
              <span className="font-medium text-green-500">Profitable</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="font-medium">Optimal Emotional State for Trading</span>
              </div>
              <span className="font-medium text-blue-500">Focused</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="font-medium">Actionable Insights</span>
              </div>
              <span className="font-medium text-blue-500">Improve Focus</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Trading Personality Profile</CardTitle>
          <CardDescription>Identifies your trading personality type and recommends strategies.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="font-medium">Trading Personality Type</span>
              </div>
              <span className="font-medium text-blue-500">Analyst</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="font-medium">Strengths</span>
              </div>
              <span className="font-medium text-green-500">Analytical Skills</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="font-medium">Weaknesses</span>
              </div>
              <span className="font-medium text-red-500">Emotional Control</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="font-medium">Recommended Strategies</span>
              </div>
              <span className="font-medium text-blue-500">Disciplined Approach</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="font-medium">Areas for Personal Development</span>
              </div>
              <span className="font-medium text-blue-500">Enhance Emotional Control</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Mindfulness Exercises</CardTitle>
          <CardDescription>Guided mindfulness exercises for traders.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="font-medium">Pre-Market Meditation</span>
              </div>
              <span className="font-medium text-blue-500">Prepare Mentally</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="font-medium">Mid-Day Reset Exercises</span>
              </div>
              <span className="font-medium text-blue-500">Maintain Focus</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="font-medium">Post-Trading Reflection Practices</span>
              </div>
              <span className="font-medium text-blue-500">Reflect on Trades</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="font-medium">Stress Reduction Techniques</span>
              </div>
              <span className="font-medium text-blue-500">Manage Stress</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="font-medium">Audio-Guided Sessions with Timer Functionality</span>
              </div>
              <span className="font-medium text-blue-500">Guided Sessions</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Pre-Trade Checklist System</CardTitle>
          <CardDescription>
            Mental state assessment before entering trades and customizable checklist templates.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="font-medium">Mental State Assessment</span>
              </div>
              <span className="font-medium text-blue-500">Assess Before Trading</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="font-medium">Customizable Checklist Templates</span>
              </div>
              <span className="font-medium text-blue-500">Create Templates</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="font-medium">Track Adherence to Trading Plan</span>
              </div>
              <span className="font-medium text-blue-500">Track Adherence</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="font-medium">Insights on Preparation Impact</span>
              </div>
              <span className="font-medium text-blue-500">View Insights</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

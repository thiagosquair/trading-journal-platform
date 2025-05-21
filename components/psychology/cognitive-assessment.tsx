"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { AlertTriangle, CheckCircle2, HelpCircle, Info } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

type BiasType = {
  name: string
  score: number
  description: string
  impact: string
  improvement: string
}

const biasData: BiasType[] = [
  {
    name: "Confirmation Bias",
    score: 65,
    description: "The tendency to search for information that confirms your preexisting beliefs.",
    impact: "You may ignore signals that contradict your trade thesis.",
    improvement: "Actively seek out contradictory information before making trading decisions.",
  },
  {
    name: "Loss Aversion",
    score: 78,
    description: "The tendency to prefer avoiding losses over acquiring equivalent gains.",
    impact: "You may cut winning trades too early and let losing trades run too long.",
    improvement: "Use predetermined stop losses and take profits to remove emotion from the equation.",
  },
  {
    name: "Recency Bias",
    score: 42,
    description: "The tendency to place more importance on recent events than older ones.",
    impact: "You may overreact to recent market movements and ignore long-term trends.",
    improvement: "Maintain a trading journal to track long-term patterns and review regularly.",
  },
  {
    name: "Overconfidence",
    score: 58,
    description: "The tendency to overestimate your knowledge, abilities, and precision of your information.",
    impact: "You may take on excessive risk or trade with position sizes that are too large.",
    improvement: "Track your prediction accuracy and adjust confidence levels accordingly.",
  },
  {
    name: "Anchoring",
    score: 71,
    description: "The tendency to rely too heavily on the first piece of information encountered.",
    impact: "You may fixate on entry prices or previous highs/lows rather than current market conditions.",
    improvement: "Regularly reassess your positions based on new information and current market context.",
  },
]

export function CognitiveAssessment() {
  const [showDetails, setShowDetails] = useState<string | null>(null)
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})

  const assessmentQuestions = [
    {
      id: "q1",
      question:
        "I often look for information that confirms my existing trading ideas rather than seeking out contradictory evidence.",
      bias: "Confirmation Bias",
      reverse: false,
    },
    {
      id: "q2",
      question: "I feel more upset about losing $500 than I feel happy about gaining $500.",
      bias: "Loss Aversion",
      reverse: false,
    },
    {
      id: "q3",
      question: "My recent trading results influence my next trades more than my long-term performance.",
      bias: "Recency Bias",
      reverse: false,
    },
    {
      id: "q4",
      question: "I'm usually right about where the market is heading.",
      bias: "Overconfidence",
      reverse: false,
    },
    {
      id: "q5",
      question: "I often find myself fixating on my entry price when deciding whether to exit a trade.",
      bias: "Anchoring",
      reverse: false,
    },
    {
      id: "q6",
      question: "I regularly seek out information that might contradict my trading thesis.",
      bias: "Confirmation Bias",
      reverse: true,
    },
    {
      id: "q7",
      question: "I strictly follow my predetermined stop losses regardless of how I feel about the trade.",
      bias: "Loss Aversion",
      reverse: true,
    },
    {
      id: "q8",
      question: "I consider long-term market patterns as much as recent price movements.",
      bias: "Recency Bias",
      reverse: true,
    },
    {
      id: "q9",
      question: "I regularly review my past predictions to check their accuracy.",
      bias: "Overconfidence",
      reverse: true,
    },
    {
      id: "q10",
      question: "I reassess my positions based on new information rather than sticking to my initial analysis.",
      bias: "Anchoring",
      reverse: true,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cognitive Bias Assessment</CardTitle>
        <CardDescription>Understand how cognitive biases affect your trading decisions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Your Bias Profile</h3>
            <p className="text-sm text-muted-foreground">Last updated: May 15, 2025</p>
          </div>
          <Button onClick={() => setIsAssessmentOpen(true)}>Take New Assessment</Button>
        </div>

        <div className="space-y-4">
          {biasData.map((bias) => (
            <div key={bias.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="font-medium">{bias.name}</span>
                  {bias.score > 70 && (
                    <Badge variant="destructive" className="ml-2">
                      High
                    </Badge>
                  )}
                  {bias.score > 40 && bias.score <= 70 && (
                    <Badge variant="outline" className="ml-2">
                      Moderate
                    </Badge>
                  )}
                  {bias.score <= 40 && (
                    <Badge variant="secondary" className="ml-2">
                      Low
                    </Badge>
                  )}
                </div>
                <span className="text-sm">{bias.score}/100</span>
              </div>
              <Progress value={bias.score} className="h-2" />

              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowDetails(showDetails === bias.name ? null : bias.name)}
                >
                  {showDetails === bias.name ? "Hide Details" : "Show Details"}
                </Button>
              </div>

              {showDetails === bias.name && (
                <div className="bg-muted/50 p-4 rounded-md mt-2 space-y-3">
                  <div>
                    <div className="flex items-center">
                      <Info className="h-4 w-4 mr-2 text-blue-500" />
                      <span className="font-medium">Description</span>
                    </div>
                    <p className="text-sm ml-6">{bias.description}</p>
                  </div>

                  <div>
                    <div className="flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                      <span className="font-medium">Trading Impact</span>
                    </div>
                    <p className="text-sm ml-6">{bias.impact}</p>
                  </div>

                  <div>
                    <div className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                      <span className="font-medium">Improvement Strategy</span>
                    </div>
                    <p className="text-sm ml-6">{bias.improvement}</p>
                  </div>
                </div>
              )}

              <Separator className="my-2" />
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          <span className="flex items-center">
            <HelpCircle className="h-4 w-4 mr-1" />
            Understanding your biases is the first step to overcoming them
          </span>
        </div>
        <Button variant="outline">Download Report</Button>
      </CardFooter>
      <Dialog open={isAssessmentOpen} onOpenChange={setIsAssessmentOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Cognitive Bias Assessment</DialogTitle>
            <DialogDescription>
              Answer the following questions to assess your cognitive biases in trading.
            </DialogDescription>
          </DialogHeader>

          {currentQuestion < assessmentQuestions.length ? (
            <>
              <div className="py-4">
                <h3 className="font-medium mb-2">
                  Question {currentQuestion + 1} of {assessmentQuestions.length}
                </h3>
                <Progress value={(currentQuestion / assessmentQuestions.length) * 100} className="h-2 mb-4" />
                <p className="mb-4">{assessmentQuestions[currentQuestion].question}</p>

                <RadioGroup
                  value={answers[assessmentQuestions[currentQuestion].id]?.toString() || ""}
                  onValueChange={(value) => {
                    setAnswers({
                      ...answers,
                      [assessmentQuestions[currentQuestion].id]: Number.parseInt(value),
                    })
                  }}
                >
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1" id="r1" />
                      <Label htmlFor="r1">Strongly Disagree</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="2" id="r2" />
                      <Label htmlFor="r2">Disagree</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="3" id="r3" />
                      <Label htmlFor="r3">Neutral</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="4" id="r4" />
                      <Label htmlFor="r4">Agree</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="5" id="r5" />
                      <Label htmlFor="r5">Strongly Agree</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    if (currentQuestion > 0) {
                      setCurrentQuestion(currentQuestion - 1)
                    } else {
                      setIsAssessmentOpen(false)
                    }
                  }}
                >
                  {currentQuestion > 0 ? "Previous" : "Cancel"}
                </Button>
                <Button
                  onClick={() => {
                    if (answers[assessmentQuestions[currentQuestion].id] !== undefined) {
                      if (currentQuestion < assessmentQuestions.length - 1) {
                        setCurrentQuestion(currentQuestion + 1)
                      } else {
                        // Calculate results and update biases
                        const newBiasData = [...biasData]
                        // Simple calculation for demo purposes
                        Object.entries(answers).forEach(([id, value]) => {
                          const question = assessmentQuestions.find((q) => q.id === id)
                          if (question) {
                            const biasIndex = newBiasData.findIndex((b) => b.name === question.bias)
                            if (biasIndex !== -1) {
                              // Update score based on answer (simplified)
                              newBiasData[biasIndex].score = Math.min(
                                100,
                                Math.max(
                                  0,
                                  newBiasData[biasIndex].score + (question.reverse ? 6 - value : value) * 5 - 15,
                                ),
                              )
                            }
                          }
                        })

                        // In a real app, you would save this to the database
                        // For now, we'll just close the dialog
                        setIsAssessmentOpen(false)
                        setCurrentQuestion(0)
                        setAnswers({})
                      }
                    }
                  }}
                  disabled={answers[assessmentQuestions[currentQuestion].id] === undefined}
                >
                  {currentQuestion < assessmentQuestions.length - 1 ? "Next" : "Complete Assessment"}
                </Button>
              </DialogFooter>
            </>
          ) : (
            <div className="py-4">
              <p>Processing your results...</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  )
}

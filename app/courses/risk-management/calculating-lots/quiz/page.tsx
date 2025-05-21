"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface Question {
  id: number
  text: string
  options: string[]
  correctAnswer: number
  explanation: string
}

const questions: Question[] = [
  {
    id: 1,
    text: "What is the recommended risk percentage per trade for most traders?",
    options: ["5-10%", "3-5%", "1-2%", "0.1-0.5%"],
    correctAnswer: 2,
    explanation:
      "Most professional traders recommend risking only 1-2% of your account on any single trade. This helps protect your capital from significant drawdowns.",
  },
  {
    id: 2,
    text: "What is the standard lot size for Forex trading?",
    options: ["1,000 units", "10,000 units", "100,000 units", "1,000,000 units"],
    correctAnswer: 2,
    explanation:
      "A standard lot in Forex is 100,000 units of the base currency. This is why a 1 pip move in a standard lot typically equals $10 for USD-based pairs.",
  },
  {
    id: 3,
    text: "If your account is $5,000 and you want to risk 2% on a trade with a 25 pip stop loss, what lot size should you use for EUR/USD (assuming $10 per pip for standard lot)?",
    options: ["0.4 lots", "0.8 lots", "1.2 lots", "2.0 lots"],
    correctAnswer: 0,
    explanation:
      "Risk amount = $5,000 × 2% = $100. Lot size = $100 / (25 pips × $10 per pip) = $100 / $250 = 0.4 lots.",
  },
  {
    id: 4,
    text: "What is the standard lot size for Gold (XAU/USD)?",
    options: ["1 oz", "10 oz", "100 oz", "1,000 oz"],
    correctAnswer: 2,
    explanation:
      "A standard lot for Gold (XAU/USD) is 100 ounces. This is why a $1 move in gold price equals $100 profit/loss with a standard lot.",
  },
  {
    id: 5,
    text: "Which of the following is NOT a consequence of incorrect lot sizing?",
    options: ["Margin calls", "Blown accounts", "Inconsistent risk across instruments", "Higher commission rates"],
    correctAnswer: 3,
    explanation:
      "While incorrect lot sizing can lead to margin calls, blown accounts, and inconsistent risk, it doesn't directly affect commission rates, which are set by brokers.",
  },
]

export default function CalculatingLotsQuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(Array(questions.length).fill(-1))
  const [showResults, setShowResults] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)

  const handleAnswerSelect = (answerIndex: number) => {
    const newSelectedAnswers = [...selectedAnswers]
    newSelectedAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newSelectedAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setShowExplanation(false)
    } else {
      setShowResults(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setShowExplanation(false)
    }
  }

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return answer === questions[index].correctAnswer ? score + 1 : score
    }, 0)
  }

  const score = calculateScore()
  const percentage = Math.round((score / questions.length) * 100)

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link href="/courses/risk-management/calculating-lots">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Lesson
          </Link>
        </Button>
      </div>

      <h1 className="text-3xl font-bold tracking-tight mb-4">Risk Management: Calculating Lots Quiz</h1>
      <p className="text-muted-foreground mb-8">
        Test your knowledge of lot size calculation and risk management principles.
      </p>

      {!showResults ? (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {questions.length}
              </div>
              <div className="text-sm font-medium">
                {Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete
              </div>
            </div>
            <Progress value={((currentQuestion + 1) / questions.length) * 100} className="h-2" />
            <CardTitle className="mt-4">{questions[currentQuestion].text}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={selectedAnswers[currentQuestion].toString()}
              onValueChange={(value) => handleAnswerSelect(Number.parseInt(value))}
            >
              {questions[currentQuestion].options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 py-2">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
              Previous
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowExplanation(!showExplanation)}
              disabled={selectedAnswers[currentQuestion] === -1}
            >
              {showExplanation ? "Hide Explanation" : "Show Explanation"}
            </Button>
            <Button onClick={handleNext} disabled={selectedAnswers[currentQuestion] === -1}>
              {currentQuestion < questions.length - 1 ? "Next" : "Finish"}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Quiz Results</CardTitle>
            <CardDescription>
              You scored {score} out of {questions.length} ({percentage}%)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Score</span>
                <span>{percentage}%</span>
              </div>
              <Progress
                value={percentage}
                className="h-2"
                indicatorColor={percentage >= 80 ? "bg-green-500" : percentage >= 60 ? "bg-amber-500" : "bg-red-500"}
              />
            </div>

            <div className="space-y-4 mt-6">
              {questions.map((question, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start">
                    {selectedAnswers[index] === question.correctAnswer ? (
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                    )}
                    <div>
                      <p className="font-medium">{question.text}</p>
                      <p className="text-sm mt-1">
                        Your answer:{" "}
                        <span
                          className={
                            selectedAnswers[index] === question.correctAnswer
                              ? "text-green-600 font-medium"
                              : "text-red-600 font-medium"
                          }
                        >
                          {question.options[selectedAnswers[index]]}
                        </span>
                      </p>
                      {selectedAnswers[index] !== question.correctAnswer && (
                        <p className="text-sm mt-1">
                          Correct answer:{" "}
                          <span className="text-green-600 font-medium">{question.options[question.correctAnswer]}</span>
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground mt-2">{question.explanation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/courses/risk-management/calculating-lots">Review Lesson</Link>
            </Button>
            <Button asChild>
              <Link href="/courses/risk-management/position-sizing">
                Next Lesson <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      )}

      {showExplanation && !showResults && (
        <Alert className="mt-6">
          <AlertTitle>Explanation</AlertTitle>
          <AlertDescription>{questions[currentQuestion].explanation}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}

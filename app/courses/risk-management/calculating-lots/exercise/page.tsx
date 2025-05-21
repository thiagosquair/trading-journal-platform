"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function CalculatingLotsExercisePage() {
  const [lotSize, setLotSize] = useState<string>("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showHint, setShowHint] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Calculate the correct answer
    // Account: $2,000, Risk: 1.5% = $30
    // Stop-loss: 15 pips, Pip value: $10 per pip (standard lot)
    // Lot size = 30 / (15 * 10) = 0.2 lots

    const userAnswer = Number.parseFloat(lotSize)
    const correctAnswer = 0.2

    // Allow for small rounding differences
    const isAnswerCorrect = Math.abs(userAnswer - correctAnswer) < 0.01

    setIsCorrect(isAnswerCorrect)
    setIsSubmitted(true)
  }

  const resetExercise = () => {
    setLotSize("")
    setIsSubmitted(false)
    setIsCorrect(false)
    setShowHint(false)
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link href="/courses/risk-management/calculating-lots">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Lesson
          </Link>
        </Button>
      </div>

      <h1 className="text-3xl font-bold tracking-tight mb-4">Practice Exercise: Calculating Lot Size</h1>
      <p className="text-muted-foreground mb-8">
        Apply what you've learned about lot size calculation to solve this practical exercise.
      </p>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Exercise: Calculate the Appropriate Lot Size</CardTitle>
          <CardDescription>
            Based on the given parameters, calculate the correct lot size for this trade.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold mb-2">Scenario:</h3>
            <ul className="space-y-1">
              <li>• Account: $2,000</li>
              <li>• Risk: 1.5% of account</li>
              <li>• Trading EUR/USD</li>
              <li>• Stop-loss: 15 pips</li>
              <li>• Pip value: $10 per pip (standard lot)</li>
            </ul>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="lotSize">Your Answer (Lot Size)</Label>
                <Input
                  id="lotSize"
                  type="number"
                  step="0.01"
                  placeholder="Enter lot size"
                  value={lotSize}
                  onChange={(e) => setLotSize(e.target.value)}
                  disabled={isSubmitted}
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          {!isSubmitted ? (
            <>
              <Button variant="outline" type="button" onClick={() => setShowHint(!showHint)}>
                {showHint ? "Hide Hint" : "Show Hint"}
              </Button>
              <Button type="submit" onClick={handleSubmit}>
                Submit Answer
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={resetExercise}>
                Try Again
              </Button>
              <Button asChild>
                <Link href="/courses/risk-management/calculating-lots/quiz">
                  Continue to Quiz <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </>
          )}
        </CardFooter>
      </Card>

      {showHint && !isSubmitted && (
        <Alert className="mb-8">
          <AlertTitle>Hint</AlertTitle>
          <AlertDescription>
            <p className="mb-2">Remember the formula:</p>
            <p className="font-mono bg-gray-100 p-2 rounded">
              Lot Size = (Account Balance × Risk %) / (Stop Loss in Pips × Pip Value)
            </p>
            <p className="mt-2">
              First calculate the dollar risk amount, then divide by the total pip value of your stop loss.
            </p>
          </AlertDescription>
        </Alert>
      )}

      {isSubmitted && (
        <Alert variant={isCorrect ? "default" : "destructive"} className="mb-8">
          {isCorrect ? (
            <>
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Correct!</AlertTitle>
              <AlertDescription>
                <p className="mb-2">That's right! The correct lot size is 0.2 lots.</p>
                <p className="font-mono bg-gray-100 p-2 rounded my-2">
                  Risk amount = $2,000 × 1.5% = $30
                  <br />
                  Lot size = $30 / (15 pips × $10 per pip) = $30 / $150 = 0.2 lots
                </p>
                <p>
                  This means you should trade 0.2 lots to risk exactly 1.5% of your account with a 15 pip stop loss.
                </p>
              </AlertDescription>
            </>
          ) : (
            <>
              <XCircle className="h-4 w-4" />
              <AlertTitle>Not quite right</AlertTitle>
              <AlertDescription>
                <p>Let's walk through the calculation:</p>
                <ol className="list-decimal list-inside space-y-1 mt-2 mb-2">
                  <li>Calculate the risk amount: $2,000 × 1.5% = $30</li>
                  <li>Calculate the total pip value of your stop loss: 15 pips × $10 per pip = $150</li>
                  <li>Divide risk amount by total pip value: $30 / $150 = 0.2 lots</li>
                </ol>
                <p>Try again with this approach.</p>
              </AlertDescription>
            </>
          )}
        </Alert>
      )}
    </div>
  )
}

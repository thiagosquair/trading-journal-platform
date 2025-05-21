"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon, Scale } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function RiskRewardGuidance() {
  const router = useRouter()

  const navigateToGoals = () => {
    router.push("/goals?create=true&metric=risk_reward")
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Scale className="h-5 w-5 text-primary" />
          Risk/Reward Ratio Goal
        </CardTitle>
        <CardDescription>
          Learn how to set an effective risk/reward ratio goal to improve your trading profitability
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h3 className="font-medium">What is Risk/Reward Ratio?</h3>
          <p className="text-sm text-muted-foreground">
            Risk/reward ratio measures the potential profit (reward) compared to the potential loss (risk) for each
            trade. For example, a 1:3 risk/reward ratio means you're risking $1 to potentially gain $3.
          </p>
        </div>

        <div className="rounded-lg overflow-hidden border">
          <div className="bg-muted p-4">
            <h4 className="font-medium mb-2">Risk/Reward Ratio Example</h4>
            <div className="relative h-[200px] w-full bg-background rounded-md overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                <p>Risk/Reward Visualization</p>
              </div>
            </div>
          </div>
          <div className="p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Entry Price:</span>
              <span className="font-medium">$100.00</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Stop Loss:</span>
              <span className="font-medium text-destructive">$95.00 (-$5.00)</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Take Profit:</span>
              <span className="font-medium text-green-600">$115.00 (+$15.00)</span>
            </div>
            <div className="flex justify-between text-sm font-medium pt-2 border-t">
              <span>Risk/Reward Ratio:</span>
              <span>1:3</span>
            </div>
          </div>
        </div>

        <Alert>
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>Why Risk/Reward Ratio Matters</AlertTitle>
          <AlertDescription>
            With a good risk/reward ratio, you can be profitable even with a lower win rate. For example, with a 1:2
            risk/reward ratio, you only need to win 34% of your trades to break even.
          </AlertDescription>
        </Alert>

        <div className="space-y-2">
          <h3 className="font-medium">Setting a Realistic Target</h3>
          <div className="space-y-1">
            <div className="flex justify-between items-center text-sm border-b pb-1">
              <span className="font-medium">Target Level</span>
              <span className="font-medium">Risk/Reward Ratio</span>
            </div>
            <div className="flex justify-between items-center text-sm py-1">
              <span>Minimum Viable</span>
              <span>1:1.5</span>
            </div>
            <div className="flex justify-between items-center text-sm py-1 bg-primary/5">
              <span>Good</span>
              <span>1:2</span>
            </div>
            <div className="flex justify-between items-center text-sm py-1">
              <span>Excellent</span>
              <span>1:3 or higher</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Start with a realistic goal based on your current performance, then gradually increase it as you improve
            your trading strategy.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">Tips to Improve Your Risk/Reward Ratio</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Place stop losses at logical technical levels, not arbitrary distances</li>
            <li>Let winning trades run to their full potential</li>
            <li>Avoid moving stop losses away from their original placement</li>
            <li>Look for trade setups with clear support/resistance levels</li>
            <li>Consider using trailing stops to maximize profits on strong trends</li>
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={navigateToGoals} className="w-full">
          Create Risk/Reward Ratio Goal
        </Button>
      </CardFooter>
    </Card>
  )
}

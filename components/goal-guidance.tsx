"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon, BarChart3, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function GoalGuidance() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("win-rate")

  const navigateToGoals = () => {
    router.push("/goals?create=true&metric=" + (activeTab === "win-rate" ? "win_rate" : "profit_target"))
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Performance Goal Guidance</CardTitle>
        <CardDescription>Learn how to set effective trading performance goals</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="win-rate" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="win-rate">Win Rate Goal</TabsTrigger>
            <TabsTrigger value="profit-target">Profit Target Goal</TabsTrigger>
          </TabsList>

          <TabsContent value="win-rate" className="space-y-4 pt-4">
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">What is a Win Rate Goal?</h3>
                <p className="text-sm text-muted-foreground">
                  Win rate measures the percentage of your trades that are profitable. For example, if you make 10
                  trades and 6 are profitable, your win rate is 60%.
                </p>
              </div>
            </div>

            <Alert>
              <InfoIcon className="h-4 w-4" />
              <AlertTitle>Setting a realistic win rate</AlertTitle>
              <AlertDescription>
                Most professional traders maintain win rates between 40-60%. Even with a lower win rate, you can be
                profitable if your winning trades are larger than your losing trades.
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <h4 className="font-medium">Recommended Targets</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Beginner: 40-45% win rate</li>
                <li>Intermediate: 45-55% win rate</li>
                <li>Advanced: 55%+ win rate</li>
              </ul>
              <p className="text-sm text-muted-foreground mt-2">
                Start with a realistic goal based on your current performance, then gradually increase it as you improve
                your trading strategy.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="profit-target" className="space-y-4 pt-4">
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">What is a Profit Target Goal?</h3>
                <p className="text-sm text-muted-foreground">
                  A profit target is a specific amount of money you aim to make from your trading activities over a
                  defined period, such as monthly or quarterly.
                </p>
              </div>
            </div>

            <Alert>
              <InfoIcon className="h-4 w-4" />
              <AlertTitle>Setting a realistic profit target</AlertTitle>
              <AlertDescription>
                Your profit target should be based on your account size, trading frequency, and risk management
                strategy. A common approach is to target 1-3% account growth per month.
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <h4 className="font-medium">How to Calculate Your Target</h4>
              <p className="text-sm">For a $10,000 account:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Conservative: 1% monthly = $100</li>
                <li>Moderate: 2% monthly = $200</li>
                <li>Aggressive: 3-5% monthly = $300-$500</li>
              </ul>
              <p className="text-sm text-muted-foreground mt-2">
                Remember that consistency is more important than hitting ambitious targets. Start conservative and
                increase as your strategy proves reliable.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button onClick={navigateToGoals} className="w-full">
          Create {activeTab === "win-rate" ? "Win Rate" : "Profit Target"} Goal
        </Button>
      </CardFooter>
    </Card>
  )
}

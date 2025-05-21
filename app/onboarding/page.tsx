"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { LineChart, ChevronRight } from "lucide-react"

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [experience, setExperience] = useState("")
  const [goals, setGoals] = useState<string[]>([])
  const [platforms, setPlatforms] = useState<string[]>([])

  const handleGoalToggle = (value: string) => {
    setGoals((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]))
  }

  const handlePlatformToggle = (value: string) => {
    setPlatforms((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]))
  }

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1)
    } else {
      router.push("/dashboard")
    }
  }

  const handleSkip = () => {
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="flex items-center">
            <LineChart className="h-6 w-6 mr-2 text-blue-600" />
            <span className="text-xl font-bold text-blue-900">TradingJournal</span>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Set up your trading journal</CardTitle>
            <CardDescription className="text-center">
              Step {step} of 4:{" "}
              {step === 1
                ? "Trading Experience"
                : step === 2
                  ? "Trading Goals"
                  : step === 3
                    ? "Trading Platforms"
                    : "Connect Account"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">What's your trading experience?</h3>
                <RadioGroup value={experience} onValueChange={setExperience}>
                  <div className="flex items-center space-x-2 p-3 rounded-md border border-gray-200 hover:bg-slate-50 cursor-pointer">
                    <RadioGroupItem value="beginner" id="beginner" />
                    <Label htmlFor="beginner" className="flex-1 cursor-pointer">
                      <div className="font-medium">Beginner</div>
                      <div className="text-sm text-gray-500">Less than 1 year of trading experience</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-md border border-gray-200 hover:bg-slate-50 cursor-pointer">
                    <RadioGroupItem value="intermediate" id="intermediate" />
                    <Label htmlFor="intermediate" className="flex-1 cursor-pointer">
                      <div className="font-medium">Intermediate</div>
                      <div className="text-sm text-gray-500">1-3 years of trading experience</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-md border border-gray-200 hover:bg-slate-50 cursor-pointer">
                    <RadioGroupItem value="advanced" id="advanced" />
                    <Label htmlFor="advanced" className="flex-1 cursor-pointer">
                      <div className="font-medium">Advanced</div>
                      <div className="text-sm text-gray-500">3+ years of trading experience</div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">What are your primary trading goals?</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 p-3 rounded-md border border-gray-200 hover:bg-slate-50 cursor-pointer">
                    <Checkbox
                      id="track-performance"
                      checked={goals.includes("track-performance")}
                      onCheckedChange={() => handleGoalToggle("track-performance")}
                    />
                    <Label htmlFor="track-performance" className="flex-1 cursor-pointer">
                      Track trading performance
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-md border border-gray-200 hover:bg-slate-50 cursor-pointer">
                    <Checkbox
                      id="improve-discipline"
                      checked={goals.includes("improve-discipline")}
                      onCheckedChange={() => handleGoalToggle("improve-discipline")}
                    />
                    <Label htmlFor="improve-discipline" className="flex-1 cursor-pointer">
                      Improve trading discipline
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-md border border-gray-200 hover:bg-slate-50 cursor-pointer">
                    <Checkbox
                      id="identify-patterns"
                      checked={goals.includes("identify-patterns")}
                      onCheckedChange={() => handleGoalToggle("identify-patterns")}
                    />
                    <Label htmlFor="identify-patterns" className="flex-1 cursor-pointer">
                      Identify winning patterns
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-md border border-gray-200 hover:bg-slate-50 cursor-pointer">
                    <Checkbox
                      id="reduce-mistakes"
                      checked={goals.includes("reduce-mistakes")}
                      onCheckedChange={() => handleGoalToggle("reduce-mistakes")}
                    />
                    <Label htmlFor="reduce-mistakes" className="flex-1 cursor-pointer">
                      Reduce trading mistakes
                    </Label>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Which trading platforms do you use?</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 p-3 rounded-md border border-gray-200 hover:bg-slate-50 cursor-pointer">
                    <Checkbox
                      id="mt4"
                      checked={platforms.includes("mt4")}
                      onCheckedChange={() => handlePlatformToggle("mt4")}
                    />
                    <Label htmlFor="mt4" className="flex-1 cursor-pointer">
                      MetaTrader 4
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-md border border-gray-200 hover:bg-slate-50 cursor-pointer">
                    <Checkbox
                      id="mt5"
                      checked={platforms.includes("mt5")}
                      onCheckedChange={() => handlePlatformToggle("mt5")}
                    />
                    <Label htmlFor="mt5" className="flex-1 cursor-pointer">
                      MetaTrader 5
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-md border border-gray-200 hover:bg-slate-50 cursor-pointer">
                    <Checkbox
                      id="tradingview"
                      checked={platforms.includes("tradingview")}
                      onCheckedChange={() => handlePlatformToggle("tradingview")}
                    />
                    <Label htmlFor="tradingview" className="flex-1 cursor-pointer">
                      TradingView
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-md border border-gray-200 hover:bg-slate-50 cursor-pointer">
                    <Checkbox
                      id="dxtrade"
                      checked={platforms.includes("dxtrade")}
                      onCheckedChange={() => handlePlatformToggle("dxtrade")}
                    />
                    <Label htmlFor="dxtrade" className="flex-1 cursor-pointer">
                      DXtrade
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-md border border-gray-200 hover:bg-slate-50 cursor-pointer">
                    <Checkbox
                      id="other"
                      checked={platforms.includes("other")}
                      onCheckedChange={() => handlePlatformToggle("other")}
                    />
                    <Label htmlFor="other" className="flex-1 cursor-pointer">
                      Other
                    </Label>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Connect your trading account</h3>
                <p className="text-sm text-gray-500">
                  Connect your trading account to automatically import your trades and track your performance.
                </p>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-0.5">
                      <svg
                        className="h-5 w-5 text-blue-600"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800">Optional step</h3>
                      <div className="mt-1 text-sm text-blue-700">
                        You can skip this step and connect your accounts later from the dashboard.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            {step === 4 ? (
              <>
                <Button variant="outline" onClick={handleSkip}>
                  Skip for now
                </Button>
                <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700">
                  Connect account
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={handleSkip}>
                  Skip setup
                </Button>
                <Button
                  onClick={handleNext}
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={step === 1 && !experience}
                >
                  Continue <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </>
            )}
          </CardFooter>
        </Card>

        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={`h-2 w-2 rounded-full ${i === step ? "bg-blue-600" : "bg-gray-300"}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

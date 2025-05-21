"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import {
  Smile,
  Meh,
  Frown,
  TrendingUp,
  TrendingDown,
  LineChart,
  Save,
  CalendarIcon,
  BarChart2,
  PieChart,
  Activity,
  CheckCircle,
  Info,
} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Mock data for visualization
const mockMoodData = [
  { date: "2025-05-13", before: 75, during: 60, after: 45, result: "loss" },
  { date: "2025-05-14", before: 65, during: 70, after: 80, result: "profit" },
  { date: "2025-05-15", before: 50, during: 45, after: 40, result: "loss" },
  { date: "2025-05-16", before: 60, during: 65, after: 70, result: "profit" },
  { date: "2025-05-17", before: 70, during: 75, after: 80, result: "profit" },
  { date: "2025-05-18", before: 80, during: 70, after: 60, result: "breakeven" },
  { date: "2025-05-19", before: 65, during: 60, after: 55, result: "loss" },
]

export function MoodTracker() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [moodBefore, setMoodBefore] = useState<number>(50)
  const [moodDuring, setMoodDuring] = useState<number>(50)
  const [moodAfter, setMoodAfter] = useState<number>(50)
  const [notes, setNotes] = useState<string>("")
  const [tradingResult, setTradingResult] = useState<string>("")
  const [savedEntries, setSavedEntries] = useState<any[]>(mockMoodData)
  const [showSuccess, setShowSuccess] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState("weekly")

  // Calculate mood averages
  const averageBefore = Math.round(savedEntries.reduce((sum, entry) => sum + entry.before, 0) / savedEntries.length)
  const averageDuring = Math.round(savedEntries.reduce((sum, entry) => sum + entry.during, 0) / savedEntries.length)
  const averageAfter = Math.round(savedEntries.reduce((sum, entry) => sum + entry.after, 0) / savedEntries.length)

  // Calculate correlation between mood and results
  const profitEntries = savedEntries.filter((entry) => entry.result === "profit")
  const lossEntries = savedEntries.filter((entry) => entry.result === "loss")

  const avgBeforeProfitTrades =
    profitEntries.length > 0
      ? Math.round(profitEntries.reduce((sum, entry) => sum + entry.before, 0) / profitEntries.length)
      : 0
  const avgBeforeLossTrades =
    lossEntries.length > 0
      ? Math.round(lossEntries.reduce((sum, entry) => sum + entry.before, 0) / lossEntries.length)
      : 0

  const getMoodIcon = (value: number) => {
    if (value >= 70) return <Smile className="h-5 w-5 text-green-500" />
    if (value >= 40) return <Meh className="h-5 w-5 text-amber-500" />
    return <Frown className="h-5 w-5 text-red-500" />
  }

  const getMoodText = (value: number) => {
    if (value >= 70) return "Positive"
    if (value >= 40) return "Neutral"
    return "Negative"
  }

  const getMoodColor = (value: number) => {
    if (value >= 70) return "bg-green-500"
    if (value >= 40) return "bg-amber-500"
    return "bg-red-500"
  }

  const handleSaveEntry = () => {
    if (!date) return

    const newEntry = {
      date: date.toISOString().split("T")[0],
      before: moodBefore,
      during: moodDuring,
      after: moodAfter,
      notes,
      result: tradingResult || "unknown",
    }

    setSavedEntries([...savedEntries, newEntry])
    setShowSuccess(true)

    // Reset form after saving
    setTimeout(() => {
      setMoodBefore(50)
      setMoodDuring(50)
      setMoodAfter(50)
      setNotes("")
      setTradingResult("")
      setShowSuccess(false)
    }, 2000)
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Mood Tracker</CardTitle>
          <CardDescription>Track your emotions before, during, and after trading</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {showSuccess && (
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>Your mood entry has been saved successfully.</AlertDescription>
              </Alert>
            )}

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Select Date</h3>
                <p className="text-sm text-muted-foreground">Choose a date to log your mood</p>
              </div>
              <div className="flex items-center">
                <CalendarIcon className="mr-2 h-4 w-4" />
                <span>{date?.toLocaleDateString()}</span>
              </div>
            </div>

            <div className="border rounded-md p-4">
              <Calendar mode="single" selected={date} onSelect={setDate} className="mx-auto" />
            </div>

            <div className="space-y-6 pt-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Before Trading</Label>
                  <div className="flex items-center">
                    {getMoodIcon(moodBefore)}
                    <span className="ml-2">{getMoodText(moodBefore)}</span>
                  </div>
                </div>
                <Slider
                  value={[moodBefore]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => setMoodBefore(value[0])}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>During Trading</Label>
                  <div className="flex items-center">
                    {getMoodIcon(moodDuring)}
                    <span className="ml-2">{getMoodText(moodDuring)}</span>
                  </div>
                </div>
                <Slider
                  value={[moodDuring]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => setMoodDuring(value[0])}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>After Trading</Label>
                  <div className="flex items-center">
                    {getMoodIcon(moodAfter)}
                    <span className="ml-2">{getMoodText(moodAfter)}</span>
                  </div>
                </div>
                <Slider
                  value={[moodAfter]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => setMoodAfter(value[0])}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Notes</Label>
              <Textarea
                placeholder="How did you feel today? What affected your mood?"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Select value={tradingResult} onValueChange={setTradingResult}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Trading Result" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="profit">
                    <div className="flex items-center">
                      <TrendingUp className="mr-2 h-4 w-4 text-green-500" />
                      <span>Profitable Day</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="breakeven">
                    <div className="flex items-center">
                      <LineChart className="mr-2 h-4 w-4 text-blue-500" />
                      <span>Breakeven</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="loss">
                    <div className="flex items-center">
                      <TrendingDown className="mr-2 h-4 w-4 text-red-500" />
                      <span>Loss Day</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>

              <Button className="flex-shrink-0" onClick={handleSaveEntry}>
                <Save className="mr-2 h-4 w-4" />
                Save Entry
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Mood Analysis</CardTitle>
          <CardDescription>Correlations between your mood and trading performance</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={selectedPeriod} onValueChange={setSelectedPeriod}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="weekly" className="space-y-4 pt-4">
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="p-3">
                      <CardTitle className="text-sm font-medium">Before Trading</CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 pt-0">
                      <div className="text-2xl font-bold">{averageBefore}%</div>
                      <Progress value={averageBefore} className="h-2 mt-2" />
                      <div className="flex items-center mt-2">
                        {getMoodIcon(averageBefore)}
                        <span className="text-xs ml-1">{getMoodText(averageBefore)}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="p-3">
                      <CardTitle className="text-sm font-medium">During Trading</CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 pt-0">
                      <div className="text-2xl font-bold">{averageDuring}%</div>
                      <Progress value={averageDuring} className="h-2 mt-2" />
                      <div className="flex items-center mt-2">
                        {getMoodIcon(averageDuring)}
                        <span className="text-xs ml-1">{getMoodText(averageDuring)}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="p-3">
                      <CardTitle className="text-sm font-medium">After Trading</CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 pt-0">
                      <div className="text-2xl font-bold">{averageAfter}%</div>
                      <Progress value={averageAfter} className="h-2 mt-2" />
                      <div className="flex items-center mt-2">
                        {getMoodIcon(averageAfter)}
                        <span className="text-xs ml-1">{getMoodText(averageAfter)}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-sm font-medium">Mood Trends</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="h-[200px] flex items-center justify-center border rounded-md">
                      <div className="text-center text-muted-foreground">
                        <LineChart className="mx-auto h-16 w-16 mb-2" />
                        <p>Weekly mood trend visualization</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-sm font-medium">Mood vs. Performance</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Profitable Days</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-sm">
                            <span>Before Trading:</span>
                            <span className="font-medium">{avgBeforeProfitTrades}%</span>
                          </div>
                          <Progress
                            value={avgBeforeProfitTrades}
                            className={`h-2 ${getMoodColor(avgBeforeProfitTrades)}`}
                          />

                          <div className="flex justify-between items-center text-sm mt-4">
                            <span>During Trading:</span>
                            <span className="font-medium">
                              {profitEntries.length > 0
                                ? Math.round(
                                    profitEntries.reduce((sum, entry) => sum + entry.during, 0) / profitEntries.length,
                                  )
                                : 0}
                              %
                            </span>
                          </div>
                          <Progress
                            value={
                              profitEntries.length > 0
                                ? Math.round(
                                    profitEntries.reduce((sum, entry) => sum + entry.during, 0) / profitEntries.length,
                                  )
                                : 0
                            }
                            className={`h-2 ${getMoodColor(
                              profitEntries.length > 0
                                ? Math.round(
                                    profitEntries.reduce((sum, entry) => sum + entry.during, 0) / profitEntries.length,
                                  )
                                : 0,
                            )}`}
                          />
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2">Loss Days</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-sm">
                            <span>Before Trading:</span>
                            <span className="font-medium">{avgBeforeLossTrades}%</span>
                          </div>
                          <Progress
                            value={avgBeforeLossTrades}
                            className={`h-2 ${getMoodColor(avgBeforeLossTrades)}`}
                          />

                          <div className="flex justify-between items-center text-sm mt-4">
                            <span>During Trading:</span>
                            <span className="font-medium">
                              {lossEntries.length > 0
                                ? Math.round(
                                    lossEntries.reduce((sum, entry) => sum + entry.during, 0) / lossEntries.length,
                                  )
                                : 0}
                              %
                            </span>
                          </div>
                          <Progress
                            value={
                              lossEntries.length > 0
                                ? Math.round(
                                    lossEntries.reduce((sum, entry) => sum + entry.during, 0) / lossEntries.length,
                                  )
                                : 0
                            }
                            className={`h-2 ${getMoodColor(
                              lossEntries.length > 0
                                ? Math.round(
                                    lossEntries.reduce((sum, entry) => sum + entry.during, 0) / lossEntries.length,
                                  )
                                : 0,
                            )}`}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="monthly" className="pt-4">
              <div className="space-y-4">
                <Card>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-sm font-medium">Monthly Mood Distribution</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="h-[200px] flex items-center justify-center border rounded-md">
                      <div className="text-center text-muted-foreground">
                        <PieChart className="mx-auto h-16 w-16 mb-2" />
                        <p>Monthly mood distribution chart</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-sm font-medium">Monthly Performance Correlation</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="h-[200px] flex items-center justify-center border rounded-md">
                      <div className="text-center text-muted-foreground">
                        <BarChart2 className="mx-auto h-16 w-16 mb-2" />
                        <p>Monthly mood and performance correlation</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="quarterly" className="pt-4">
              <div className="h-[300px] flex items-center justify-center border rounded-md">
                <div className="text-center text-muted-foreground">
                  <Activity className="mx-auto h-16 w-16 mb-2" />
                  <p>Quarterly mood and performance correlation chart</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="insights" className="pt-4 space-y-4">
              <Alert className="bg-blue-50 border-blue-200">
                <Info className="h-4 w-4 text-blue-500" />
                <AlertTitle>Mood Impact Analysis</AlertTitle>
                <AlertDescription>
                  Based on your data, we've identified key patterns in how your mood affects trading performance.
                </AlertDescription>
              </Alert>

              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base">Key Insights</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="bg-blue-500 rounded-full h-2 w-2 mt-1.5 mr-2 flex-shrink-0"></span>
                      <div>
                        <span className="font-medium">Pre-Trading Mood Impact:</span>
                        <span className="ml-1">
                          Your trading performance is {Math.abs(avgBeforeProfitTrades - avgBeforeLossTrades)}% better
                          when your pre-trading mood is positive
                        </span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-amber-500 rounded-full h-2 w-2 mt-1.5 mr-2 flex-shrink-0"></span>
                      <div>
                        <span className="font-medium">Mood Stability:</span>
                        <span className="ml-1">
                          Your mood varies by an average of{" "}
                          {Math.abs(Math.round(((moodBefore - moodAfter) / moodBefore) * 100))}% from before to after
                          trading
                        </span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-green-500 rounded-full h-2 w-2 mt-1.5 mr-2 flex-shrink-0"></span>
                      <div>
                        <span className="font-medium">Trading Impact:</span>
                        <span className="ml-1">
                          Your mood during trading has the strongest correlation with performance
                        </span>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base">Personalized Recommendations</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="bg-purple-500 rounded-full h-2 w-2 mt-1.5 mr-2 flex-shrink-0"></span>
                      <div>
                        <span className="font-medium">Morning Routine:</span>
                        <span className="ml-1">
                          Consider a 10-minute mindfulness routine before trading to improve your pre-trading mood
                        </span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-purple-500 rounded-full h-2 w-2 mt-1.5 mr-2 flex-shrink-0"></span>
                      <div>
                        <span className="font-medium">Trading Break:</span>
                        <span className="ml-1">Take a 1-day break after consecutive negative trading days</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-purple-500 rounded-full h-2 w-2 mt-1.5 mr-2 flex-shrink-0"></span>
                      <div>
                        <span className="font-medium">Reset Technique:</span>
                        <span className="ml-1">
                          Practice the "5-minute reset" technique between trades to maintain emotional balance
                        </span>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="border-t p-4">
          <Button variant="outline" size="sm" className="ml-auto">
            <LineChart className="mr-2 h-4 w-4" />
            Export Mood Data
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

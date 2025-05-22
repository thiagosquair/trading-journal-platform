"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { format } from "date-fns"
import { CalendarIcon, InfoIcon } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { cn } from "@/lib/utils"
import { GOAL_CATEGORIES, GOAL_METRICS, type GoalTimeframe } from "@/lib/goals-types"
import { createGoal } from "@/lib/goals-actions"

const formSchema = z.object({
  metric: z.string().min(1, "Please select a metric"),
  target: z.coerce.number().positive("Target must be a positive number"),
  timeframe: z.enum(["weekly", "monthly", "quarterly", "yearly", "custom"] as const),
  startDate: z.date(),
  endDate: z.date(),
  notes: z.string().optional(),
})

interface CreateGoalFormProps {
  preselectedCategory?: string
  preselectedMetric?: string
}

export function CreateGoalForm({ preselectedCategory, preselectedMetric }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isMobile = useMobile()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(
    preselectedCategory || searchParams.get("category") || GOAL_CATEGORIES[0].name.toLowerCase(),
  )

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      metric: preselectedMetric || searchParams.get("metric") || "",
      target: undefined,
      timeframe: "monthly",
      startDate: new Date(),
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      notes: "",
    },
  })

  // Set the metric if it's provided via props or URL
  useEffect(() => {
    const metricFromUrl = searchParams.get("metric")
    if (preselectedMetric || metricFromUrl) {
      form.setValue("metric", preselectedMetric || metricFromUrl || "")
    }
  }, [preselectedMetric, searchParams, form])

  const selectedMetric = GOAL_METRICS.find((m) => m.id === form.watch("metric"))
  const timeframe = form.watch("timeframe")
  const startDate = form.watch("startDate")

  // Update end date when timeframe or start date changes
  const updateEndDate = (timeframe: GoalTimeframe, startDate: Date) => {
    const newEndDate = new Date(startDate)

    switch (timeframe) {
      case "weekly":
        newEndDate.setDate(newEndDate.getDate() + 7)
        break
      case "monthly":
        newEndDate.setMonth(newEndDate.getMonth() + 1)
        break
      case "quarterly":
        newEndDate.setMonth(newEndDate.getMonth() + 3)
        break
      case "yearly":
        newEndDate.setFullYear(newEndDate.getFullYear() + 1)
        break
      // For custom, don't change the end date
    }

    if (timeframe !== "custom") {
      form.setValue("endDate", newEndDate)
    }
  }

  // Update end date when timeframe or start date changes
  form.watch((data, { name }) => {
    if ((name === "timeframe" || name === "startDate") && data.timeframe && data.startDate) {
      updateEndDate(data.timeframe as GoalTimeframe, data.startDate)
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      const selectedMetric = GOAL_METRICS.find((m) => m.id === values.metric)
      if (!selectedMetric) throw new Error("Invalid metric selected")

      await createGoal({
        metric: values.metric,
        target: values.target,
        unit: selectedMetric.unit,
        timeframe: values.timeframe,
        startDate: values.startDate.toISOString().split("T")[0],
        endDate: values.endDate.toISOString().split("T")[0],
        notes: values.notes,
      })

      form.reset()
      router.push("/goals?tab=active")
    } catch (error) {
      console.error("Failed to create goal:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Get suggested target based on metric
  const getSuggestedTarget = (metricId: string) => {
    switch (metricId) {
      case "win_rate":
        return 50 // 50% win rate
      case "profit_factor":
        return 1.5 // 1.5 profit factor
      case "risk_reward":
        return 2 // 2:1 risk/reward
      case "profit_target":
        return 300 // $300 profit target
      default:
        return undefined
    }
  }

  // Get suggested notes based on metric
  const getSuggestedNotes = (metricId: string) => {
    switch (metricId) {
      case "win_rate":
        return "I'll focus on only taking high-probability setups that match my trading plan criteria."
      case "profit_factor":
        return "I'll work on cutting losses quickly and letting winners run to improve my profit factor."
      case "risk_reward":
        return "I'll place stop losses at logical technical levels and set take profits at key resistance/support zones to maintain a healthy risk/reward ratio."
      case "profit_target":
        return "I'll aim for consistent profits by following my trading plan and proper position sizing."
      default:
        return ""
    }
  }

  // Set suggested target when metric changes
  useEffect(() => {
    const metric = form.watch("metric")
    if (metric && !form.getValues("target")) {
      const suggestedTarget = getSuggestedTarget(metric)
      if (suggestedTarget) {
        form.setValue("target", suggestedTarget)
      }

      const suggestedNotes = getSuggestedNotes(metric)
      if (suggestedNotes && !form.getValues("notes")) {
        form.setValue("notes", suggestedNotes)
      }
    }
  }, [form.watch("metric")])

  // Get guidance for the selected metric
  const getMetricGuidance = (metricId: string) => {
    switch (metricId) {
      case "risk_reward":
        return (
          <Alert className="mt-2">
            <InfoIcon className="h-4 w-4" />
            <AlertDescription>
              A risk/reward ratio of 1:2 means you're risking $1 to potentially gain $2. Professional traders typically
              aim for a minimum of 1:2, with 1:3 or higher being excellent.
            </AlertDescription>
          </Alert>
        )
      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Set a New Performance Goal</CardTitle>
        <CardDescription>Define targets for your trading metrics to track your progress</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                {GOAL_CATEGORIES.map((category) => (
                  <TabsTrigger key={category.name.toLowerCase()} value={category.name.toLowerCase()}>
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {GOAL_CATEGORIES.map((category) => (
                <TabsContent
                  key={category.name.toLowerCase()}
                  value={category.name.toLowerCase()}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="metric"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Metric</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a metric" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {category.metrics.map((metric) => (
                              <SelectItem key={metric.id} value={metric.id}>
                                {metric.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>{selectedMetric?.description || "Select a metric to track"}</FormDescription>
                        <FormMessage />
                        {selectedMetric && getMetricGuidance(selectedMetric.id)}
                      </FormItem>
                    )}
                  />
                </TabsContent>
              ))}
            </Tabs>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="target"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Value</FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <Input
                          type="number"
                          step="0.01"
                          min={selectedMetric?.minValue}
                          max={selectedMetric?.maxValue}
                          placeholder="Enter target value"
                          {...field}
                        />
                        {selectedMetric && (
                          <span className="ml-2">{selectedMetric.unit === "%" ? "%" : selectedMetric.unit}</span>
                        )}
                      </div>
                    </FormControl>
                    <FormDescription>
                      {selectedMetric?.goodDirection === "higher"
                        ? "Higher values are better for this metric"
                        : "Lower values are better for this metric"}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="timeframe"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Timeframe</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select timeframe" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Period over which to achieve this goal</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date("1900-01-01")}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>When you'll start working on this goal</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>End Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                            disabled={timeframe !== "custom"}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date("1900-01-01") || date <= startDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      {timeframe === "custom"
                        ? "When you aim to achieve this goal"
                        : "Automatically set based on timeframe"}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add any additional notes or strategies for achieving this goal"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Optional: Add context or strategies for achieving this goal</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Goal"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

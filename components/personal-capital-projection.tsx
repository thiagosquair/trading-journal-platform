"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Calculator, InfoIcon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const personalCapitalSchema = z.object({
  initialCapital: z.coerce.number().min(1, "Initial capital must be greater than 0"),
  monthlyContribution: z.coerce.number().min(0, "Monthly contribution must be non-negative"),
  avgMonthlyReturn: z.coerce.number().min(-100).max(1000, "Monthly return must be between -100 and 1000"),
  compoundInterest: z.boolean().default(true),
  withdrawalRate: z.coerce.number().min(0).max(100, "Withdrawal rate must be between 0 and 100").default(0),
  monthlyExpenses: z.coerce.number().min(0, "Monthly expenses must be non-negative").default(0),
  maxDrawdown: z.coerce.number().min(0).max(100, "Max drawdown must be between 0 and 100").default(10),
  consistency: z.coerce.number().min(1).max(100, "Consistency must be between 1 and 100").default(80),
  riskAdjustment: z.boolean().default(true),
  leverageMultiplier: z.coerce.number().min(1).max(100, "Leverage must be between 1 and 100").default(1),
})

type PersonalCapitalFormValues = z.infer<typeof personalCapitalSchema>

interface PersonalCapitalProjectionProps {
  onCalculate: (data: any) => void
}

export function PersonalCapitalProjection({ onCalculate }: PersonalCapitalProjectionProps) {
  const form = useForm<PersonalCapitalFormValues>({
    resolver: zodResolver(personalCapitalSchema),
    defaultValues: {
      initialCapital: 10000,
      monthlyContribution: 1000,
      avgMonthlyReturn: 5,
      compoundInterest: true,
      withdrawalRate: 0,
      monthlyExpenses: 0,
      maxDrawdown: 10,
      consistency: 80,
      riskAdjustment: true,
      leverageMultiplier: 1,
    },
  })

  const compoundInterest = form.watch("compoundInterest")
  const riskAdjustment = form.watch("riskAdjustment")

  function onSubmit(values: PersonalCapitalFormValues) {
    // Calculate projections for 3, 6, and 12 months
    const projections = calculatePersonalCapitalProjections(values)
    onCalculate(projections)
  }

  const calculatePersonalCapitalProjections = (values: PersonalCapitalFormValues) => {
    const {
      initialCapital,
      monthlyContribution,
      avgMonthlyReturn,
      compoundInterest,
      withdrawalRate,
      monthlyExpenses,
      maxDrawdown,
      consistency,
      riskAdjustment,
      leverageMultiplier,
    } = values

    // Initialize monthly data arrays
    const monthlyData = Array(12)
      .fill(0)
      .map((_, i) => ({
        month: i + 1,
        capital: 0,
        monthlyProfit: 0,
        contribution: 0,
        withdrawal: 0,
        expenses: monthlyExpenses,
        netCashflow: 0,
        cumulativeProfit: 0,
      }))

    // Calculate monthly growth
    let currentCapital = initialCapital
    let cumulativeProfit = 0

    for (let month = 0; month < 12; month++) {
      // Apply leverage to capital for return calculation
      const leveragedCapital = currentCapital * leverageMultiplier

      // Apply risk adjustment if enabled
      let adjustedReturn = avgMonthlyReturn
      if (riskAdjustment) {
        // Simple risk adjustment based on consistency and max drawdown
        const consistencyFactor = consistency / 100
        const drawdownRisk = maxDrawdown / 100

        // More consistent traders have less variance in their returns
        const randomVariance = (1 - consistencyFactor) * (Math.random() * 2 - 1) * adjustedReturn * 0.5
        adjustedReturn = adjustedReturn + randomVariance

        // Occasional drawdowns based on max drawdown setting
        if (Math.random() < drawdownRisk * 0.1) {
          adjustedReturn = -1 * maxDrawdown * (0.5 + Math.random() * 0.5)
        }
      }

      // Calculate month's profit
      const monthlyReturnRate = adjustedReturn / 100
      const monthlyProfit = leveragedCapital * monthlyReturnRate

      // Calculate withdrawal amount
      const withdrawalAmount = currentCapital * (withdrawalRate / 100)

      // Update monthly data
      monthlyData[month].capital = currentCapital
      monthlyData[month].monthlyProfit = monthlyProfit
      monthlyData[month].contribution = monthlyContribution
      monthlyData[month].withdrawal = withdrawalAmount
      monthlyData[month].expenses = monthlyExpenses

      // Calculate net cashflow
      const netCashflow = monthlyProfit - withdrawalAmount - monthlyExpenses + monthlyContribution
      monthlyData[month].netCashflow = netCashflow

      // Update capital for next month
      if (compoundInterest) {
        currentCapital = currentCapital + monthlyProfit + monthlyContribution - withdrawalAmount - monthlyExpenses
      } else {
        currentCapital = currentCapital + monthlyContribution - withdrawalAmount - monthlyExpenses
        cumulativeProfit += monthlyProfit
      }

      // Update cumulative profit
      if (compoundInterest) {
        cumulativeProfit =
          currentCapital -
          initialCapital -
          monthlyContribution * (month + 1) +
          (withdrawalAmount + monthlyExpenses) * (month + 1)
      } else {
        cumulativeProfit += monthlyProfit
      }
      monthlyData[month].cumulativeProfit = cumulativeProfit
    }

    // Create summary for 3, 6, and 12 months
    const summary = {
      threeMonth: {
        finalCapital: monthlyData[2].capital,
        totalProfit: monthlyData.slice(0, 3).reduce((sum, month) => sum + month.monthlyProfit, 0),
        averageMonthly: monthlyData.slice(0, 3).reduce((sum, month) => sum + month.monthlyProfit, 0) / 3,
        totalContributions: monthlyData.slice(0, 3).reduce((sum, month) => sum + month.contribution, 0),
        totalWithdrawals: monthlyData.slice(0, 3).reduce((sum, month) => sum + month.withdrawal, 0),
        totalExpenses: monthlyData.slice(0, 3).reduce((sum, month) => sum + month.expenses, 0),
        netCashflow: monthlyData.slice(0, 3).reduce((sum, month) => sum + month.netCashflow, 0),
        cumulativeProfit: monthlyData[2].cumulativeProfit,
        roi:
          (monthlyData[2].cumulativeProfit /
            (initialCapital + monthlyData.slice(0, 3).reduce((sum, month) => sum + month.contribution, 0))) *
          100,
      },
      sixMonth: {
        finalCapital: monthlyData[5].capital,
        totalProfit: monthlyData.slice(0, 6).reduce((sum, month) => sum + month.monthlyProfit, 0),
        averageMonthly: monthlyData.slice(0, 6).reduce((sum, month) => sum + month.monthlyProfit, 0) / 6,
        totalContributions: monthlyData.slice(0, 6).reduce((sum, month) => sum + month.contribution, 0),
        totalWithdrawals: monthlyData.slice(0, 6).reduce((sum, month) => sum + month.withdrawal, 0),
        totalExpenses: monthlyData.slice(0, 6).reduce((sum, month) => sum + month.expenses, 0),
        netCashflow: monthlyData.slice(0, 6).reduce((sum, month) => sum + month.netCashflow, 0),
        cumulativeProfit: monthlyData[5].cumulativeProfit,
        roi:
          (monthlyData[5].cumulativeProfit /
            (initialCapital + monthlyData.slice(0, 6).reduce((sum, month) => sum + month.contribution, 0))) *
          100,
      },
      twelveMonth: {
        finalCapital: monthlyData[11].capital,
        totalProfit: monthlyData.reduce((sum, month) => sum + month.monthlyProfit, 0),
        averageMonthly: monthlyData.reduce((sum, month) => sum + month.monthlyProfit, 0) / 12,
        totalContributions: monthlyData.reduce((sum, month) => sum + month.contribution, 0),
        totalWithdrawals: monthlyData.reduce((sum, month) => sum + month.withdrawal, 0),
        totalExpenses: monthlyData.reduce((sum, month) => sum + month.expenses, 0),
        netCashflow: monthlyData.reduce((sum, month) => sum + month.netCashflow, 0),
        cumulativeProfit: monthlyData[11].cumulativeProfit,
        roi:
          (monthlyData[11].cumulativeProfit /
            (initialCapital + monthlyData.reduce((sum, month) => sum + month.contribution, 0))) *
          100,
      },
    }

    return {
      inputs: values,
      monthlyData,
      summary,
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Capital Growth</CardTitle>
            <CardDescription>Project growth of your own trading capital</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="initialCapital"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Initial Capital ($)</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" step="1000" {...field} />
                    </FormControl>
                    <FormDescription>Your starting trading capital</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="monthlyContribution"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Contribution ($)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" step="100" {...field} />
                    </FormControl>
                    <FormDescription>Additional capital you add each month</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="avgMonthlyReturn"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Avg. Monthly Return (%)</FormLabel>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <InfoIcon className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            Your expected average monthly return percentage. Professional traders typically aim for
                            5-15% per month.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <FormControl>
                    <Input type="number" min="-100" max="1000" step="0.1" {...field} />
                  </FormControl>
                  <FormDescription>Expected monthly percentage return on your capital</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="leverageMultiplier"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Leverage Multiplier</FormLabel>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <InfoIcon className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            Multiplier for your trading capital. A value of 1 means no leverage, 2 means 2:1 leverage,
                            etc.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <FormControl>
                    <div className="pt-2">
                      <Slider
                        defaultValue={[field.value]}
                        min={1}
                        max={10}
                        step={1}
                        onValueChange={(value) => field.onChange(value[0])}
                      />
                    </div>
                  </FormControl>
                  <div className="flex justify-between text-xs text-muted-foreground pt-1">
                    <span>No Leverage (1:1)</span>
                    <span>{field.value}:1</span>
                    <span>High Leverage (10:1)</span>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="maxDrawdown"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Max Drawdown (%)</FormLabel>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <InfoIcon className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">
                              The maximum percentage loss you expect to experience in a bad month. Used for risk
                              adjustment.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <FormControl>
                      <Input type="number" min="0" max="100" step="0.1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="consistency"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Consistency (%)</FormLabel>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <InfoIcon className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">
                              How consistent your returns are. Higher values mean less variance in monthly returns.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <FormControl>
                      <div className="pt-2">
                        <Slider
                          defaultValue={[field.value]}
                          min={1}
                          max={100}
                          step={1}
                          onValueChange={(value) => field.onChange(value[0])}
                        />
                      </div>
                    </FormControl>
                    <div className="flex justify-between text-xs text-muted-foreground pt-1">
                      <span>Highly Variable</span>
                      <span>{field.value}%</span>
                      <span>Very Consistent</span>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="compoundInterest"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Compound Interest</FormLabel>
                    <FormDescription>Reinvest profits to grow your capital exponentially</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="withdrawalRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Withdrawal Rate (%)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" max="100" step="1" {...field} />
                    </FormControl>
                    <FormDescription>Percentage of capital to withdraw monthly</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="monthlyExpenses"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Expenses ($)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" step="100" {...field} />
                    </FormControl>
                    <FormDescription>Fixed monthly expenses to cover</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="riskAdjustment"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Apply Risk Adjustment</FormLabel>
                    <FormDescription>Adjust projections to account for trading variance and drawdowns</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              <Calculator className="mr-2 h-4 w-4" />
              Calculate Projection
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}

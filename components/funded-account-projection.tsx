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
import { Trash2, Plus, Calculator, InfoIcon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const fundedAccountSchema = z.object({
  accounts: z
    .array(
      z.object({
        name: z.string().min(1, "Account name is required"),
        accountSize: z.coerce.number().min(1, "Account size must be greater than 0"),
        profitSplit: z.coerce.number().min(1).max(100, "Profit split must be between 1 and 100"),
        avgMonthlyReturn: z.coerce.number().min(-100).max(1000, "Monthly return must be between -100 and 1000"),
        maxDrawdown: z.coerce.number().min(0).max(100, "Max drawdown must be between 0 and 100").optional(),
        consistency: z.coerce.number().min(1).max(100, "Consistency must be between 1 and 100").optional(),
      }),
    )
    .min(1, "Add at least one account"),
  reinvestProfits: z.boolean().default(false),
  reinvestmentRate: z.coerce.number().min(0).max(100, "Reinvestment rate must be between 0 and 100").default(50),
  monthlyExpenses: z.coerce.number().min(0, "Monthly expenses must be non-negative").default(0),
  riskAdjustment: z.boolean().default(true),
})

type FundedAccountFormValues = z.infer<typeof fundedAccountSchema>

const defaultAccount = {
  name: "Funded Account 1",
  accountSize: 100000,
  profitSplit: 80,
  avgMonthlyReturn: 10,
  maxDrawdown: 10,
  consistency: 80,
}

interface FundedAccountProjectionProps {
  onCalculate: (data: any) => void
}

export function FundedAccountProjection({ onCalculate }: FundedAccountProjectionProps) {
  const form = useForm<FundedAccountFormValues>({
    resolver: zodResolver(fundedAccountSchema),
    defaultValues: {
      accounts: [defaultAccount],
      reinvestProfits: false,
      reinvestmentRate: 50,
      monthlyExpenses: 0,
      riskAdjustment: true,
    },
  })

  const accounts = form.watch("accounts") || []
  const reinvestProfits = form.watch("reinvestProfits")

  const addAccount = () => {
    const currentAccounts = form.getValues("accounts") || []
    form.setValue("accounts", [
      ...currentAccounts,
      {
        name: `Funded Account ${currentAccounts.length + 1}`,
        accountSize: 100000,
        profitSplit: 80,
        avgMonthlyReturn: 10,
        maxDrawdown: 10,
        consistency: 80,
      },
    ])
  }

  const removeAccount = (index: number) => {
    const currentAccounts = form.getValues("accounts") || []
    if (currentAccounts.length > 1) {
      form.setValue(
        "accounts",
        currentAccounts.filter((_, i) => i !== index),
      )
    }
  }

  function onSubmit(values: FundedAccountFormValues) {
    // Calculate projections for 3, 6, and 12 months
    const projections = calculateFundedProjections(values)
    onCalculate(projections)
  }

  const calculateFundedProjections = (values: FundedAccountFormValues) => {
    const { accounts, reinvestProfits, reinvestmentRate, monthlyExpenses, riskAdjustment } = values

    // Initialize monthly data arrays
    const monthlyData = Array(12)
      .fill(0)
      .map((_, i) => ({
        month: i + 1,
        grossProfit: 0,
        netProfit: 0,
        cumulativeProfit: 0,
        reinvestment: 0,
        expenses: monthlyExpenses,
        cashflow: 0,
        accountSizes: accounts.map((account) => account.accountSize),
      }))

    // Calculate monthly profits for each account
    accounts.forEach((account, accountIndex) => {
      let currentAccountSize = account.accountSize

      for (let month = 0; month < 12; month++) {
        // Apply risk adjustment if enabled
        let adjustedReturn = account.avgMonthlyReturn
        if (riskAdjustment) {
          // Simple risk adjustment based on consistency and max drawdown
          const consistencyFactor = (account.consistency || 80) / 100
          const drawdownRisk = (account.maxDrawdown || 10) / 100

          // More consistent traders have less variance in their returns
          const randomVariance = (1 - consistencyFactor) * (Math.random() * 2 - 1) * adjustedReturn * 0.5
          adjustedReturn = adjustedReturn + randomVariance

          // Occasional drawdowns based on max drawdown setting
          if (Math.random() < drawdownRisk * 0.1) {
            adjustedReturn = -1 * (account.maxDrawdown || 10) * (0.5 + Math.random() * 0.5)
          }
        }

        // Calculate month's profit
        const monthlyReturnRate = adjustedReturn / 100
        const monthlyProfit = currentAccountSize * monthlyReturnRate
        const traderProfit = monthlyProfit * (account.profitSplit / 100)

        // Update monthly data
        monthlyData[month].grossProfit += monthlyProfit
        monthlyData[month].netProfit += traderProfit

        // Handle reinvestment if enabled
        if (reinvestProfits && month < 11) {
          // Don't reinvest in the last month for calculation purposes
          const reinvestmentAmount = traderProfit * (reinvestmentRate / 100)
          monthlyData[month].reinvestment += reinvestmentAmount

          // Increase account size for next month based on reinvestment
          currentAccountSize += reinvestmentAmount
          monthlyData[month + 1].accountSizes[accountIndex] = currentAccountSize
        }
      }
    })

    // Calculate cumulative values and cashflow
    let cumulativeProfit = 0
    for (let month = 0; month < 12; month++) {
      const data = monthlyData[month]

      // Calculate cashflow (profit minus expenses and reinvestment)
      data.cashflow = data.netProfit - data.reinvestment - data.expenses

      // Update cumulative profit
      cumulativeProfit += data.cashflow
      data.cumulativeProfit = cumulativeProfit
    }

    // Create summary for 3, 6, and 12 months
    const summary = {
      threeMonth: {
        totalProfit: monthlyData.slice(0, 3).reduce((sum, month) => sum + month.netProfit, 0),
        averageMonthly: monthlyData.slice(0, 3).reduce((sum, month) => sum + month.netProfit, 0) / 3,
        finalCumulative: monthlyData[2].cumulativeProfit,
        totalReinvestment: monthlyData.slice(0, 3).reduce((sum, month) => sum + month.reinvestment, 0),
        totalExpenses: monthlyData.slice(0, 3).reduce((sum, month) => sum + month.expenses, 0),
        netCashflow: monthlyData.slice(0, 3).reduce((sum, month) => sum + month.cashflow, 0),
        finalAccountSizes: monthlyData[2].accountSizes,
      },
      sixMonth: {
        totalProfit: monthlyData.slice(0, 6).reduce((sum, month) => sum + month.netProfit, 0),
        averageMonthly: monthlyData.slice(0, 6).reduce((sum, month) => sum + month.netProfit, 0) / 6,
        finalCumulative: monthlyData[5].cumulativeProfit,
        totalReinvestment: monthlyData.slice(0, 6).reduce((sum, month) => sum + month.reinvestment, 0),
        totalExpenses: monthlyData.slice(0, 6).reduce((sum, month) => sum + month.expenses, 0),
        netCashflow: monthlyData.slice(0, 6).reduce((sum, month) => sum + month.cashflow, 0),
        finalAccountSizes: monthlyData[5].accountSizes,
      },
      twelveMonth: {
        totalProfit: monthlyData.reduce((sum, month) => sum + month.netProfit, 0),
        averageMonthly: monthlyData.reduce((sum, month) => sum + month.netProfit, 0) / 12,
        finalCumulative: monthlyData[11].cumulativeProfit,
        totalReinvestment: monthlyData.reduce((sum, month) => sum + month.reinvestment, 0),
        totalExpenses: monthlyData.reduce((sum, month) => sum + month.expenses, 0),
        netCashflow: monthlyData.reduce((sum, month) => sum + month.cashflow, 0),
        finalAccountSizes: monthlyData[11].accountSizes,
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
        <div className="space-y-4">
          {accounts.map((account, index) => (
            <Card key={index}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{account.name || `Funded Account ${index + 1}`}</CardTitle>
                  {accounts.length > 1 && (
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeAccount(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <CardDescription>Enter your funded account details</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name={`accounts.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Name</FormLabel>
                      <FormControl>
                        <Input placeholder="My Funded Account" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`accounts.${index}.accountSize`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Size ($)</FormLabel>
                      <FormControl>
                        <Input type="number" min="1000" step="1000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`accounts.${index}.profitSplit`}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel>Your Profit Split (%)</FormLabel>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <InfoIcon className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">
                                The percentage of profits you receive from the funded account. Typically ranges from 50%
                                to 90%.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <FormControl>
                        <Input type="number" min="1" max="100" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`accounts.${index}.avgMonthlyReturn`}
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`accounts.${index}.maxDrawdown`}
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
                  name={`accounts.${index}.consistency`}
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
                            defaultValue={[field.value || 80]}
                            min={1}
                            max={100}
                            step={1}
                            onValueChange={(value) => field.onChange(value[0])}
                          />
                        </div>
                      </FormControl>
                      <div className="flex justify-between text-xs text-muted-foreground pt-1">
                        <span>Highly Variable</span>
                        <span>{field.value || 80}%</span>
                        <span>Very Consistent</span>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          ))}

          <Button type="button" variant="outline" className="w-full" onClick={addAccount}>
            <Plus className="mr-2 h-4 w-4" /> Add Another Account
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Additional Settings</CardTitle>
            <CardDescription>Configure how you manage your profits</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <FormField
              control={form.control}
              name="reinvestProfits"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Reinvest Profits</FormLabel>
                    <FormDescription>Reinvest a portion of your profits to grow your account size</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            {reinvestProfits && (
              <FormField
                control={form.control}
                name="reinvestmentRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reinvestment Rate (%)</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <Slider
                          defaultValue={[field.value]}
                          min={0}
                          max={100}
                          step={5}
                          onValueChange={(value) => field.onChange(value[0])}
                        />
                        <div className="flex justify-between">
                          <span className="text-xs text-muted-foreground">0% (All Cash)</span>
                          <span className="text-sm font-medium">{field.value}%</span>
                          <span className="text-xs text-muted-foreground">100% (All Reinvested)</span>
                        </div>
                      </div>
                    </FormControl>
                    <FormDescription>Percentage of profits to reinvest into growing your account size</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="monthlyExpenses"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Expenses ($)</FormLabel>
                  <FormControl>
                    <Input type="number" min="0" step="100" {...field} />
                  </FormControl>
                  <FormDescription>Monthly expenses you need to cover from your trading profits</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

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

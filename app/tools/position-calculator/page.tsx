import { PositionSizeCalculator } from "@/components/position-size-calculator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

export default function PositionCalculatorPage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <h1 className="text-3xl font-bold tracking-tight mb-4">Position Size Calculator</h1>
      <p className="text-muted-foreground mb-8">
        Calculate the optimal position size based on your risk management parameters across different markets.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <PositionSizeCalculator />

          <Alert className="mt-8">
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>Important Note</AlertTitle>
            <AlertDescription>
              This calculator is provided for educational purposes. Always verify calculations with your broker's
              specifications as contract sizes and pip values may vary between brokers.
            </AlertDescription>
          </Alert>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>How to Use</CardTitle>
              <CardDescription>Follow these steps to calculate your position size</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-1">1. Select Asset Type</h3>
                <p className="text-sm text-muted-foreground">Choose the market you're trading (Forex, Gold, etc.)</p>
              </div>

              <div>
                <h3 className="font-semibold mb-1">2. Enter Account Balance</h3>
                <p className="text-sm text-muted-foreground">Input your current trading account balance</p>
              </div>

              <div>
                <h3 className="font-semibold mb-1">3. Set Risk Percentage</h3>
                <p className="text-sm text-muted-foreground">
                  Define how much of your account you're willing to risk (1-2% recommended)
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-1">4. Define Stop Loss</h3>
                <p className="text-sm text-muted-foreground">Enter your stop loss distance in pips/points</p>
              </div>

              <div>
                <h3 className="font-semibold mb-1">5. Verify Pip Value</h3>
                <p className="text-sm text-muted-foreground">
                  Confirm the value per pip/point for your chosen instrument
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Risk Management Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="beginners">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="beginners">Beginners</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced</TabsTrigger>
                </TabsList>
                <TabsContent value="beginners" className="pt-4 space-y-4">
                  <p className="text-sm">• Never risk more than 1-2% of your account on a single trade</p>
                  <p className="text-sm">• Always use a stop loss for every trade</p>
                  <p className="text-sm">• Consider reducing position size during volatile market conditions</p>
                  <p className="text-sm">• Start with smaller positions until you gain consistency</p>
                </TabsContent>
                <TabsContent value="advanced" className="pt-4 space-y-4">
                  <p className="text-sm">• Consider correlation between open positions when sizing</p>
                  <p className="text-sm">• Adjust risk based on trade setup quality (0.5-2%)</p>
                  <p className="text-sm">• Account for spread and commission in your calculations</p>
                  <p className="text-sm">• Use volatility-based position sizing for certain markets</p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

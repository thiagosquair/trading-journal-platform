import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Calculator,
  DollarSign,
  BarChart4,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Risk Management: Calculating Lots | TradeLinx Courses",
  description: "Learn how to properly calculate lot sizes across different markets to manage risk effectively",
}

export default function CalculatingLotsPage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link href="/courses/risk-management">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Risk Management
          </Link>
        </Button>
        <div>
          <div className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">Module 2</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold tracking-tight mb-4">Risk Management: Calculating Lots</h1>
          <p className="text-muted-foreground mb-6">
            Master the essential skill of calculating proper position sizes across different markets to protect your
            capital and ensure consistent risk management.
          </p>

          <div className="relative rounded-xl overflow-hidden h-[300px] mb-8">
            <Image
              src="/risk-management-calculator.png"
              alt="Risk management calculator"
              fill
              className="object-cover"
            />
          </div>

          <Alert className="mb-8">
            <Shield className="h-4 w-4" />
            <AlertTitle>Risk Management is Critical</AlertTitle>
            <AlertDescription>
              "Trading is not about being right. It's about managing your risk when you're wrong."
            </AlertDescription>
          </Alert>

          <h2 className="text-2xl font-bold mb-4">Introduction</h2>
          <p className="mb-6">
            Risk management is not just a trading tactic—it's the foundation of long-term survival in the markets.
            Whether you're trading Forex, indices, commodities like gold and silver, or even synthetic instruments,
            understanding lot size calculation is vital.
          </p>
          <p className="mb-6">
            A small miscalculation due to misunderstood contract sizes can lead to blown accounts or missed profits.
            This lesson will help you master the logic of risk and teach you how to calculate the right position size
            across various asset classes.
          </p>

          <h2 className="text-2xl font-bold mb-4">1. Why Risk Management is Essential</h2>
          <div className="bg-blue-50 p-6 rounded-lg mb-6">
            <h3 className="font-semibold mb-3">Key Principles:</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
                <span>Risk per trade should be defined: Typically 1–2% of your account.</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
                <span>Never risk more than you can afford to lose.</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
                <span>Use a stop-loss with every trade.</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
                <span>Lot size must align with your stop-loss distance and risk appetite.</span>
              </li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold mb-4">2. What is Lot Size?</h2>
          <p className="mb-6">
            Lot size determines how much of a financial instrument you're buying or selling. But the trick? Each
            instrument has a different contract size.
          </p>

          <Card className="mb-8">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Asset Class</TableHead>
                    <TableHead>Standard Lot Size</TableHead>
                    <TableHead>Value per Pip (standard)</TableHead>
                    <TableHead>Key Consideration</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Forex</TableCell>
                    <TableCell>100,000 units</TableCell>
                    <TableCell>$10 per pip (1.00 lot on EUR/USD)</TableCell>
                    <TableCell>Highly liquid, low spreads</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Gold (XAU/USD)</TableCell>
                    <TableCell>100 oz</TableCell>
                    <TableCell>$1 per pip (1.00 lot = 100 oz)</TableCell>
                    <TableCell>Volatile, wide ranges</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Silver (XAG/USD)</TableCell>
                    <TableCell>5,000 oz</TableCell>
                    <TableCell>~$0.50 per pip (varies by broker)</TableCell>
                    <TableCell>Cheaper than gold, still volatile</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Indices (e.g. US30, NAS100)</TableCell>
                    <TableCell>Varies by broker</TableCell>
                    <TableCell>$1–$10 per point (lot-dependent)</TableCell>
                    <TableCell>Often high volatility and gaps</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-bold mb-4">3. The Consequences of Incorrect Lot Size</h2>
          <Card className="mb-8">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mistake</TableHead>
                    <TableHead>Result</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Over-leveraging</TableCell>
                    <TableCell>Margin calls, blown accounts</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Under-leveraging</TableCell>
                    <TableCell>Missed opportunities</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Ignoring contract size differences</TableCell>
                    <TableCell>Inconsistent risk across instruments</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Misjudging volatility</TableCell>
                    <TableCell>Stop-loss hunting, losses despite good analysis</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Alert variant="destructive" className="mb-8">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Warning: Contract Size Matters</AlertTitle>
            <AlertDescription>
              Using a 1.0 lot size on Gold without knowing it represents 100 oz can be dangerous. If price moves $10
              against you, that's a $1,000 loss — even if your risk limit was $100.
            </AlertDescription>
          </Alert>

          <h2 className="text-2xl font-bold mb-4">4. Manual Lot Size Calculation (The Theory)</h2>
          <p className="mb-6">To calculate the correct lot size manually, use the formula:</p>
          <div className="bg-gray-100 p-4 rounded-md font-mono text-center mb-6">
            Lot Size = (Account Balance × Risk %) / (Stop Loss in Pips × Pip Value)
          </div>
          <p className="mb-6">
            But this formula changes with each instrument, due to different pip values and contract sizes.
          </p>

          <Tabs defaultValue="forex" className="mb-8">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="forex">Forex</TabsTrigger>
              <TabsTrigger value="gold">Gold</TabsTrigger>
              <TabsTrigger value="silver">Silver</TabsTrigger>
              <TabsTrigger value="indices">Indices</TabsTrigger>
            </TabsList>
            <TabsContent value="forex" className="p-6 border rounded-md">
              <h3 className="font-bold mb-3">Example 1: Forex (EUR/USD)</h3>
              <ul className="mb-4">
                <li>• Account: $5,000</li>
                <li>• Risk: 2% ($100)</li>
                <li>• Stop-loss: 20 pips</li>
                <li>• Pip value: $10 (standard lot)</li>
              </ul>
              <div className="bg-gray-100 p-3 rounded-md font-mono mb-3">Lot size = 100 / (20 × 10) = 0.5 lots</div>
              <p className="text-sm text-muted-foreground">
                This means you should trade 0.5 lots to risk $100 with a 20 pip stop loss.
              </p>
            </TabsContent>
            <TabsContent value="gold" className="p-6 border rounded-md">
              <h3 className="font-bold mb-3">Example 2: Gold (XAU/USD)</h3>
              <ul className="mb-4">
                <li>• Account: $5,000</li>
                <li>• Risk: 2% ($100)</li>
                <li>• Stop-loss: $5 move</li>
                <li>• Gold contract: 1 lot = 100 oz</li>
                <li>• $1 move = $100</li>
                <li>• $5 move = $500 loss on 1.0 lot</li>
              </ul>
              <div className="bg-gray-100 p-3 rounded-md font-mono mb-3">Lot size = 100 / 500 = 0.2 lots</div>
              <p className="text-sm text-muted-foreground">
                This means you should trade 0.2 lots to risk $100 with a $5 stop loss on Gold.
              </p>
            </TabsContent>
            <TabsContent value="silver" className="p-6 border rounded-md">
              <h3 className="font-bold mb-3">Example 3: Silver (XAG/USD)</h3>
              <ul className="mb-4">
                <li>• Account: $5,000</li>
                <li>• Risk: $100</li>
                <li>• Stop-loss: $0.50</li>
                <li>• Silver contract: 1 lot = 5,000 oz</li>
                <li>• $0.01 move = $50</li>
                <li>• $0.50 move = $2,500 on 1.0 lot</li>
              </ul>
              <div className="bg-gray-100 p-3 rounded-md font-mono mb-3">Lot size = 100 / 2,500 = 0.04 lots</div>
              <p className="text-sm text-muted-foreground">
                This means you should trade 0.04 lots to risk $100 with a $0.50 stop loss on Silver.
              </p>
            </TabsContent>
            <TabsContent value="indices" className="p-6 border rounded-md">
              <h3 className="font-bold mb-3">Example 4: Indices (NAS100)</h3>
              <ul className="mb-4">
                <li>• Account: $10,000</li>
                <li>• Risk: 1% ($100)</li>
                <li>• Stop-loss: 20 points</li>
                <li>• Point value: $1 per lot</li>
              </ul>
              <div className="bg-gray-100 p-3 rounded-md font-mono mb-3">
                Lot size = 100 / 20 = 5 lots (if $1/point per lot)
              </div>
              <p className="text-sm text-muted-foreground">
                This means you should trade 5 lots to risk $100 with a 20 point stop loss on NAS100.
              </p>
            </TabsContent>
          </Tabs>

          <h2 className="text-2xl font-bold mb-4">5. Why Manual Calculation Often Fails</h2>
          <ul className="space-y-2 mb-8">
            <li className="flex items-start">
              <AlertTriangle className="mr-2 h-5 w-5 text-amber-500 mt-0.5" />
              <span>Traders forget to adjust for contract size differences.</span>
            </li>
            <li className="flex items-start">
              <AlertTriangle className="mr-2 h-5 w-5 text-amber-500 mt-0.5" />
              <span>Pip/point value isn't consistent across instruments or brokers.</span>
            </li>
            <li className="flex items-start">
              <AlertTriangle className="mr-2 h-5 w-5 text-amber-500 mt-0.5" />
              <span>No visual connection between the TradingView chart and position sizing.</span>
            </li>
            <li className="flex items-start">
              <AlertTriangle className="mr-2 h-5 w-5 text-amber-500 mt-0.5" />
              <span>Leads to emotional errors: oversizing during FOMO or revenge trades.</span>
            </li>
          </ul>

          <h2 className="text-2xl font-bold mb-4">6. Modern Solutions for Position Sizing</h2>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Position Size Calculators</CardTitle>
              <CardDescription>Modern tools can help automate the complex math of position sizing</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Several tools exist to help traders calculate position sizes accurately:</p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="mr-3 mt-1 bg-blue-100 p-1.5 rounded-full">
                    <Calculator className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">TradeLinx Position Calculator</h4>
                    <p className="text-sm text-muted-foreground">
                      Our built-in calculator that works across all supported platforms
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1 bg-blue-100 p-1.5 rounded-full">
                    <Calculator className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Trade Lot Tool</h4>
                    <p className="text-sm text-muted-foreground">
                      A calculator designed to work within TradingView's projection tool
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1 bg-blue-100 p-1.5 rounded-full">
                    <Calculator className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Broker-Provided Calculators</h4>
                    <p className="text-sm text-muted-foreground">
                      Many brokers offer built-in position size calculators
                    </p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-bold mb-4">7. Risk Management Checklist</h2>
          <div className="bg-green-50 p-6 rounded-lg mb-8">
            <ul className="space-y-3">
              <li className="flex items-center">
                <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
                <span>Define your risk per trade (1-2%)</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
                <span>Know the contract size of your asset</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
                <span>Use stop-loss always</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
                <span>Double-check lot size based on SL distance</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
                <span>Use position size calculators to verify your calculations</span>
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg mb-8">
            <h3 className="font-bold mb-3">Practice Exercise</h3>
            <p className="mb-4">Calculate the appropriate lot size for the following scenario:</p>
            <ul className="mb-4">
              <li>• Account: $2,000</li>
              <li>• Risk: 1.5% of account</li>
              <li>• Trading EUR/USD</li>
              <li>• Stop-loss: 15 pips</li>
            </ul>
            <Button className="mt-2" asChild>
              <Link href="/courses/risk-management/calculating-lots/exercise">
                Start Exercise <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="flex justify-between mt-12">
            <Button variant="outline" asChild>
              <Link href="/courses/risk-management/introduction">
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous Lesson
              </Link>
            </Button>
            <Button asChild>
              <Link href="/courses/risk-management/position-sizing">
                Next Lesson <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="bg-gray-50 rounded-xl p-6 sticky top-8">
            <h3 className="font-semibold mb-4">Lesson Progress</h3>
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-1">
                <span>Completion</span>
                <span>0%</span>
              </div>
              <Progress value={0} className="h-2" />
            </div>

            <Separator className="my-6" />

            <h3 className="font-semibold mb-4">Key Takeaways</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <div className="mr-2 mt-0.5 bg-green-100 p-1 rounded-full">
                  <DollarSign className="h-3 w-3 text-green-600" />
                </div>
                <span>Risk only 1-2% of your account per trade</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-0.5 bg-green-100 p-1 rounded-full">
                  <Calculator className="h-3 w-3 text-green-600" />
                </div>
                <span>Different assets have different contract sizes</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-0.5 bg-green-100 p-1 rounded-full">
                  <BarChart4 className="h-3 w-3 text-green-600" />
                </div>
                <span>Lot size must align with stop-loss distance</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-0.5 bg-green-100 p-1 rounded-full">
                  <Shield className="h-3 w-3 text-green-600" />
                </div>
                <span>Use position calculators to avoid mistakes</span>
              </li>
            </ul>

            <Separator className="my-6" />

            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/tools/position-calculator" className="text-blue-600 hover:underline">
                  TradeLinx Position Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.trade-lot.com"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Trade Lot Tool (External)
                </Link>
              </li>
              <li>
                <Link href="/courses/risk-management/cheat-sheet" className="text-blue-600 hover:underline">
                  Risk Management Cheat Sheet
                </Link>
              </li>
            </ul>

            <Separator className="my-6" />

            <Button className="w-full mb-3" asChild>
              <Link href="/courses/risk-management/calculating-lots/quiz">
                Take Quiz <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/courses/risk-management">Back to Course</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

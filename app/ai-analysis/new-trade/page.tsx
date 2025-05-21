import type { Metadata } from "next"
import { SidebarWrapper } from "@/components/sidebar-navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Upload, Brain } from "lucide-react"
import Link from "next/link"
import { AiTradeAnalysisFull } from "@/components/ai-trade-analysis-full"
import { SaveAnalysisToJournal } from "@/components/save-analysis-to-journal"

export const metadata: Metadata = {
  title: "New Trade Analysis | TradeLinx",
  description: "Analyze a new trade with AI",
}

export default function NewTradeAnalysisPage() {
  return (
    <SidebarWrapper>
      <div className="container mx-auto py-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" asChild className="mr-4">
            <Link href="/ai-analysis">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to AI Analysis
            </Link>
          </Button>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold">New Trade Analysis</h1>
            <p className="text-muted-foreground">Get AI-powered insights on your trade</p>
          </div>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Trade Details</CardTitle>
              <CardDescription>Enter the details of the trade you want to analyze</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="manual" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="manual">Manual Entry</TabsTrigger>
                  <TabsTrigger value="import">Import from Account</TabsTrigger>
                </TabsList>
                <TabsContent value="manual" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="symbol">Symbol/Instrument</Label>
                      <Input id="symbol" placeholder="e.g. EUR/USD, AAPL, BTC/USD" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="direction">Direction</Label>
                      <Select defaultValue="buy">
                        <SelectTrigger id="direction">
                          <SelectValue placeholder="Select direction" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="buy">Buy (Long)</SelectItem>
                          <SelectItem value="sell">Sell (Short)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="entry-price">Entry Price</Label>
                      <Input id="entry-price" placeholder="e.g. 1.2345" type="number" step="0.00001" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="exit-price">Exit Price</Label>
                      <Input id="exit-price" placeholder="e.g. 1.2456" type="number" step="0.00001" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="stop-loss">Stop Loss</Label>
                      <Input id="stop-loss" placeholder="e.g. 1.2300" type="number" step="0.00001" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="take-profit">Take Profit</Label>
                      <Input id="take-profit" placeholder="e.g. 1.2500" type="number" step="0.00001" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="entry-date">Entry Date/Time</Label>
                      <Input id="entry-date" type="datetime-local" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="exit-date">Exit Date/Time</Label>
                      <Input id="exit-date" type="datetime-local" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="position-size">Position Size</Label>
                      <Input id="position-size" placeholder="e.g. 0.1 lots or 100 shares" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timeframe">Timeframe</Label>
                      <Select defaultValue="h1">
                        <SelectTrigger id="timeframe">
                          <SelectValue placeholder="Select timeframe" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="m1">1 Minute</SelectItem>
                          <SelectItem value="m5">5 Minutes</SelectItem>
                          <SelectItem value="m15">15 Minutes</SelectItem>
                          <SelectItem value="m30">30 Minutes</SelectItem>
                          <SelectItem value="h1">1 Hour</SelectItem>
                          <SelectItem value="h4">4 Hours</SelectItem>
                          <SelectItem value="d1">Daily</SelectItem>
                          <SelectItem value="w1">Weekly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="trade-rationale">Trade Rationale</Label>
                    <Textarea
                      id="trade-rationale"
                      placeholder="Describe your reasoning for taking this trade..."
                      rows={4}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="chart-image">Chart Image (optional)</Label>
                    <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-1">Drag and drop your chart image here</p>
                      <p className="text-xs text-muted-foreground mb-4">or</p>
                      <Button variant="outline" size="sm">
                        Browse Files
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="import" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="account">Select Trading Account</Label>
                    <Select>
                      <SelectTrigger id="account">
                        <SelectValue placeholder="Select account" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mt4-demo">MT4 Demo Account</SelectItem>
                        <SelectItem value="mt5-main">MT5 Main Account</SelectItem>
                        <SelectItem value="ctrader-prop">cTrader Prop Account</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="trade">Select Trade</Label>
                    <Select>
                      <SelectTrigger id="trade">
                        <SelectValue placeholder="Select trade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="trade1">EUR/USD Buy - May 21, 2025</SelectItem>
                        <SelectItem value="trade2">GBP/JPY Sell - May 20, 2025</SelectItem>
                        <SelectItem value="trade3">AAPL Buy - May 19, 2025</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Analysis Options</CardTitle>
              <CardDescription>Choose what you want the AI to analyze</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-2">
                  <input type="checkbox" id="technical" className="mt-1" defaultChecked />
                  <div>
                    <Label htmlFor="technical" className="font-medium">
                      Technical Analysis
                    </Label>
                    <p className="text-sm text-muted-foreground">Analyze chart patterns and technical indicators</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <input type="checkbox" id="risk" className="mt-1" defaultChecked />
                  <div>
                    <Label htmlFor="risk" className="font-medium">
                      Risk Management
                    </Label>
                    <p className="text-sm text-muted-foreground">Evaluate position sizing and risk-reward ratio</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <input type="checkbox" id="psychology" className="mt-1" defaultChecked />
                  <div>
                    <Label htmlFor="psychology" className="font-medium">
                      Trading Psychology
                    </Label>
                    <p className="text-sm text-muted-foreground">Identify emotional biases in your trading decision</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <input type="checkbox" id="improvement" className="mt-1" defaultChecked />
                  <div>
                    <Label htmlFor="improvement" className="font-medium">
                      Improvement Suggestions
                    </Label>
                    <p className="text-sm text-muted-foreground">Get actionable tips to improve future trades</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <AiTradeAnalysisFull />
          <SaveAnalysisToJournal />

          <div className="flex justify-end gap-4">
            <Button variant="outline" asChild>
              <Link href="/ai-analysis">Cancel</Link>
            </Button>
            <Button>
              <Brain className="mr-2 h-4 w-4" />
              Analyze Trade
            </Button>
          </div>
        </div>
      </div>
    </SidebarWrapper>
  )
}

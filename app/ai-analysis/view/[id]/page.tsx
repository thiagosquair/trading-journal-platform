import type { Metadata } from "next"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Trade Analysis Details | TradeLinx",
  description: "Detailed AI analysis of your trade",
}

export default function TradeAnalysisViewPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the analysis data based on the ID
  const analysisId = params.id

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Trade Analysis #{analysisId}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Trade Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Trade Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Symbol</p>
                    <p className="font-medium">EUR/USD</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Direction</p>
                    <p className="font-medium">
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Buy
                      </Badge>
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Entry Price</p>
                    <p className="font-medium">1.0865</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Exit Price</p>
                    <p className="font-medium">1.0925</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Profit/Loss</p>
                    <p className="font-medium text-green-600">+$60.00</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium">May 15, 2023</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Chart Analysis</h3>
                <div className="relative h-64 w-full mb-4">
                  <Image
                    src="/tradingview-eurusd-annotated.png"
                    alt="EUR/USD Chart Analysis"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">AI Insights</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-1">Entry Analysis</h4>
                    <p className="text-sm text-gray-700">
                      Good entry at support level. The price bounced off the 50-day moving average, which was a strong
                      technical signal. Entry was well-timed with RSI showing oversold conditions.
                    </p>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-1">Exit Analysis</h4>
                    <p className="text-sm text-gray-700">
                      Exit was well-executed at resistance level. You captured approximately 70% of the available move,
                      which is excellent risk management. Consider trailing stops for future trades to potentially
                      capture more of the move.
                    </p>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-medium text-purple-800 mb-1">Risk Management</h4>
                    <p className="text-sm text-gray-700">
                      Risk-to-reward ratio was 1:2, which aligns with best practices. Position sizing was appropriate at
                      2% of account. Stop loss was well-placed below the support level.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Improvement Suggestions</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5">
                    <span className="text-xs font-bold text-blue-600">1</span>
                  </div>
                  <p className="text-sm">Consider holding the position longer to capture more of the uptrend</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5">
                    <span className="text-xs font-bold text-blue-600">2</span>
                  </div>
                  <p className="text-sm">Add volume analysis to confirm trend strength</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5">
                    <span className="text-xs font-bold text-blue-600">3</span>
                  </div>
                  <p className="text-sm">Check economic calendar before entry to avoid news volatility</p>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Similar Patterns</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">Based on your trading history, here are similar setups:</p>

              <div className="space-y-4">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-gray-200 rounded-md mr-3 flex-shrink-0 overflow-hidden relative">
                    <Image src="/gbp-usd-chart.png" alt="GBP/USD Chart" fill className="object-cover" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">GBP/USD Bounce</p>
                    <p className="text-xs text-gray-500">Apr 28, 2023</p>
                  </div>
                  <div className="ml-auto">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      +$45
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-gray-200 rounded-md mr-3 flex-shrink-0 overflow-hidden relative">
                    <Image src="/usd-cad-chart.png" alt="USD/CAD Chart" fill className="object-cover" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">USD/CAD Reversal</p>
                    <p className="text-xs text-gray-500">May 5, 2023</p>
                  </div>
                  <div className="ml-auto">
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                      -$20
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

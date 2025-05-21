"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function MT4InterfacePreview() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">MetaTrader 4 Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Here's what you'll see when you log into your OANDA MT4 demo account
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>MT4 Interface Layout</CardTitle>
          <CardDescription>The main components of the MetaTrader 4 platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md p-4 bg-gray-50 relative h-[500px] overflow-hidden">
            {/* Top Menu Bar */}
            <div className="absolute top-0 left-0 right-0 h-8 bg-gray-200 border-b flex items-center px-2 text-xs">
              <div className="flex space-x-4">
                <span className="font-medium">File</span>
                <span className="font-medium">View</span>
                <span className="font-medium">Insert</span>
                <span className="font-medium">Charts</span>
                <span className="font-medium">Tools</span>
                <span className="font-medium">Window</span>
                <span className="font-medium">Help</span>
              </div>
            </div>

            {/* Toolbar */}
            <div className="absolute top-8 left-0 right-0 h-8 bg-gray-100 border-b flex items-center px-2">
              <div className="flex space-x-2">
                <div className="w-6 h-6 bg-gray-300 rounded"></div>
                <div className="w-6 h-6 bg-gray-300 rounded"></div>
                <div className="w-6 h-6 bg-gray-300 rounded"></div>
                <div className="w-6 h-6 bg-gray-300 rounded"></div>
                <div className="w-6 h-6 bg-gray-300 rounded"></div>
                <div className="w-6 h-6 bg-gray-300 rounded"></div>
              </div>
            </div>

            {/* Market Watch */}
            <div className="absolute top-16 left-0 w-[180px] bottom-[150px] bg-white border rounded-sm overflow-hidden">
              <div className="bg-gray-200 text-xs font-medium p-1 border-b">Market Watch</div>
              <div className="p-1 text-xs">
                <div className="flex justify-between p-1 hover:bg-blue-50">
                  <span>EURUSD</span>
                  <span>1.0923</span>
                </div>
                <div className="flex justify-between p-1 hover:bg-blue-50">
                  <span>GBPUSD</span>
                  <span>1.2598</span>
                </div>
                <div className="flex justify-between p-1 hover:bg-blue-50">
                  <span>USDJPY</span>
                  <span>148.75</span>
                </div>
                <div className="flex justify-between p-1 hover:bg-blue-50">
                  <span>AUDUSD</span>
                  <span>0.6580</span>
                </div>
                <div className="flex justify-between p-1 hover:bg-blue-50">
                  <span>USDCAD</span>
                  <span>1.3645</span>
                </div>
                <div className="flex justify-between p-1 hover:bg-blue-50">
                  <span>XAUUSD</span>
                  <span>2342.75</span>
                </div>
              </div>
            </div>

            {/* Navigator */}
            <div className="absolute top-16 left-0 w-[180px] h-[150px] bottom-0 bg-white border rounded-sm overflow-hidden">
              <div className="bg-gray-200 text-xs font-medium p-1 border-b">Navigator</div>
              <div className="p-1 text-xs">
                <div className="p-1 hover:bg-blue-50">Accounts</div>
                <div className="p-1 hover:bg-blue-50">Indicators</div>
                <div className="p-1 hover:bg-blue-50">Expert Advisors</div>
                <div className="p-1 hover:bg-blue-50">Scripts</div>
              </div>
            </div>

            {/* Chart Area */}
            <div className="absolute top-16 left-[180px] right-0 bottom-[150px] bg-white border">
              <div className="h-full bg-[#f5f5f5] relative">
                <div className="absolute top-0 left-0 right-0 h-6 bg-gray-200 text-xs p-1 flex justify-between">
                  <span>EURUSD, H1</span>
                  <span>OANDA-Demo-1:7890179</span>
                </div>
                <div className="absolute top-6 left-0 right-0 bottom-0 bg-[#f0f0f0]">
                  {/* Simplified chart representation */}
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    [Chart Area - EURUSD H1 Candlestick Chart]
                  </div>
                </div>
              </div>
            </div>

            {/* Terminal */}
            <div className="absolute left-0 right-0 bottom-0 h-[150px] bg-white border">
              <div className="bg-gray-200 text-xs font-medium p-1 border-b flex">
                <div className="px-2 py-1 bg-white border-t border-l border-r rounded-t-sm">Terminal</div>
                <div className="px-2 py-1">Trade</div>
                <div className="px-2 py-1">Account History</div>
                <div className="px-2 py-1">Alerts</div>
                <div className="px-2 py-1">Mailbox</div>
                <div className="px-2 py-1">Experts</div>
                <div className="px-2 py-1">Journal</div>
              </div>
              <div className="p-1 text-xs">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-1">Time</th>
                      <th className="p-1">Type</th>
                      <th className="p-1">Order</th>
                      <th className="p-1">Size</th>
                      <th className="p-1">Symbol</th>
                      <th className="p-1">Price</th>
                      <th className="p-1">S/L</th>
                      <th className="p-1">T/P</th>
                      <th className="p-1">Profit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-blue-50">
                      <td className="p-1">09:30</td>
                      <td className="p-1">buy</td>
                      <td className="p-1">12345678</td>
                      <td className="p-1">0.5</td>
                      <td className="p-1">EURUSD</td>
                      <td className="p-1">1.0875</td>
                      <td className="p-1">1.0825</td>
                      <td className="p-1">1.0975</td>
                      <td className="p-1 text-green-600">+24.00</td>
                    </tr>
                    <tr className="hover:bg-blue-50">
                      <td className="p-1">10:15</td>
                      <td className="p-1">sell</td>
                      <td className="p-1">12345679</td>
                      <td className="p-1">0.3</td>
                      <td className="p-1">GBPUSD</td>
                      <td className="p-1">1.2650</td>
                      <td className="p-1">1.2700</td>
                      <td className="p-1">1.2550</td>
                      <td className="p-1 text-green-600">+15.60</td>
                    </tr>
                    <tr className="hover:bg-blue-50">
                      <td className="p-1">11:45</td>
                      <td className="p-1">buy</td>
                      <td className="p-1">12345675</td>
                      <td className="p-1">0.2</td>
                      <td className="p-1">USDJPY</td>
                      <td className="p-1">149.25</td>
                      <td className="p-1">148.50</td>
                      <td className="p-1">150.25</td>
                      <td className="p-1 text-red-600">-10.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Status Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-5 bg-gray-200 border-t flex items-center justify-between px-2 text-xs">
              <div>OANDA-Demo-1:7890179</div>
              <div>Balance: $10,247.35 | Equity: $10,389.62 | Margin: $520.15 | Free Margin: $9,869.47</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Interface Overview</TabsTrigger>
          <TabsTrigger value="charts">Charts</TabsTrigger>
          <TabsTrigger value="trading">Trading</TabsTrigger>
          <TabsTrigger value="tools">Tools & Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Main Interface Components</CardTitle>
              <CardDescription>Key elements of the MetaTrader 4 dashboard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="font-medium">1. Market Watch</h3>
                  <p className="text-sm text-muted-foreground">
                    Located in the top-left corner, this window displays real-time quotes for various currency pairs and
                    instruments. You can right-click to add or remove symbols.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">2. Navigator</h3>
                  <p className="text-sm text-muted-foreground">
                    Below the Market Watch, this panel provides access to your trading accounts, technical indicators,
                    expert advisors, and custom scripts.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">3. Chart Window</h3>
                  <p className="text-sm text-muted-foreground">
                    The largest area in the center displays price charts for your selected instruments. You can open
                    multiple charts and customize them with indicators and drawing tools.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">4. Terminal</h3>
                  <p className="text-sm text-muted-foreground">
                    Located at the bottom, this multi-tab window shows your open positions, account history, alerts,
                    mailbox, and journal logs.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">5. Toolbar</h3>
                  <p className="text-sm text-muted-foreground">
                    The row of icons below the menu bar provides quick access to common functions like creating new
                    charts, zooming, and adding indicators.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">6. Status Bar</h3>
                  <p className="text-sm text-muted-foreground">
                    At the very bottom, this bar displays your account information including balance, equity, margin,
                    and free margin.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="charts" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Chart Features</CardTitle>
              <CardDescription>Working with price charts in MetaTrader 4</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-medium">Chart Types</h3>
                <p className="text-sm text-muted-foreground">
                  MT4 offers three main chart types: Line, Bar, and Candlestick. Right-click on the chart and select
                  "Properties" to change the type and appearance.
                </p>
                <div className="grid grid-cols-3 gap-4 mt-2">
                  <div className="border rounded p-2 text-center">
                    <div className="h-20 bg-gray-50 flex items-center justify-center mb-2">[Line Chart]</div>
                    <Badge variant="outline">Line</Badge>
                  </div>
                  <div className="border rounded p-2 text-center">
                    <div className="h-20 bg-gray-50 flex items-center justify-center mb-2">[Bar Chart]</div>
                    <Badge variant="outline">Bar</Badge>
                  </div>
                  <div className="border rounded p-2 text-center">
                    <div className="h-20 bg-gray-50 flex items-center justify-center mb-2">[Candlestick Chart]</div>
                    <Badge variant="outline">Candlestick</Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Timeframes</h3>
                <p className="text-sm text-muted-foreground">
                  MT4 provides multiple timeframes from 1-minute to monthly charts. Select your preferred timeframe from
                  the toolbar or by right-clicking on the chart.
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline">M1 (1 minute)</Badge>
                  <Badge variant="outline">M5 (5 minutes)</Badge>
                  <Badge variant="outline">M15 (15 minutes)</Badge>
                  <Badge variant="outline">M30 (30 minutes)</Badge>
                  <Badge variant="outline">H1 (1 hour)</Badge>
                  <Badge variant="outline">H4 (4 hours)</Badge>
                  <Badge variant="outline">D1 (Daily)</Badge>
                  <Badge variant="outline">W1 (Weekly)</Badge>
                  <Badge variant="outline">MN (Monthly)</Badge>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Drawing Tools</h3>
                <p className="text-sm text-muted-foreground">
                  MT4 offers various drawing tools for technical analysis. Access them from the "Insert" menu or the
                  toolbar.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                  <div className="border rounded p-2 text-center text-sm">Trend Lines</div>
                  <div className="border rounded p-2 text-center text-sm">Fibonacci Retracement</div>
                  <div className="border rounded p-2 text-center text-sm">Support/Resistance</div>
                  <div className="border rounded p-2 text-center text-sm">Channels</div>
                  <div className="border rounded p-2 text-center text-sm">Gann Lines</div>
                  <div className="border rounded p-2 text-center text-sm">Andrews' Pitchfork</div>
                  <div className="border rounded p-2 text-center text-sm">Shapes</div>
                  <div className="border rounded p-2 text-center text-sm">Text Labels</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trading" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Trading Features</CardTitle>
              <CardDescription>How to place and manage trades in MetaTrader 4</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-medium">Opening a Trade</h3>
                <p className="text-sm text-muted-foreground">
                  To open a new position, right-click on the chart or in the Market Watch and select "New Order". You
                  can also press F9 or click the "New Order" button in the toolbar.
                </p>
                <div className="border rounded-md p-4 bg-gray-50 mt-2">
                  <div className="text-center font-medium mb-2">New Order Window</div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium">Symbol:</p>
                      <p className="text-muted-foreground">EURUSD</p>
                    </div>
                    <div>
                      <p className="font-medium">Volume:</p>
                      <p className="text-muted-foreground">0.10 lots</p>
                    </div>
                    <div>
                      <p className="font-medium">Stop Loss:</p>
                      <p className="text-muted-foreground">1.0825</p>
                    </div>
                    <div>
                      <p className="font-medium">Take Profit:</p>
                      <p className="text-muted-foreground">1.0975</p>
                    </div>
                    <div>
                      <p className="font-medium">Type:</p>
                      <p className="text-muted-foreground">Market Execution</p>
                    </div>
                    <div>
                      <p className="font-medium">Comment:</p>
                      <p className="text-muted-foreground">EURUSD long</p>
                    </div>
                  </div>
                  <div className="flex justify-center gap-4 mt-4">
                    <div className="bg-green-100 border border-green-300 rounded px-4 py-2 text-green-700 font-medium">
                      Buy
                    </div>
                    <div className="bg-red-100 border border-red-300 rounded px-4 py-2 text-red-700 font-medium">
                      Sell
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Managing Trades</h3>
                <p className="text-sm text-muted-foreground">
                  View and manage your open positions in the "Trade" tab of the Terminal window. Right-click on a
                  position to modify, close, or add a trailing stop.
                </p>
                <div className="border rounded-md p-2 bg-gray-50 mt-2 text-sm">
                  <div className="font-medium mb-1">Trade Tab Options:</div>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Close Order - Close the selected position</li>
                    <li>Modify Order - Change stop loss or take profit levels</li>
                    <li>Trailing Stop - Set an automatic trailing stop loss</li>
                    <li>Profit - View detailed profit calculation</li>
                    <li>Comment - Add or edit the trade comment</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Order Types</h3>
                <p className="text-sm text-muted-foreground">
                  MT4 supports various order types for different trading strategies.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div className="border rounded p-3">
                    <h4 className="font-medium">Market Orders</h4>
                    <p className="text-sm text-muted-foreground">
                      Execute immediately at the current market price. Use when you want to enter the market right away.
                    </p>
                  </div>
                  <div className="border rounded p-3">
                    <h4 className="font-medium">Pending Orders</h4>
                    <p className="text-sm text-muted-foreground">
                      Execute when price reaches a specified level. Types include: Buy Limit, Sell Limit, Buy Stop, and
                      Sell Stop.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tools" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Analysis Tools</CardTitle>
              <CardDescription>Technical analysis features in MetaTrader 4</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-medium">Technical Indicators</h3>
                <p className="text-sm text-muted-foreground">
                  MT4 includes over 30 built-in technical indicators. Access them from the "Insert" menu, Navigator
                  panel, or by clicking the Indicators button in the toolbar.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2 text-sm">
                  <div className="border rounded p-2">
                    <div className="font-medium">Trend</div>
                    <ul className="list-disc pl-5 text-muted-foreground">
                      <li>Moving Averages</li>
                      <li>Bollinger Bands</li>
                      <li>Parabolic SAR</li>
                    </ul>
                  </div>
                  <div className="border rounded p-2">
                    <div className="font-medium">Oscillators</div>
                    <ul className="list-disc pl-5 text-muted-foreground">
                      <li>MACD</li>
                      <li>RSI</li>
                      <li>Stochastic</li>
                    </ul>
                  </div>
                  <div className="border rounded p-2">
                    <div className="font-medium">Volumes</div>
                    <ul className="list-disc pl-5 text-muted-foreground">
                      <li>Volumes</li>
                      <li>OBV</li>
                      <li>Money Flow Index</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Expert Advisors</h3>
                <p className="text-sm text-muted-foreground">
                  MT4 supports automated trading through Expert Advisors (EAs). Access them from the Navigator panel
                  under the "Expert Advisors" section.
                </p>
                <div className="border rounded-md p-4 bg-gray-50 mt-2">
                  <div className="text-center font-medium mb-2">Expert Advisor Features</div>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    <li>Automated trading based on predefined rules</li>
                    <li>Backtesting on historical data</li>
                    <li>Optimization of trading parameters</li>
                    <li>Custom alerts and notifications</li>
                    <li>Risk management functions</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Strategy Tester</h3>
                <p className="text-sm text-muted-foreground">
                  Test and optimize your trading strategies using historical data. Access it from the "View" menu or by
                  pressing Ctrl+R.
                </p>
                <div className="border rounded-md p-2 bg-gray-50 mt-2 text-sm">
                  <div className="font-medium mb-1">Strategy Tester Options:</div>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Select Expert Advisor to test</li>
                    <li>Choose symbol and timeframe</li>
                    <li>Set testing period</li>
                    <li>Adjust model (every tick, control points, open prices only)</li>
                    <li>View detailed reports with performance metrics</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { InfoIcon, AlertCircle } from "lucide-react"

export default function MT4TradingGuide() {
  const [activeTab, setActiveTab] = useState("placing-orders")

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Trading with MetaTrader 4</h1>
        <p className="text-muted-foreground mt-1">Learn how to place and manage trades in your MT4 demo account</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
          <TabsTrigger value="placing-orders">Placing Orders</TabsTrigger>
          <TabsTrigger value="order-types">Order Types</TabsTrigger>
          <TabsTrigger value="managing-trades">Managing Trades</TabsTrigger>
          <TabsTrigger value="risk-management">Risk Management</TabsTrigger>
        </TabsList>

        <TabsContent value="placing-orders" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>How to Place a Trade in MT4</CardTitle>
              <CardDescription>Step-by-step guide to opening a position</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Method 1: Using the New Order Window (F9)</h3>
                <ol className="list-decimal pl-5 space-y-4">
                  <li>
                    <div className="font-medium">Open the Order Window</div>
                    <p className="text-sm text-muted-foreground">
                      Press F9 on your keyboard, or right-click on the chart or Market Watch and select "New Order".
                    </p>
                    <div className="mt-2 border rounded-md p-4 bg-gray-50">
                      <div className="text-center font-medium mb-2">New Order Window</div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-medium">Symbol:</p>
                          <p className="text-muted-foreground">EURUSD (selected from chart or Market Watch)</p>
                        </div>
                        <div>
                          <p className="font-medium">Type:</p>
                          <p className="text-muted-foreground">Market Execution</p>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="font-medium">Set Your Trade Size</div>
                    <p className="text-sm text-muted-foreground">
                      Enter the volume in lots. For the OANDA demo account, you can trade as small as 0.01 lots.
                    </p>
                    <div className="mt-2 border rounded-md p-4 bg-gray-50">
                      <div className="grid grid-cols-1 gap-2 text-sm">
                        <div>
                          <p className="font-medium">Volume:</p>
                          <p className="text-muted-foreground">
                            0.10 lots (standard lot = 100,000 units of base currency)
                          </p>
                        </div>
                        <Alert className="mt-2 bg-blue-50 border-blue-200">
                          <InfoIcon className="h-4 w-4 text-blue-600" />
                          <AlertDescription className="text-blue-600">
                            For beginners, start with small position sizes (0.01-0.05 lots) to manage risk.
                          </AlertDescription>
                        </Alert>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="font-medium">Set Stop Loss and Take Profit (Optional but Recommended)</div>
                    <p className="text-sm text-muted-foreground">
                      Enter price levels where you want to automatically exit the trade if it moves against you (Stop
                      Loss) or in your favor (Take Profit).
                    </p>
                    <div className="mt-2 border rounded-md p-4 bg-gray-50">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-medium">Stop Loss:</p>
                          <p className="text-muted-foreground">
                            For Buy: Below current price (e.g., 1.0825 for EURUSD)
                          </p>
                          <p className="text-muted-foreground">
                            For Sell: Above current price (e.g., 1.0925 for EURUSD)
                          </p>
                        </div>
                        <div>
                          <p className="font-medium">Take Profit:</p>
                          <p className="text-muted-foreground">
                            For Buy: Above current price (e.g., 1.0975 for EURUSD)
                          </p>
                          <p className="text-muted-foreground">
                            For Sell: Below current price (e.g., 1.0775 for EURUSD)
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="font-medium">Add a Comment (Optional)</div>
                    <p className="text-sm text-muted-foreground">
                      You can add a note to your trade for your reference (e.g., "EURUSD breakout trade").
                    </p>
                  </li>
                  <li>
                    <div className="font-medium">Execute the Trade</div>
                    <p className="text-sm text-muted-foreground">
                      Click the "Buy" button (blue) to open a long position or the "Sell" button (red) to open a short
                      position.
                    </p>
                    <div className="flex justify-center gap-4 mt-4">
                      <div className="bg-blue-100 border border-blue-300 rounded px-4 py-2 text-blue-700 font-medium">
                        Buy at Market
                      </div>
                      <div className="bg-red-100 border border-red-300 rounded px-4 py-2 text-red-700 font-medium">
                        Sell at Market
                      </div>
                    </div>
                  </li>
                </ol>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Method 2: One-Click Trading</h3>
                <p className="text-sm text-muted-foreground">
                  For faster execution, you can enable one-click trading from the chart.
                </p>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>
                    <div className="font-medium">Enable One-Click Trading</div>
                    <p className="text-sm text-muted-foreground">
                      Right-click on the chart and select "One-Click Trading" or press Alt+T.
                    </p>
                  </li>
                  <li>
                    <div className="font-medium">Set Default Trade Size</div>
                    <p className="text-sm text-muted-foreground">
                      Click on the volume field in the one-click trading panel and set your preferred lot size.
                    </p>
                  </li>
                  <li>
                    <div className="font-medium">Execute the Trade</div>
                    <p className="text-sm text-muted-foreground">
                      Click the "Buy" or "Sell" button in the one-click trading panel that appears on your chart.
                    </p>
                    <Alert className="mt-2 bg-amber-50 border-amber-200">
                      <AlertCircle className="h-4 w-4 text-amber-600" />
                      <AlertDescription className="text-amber-600">
                        Note: One-click trading executes immediately without confirmation and doesn't set stop loss or
                        take profit levels automatically. You'll need to add these after the trade is open.
                      </AlertDescription>
                    </Alert>
                  </li>
                </ol>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Method 3: Trading from the Market Watch</h3>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>
                    <div className="font-medium">Find Your Symbol</div>
                    <p className="text-sm text-muted-foreground">
                      Locate the currency pair or instrument you want to trade in the Market Watch window.
                    </p>
                  </li>
                  <li>
                    <div className="font-medium">Open Order Window</div>
                    <p className="text-sm text-muted-foreground">
                      Right-click on the symbol and select "New Order" or double-click on the symbol.
                    </p>
                  </li>
                  <li>
                    <div className="font-medium">Complete Order Details</div>
                    <p className="text-sm text-muted-foreground">
                      Follow the same steps as Method 1 to set volume, stop loss, take profit, and execute the trade.
                    </p>
                  </li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="order-types" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Understanding MT4 Order Types</CardTitle>
              <CardDescription>Different ways to enter and exit the market</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Market Orders</h3>
                <p className="text-sm text-muted-foreground">
                  Market orders execute immediately at the current market price. Use these when you want to enter the
                  market right away.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-md p-4">
                    <div className="font-medium">Buy Market Order</div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Opens a long position at the current ask price. You profit if the price rises.
                    </p>
                    <div className="mt-2 flex items-center">
                      <Badge className="bg-blue-100 text-blue-700 border-blue-300 hover:bg-blue-100">Buy</Badge>
                      <span className="text-sm text-muted-foreground ml-2">
                        Example: Buy EURUSD at current price of 1.0875
                      </span>
                    </div>
                  </div>
                  <div className="border rounded-md p-4">
                    <div className="font-medium">Sell Market Order</div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Opens a short position at the current bid price. You profit if the price falls.
                    </p>
                    <div className="mt-2 flex items-center">
                      <Badge className="bg-red-100 text-red-700 border-red-300 hover:bg-red-100">Sell</Badge>
                      <span className="text-sm text-muted-foreground ml-2">
                        Example: Sell EURUSD at current price of 1.0873
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Pending Orders</h3>
                <p className="text-sm text-muted-foreground">
                  Pending orders are set to execute when the price reaches a specified level. They're useful for
                  entering trades when you're not actively watching the market or for setting up trades at key technical
                  levels.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-md p-4">
                    <div className="font-medium">Buy Limit</div>
                    <p className="text-sm text-muted-foreground mt-1">
                      An order to buy at a price below the current market price. Use when you expect the price to fall
                      to a certain level and then rise.
                    </p>
                    <div className="mt-2 flex items-center">
                      <Badge className="bg-blue-100 text-blue-700 border-blue-300 hover:bg-blue-100">Buy Limit</Badge>
                      <span className="text-sm text-muted-foreground ml-2">
                        Example: Buy EURUSD at 1.0850 (below current price)
                      </span>
                    </div>
                  </div>
                  <div className="border rounded-md p-4">
                    <div className="font-medium">Sell Limit</div>
                    <p className="text-sm text-muted-foreground mt-1">
                      An order to sell at a price above the current market price. Use when you expect the price to rise
                      to a certain level and then fall.
                    </p>
                    <div className="mt-2 flex items-center">
                      <Badge className="bg-red-100 text-red-700 border-red-300 hover:bg-red-100">Sell Limit</Badge>
                      <span className="text-sm text-muted-foreground ml-2">
                        Example: Sell EURUSD at 1.0900 (above current price)
                      </span>
                    </div>
                  </div>
                  <div className="border rounded-md p-4">
                    <div className="font-medium">Buy Stop</div>
                    <p className="text-sm text-muted-foreground mt-1">
                      An order to buy at a price above the current market price. Use for breakout strategies when you
                      expect the price to continue rising after breaking a resistance level.
                    </p>
                    <div className="mt-2 flex items-center">
                      <Badge className="bg-blue-100 text-blue-700 border-blue-300 hover:bg-blue-100">Buy Stop</Badge>
                      <span className="text-sm text-muted-foreground ml-2">
                        Example: Buy EURUSD at 1.0900 (above current price)
                      </span>
                    </div>
                  </div>
                  <div className="border rounded-md p-4">
                    <div className="font-medium">Sell Stop</div>
                    <p className="text-sm text-muted-foreground mt-1">
                      An order to sell at a price below the current market price. Use for breakout strategies when you
                      expect the price to continue falling after breaking a support level.
                    </p>
                    <div className="mt-2 flex items-center">
                      <Badge className="bg-red-100 text-red-700 border-red-300 hover:bg-red-100">Sell Stop</Badge>
                      <span className="text-sm text-muted-foreground ml-2">
                        Example: Sell EURUSD at 1.0850 (below current price)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">How to Place a Pending Order</h3>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>
                    <div className="font-medium">Open the Order Window</div>
                    <p className="text-sm text-muted-foreground">
                      Press F9 or right-click on the chart and select "New Order".
                    </p>
                  </li>
                  <li>
                    <div className="font-medium">Select Order Type</div>
                    <p className="text-sm text-muted-foreground">
                      In the Type dropdown, select the pending order type you want (Buy Limit, Sell Limit, Buy Stop, or
                      Sell Stop).
                    </p>
                  </li>
                  <li>
                    <div className="font-medium">Set Entry Price</div>
                    <p className="text-sm text-muted-foreground">
                      Enter the price at which you want the order to be executed.
                    </p>
                  </li>
                  <li>
                    <div className="font-medium">Set Expiration (Optional)</div>
                    <p className="text-sm text-muted-foreground">
                      You can set an expiration date and time for your pending order. If not executed by this time, the
                      order will be automatically canceled.
                    </p>
                  </li>
                  <li>
                    <div className="font-medium">Complete Order Details</div>
                    <p className="text-sm text-muted-foreground">
                      Set volume, stop loss, take profit, and add a comment as needed.
                    </p>
                  </li>
                  <li>
                    <div className="font-medium">Place the Order</div>
                    <p className="text-sm text-muted-foreground">
                      Click the "Place" button to submit your pending order.
                    </p>
                  </li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="managing-trades" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Managing Your Open Positions</CardTitle>
              <CardDescription>How to modify, monitor, and close trades</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Viewing Open Positions</h3>
                <p className="text-sm text-muted-foreground">
                  All your active trades are displayed in the "Trade" tab of the Terminal window at the bottom of your
                  MT4 platform.
                </p>
                <div className="border rounded-md p-4 bg-gray-50">
                  <div className="text-sm">
                    <p className="font-medium mb-2">The Trade tab shows the following information for each position:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Order number (ticket)</li>
                      <li>Time the position was opened</li>
                      <li>Type (Buy/Sell)</li>
                      <li>Volume (lot size)</li>
                      <li>Symbol (currency pair or instrument)</li>
                      <li>Open price</li>
                      <li>Stop Loss level (if set)</li>
                      <li>Take Profit level (if set)</li>
                      <li>Current price</li>
                      <li>Commission and swap fees</li>
                      <li>Current profit/loss</li>
                      <li>Comment (if added)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Modifying an Open Position</h3>
                <p className="text-sm text-muted-foreground">
                  You can change the Stop Loss and Take Profit levels of an open position at any time.
                </p>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>
                    <div className="font-medium">Select the Position</div>
                    <p className="text-sm text-muted-foreground">
                      In the Terminal window's "Trade" tab, right-click on the position you want to modify.
                    </p>
                  </li>
                  <li>
                    <div className="font-medium">Choose "Modify or Delete Order"</div>
                    <p className="text-sm text-muted-foreground">This opens the order modification window.</p>
                  </li>
                  <li>
                    <div className="font-medium">Adjust Stop Loss and Take Profit</div>
                    <p className="text-sm text-muted-foreground">
                      Enter new values for Stop Loss and/or Take Profit. You can also click on the arrows to the right
                      of these fields to set them at the current market price.
                    </p>
                  </li>
                  <li>
                    <div className="font-medium">Apply Changes</div>
                    <p className="text-sm text-muted-foreground">Click the "Modify" button to save your changes.</p>
                  </li>
                </ol>
                <Alert className="mt-2 bg-blue-50 border-blue-200">
                  <InfoIcon className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-600">
                    You can also modify orders directly from the chart by dragging the Stop Loss and Take Profit lines
                    (horizontal dashed lines) to new price levels.
                  </AlertDescription>
                </Alert>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Setting a Trailing Stop</h3>
                <p className="text-sm text-muted-foreground">
                  A trailing stop automatically adjusts your stop loss level as the price moves in your favor, helping
                  to lock in profits while still allowing room for further gains.
                </p>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>
                    <div className="font-medium">Select the Position</div>
                    <p className="text-sm text-muted-foreground">
                      In the Terminal window's "Trade" tab, right-click on the position.
                    </p>
                  </li>
                  <li>
                    <div className="font-medium">Choose "Trailing Stop"</div>
                    <p className="text-sm text-muted-foreground">
                      A submenu will appear with different pip values (e.g., 15 points, 20 points, etc.).
                    </p>
                  </li>
                  <li>
                    <div className="font-medium">Select the Distance</div>
                    <p className="text-sm text-muted-foreground">
                      Choose how many pips away from the current price you want the trailing stop to follow. For
                      example, selecting "50 points" will keep your stop loss 50 pips away from the price as it moves in
                      your favor.
                    </p>
                  </li>
                </ol>
                <Alert className="mt-2 bg-amber-50 border-amber-200">
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                  <AlertDescription className="text-amber-600">
                    Important: Trailing stops only work while your MT4 platform is running. If you close the platform,
                    the trailing stop will freeze at its last position.
                  </AlertDescription>
                </Alert>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Closing a Position</h3>
                <p className="text-sm text-muted-foreground">
                  You can manually close a position before it hits your stop loss or take profit levels.
                </p>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>
                    <div className="font-medium">Method 1: From the Terminal</div>
                    <p className="text-sm text-muted-foreground">
                      In the "Trade" tab, right-click on the position and select "Close Order". Confirm the action in
                      the dialog that appears.
                    </p>
                  </li>
                  <li>
                    <div className="font-medium">Method 2: From the Chart</div>
                    <p className="text-sm text-muted-foreground">
                      Double-click on the position line on your chart (horizontal line at your entry price). This opens
                      the order window where you can click "Close" to exit the trade.
                    </p>
                  </li>
                  <li>
                    <div className="font-medium">Partial Close</div>
                    <p className="text-sm text-muted-foreground">
                      To close only part of your position, right-click on the position in the Terminal, select "Close
                      Order", and then modify the volume to close only a portion of your trade.
                    </p>
                  </li>
                </ol>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Managing Multiple Positions</h3>
                <p className="text-sm text-muted-foreground">
                  If you have multiple positions open, you can manage them collectively.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <div className="font-medium">Close All Positions</div>
                    <p className="text-sm text-muted-foreground">
                      Right-click in the "Trade" tab and select "Close All" to exit all open positions at once.
                    </p>
                  </li>
                  <li>
                    <div className="font-medium">Close All Winning/Losing Trades</div>
                    <p className="text-sm text-muted-foreground">
                      Right-click in the "Trade" tab and select "Close All Profitable" or "Close All Losing" to
                      selectively close positions based on their current performance.
                    </p>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk-management" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Risk Management in MT4</CardTitle>
              <CardDescription>Protecting your account and managing trade risk</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Position Sizing</h3>
                <p className="text-sm text-muted-foreground">
                  Determining the appropriate lot size is crucial for managing risk. A common rule is to risk no more
                  than 1-2% of your account on any single trade.
                </p>
                <div className="border rounded-md p-4 bg-gray-50">
                  <div className="text-sm">
                    <p className="font-medium mb-2">Position Size Calculation Example:</p>
                    <ol className="list-decimal pl-5 space-y-1">
                      <li>Account Balance: $10,000</li>
                      <li>Risk Percentage: 1% = $100 maximum risk per trade</li>
                      <li>Stop Loss: 50 pips</li>
                      <li>
                        Lot Size Calculation: $100 ÷ (50 pips × $10 per pip) = 0.2 lots
                        <p className="text-xs text-muted-foreground mt-1">
                          Note: For major currency pairs, 1 standard lot (1.0) typically equals $10 per pip.
                        </p>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Using Stop Loss Orders</h3>
                <p className="text-sm text-muted-foreground">
                  Always set a stop loss for every trade to limit potential losses if the market moves against you.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-md p-4">
                    <div className="font-medium">Technical Stop Loss</div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Place your stop loss at a logical technical level, such as just below a support level for long
                      positions or above a resistance level for short positions.
                    </p>
                  </div>
                  <div className="border rounded-md p-4">
                    <div className="font-medium">Volatility-Based Stop Loss</div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Set your stop loss based on market volatility, such as a multiple of the Average True Range (ATR)
                      indicator.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Take Profit Strategies</h3>
                <p className="text-sm text-muted-foreground">
                  Setting take profit levels helps you lock in gains and removes the emotional aspect of deciding when
                  to exit a profitable trade.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-md p-4">
                    <div className="font-medium">Risk-Reward Ratio</div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Aim for a positive risk-reward ratio, such as 1:2 or 1:3. If you're risking 50 pips on a trade,
                      set your take profit at 100-150 pips.
                    </p>
                  </div>
                  <div className="border rounded-md p-4">
                    <div className="font-medium">Technical Take Profit</div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Set your take profit at significant technical levels, such as previous highs/lows, round numbers,
                      or Fibonacci extension levels.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Advanced Risk Management Techniques</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-md p-4">
                    <div className="font-medium">Scaling In/Out</div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Instead of entering or exiting a position all at once, you can do so in parts to average your
                      entry price or secure partial profits.
                    </p>
                    <ul className="list-disc pl-5 text-sm text-muted-foreground mt-2 space-y-1">
                      <li>
                        Scaling In: Add to your position at different price levels as the market moves in your favor.
                      </li>
                      <li>
                        Scaling Out: Close portions of your position at different profit targets, leaving the remainder
                        to potentially capture larger moves.
                      </li>
                    </ul>
                  </div>
                  <div className="border rounded-md p-4">
                    <div className="font-medium">Hedging</div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Open positions in opposite directions on the same or correlated instruments to reduce risk
                      exposure.
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Example: If you have a long EURUSD position and are concerned about short-term downside risk, you
                      might open a small short position as a hedge.
                    </p>
                  </div>
                </div>
              </div>

              <Alert className="bg-blue-50 border-blue-200">
                <InfoIcon className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-600">
                  <p className="font-medium">Risk Management Tips for Demo Trading:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Treat your demo account as if it were real money to develop good habits</li>
                    <li>Always use stop losses and take profits on every trade</li>
                    <li>Keep a trading journal to track your decisions and results</li>
                    <li>Practice consistent position sizing based on your risk tolerance</li>
                    <li>Don't overtrade - quality of trades is more important than quantity</li>
                  </ul>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

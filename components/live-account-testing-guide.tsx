import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, ArrowRight, BarChart3, RefreshCw, BookOpen } from "lucide-react"
import Link from "next/link"

export default function LiveAccountTestingGuide() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Live Account Testing Guide</CardTitle>
          <CardDescription>
            Follow this guide to test your live MT5 account with our platform and verify all functionality.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                  <span className="font-bold text-blue-600">1</span>
                </div>
                <CardTitle className="text-lg">Connect Your Account</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Connect your live MT5 account using your account credentials and server information.
                </p>
                <Button asChild size="sm">
                  <Link href="/trading-accounts/connect-live-mt5">
                    Connect MT5 Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                  <span className="font-bold text-blue-600">2</span>
                </div>
                <CardTitle className="text-lg">Place Test Trades</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Execute trades in your MT5 platform to test synchronization and performance tracking.
                </p>
                <ul className="text-sm space-y-2 mb-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                    <span>Place at least one buy and one sell trade</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                    <span>Modify stop loss and take profit levels</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                    <span>Close at least one position manually</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                  <span className="font-bold text-blue-600">3</span>
                </div>
                <CardTitle className="text-lg">Verify Functionality</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Check that all platform features are working correctly with your live account data.
                </p>
                <ul className="text-sm space-y-2 mb-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                    <span>Confirm trade synchronization</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                    <span>Verify performance metrics</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                    <span>Test journal entry creation</span>
                  </li>
                </ul>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/trading-accounts">
                    View Trading Accounts
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              For security, we recommend using the investor password option when connecting your live account. This
              provides read-only access to your trading data.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Tabs defaultValue="sync">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="sync">Data Synchronization</TabsTrigger>
          <TabsTrigger value="monitor">Live Monitoring</TabsTrigger>
          <TabsTrigger value="journal">Journal Integration</TabsTrigger>
        </TabsList>
        <TabsContent value="sync" className="p-4 border rounded-md mt-2">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Testing Data Synchronization</h3>
            <p className="text-muted-foreground">
              Verify that your MT5 account data is properly synchronized with our platform.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="border rounded-md p-4">
                <h4 className="font-medium mb-2 flex items-center">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Automatic Synchronization
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  By default, your account data is synchronized every 5 minutes. You can test this by:
                </p>
                <ol className="text-sm list-decimal list-inside space-y-1">
                  <li>Placing a trade in MT5</li>
                  <li>Waiting for the next sync cycle (or manually triggering a sync)</li>
                  <li>Verifying the trade appears in your account dashboard</li>
                </ol>
              </div>

              <div className="border rounded-md p-4">
                <h4 className="font-medium mb-2 flex items-center">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Data Accuracy
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Confirm that the following data points match between MT5 and our platform:
                </p>
                <ul className="text-sm list-disc list-inside space-y-1">
                  <li>Account balance and equity</li>
                  <li>Open positions (symbol, direction, size, entry price)</li>
                  <li>Closed trades (including profit/loss)</li>
                  <li>Stop loss and take profit levels</li>
                </ul>
              </div>
            </div>

            <Button variant="outline" size="sm" asChild className="mt-2">
              <Link href="/trading-accounts/[id]/live-monitor" as="/trading-accounts/1/live-monitor">
                Open Live Monitor
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="monitor" className="p-4 border rounded-md mt-2">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Testing Live Monitoring</h3>
            <p className="text-muted-foreground">
              Verify that the real-time monitoring features work correctly with your live account.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="border rounded-md p-4">
                <h4 className="font-medium mb-2">Real-Time Updates</h4>
                <p className="text-sm text-muted-foreground mb-2">Test the following real-time features:</p>
                <ul className="text-sm list-disc list-inside space-y-1">
                  <li>Balance and equity updates</li>
                  <li>Open position tracking</li>
                  <li>Trade execution notifications</li>
                  <li>P/L calculations</li>
                </ul>
              </div>

              <div className="border rounded-md p-4">
                <h4 className="font-medium mb-2">Performance Metrics</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Verify that performance metrics are calculated correctly:
                </p>
                <ul className="text-sm list-disc list-inside space-y-1">
                  <li>Win rate and profit factor</li>
                  <li>Average win/loss</li>
                  <li>Drawdown calculations</li>
                  <li>Risk-reward ratios</li>
                </ul>
              </div>
            </div>

            <Button variant="outline" size="sm" asChild className="mt-2">
              <Link href="/trading-accounts/[id]" as="/trading-accounts/1">
                View Account Details
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="journal" className="p-4 border rounded-md mt-2">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Testing Journal Integration</h3>
            <p className="text-muted-foreground">
              Verify that your live trades can be properly documented in your trading journal.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="border rounded-md p-4">
                <h4 className="font-medium mb-2 flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Journal Entry Creation
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Test creating journal entries for your live trades:
                </p>
                <ol className="text-sm list-decimal list-inside space-y-1">
                  <li>Navigate to your journal section</li>
                  <li>Create a new entry linked to a live trade</li>
                  <li>Add notes, screenshots, and tags</li>
                  <li>Save and verify the entry is properly linked</li>
                </ol>
              </div>

              <div className="border rounded-md p-4">
                <h4 className="font-medium mb-2">Trade Analysis</h4>
                <p className="text-sm text-muted-foreground mb-2">Test the trade analysis features:</p>
                <ul className="text-sm list-disc list-inside space-y-1">
                  <li>Trade categorization and tagging</li>
                  <li>Performance by tag/category</li>
                  <li>Trade review workflow</li>
                  <li>Pattern identification</li>
                </ul>
              </div>
            </div>

            <Button variant="outline" size="sm" asChild className="mt-2">
              <Link href="/journal/new">
                Create Journal Entry
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

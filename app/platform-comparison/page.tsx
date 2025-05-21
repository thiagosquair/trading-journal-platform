import { SidebarWrapper } from "@/components/sidebar-navigation"
import { PlatformFeaturesComparison } from "@/components/platform-features-comparison"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PlatformComparisonPage() {
  // List of platforms to compare
  const allPlatforms = [
    "mt4",
    "mt5",
    "tradingview",
    "interactivebrokers",
    "tradestation",
    "ninjatrader",
    "ctrader",
    "dxtrade",
    "dxfeed",
    "thinkorswim",
    "matchtrader",
    "tradovate",
    "rithmic",
    "sierrachart",
  ]

  // Group platforms by category
  const forexPlatforms = ["mt4", "mt5", "ctrader", "dxtrade", "matchtrader"]
  const stockPlatforms = ["tradingview", "interactivebrokers", "tradestation", "thinkorswim"]
  const futuresPlatforms = ["ninjatrader", "tradovate", "rithmic", "sierrachart"]

  return (
    <SidebarWrapper>
      <div className="container max-w-full px-4 py-6">
        <h1 className="text-3xl font-bold mb-2">Platform Comparison</h1>
        <p className="text-muted-foreground mb-6">
          Compare features and capabilities across different trading platforms
        </p>

        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Platforms</TabsTrigger>
            <TabsTrigger value="forex">Forex</TabsTrigger>
            <TabsTrigger value="stocks">Stocks</TabsTrigger>
            <TabsTrigger value="futures">Futures</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <PlatformFeaturesComparison platforms={allPlatforms} />
          </TabsContent>

          <TabsContent value="forex">
            <PlatformFeaturesComparison platforms={forexPlatforms} />
          </TabsContent>

          <TabsContent value="stocks">
            <PlatformFeaturesComparison platforms={stockPlatforms} />
          </TabsContent>

          <TabsContent value="futures">
            <PlatformFeaturesComparison platforms={futuresPlatforms} />
          </TabsContent>
        </Tabs>

        <div className="grid gap-6 md:grid-cols-2 mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Platform Selection Guide</CardTitle>
              <CardDescription>How to choose the right platform for your trading needs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Consider Your Trading Style</h3>
                  <p className="text-sm text-muted-foreground">
                    Different platforms excel at different trading styles. Day traders might prefer platforms with
                    advanced charting and low latency, while swing traders might prioritize fundamental data and
                    research tools.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Asset Classes</h3>
                  <p className="text-sm text-muted-foreground">
                    Ensure the platform supports the assets you want to trade. Some platforms specialize in specific
                    markets like forex or futures, while others offer a broader range.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Technical Requirements</h3>
                  <p className="text-sm text-muted-foreground">
                    Consider the platform's system requirements, stability, and performance. Some platforms are
                    resource-intensive and may require powerful hardware.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Cost Structure</h3>
                  <p className="text-sm text-muted-foreground">
                    Compare subscription fees, data fees, and any other costs associated with using the platform. Some
                    platforms offer free basic versions but charge for premium features.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Integration Capabilities</CardTitle>
              <CardDescription>How our platform connects with different trading systems</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Data Import Methods</h3>
                  <p className="text-sm text-muted-foreground">
                    Our platform supports various data import methods including API connections, CSV imports, and direct
                    database connections depending on the trading platform.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Authentication Types</h3>
                  <p className="text-sm text-muted-foreground">
                    We support multiple authentication methods including API keys, OAuth, and direct login credentials
                    (with investor passwords for read-only access when available).
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Data Refresh Rates</h3>
                  <p className="text-sm text-muted-foreground">
                    Depending on the platform and connection type, data refresh rates range from real-time to daily
                    updates. Most connections support automatic syncing every 15 minutes.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Security Measures</h3>
                  <p className="text-sm text-muted-foreground">
                    All connections are encrypted and we prioritize read-only access when available. We never store your
                    trading passwords in plain text and use industry-standard security practices.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarWrapper>
  )
}

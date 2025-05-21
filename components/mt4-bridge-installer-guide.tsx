import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, CheckCircle, ArrowRight } from "lucide-react"

export default function MT4BridgeInstallerGuide() {
  return (
    <div className="container max-w-4xl py-8">
      <Card>
        <CardHeader>
          <CardTitle>MT4 Bridge Download & Installation Guide</CardTitle>
          <CardDescription>
            Follow these steps to download and install the MT4 Bridge to connect your MetaTrader 4 account to our
            platform
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="flex flex-col md:flex-row items-center gap-6 p-4 bg-muted rounded-lg">
            <img
              src="/metatrader-bridge-installer.png"
              alt="MT4 Bridge Installer"
              className="w-full md:w-1/3 h-auto rounded-md"
            />
            <div>
              <h3 className="text-xl font-semibold mb-2">MT4 Bridge Installer</h3>
              <p className="mb-4">
                Our MT4 Bridge software creates a secure connection between your MetaTrader 4 terminal and our platform,
                allowing for real-time trade synchronization.
              </p>
              <Button className="gap-2">
                <Download size={16} />
                Download MT4 Bridge (Windows)
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Installation Instructions</h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h4 className="font-medium">Download the installer</h4>
                  <p className="text-muted-foreground">
                    Click the download button above to get the MT4 Bridge installer package.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="font-medium">Run the installer</h4>
                  <p className="text-muted-foreground">
                    Double-click the downloaded file and follow the on-screen instructions to install the bridge.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h4 className="font-medium">Enter your account credentials</h4>
                  <p className="text-muted-foreground">
                    When prompted, enter your MT4 account number and password to connect to your trading account.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                  4
                </div>
                <div>
                  <h4 className="font-medium">Complete the connection</h4>
                  <p className="text-muted-foreground">
                    Return to our platform and verify the connection status in your account dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
            <CheckCircle className="text-green-500 h-5 w-5 mt-0.5" />
            <div>
              <h4 className="font-medium text-green-800">Automatic Trade Synchronization</h4>
              <p className="text-green-700">
                Once connected, all your trades will automatically sync with our platform, allowing you to track
                performance, analyze trades, and generate reports.
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <Button variant="outline" className="gap-2" asChild>
              <a href="/trading-accounts">
                Return to Trading Accounts
                <ArrowRight size={16} />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

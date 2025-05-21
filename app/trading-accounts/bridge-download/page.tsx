import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Download MetaTrader Bridge | Trading Journal Platform",
  description: "Download and install the MetaTrader bridge software for live data connection",
}

export default function BridgeDownloadPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/trading-accounts">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">MetaTrader Bridge Download</h1>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-lg border shadow-sm p-6">
          <h2 className="text-2xl font-bold mb-4">Download MT4 Bridge Software</h2>
          <p className="mb-4">
            The MetaTrader Bridge software allows you to connect your MT4 platform directly to our trading journal for
            automatic trade synchronization.
          </p>

          <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
            <div className="w-full md:w-1/3">
              <img
                src="/metatrader-bridge-installer.png"
                alt="MetaTrader Bridge Installer"
                className="rounded-md border"
              />
            </div>
            <div className="w-full md:w-2/3">
              <h3 className="text-xl font-semibold mb-2">MT4 Bridge Installer</h3>
              <p className="mb-4">
                Our bridge software is lightweight and secure. It runs alongside your MT4 platform and automatically
                syncs your trades.
              </p>
              <Button size="lg" className="w-full md:w-auto">
                Download MT4 Bridge v2.1.4
              </Button>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-xl font-semibold mb-4">Installation Instructions</h3>
            <ol className="space-y-3 list-decimal pl-5">
              <li>Download the MT4 Bridge installer using the button above</li>
              <li>Close your MetaTrader 4 platform if it's currently running</li>
              <li>Run the installer and follow the on-screen instructions</li>
              <li>Open MetaTrader 4 after installation is complete</li>
              <li>The bridge will automatically connect and start syncing your trades</li>
            </ol>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-green-800 mb-2">Automatic Trade Synchronization</h3>
          <p className="text-green-700">
            Once installed, the bridge will automatically sync your trades with your journal. No manual entry required!
          </p>
        </div>

        <div className="flex justify-end">
          <Button variant="outline" asChild>
            <Link href="/trading-accounts">Return to Trading Accounts</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

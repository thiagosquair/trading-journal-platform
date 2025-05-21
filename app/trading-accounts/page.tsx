import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import MT4BridgeDownloadGuide from "@/components/mt4-bridge-download-guide"

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

      <MT4BridgeDownloadGuide />
    </div>
  )
}

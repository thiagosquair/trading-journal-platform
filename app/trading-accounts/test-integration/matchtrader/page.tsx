import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import MatchTraderIntegrationTest from "@/components/matchtrader-integration-test"

export const metadata: Metadata = {
  title: "MatchTrader Integration Test | Trading Journal Platform",
  description: "Test MatchTrader API integration and connection",
}

export default function MatchTraderIntegrationTestPage() {
  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <Button variant="ghost" className="mb-6" asChild>
        <Link href="/trading-accounts">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Trading Accounts
        </Link>
      </Button>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">MatchTrader Integration Test</h1>
          <p className="text-muted-foreground mt-2">Test the MatchTrader API integration with demo credentials</p>
        </div>

        <MatchTraderIntegrationTest />
      </div>
    </div>
  )
}

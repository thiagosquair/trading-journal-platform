import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import MatchTraderAccountConnector from "@/components/matchtrader-account-connector"

export const metadata: Metadata = {
  title: "Connect MatchTrader Account | Trading Journal Platform",
  description: "Connect your MatchTrader account to track your trading performance",
}

export default function ConnectMatchTraderPage() {
  return (
    <div className="container mx-auto py-8 max-w-3xl">
      <Button variant="ghost" className="mb-6" asChild>
        <Link href="/trading-accounts/add-account">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Platform Selection
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Connect MatchTrader Account</CardTitle>
          <CardDescription>
            Connect your MatchTrader account to track your trading performance and analyze your trades
          </CardDescription>
        </CardHeader>

        <CardContent>
          <MatchTraderAccountConnector />
        </CardContent>
      </Card>
    </div>
  )
}

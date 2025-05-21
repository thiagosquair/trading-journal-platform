import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import CTraderAccountConnector from "@/components/ctrader-account-connector"

export const metadata: Metadata = {
  title: "Connect cTrader Account | Trading Journal Platform",
  description: "Connect your cTrader account to track your trading performance",
}

export default function ConnectCTraderPage() {
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
          <CardTitle>Connect cTrader Account</CardTitle>
          <CardDescription>
            Connect your cTrader account to track your trading performance and analyze your trades
          </CardDescription>
        </CardHeader>

        <CardContent>
          <CTraderAccountConnector />
        </CardContent>
      </Card>
    </div>
  )
}

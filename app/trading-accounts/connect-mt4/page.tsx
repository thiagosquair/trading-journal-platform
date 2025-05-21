import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import MT4AccountConnector from "@/components/mt4-account-connector"

export const metadata: Metadata = {
  title: "Connect MT4 Account",
  description: "Connect your MetaTrader 4 account to track your trading performance",
}

export default function ConnectMT4Page() {
  return (
    <div className="container mx-auto py-6 max-w-3xl">
      <Button variant="ghost" className="mb-6" asChild>
        <Link href="/trading-accounts/add-account">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Platform Selection
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Connect MetaTrader 4 Account</CardTitle>
          <CardDescription>
            Connect your MT4 account to track your trading performance and analyze your trades
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MT4AccountConnector />
        </CardContent>
      </Card>
    </div>
  )
}

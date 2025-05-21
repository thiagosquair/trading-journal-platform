import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import ConnectMT5ClientPage from "./ConnectMT5ClientPage"

export const metadata: Metadata = {
  title: "Connect MT5 Account | Trading Journal Platform",
  description: "Connect your MetaTrader 5 account to track your trading performance",
}

export default function ConnectMT5Page() {
  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="mb-6">
          <Link href="/trading-accounts">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Trading Accounts
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Connect MT5 Account</h1>
        <p className="text-muted-foreground mt-2">
          Connect your MetaTrader 5 account to track your trading performance and analyze your trades
        </p>
      </div>

      <ConnectMT5ClientPage />
    </div>
  )
}

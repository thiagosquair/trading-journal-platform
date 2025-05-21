import type { Metadata } from "next"
import TradingAccountsClient from "./trading-accounts-client"

export const metadata: Metadata = {
  title: "Trading Accounts | Trading Journal Platform",
  description: "Manage and monitor your connected trading accounts",
}

export default function TradingAccountsPage() {
  return (
    <div className="container mx-auto py-8">
      <TradingAccountsClient />
    </div>
  )
}

import type { Metadata } from "next"
import { LiveTradeMonitor } from "@/components/live-trade-monitor"
import { fetchAccountById } from "@/lib/trading-actions"

export const metadata: Metadata = {
  title: "Live Trade Monitor",
  description: "Real-time monitoring of your trading account",
}

export default async function LiveMonitorPage({ params }: { params: { id: string } }) {
  const account = await fetchAccountById(params.id)

  if (!account) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Account Not Found</h1>
        <p>The requested trading account could not be found.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">{account.name}</h1>
        <p className="text-muted-foreground">
          {account.platform} • Account #{account.accountNumber}
        </p>
      </div>

      <LiveTradeMonitor accountId={params.id} platform={account.platform} />
    </div>
  )
}

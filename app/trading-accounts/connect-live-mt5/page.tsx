import type { Metadata } from "next"
import MT5LiveAccountConnector from "@/components/mt5-live-account-connector"

export const metadata: Metadata = {
  title: "Connect Live MT5 Account | Trading Journal Platform",
  description: "Connect your live MetaTrader 5 account to track your trading performance in real-time",
}

export default function ConnectLiveMT5Page() {
  return (
    <div className="container mx-auto py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Connect Live MT5 Account</h1>
        <p className="text-muted-foreground">
          Connect your live MetaTrader 5 account to track your trading performance and analyze your results.
        </p>
      </div>

      <MT5LiveAccountConnector />
    </div>
  )
}

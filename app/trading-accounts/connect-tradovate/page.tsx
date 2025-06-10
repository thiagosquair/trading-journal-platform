import { TradovateAccountConnector } from "@/components/tradovate-account-connector"

export default function ConnectTradovatePage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Connect Tradovate Account</h1>
      <p className="mb-6 text-muted-foreground">
        Connect your Tradovate account to track your trades and performance in your trading journal.
      </p>
      <TradovateAccountConnector />
    </div>
  )
}

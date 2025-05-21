import MT4AccountConnector from "@/components/mt4-account-connector"

export const metadata = {
  title: "Connect New MT4 Account | Trading Journal Platform",
  description: "Connect your new OANDA MT4 demo account #400929",
}

export default function NewMT4AccountPage() {
  return (
    <div className="container mx-auto py-6 space-y-8 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">New MT4 Account Connection</h1>
        <p className="text-muted-foreground mt-1">Connect your new OANDA MT4 demo account #400929</p>
      </div>

      <MT4AccountConnector />
    </div>
  )
}

import type { Metadata } from "next"
import TradingAccountsClientPage from "./TradingAccountsClientPage"

export const metadata: Metadata = {
  title: "Trading Accounts",
  description: "Connect and manage your trading accounts",
}

export default function TradingAccountsPage() {
  return <TradingAccountsClientPage />
}

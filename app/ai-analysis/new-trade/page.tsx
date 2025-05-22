import type { Metadata } from "next"
import NewTradeAnalysisClientPage from "./NewTradeAnalysisClientPage"

export const metadata: Metadata = {
  title: "New Trade Analysis | TradeLinx",
  description: "Analyze a new trade with AI",
}

export default function NewTradeAnalysisPage() {
  return <NewTradeAnalysisClientPage />
}

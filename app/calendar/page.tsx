import type { Metadata } from "next"
import CalendarClientPage from "./CalendarClientPage"

export const metadata: Metadata = {
  title: "Trading Calendar | TradeLinx",
  description: "View and manage your trading schedule",
}

export default function CalendarPage() {
  return <CalendarClientPage />
}

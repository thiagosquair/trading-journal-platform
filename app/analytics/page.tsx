import type { Metadata } from "next"
import { SidebarWrapper } from "@/components/sidebar-navigation"
import { JournalStatisticsDashboard } from "@/components/journal-statistics-dashboard"

export const metadata: Metadata = {
  title: "Trading Analytics | TradeLinx",
  description: "Analyze your trading performance and identify patterns to improve your strategy",
}

export default function AnalyticsPage() {
  return (
    <SidebarWrapper>
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6">Trading Analytics</h1>
        <JournalStatisticsDashboard />
      </div>
    </SidebarWrapper>
  )
}

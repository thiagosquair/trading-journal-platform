import { Suspense } from "react"
import type { Metadata } from "next"
import { SidebarWrapper } from "@/components/sidebar-navigation"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { JournalStatisticsDashboard } from "@/components/journal-statistics-dashboard"
import { JournalStatisticsSkeleton } from "@/components/journal-statistics-skeleton"

export const metadata: Metadata = {
  title: "Journal Statistics | Trading Journal Platform",
  description: "Analyze your trading journal entries and performance",
}

export default function JournalStatisticsPage() {
  return (
    <SidebarWrapper>
      <div className="flex flex-col min-h-full">
        <header className="border-b bg-background">
          <div className="flex h-16 items-center px-4 gap-2">
            <SidebarTrigger />
            <div className="ml-2 flex-1">
              <h1 className="text-xl font-semibold">Journal Statistics</h1>
              <p className="text-sm text-muted-foreground">Analyze your trading journal entries and performance</p>
            </div>
          </div>
        </header>

        <div className="flex-1 p-6">
          <Suspense fallback={<JournalStatisticsSkeleton />}>
            <JournalStatisticsDashboard />
          </Suspense>
        </div>
      </div>
    </SidebarWrapper>
  )
}

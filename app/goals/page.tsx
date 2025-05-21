import { Suspense } from "react"
import type { Metadata } from "next"
import { SidebarWrapper } from "@/components/sidebar-navigation"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { GoalsDashboard } from "@/components/goals-dashboard"
import { GoalsSkeleton } from "@/components/goals-skeleton"

export const metadata: Metadata = {
  title: "Performance Goals | Trading Journal Platform",
  description: "Set and track your trading performance goals",
}

export default function GoalsPage() {
  return (
    <SidebarWrapper>
      <div className="flex flex-col min-h-full">
        <header className="border-b bg-background">
          <div className="flex h-16 items-center px-4 gap-2">
            <SidebarTrigger />
            <div className="ml-2 flex-1">
              <h1 className="text-xl font-semibold">Performance Goals</h1>
              <p className="text-sm text-muted-foreground">Set and track your trading performance targets</p>
            </div>
          </div>
        </header>

        <div className="flex-1 p-6">
          <Suspense fallback={<GoalsSkeleton />}>
            <GoalsDashboard />
          </Suspense>
        </div>
      </div>
    </SidebarWrapper>
  )
}

import { Suspense } from "react"
import { SidebarWrapper } from "@/components/sidebar-navigation"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { WealthProjectionCalculator } from "@/components/wealth-projection-calculator"
import { Skeleton } from "@/components/ui/skeleton"

export default function WealthProjectionPage() {
  return (
    <SidebarWrapper>
      <div className="flex flex-col min-h-full">
        <header className="border-b bg-background">
          <div className="flex h-16 items-center px-4 gap-2">
            <SidebarTrigger />
            <div className="ml-2 flex-1">
              <h1 className="text-xl font-semibold">Wealth Projection Calculator</h1>
              <p className="text-sm text-muted-foreground">Project your potential earnings and wealth growth</p>
            </div>
          </div>
        </header>

        <div className="flex-1 p-6">
          <Suspense
            fallback={
              <div className="space-y-4">
                <Skeleton className="h-[200px] w-full" />
                <Skeleton className="h-[300px] w-full" />
              </div>
            }
          >
            <WealthProjectionCalculator />
          </Suspense>
        </div>
      </div>
    </SidebarWrapper>
  )
}

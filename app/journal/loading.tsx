import { SidebarWrapper } from "@/components/sidebar-navigation"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { JournalEntriesSkeleton } from "@/components/journal-entries-skeleton"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <SidebarWrapper>
      <div className="flex flex-col min-h-full">
        <header className="border-b bg-background">
          <div className="flex h-16 items-center px-4 gap-2">
            <SidebarTrigger />
            <div className="ml-2 flex-1">
              <h1 className="text-xl font-semibold">Trading Journal</h1>
              <p className="text-sm text-muted-foreground">Document your trading insights and reflections</p>
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </header>

        <div className="flex-1 p-6 space-y-6">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <Skeleton className="h-10 w-full md:w-96" />
            <div className="flex gap-2">
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-32" />
            </div>
          </div>

          <div className="w-full">
            <Skeleton className="h-10 w-full max-w-md mb-6" />
            <JournalEntriesSkeleton />
          </div>
        </div>
      </div>
    </SidebarWrapper>
  )
}

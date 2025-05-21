import { Skeleton } from "@/components/ui/skeleton"
import { SidebarWrapper } from "@/components/sidebar-navigation"

export default function LeaderboardLoading() {
  return (
    <SidebarWrapper>
      <div className="container mx-auto py-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-5 w-96 mt-2" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-[260px]" />
            <Skeleton className="h-10 w-10" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1 space-y-6">
            <Skeleton className="h-[300px] w-full" />
            <Skeleton className="h-[200px] w-full" />
          </div>

          <div className="md:col-span-3">
            <div className="flex justify-between items-center mb-4">
              <Skeleton className="h-10 w-48" />
              <Skeleton className="h-5 w-32" />
            </div>

            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-[250px] w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SidebarWrapper>
  )
}

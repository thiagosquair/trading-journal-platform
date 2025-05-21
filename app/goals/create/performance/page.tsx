import { Suspense } from "react"
import { SidebarWrapper } from "@/components/sidebar-navigation"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { GoalGuidance } from "@/components/goal-guidance"
import { CreateGoalForm } from "@/components/create-goal-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"

export default function CreatePerformanceGoalPage() {
  return (
    <SidebarWrapper>
      <div className="flex flex-col min-h-full">
        <header className="border-b bg-background">
          <div className="flex h-16 items-center px-4 gap-2">
            <SidebarTrigger />
            <div className="ml-2 flex-1">
              <h1 className="text-xl font-semibold">Create Performance Goal</h1>
              <p className="text-sm text-muted-foreground">Set targets to improve your trading performance</p>
            </div>
          </div>
        </header>

        <div className="flex-1 p-6">
          <Tabs defaultValue="guidance" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="guidance">Guidance</TabsTrigger>
              <TabsTrigger value="create">Create Goal</TabsTrigger>
            </TabsList>
            <TabsContent value="guidance">
              <GoalGuidance />
            </TabsContent>
            <TabsContent value="create">
              <Suspense
                fallback={
                  <div className="space-y-4">
                    <Skeleton className="h-[200px] w-full" />
                    <Skeleton className="h-[300px] w-full" />
                  </div>
                }
              >
                <CreateGoalForm preselectedCategory="performance" preselectedMetric="win_rate" />
              </Suspense>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </SidebarWrapper>
  )
}

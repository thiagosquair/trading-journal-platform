import { Suspense } from "react"
import { SidebarWrapper } from "@/components/sidebar-navigation"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { RiskRewardGuidance } from "@/components/risk-reward-guidance"
import { RiskRewardCalculator } from "@/components/risk-reward-tracker"
import { CreateGoalForm } from "@/components/create-goal-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"

export default function CreateRiskManagementGoalPage() {
  return (
    <SidebarWrapper>
      <div className="flex flex-col min-h-full">
        <header className="border-b bg-background">
          <div className="flex h-16 items-center px-4 gap-2">
            <SidebarTrigger />
            <div className="ml-2 flex-1">
              <h1 className="text-xl font-semibold">Create Risk Management Goal</h1>
              <p className="text-sm text-muted-foreground">Set targets to improve your trading risk management</p>
            </div>
          </div>
        </header>

        <div className="flex-1 p-6">
          <Tabs defaultValue="guidance" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="guidance">Guidance</TabsTrigger>
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
              <TabsTrigger value="create">Create Goal</TabsTrigger>
            </TabsList>
            <TabsContent value="guidance">
              <RiskRewardGuidance />
            </TabsContent>
            <TabsContent value="calculator">
              <RiskRewardCalculator />
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
                <CreateGoalForm preselectedCategory="risk" preselectedMetric="risk_reward" />
              </Suspense>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </SidebarWrapper>
  )
}

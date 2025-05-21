import type { Metadata } from "next"
import { SidebarWrapper } from "@/components/sidebar-navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DailyPerformanceCalendar from "@/components/daily-performance-calendar"

export const metadata: Metadata = {
  title: "Performance Reports | TradeLinx",
  description: "Detailed performance analysis of your trading activity",
}

export default function PerformancePage() {
  return (
    <SidebarWrapper>
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6">Performance Reports</h1>

        <Tabs defaultValue="daily" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="daily">Daily Performance</TabsTrigger>
            <TabsTrigger value="summary">Performance Summary</TabsTrigger>
          </TabsList>

          <TabsContent value="daily" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Daily Trading Results</CardTitle>
              </CardHeader>
              <CardContent>
                <DailyPerformanceCalendar />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="summary" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center border rounded-md">
                    <p className="text-muted-foreground">Monthly performance chart will appear here</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Yearly Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center border rounded-md">
                    <p className="text-muted-foreground">Yearly performance chart will appear here</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center border rounded-md">
                    <p className="text-muted-foreground">Detailed metrics will appear here</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </SidebarWrapper>
  )
}

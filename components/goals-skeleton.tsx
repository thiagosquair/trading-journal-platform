import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function GoalsSkeleton() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="active" className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="active">Active Goals</TabsTrigger>
            <TabsTrigger value="history">Goal History</TabsTrigger>
            <TabsTrigger value="new">Set New Goal</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="active" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-24 mt-2" />
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-12" />
                    </div>
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-12" />
                    </div>
                    <Skeleton className="h-2 w-full" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <Skeleton className="h-9 w-20" />
                  <Skeleton className="h-9 w-20" />
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

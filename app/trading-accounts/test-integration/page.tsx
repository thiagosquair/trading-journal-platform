import { Suspense } from "react"
import { DXtradeIntegrationTest } from "@/components/dxtrade-integration-test"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

export default function TestIntegrationPage() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">DXtrade Integration Test</h1>
        <p className="text-muted-foreground">Testing integration with multiple DXtrade accounts</p>
      </div>

      <Alert variant="default" className="bg-blue-50 border-blue-200">
        <InfoIcon className="h-4 w-4 text-blue-600" />
        <AlertTitle>Mock Data Notice</AlertTitle>
        <AlertDescription>
          This test page is currently using mock data for demonstration purposes. Account balances and trades shown do
          not reflect your actual DXtrade account data. We're working on implementing the real DXtrade API integration.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>DXtrade Account Integration</CardTitle>
          <CardDescription>Connect and test multiple DXtrade accounts</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
            <DXtradeIntegrationTest />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}

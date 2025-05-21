import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"
import TradeLockerIntegrationTest from "@/components/tradelocker-integration-test"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

export default function TradeLockerIntegrationPage() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex items-center">
        <Button variant="ghost" size="sm" className="mr-2" asChild>
          <Link href="/trading-accounts/test-integration">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Integrations
          </Link>
        </Button>
      </div>

      <div>
        <h1 className="text-3xl font-bold mb-2">TradeLocker Integration Test</h1>
        <p className="text-muted-foreground">Test integration with TradeLocker trading platform</p>
      </div>

      <Alert variant="default" className="bg-blue-50 border-blue-200">
        <InfoIcon className="h-4 w-4 text-blue-600" />
        <AlertTitle>Beta Integration</AlertTitle>
        <AlertDescription>
          TradeLocker integration is currently in beta. Some features may be limited or under development. Your feedback
          will help us improve the integration.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
          <TradeLockerIntegrationTest />
        </Suspense>

        <Card>
          <CardHeader>
            <CardTitle>About TradeLocker</CardTitle>
            <CardDescription>Secure trading platform with advanced risk management</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Key Features</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Advanced risk management tools</li>
                <li>Real-time trade synchronization</li>
                <li>Performance analytics dashboard</li>
                <li>Multi-asset trading capabilities</li>
                <li>Automated trade journaling</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-2">Integration Capabilities</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Import historical trades</li>
                <li>Real-time position tracking</li>
                <li>Risk metrics synchronization</li>
                <li>Account performance statistics</li>
                <li>Trade execution (coming soon)</li>
              </ul>
            </div>

            <div className="pt-4">
              <Button className="w-full" asChild>
                <Link href="https://tradelocker.com/api-docs" target="_blank" rel="noopener noreferrer">
                  View TradeLocker API Documentation
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

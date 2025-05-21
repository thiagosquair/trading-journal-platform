import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import PlatformSelectionGrid from "@/components/platform-selection-grid"

export const metadata: Metadata = {
  title: "Add Trading Account | Trading Journal Platform",
  description: "Connect a new trading account to track your trading performance",
}

export default function AddAccountPage() {
  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <Button variant="ghost" className="mb-6" asChild>
        <Link href="/trading-accounts">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Trading Accounts
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Add Trading Account</CardTitle>
          <CardDescription>
            Select a trading platform to connect your account and track your performance
          </CardDescription>
        </CardHeader>

        <CardContent>
          <PlatformSelectionGrid />
        </CardContent>
      </Card>
    </div>
  )
}

import type { Metadata } from "next"
import LiveAccountTestingGuide from "@/components/live-account-testing-guide"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Live Account Testing Guide | Trading Journal Platform",
  description: "Guide for testing your live MT5 account with our trading journal platform",
}

export default function LiveTestingPage() {
  return (
    <div className="container mx-auto py-8 max-w-7xl">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/trading-accounts">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Trading Accounts
          </Link>
        </Button>
        <h1 className="text-3xl font-bold mb-2">Live Account Testing Guide</h1>
        <p className="text-muted-foreground">
          Follow this comprehensive guide to test your live MT5 account with our platform and verify all functionality.
        </p>
      </div>

      <LiveAccountTestingGuide />
    </div>
  )
}

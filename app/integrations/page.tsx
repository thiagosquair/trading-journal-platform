import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import type { Metadata } from "next"
import AllPlatformIntegrations from "@/components/all-platform-integrations"

export const metadata: Metadata = {
  title: "Platform Integrations | Trading Journal Platform",
  description: "Connect your trading accounts from various platforms to automatically import your trades",
}

export default function IntegrationsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <Link href="/" className="text-blue-600 hover:text-blue-800 flex items-center">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 space-y-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold tracking-tight">Platform Integrations</h1>
          <p className="text-muted-foreground mt-1">
            Connect your trading accounts from various platforms to automatically import your trades
          </p>
        </div>

        <AllPlatformIntegrations />
      </main>
    </div>
  )
}

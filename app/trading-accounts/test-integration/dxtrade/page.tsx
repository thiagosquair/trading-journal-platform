import type { Metadata } from "next"
import { DXtradeIntegrationTest } from "@/components/dxtrade-integration-test"

export const metadata: Metadata = {
  title: "DXtrade Integration Test | Trading Journal Platform",
  description: "Test the DXtrade integration for the Trading Journal Platform",
}

export default function DXtradeIntegrationTestPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">DXtrade Integration Test</h1>
      <p className="text-muted-foreground mb-8">
        This page allows you to test the DXtrade integration with both demo and live accounts.
      </p>

      <DXtradeIntegrationTest />
    </div>
  )
}

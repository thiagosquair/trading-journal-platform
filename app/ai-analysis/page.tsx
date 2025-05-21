import type { Metadata } from "next"
import Link from "next/link"
import { SidebarWrapper } from "@/components/sidebar-navigation"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { AiTradeAnalysis } from "@/components/ai-trade-analysis"

export const metadata: Metadata = {
  title: "AI Trade Analysis | TradeLinx",
  description: "AI-powered insights for your trading performance",
}

export default function AIAnalysisPage() {
  return (
    <SidebarWrapper>
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">AI Trade Analysis</h1>
          <Link href="/ai-analysis/new-trade">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Analyze New Trade
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <AiTradeAnalysis />
        </div>
      </div>
    </SidebarWrapper>
  )
}

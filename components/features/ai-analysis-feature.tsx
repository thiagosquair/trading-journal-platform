import Image from "next/image"
import { ArrowRight, Sparkles, Target, Scale, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function AIAnalysisFeature() {
  return (
    <div className="grid md:grid-cols-2 gap-8 items-center py-12">
      <div className="space-y-6">
        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-blue-50 text-blue-600 border-blue-100">
          <Sparkles className="h-3.5 w-3.5 mr-1" />
          NEW FEATURE
        </div>
        <h2 className="text-3xl font-bold tracking-tight">
          <span className="text-blue-600">AI-Powered</span> Trade Analysis
        </h2>
        <p className="text-muted-foreground">
          Upload your chart screenshots and get instant AI analysis of your trade setups, including pattern recognition,
          support/resistance levels, and risk/reward calculations.
        </p>
        <ul className="space-y-3">
          <li className="flex items-start">
            <Sparkles className="h-5 w-5 mr-2 text-blue-600 mt-0.5" />
            <span>Automatic pattern recognition and trend analysis</span>
          </li>
          <li className="flex items-start">
            <Target className="h-5 w-5 mr-2 text-blue-600 mt-0.5" />
            <span>Optimal entry and exit point suggestions</span>
          </li>
          <li className="flex items-start">
            <Scale className="h-5 w-5 mr-2 text-blue-600 mt-0.5" />
            <span>Risk/reward calculation and position sizing advice</span>
          </li>
          <li className="flex items-start">
            <Save className="h-5 w-5 mr-2 text-blue-600 mt-0.5" />
            <span>Save analysis directly to your trading journal</span>
          </li>
        </ul>
        <Button className="gap-2" asChild>
          <Link href="/trade-analysis">
            Try AI Analysis
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <div className="rounded-lg overflow-hidden border shadow-lg">
        <Image
          src="/ai-analysis-interface.png"
          alt="AI Trade Analysis Interface"
          width={600}
          height={400}
          className="w-full h-auto"
        />
      </div>
    </div>
  )
}

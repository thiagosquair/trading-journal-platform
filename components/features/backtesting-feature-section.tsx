import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, History, LineChart, BarChart2, TrendingUp } from "lucide-react"

export function BacktestingFeatureSection() {
  return (
    <div className="py-12 md:py-16">
      <div className="container px-4 mx-auto">
        <div className="inline-flex h-8 items-center rounded-full bg-blue-50 px-4 text-sm font-medium text-blue-600">
          NEW FEATURE
        </div>

        <div className="mt-4 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              <span className="text-blue-600">Advanced</span> Strategy Backtesting
            </h2>

            <p className="mt-4 text-gray-600">
              Test your trading strategies against historical data to validate performance before risking real capital.
              Our powerful backtesting engine provides comprehensive analytics and optimization tools.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100">
                  <History className="h-3.5 w-3.5 text-blue-600" />
                </div>
                <span>Backtest across multiple timeframes and instruments</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100">
                  <LineChart className="h-3.5 w-3.5 text-blue-600" />
                </div>
                <span>Detailed performance metrics and equity curves</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100">
                  <BarChart2 className="h-3.5 w-3.5 text-blue-600" />
                </div>
                <span>Strategy optimization and parameter tuning</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100">
                  <TrendingUp className="h-3.5 w-3.5 text-blue-600" />
                </div>
                <span>Monte Carlo simulations for risk assessment</span>
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/backtesting"
                className="inline-flex h-10 items-center rounded-md bg-blue-600 px-6 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Try Backtesting
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="relative rounded-xl overflow-hidden">
            <Image
              src="/backtesting-dashboard.png"
              alt="Backtesting Dashboard"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

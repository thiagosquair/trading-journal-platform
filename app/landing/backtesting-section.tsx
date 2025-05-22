import Image from "next/image"
import Link from "next/link"
import { History, LineChart, BarChart2, TrendingUp } from "lucide-react"

export function BacktestingSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="new-feature">NEW FEATURE</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">
              <span className="text-blue-600">Advanced</span> Strategy Backtesting
            </h2>
            <p className="text-gray-600 mb-6">
              Test your trading strategies against historical data to validate performance before risking real capital.
              Our powerful backtesting engine provides comprehensive analytics and optimization tools.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <History className="h-4 w-4 text-blue-600" />
                </div>
                <p className="text-gray-700">Backtest across multiple timeframes and instruments</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <LineChart className="h-4 w-4 text-blue-600" />
                </div>
                <p className="text-gray-700">Detailed performance metrics and equity curves</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <BarChart2 className="h-4 w-4 text-blue-600" />
                </div>
                <p className="text-gray-700">Strategy optimization and parameter tuning</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                </div>
                <p className="text-gray-700">Monte Carlo simulations for risk assessment</p>
              </div>
            </div>
            <div className="mt-8">
              <Link
                href="/backtesting"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
              >
                Try Backtesting
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="relative rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/backtesting-dashboard.png"
                alt="Backtesting Dashboard"
                width={600}
                height={400}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

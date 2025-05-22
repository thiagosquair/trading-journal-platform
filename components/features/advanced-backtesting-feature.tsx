import Image from "next/image"
import Link from "next/link"
import { History, LineChart, BarChart2, TrendingUp } from "lucide-react"

export function AdvancedBacktestingFeature() {
  return (
    <div className="w-full py-12">
      <div className="new-feature">NEW FEATURE</div>
      <h2 className="feature-title">
        <span className="text-blue-600">Advanced</span> Strategy Backtesting
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-gray-600 mb-6">
            Test your trading strategies against historical data to validate performance before risking real capital.
            Our powerful backtesting engine provides comprehensive analytics and optimization tools.
          </p>

          <div className="space-y-4 mb-6">
            <div className="feature-point">
              <History className="h-4 w-4 text-blue-600" />
              <span>Backtest across multiple timeframes and instruments</span>
            </div>
            <div className="feature-point">
              <LineChart className="h-4 w-4 text-blue-600" />
              <span>Detailed performance metrics and equity curves</span>
            </div>
            <div className="feature-point">
              <BarChart2 className="h-4 w-4 text-blue-600" />
              <span>Strategy optimization and parameter tuning</span>
            </div>
            <div className="feature-point">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <span>Monte Carlo simulations for risk assessment</span>
            </div>
          </div>

          <Link href="/backtesting" className="learn-more">
            Try Backtesting →
          </Link>
        </div>
        <div>
          <Image
            src="/backtesting-dashboard.png"
            alt="Advanced Backtesting Dashboard"
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  )
}

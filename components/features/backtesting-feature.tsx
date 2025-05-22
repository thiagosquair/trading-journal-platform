import Link from "next/link"
import Image from "next/image"
import { History, LineChart, BarChart2, TrendingUp } from "lucide-react"

export function BacktestingFeature() {
  return (
    <div className="w-full">
      <div className="new-feature">NEW FEATURE</div>
      <h2 className="feature-title">
        <span className="text-blue-600">Advanced</span> Strategy Backtesting
      </h2>
      <p className="feature-description">
        Test your trading strategies against historical data to validate performance before risking real capital. Our
        powerful backtesting engine provides comprehensive analytics and optimization tools.
      </p>
      <div className="feature-content">
        <div className="feature-text">
          <div className="feature-points">
            <div className="feature-point">
              <div className="feature-point-icon">
                <History className="h-4 w-4 text-blue-600" />
              </div>
              <span>Backtest across multiple timeframes and instruments</span>
            </div>
            <div className="feature-point">
              <div className="feature-point-icon">
                <LineChart className="h-4 w-4 text-blue-600" />
              </div>
              <span>Detailed performance metrics and equity curves</span>
            </div>
            <div className="feature-point">
              <div className="feature-point-icon">
                <BarChart2 className="h-4 w-4 text-blue-600" />
              </div>
              <span>Strategy optimization and parameter tuning</span>
            </div>
            <div className="feature-point">
              <div className="feature-point-icon">
                <TrendingUp className="h-4 w-4 text-blue-600" />
              </div>
              <span>Monte Carlo simulations for risk assessment</span>
            </div>
          </div>
          <Link href="/backtesting" className="feature-button">
            Try Backtesting
          </Link>
        </div>
        <div className="feature-image">
          <Image
            src="/backtesting-dashboard.png"
            alt="Backtesting Dashboard"
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  )
}

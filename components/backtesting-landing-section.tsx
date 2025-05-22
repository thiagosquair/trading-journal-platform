import Image from "next/image"
import Link from "next/link"

export function BacktestingLandingSection() {
  return (
    <div className="w-full py-12">
      <div className="new-feature">NEW FEATURE</div>
      <h2 className="feature-title">
        <span className="text-blue-600">Advanced</span> Strategy Backtesting
      </h2>
      <p className="feature-description">
        Test your trading strategies against historical data to validate performance before risking real capital. Our
        powerful backtesting engine provides comprehensive analytics and optimization tools.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div>
          <div className="space-y-4">
            <div className="feature-point">
              <div className="feature-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-600"
                >
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                  <path d="M3 3v5h5"></path>
                  <path d="M12 7v5l4 2"></path>
                </svg>
              </div>
              <span>Backtest across multiple timeframes and instruments</span>
            </div>
            <div className="feature-point">
              <div className="feature-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-600"
                >
                  <path d="M3 3v18h18"></path>
                  <path d="m19 9-5 5-4-4-3 3"></path>
                </svg>
              </div>
              <span>Detailed performance metrics and equity curves</span>
            </div>
            <div className="feature-point">
              <div className="feature-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-600"
                >
                  <path d="M12 20V10"></path>
                  <path d="M18 20V4"></path>
                  <path d="M6 20v-4"></path>
                </svg>
              </div>
              <span>Strategy optimization and parameter tuning</span>
            </div>
            <div className="feature-point">
              <div className="feature-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-600"
                >
                  <path d="m23 6-9.5 9.5-5-5L1 18"></path>
                  <path d="M17 6h6v6"></path>
                </svg>
              </div>
              <span>Monte Carlo simulations for risk assessment</span>
            </div>
          </div>
          <div className="mt-8">
            <Link href="/backtesting" className="feature-button">
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
  )
}

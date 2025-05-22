export default function BacktestingPage() {
  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Strategy Backtesting</h1>
          <p className="text-muted-foreground">
            Test your trading strategies against historical data to validate performance before risking real capital.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white p-6 rounded-lg shadow border">
            <h2 className="text-lg font-semibold mb-2">Strategy Settings</h2>
            <p className="text-sm text-gray-500 mb-4">Configure your trading strategy parameters</p>
            <div className="flex justify-between">
              <button className="px-3 py-1 text-sm border rounded hover:bg-gray-50">Configure</button>
              <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                Run Backtest
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border">
            <h2 className="text-lg font-semibold mb-2">Data Source</h2>
            <p className="text-sm text-gray-500 mb-4">Select historical data for backtesting</p>
            <div className="flex justify-between">
              <button className="px-3 py-1 text-sm border rounded hover:bg-gray-50">Import Data</button>
              <button className="px-3 py-1 text-sm border rounded hover:bg-gray-50">Settings</button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border">
            <h2 className="text-lg font-semibold mb-2">Risk Parameters</h2>
            <p className="text-sm text-gray-500 mb-4">Configure risk management settings</p>
            <button className="w-full px-3 py-1 text-sm border rounded hover:bg-gray-50">Configure Risk</button>
          </div>
        </div>

        <div className="mt-6">
          <div className="bg-white p-6 rounded-lg shadow border">
            <h2 className="text-lg font-semibold mb-2">Backtest Results</h2>
            <p className="text-sm text-gray-500 mb-4">Performance metrics for your strategy</p>
            <div className="h-[300px] w-full rounded-md border flex items-center justify-center text-gray-400">
              Run a backtest to see results
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

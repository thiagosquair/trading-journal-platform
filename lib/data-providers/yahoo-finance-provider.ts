import type { DataProvider, HistoricalData, DataSourceInfo } from "./data-provider"

export class YahooFinanceProvider implements DataProvider {
  name = "Yahoo Finance"
  description = "Free historical market data for stocks, ETFs, and indices"
  supportedAssets = ["stocks", "etfs", "indices", "mutual funds"]
  supportedTimeframes = ["1d", "5d", "1mo", "3mo", "6mo", "1y", "2y", "5y", "10y", "max"]
  requiresAuthentication = false
  isPremium = false
  maxHistoricalDataYears = 50

  async getHistoricalData(
    symbol: string,
    timeframe: string,
    startDate: string,
    endDate: string,
  ): Promise<HistoricalData[]> {
    try {
      // Convert dates to Unix timestamps (seconds)
      const startTimestamp = Math.floor(new Date(startDate).getTime() / 1000)
      const endTimestamp = Math.floor(new Date(endDate).getTime() / 1000)

      // Convert timeframe to interval
      const interval = this.convertTimeframe(timeframe)

      // Build the Yahoo Finance API URL
      const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?period1=${startTimestamp}&period2=${endTimestamp}&interval=${interval}&includePrePost=false`

      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Yahoo Finance API error: ${response.statusText}`)
      }

      const data = await response.json()

      // Check if we have valid data
      if (!data.chart || !data.chart.result || data.chart.result.length === 0) {
        throw new Error("No data returned from Yahoo Finance")
      }

      const result = data.chart.result[0]
      const timestamps = result.timestamp
      const quotes = result.indicators.quote[0]

      // Convert to our HistoricalData format
      const historicalData: HistoricalData[] = []

      for (let i = 0; i < timestamps.length; i++) {
        // Yahoo returns timestamps in seconds, convert to milliseconds
        const timestamp = timestamps[i] * 1000

        historicalData.push({
          timestamp,
          open: quotes.open[i],
          high: quotes.high[i],
          low: quotes.low[i],
          close: quotes.close[i],
          volume: quotes.volume[i],
          // Add adjusted close if available
          adjustedClose: result.indicators.adjclose ? result.indicators.adjclose[0].adjclose[i] : undefined,
        })
      }

      return historicalData
    } catch (error) {
      console.error("Error fetching data from Yahoo Finance:", error)
      throw error
    }
  }

  async getAvailableSymbols(): Promise<string[]> {
    // For simplicity, return a small set of common symbols
    return [
      "AAPL",
      "MSFT",
      "GOOGL",
      "AMZN",
      "META",
      "TSLA",
      "^GSPC",
      "^DJI",
      "^IXIC",
      "^FTSE",
      "^N225",
      "GC=F",
      "SI=F",
      "CL=F",
    ]
  }

  getDataSourceInfo(): DataSourceInfo {
    return {
      name: this.name,
      description: this.description,
      supportedAssets: this.supportedAssets,
      supportedTimeframes: this.supportedTimeframes,
      requiresAuthentication: this.requiresAuthentication,
      isPremium: this.isPremium,
      maxHistoricalDataYears: this.maxHistoricalDataYears,
      attribution: "Data provided by Yahoo Finance",
      website: "https://finance.yahoo.com/",
    }
  }

  async testConnection(): Promise<{ success: boolean; message: string }> {
    try {
      // Simple test query for Apple stock
      const url = "https://query1.finance.yahoo.com/v8/finance/chart/AAPL?interval=1d&range=5d"
      const response = await fetch(url)

      if (!response.ok) {
        return { success: false, message: `API error: ${response.statusText}` }
      }

      const data = await response.json()

      if (data.chart && data.chart.result && data.chart.result.length > 0) {
        return { success: true, message: "Successfully connected to Yahoo Finance" }
      }

      return { success: false, message: "Unexpected response format" }
    } catch (error) {
      return { success: false, message: `Connection error: ${error.message}` }
    }
  }

  private convertTimeframe(timeframe: string): string {
    // Convert our standard timeframe format to Yahoo Finance format
    const mapping: Record<string, string> = {
      M1: "1m",
      M5: "5m",
      M15: "15m",
      M30: "30m",
      H1: "1h",
      D1: "1d",
      W1: "1wk",
      MN1: "1mo",
    }

    return mapping[timeframe] || "1d"
  }
}

import type { DataProvider, HistoricalData, DataSourceInfo } from "./data-provider"

export class AlphaVantageProvider implements DataProvider {
  name = "Alpha Vantage"
  description = "Free and premium stock, forex, and crypto data"
  supportedAssets = ["stocks", "forex", "crypto", "commodities", "indices"]
  supportedTimeframes = ["1min", "5min", "15min", "30min", "60min", "daily", "weekly", "monthly"]
  requiresAuthentication = true
  isPremium = false // Basic tier is free
  maxHistoricalDataYears = 20
  private apiKey: string = process.env.ALPHA_VANTAGE_API_KEY || ""

  async getHistoricalData(
    symbol: string,
    timeframe: string,
    startDate: string,
    endDate: string,
  ): Promise<HistoricalData[]> {
    try {
      // Convert timeframe to Alpha Vantage format
      const interval = this.convertTimeframe(timeframe)

      // Determine the function to call based on the timeframe
      const function_name = interval.includes("min") ? "TIME_SERIES_INTRADAY" : "TIME_SERIES_DAILY"

      // Build the API URL
      const url = `https://www.alphavantage.co/query?function=${function_name}&symbol=${symbol}&interval=${interval}&outputsize=full&apikey=${this.apiKey}`

      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Alpha Vantage API error: ${response.statusText}`)
      }

      const data = await response.json()

      // Parse the response based on the function used
      let timeSeries
      if (function_name === "TIME_SERIES_INTRADAY") {
        timeSeries = data[`Time Series (${interval})`]
      } else {
        timeSeries = data["Time Series (Daily)"]
      }

      if (!timeSeries) {
        throw new Error("No data returned from Alpha Vantage")
      }

      // Convert to our HistoricalData format
      const historicalData: HistoricalData[] = []

      const startTimestamp = new Date(startDate).getTime()
      const endTimestamp = new Date(endDate).getTime()

      for (const [dateStr, values] of Object.entries(timeSeries)) {
        const timestamp = new Date(dateStr).getTime()

        // Filter by date range
        if (timestamp >= startTimestamp && timestamp <= endTimestamp) {
          historicalData.push({
            timestamp,
            open: Number.parseFloat(values["1. open"]),
            high: Number.parseFloat(values["2. high"]),
            low: Number.parseFloat(values["3. low"]),
            close: Number.parseFloat(values["4. close"]),
            volume: Number.parseFloat(values["5. volume"]),
          })
        }
      }

      // Sort by timestamp (oldest first)
      return historicalData.sort((a, b) => a.timestamp - b.timestamp)
    } catch (error) {
      console.error("Error fetching data from Alpha Vantage:", error)
      throw error
    }
  }

  async getAvailableSymbols(): Promise<string[]> {
    // For simplicity, we'll return a small set of common symbols
    // In a real implementation, you might want to fetch this from an API
    return [
      "AAPL",
      "MSFT",
      "GOOGL",
      "AMZN",
      "META",
      "TSLA",
      "EURUSD",
      "GBPUSD",
      "USDJPY",
      "AUDUSD",
      "USDCAD",
      "BTC/USD",
      "ETH/USD",
      "XRP/USD",
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
      attribution: "Data provided by Alpha Vantage",
      website: "https://www.alphavantage.co/",
    }
  }

  async testConnection(): Promise<{ success: boolean; message: string }> {
    try {
      if (!this.apiKey) {
        return { success: false, message: "API key not configured" }
      }

      // Simple test query
      const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=${this.apiKey}&outputsize=compact`
      const response = await fetch(url)

      if (!response.ok) {
        return { success: false, message: `API error: ${response.statusText}` }
      }

      const data = await response.json()

      if (data["Error Message"]) {
        return { success: false, message: data["Error Message"] }
      }

      if (data["Time Series (Daily)"]) {
        return { success: true, message: "Successfully connected to Alpha Vantage" }
      }

      return { success: false, message: "Unexpected response format" }
    } catch (error) {
      return { success: false, message: `Connection error: ${error.message}` }
    }
  }

  private convertTimeframe(timeframe: string): string {
    // Convert our standard timeframe format to Alpha Vantage format
    const mapping: Record<string, string> = {
      M1: "1min",
      M5: "5min",
      M15: "15min",
      M30: "30min",
      H1: "60min",
      D1: "daily",
      W1: "weekly",
      MN1: "monthly",
    }

    return mapping[timeframe] || "daily"
  }
}

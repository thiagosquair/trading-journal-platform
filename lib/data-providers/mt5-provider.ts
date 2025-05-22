import type { DataProvider, HistoricalData, DataSourceInfo } from "./data-provider"

export class MT5Provider implements DataProvider {
  name = "MetaTrader 5"
  description = "Historical data from MetaTrader 5 platform"
  supportedAssets = ["forex", "stocks", "indices", "commodities", "crypto"]
  supportedTimeframes = ["M1", "M5", "M15", "M30", "H1", "H4", "D1", "W1", "MN1"]
  requiresAuthentication = true
  isPremium = false
  maxHistoricalDataYears = 20

  async getHistoricalData(
    symbol: string,
    timeframe: string,
    startDate: string,
    endDate: string,
  ): Promise<HistoricalData[]> {
    try {
      // Convert dates to ISO format
      const startDateISO = new Date(startDate).toISOString()
      const endDateISO = new Date(endDate).toISOString()

      // Call our MT5 API endpoint
      const response = await fetch("/api/mt5/history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          symbol,
          timeframe,
          startDate: startDateISO,
          endDate: endDateISO,
        }),
      })

      if (!response.ok) {
        throw new Error(`MT5 API error: ${response.statusText}`)
      }

      const data = await response.json()

      if (!data.success || !data.data) {
        throw new Error(data.message || "Failed to fetch data from MT5")
      }

      // Convert to our HistoricalData format
      return data.data.map((bar: any) => ({
        timestamp: new Date(bar.time).getTime(),
        open: bar.open,
        high: bar.high,
        low: bar.low,
        close: bar.close,
        volume: bar.tick_volume,
      }))
    } catch (error) {
      console.error("Error fetching data from MT5:", error)
      throw error
    }
  }

  async getAvailableSymbols(): Promise<string[]> {
    try {
      const response = await fetch("/api/mt5/symbols")

      if (!response.ok) {
        throw new Error(`MT5 API error: ${response.statusText}`)
      }

      const data = await response.json()

      if (!data.success || !data.symbols) {
        throw new Error(data.message || "Failed to fetch symbols from MT5")
      }

      return data.symbols
    } catch (error) {
      console.error("Error fetching symbols from MT5:", error)
      return []
    }
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
      attribution: "Data provided by MetaTrader 5",
      website: "https://www.metatrader5.com/",
    }
  }

  async testConnection(): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch("/api/mt5/connect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        return { success: false, message: `API error: ${response.statusText}` }
      }

      const data = await response.json()

      return {
        success: data.success,
        message: data.message || (data.success ? "Successfully connected to MT5" : "Failed to connect to MT5"),
      }
    } catch (error) {
      return { success: false, message: `Connection error: ${error.message}` }
    }
  }
}

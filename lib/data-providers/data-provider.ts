// Base interface for all data providers
export interface DataProvider {
  name: string
  description: string
  supportedAssets: string[]
  supportedTimeframes: string[]
  requiresAuthentication: boolean
  isPremium: boolean
  maxHistoricalDataYears: number

  // Core methods
  getHistoricalData(symbol: string, timeframe: string, startDate: string, endDate: string): Promise<HistoricalData[]>
  getAvailableSymbols(): Promise<string[]>
  getDataSourceInfo(): DataSourceInfo
  testConnection(): Promise<{ success: boolean; message: string }>
}

export interface HistoricalData {
  timestamp: number
  open: number
  high: number
  close: number
  low: number
  volume: number
  // Additional fields that might be available
  adjustedClose?: number
  dividends?: number
  splits?: number
}

export interface DataSourceInfo {
  name: string
  description: string
  supportedAssets: string[]
  supportedTimeframes: string[]
  requiresAuthentication: boolean
  isPremium: boolean
  maxHistoricalDataYears: number
  attribution: string
  website: string
}

// Factory function to get the appropriate data provider
export function getDataProvider(providerName: string): DataProvider {
  switch (providerName.toLowerCase()) {
    case "alphavantage":
      return new AlphaVantageProvider()
    case "yahoo":
      return new YahooFinanceProvider()
    case "oanda":
      return new OandaProvider()
    case "polygon":
      return new PolygonProvider()
    case "iex":
      return new IEXCloudProvider()
    case "binance":
      return new BinanceProvider()
    case "mt5":
      return new MT5Provider()
    case "dukascopy":
      return new DukascopyProvider()
    default:
      throw new Error(`Data provider ${providerName} not supported`)
  }
}

// Data cache to improve performance and reduce API calls
export class DataCache {
  private static instance: DataCache
  private cache: Map<string, { data: HistoricalData[]; timestamp: number }> = new Map()
  private readonly CACHE_EXPIRY_MS = 24 * 60 * 60 * 1000 // 24 hours

  private constructor() {}

  public static getInstance(): DataCache {
    if (!DataCache.instance) {
      DataCache.instance = new DataCache()
    }
    return DataCache.instance
  }

  public get(key: string): HistoricalData[] | null {
    const cachedItem = this.cache.get(key)
    if (!cachedItem) return null

    // Check if cache is expired
    if (Date.now() - cachedItem.timestamp > this.CACHE_EXPIRY_MS) {
      this.cache.delete(key)
      return null
    }

    return cachedItem.data
  }

  public set(key: string, data: HistoricalData[]): void {
    this.cache.set(key, { data, timestamp: Date.now() })
  }

  public clear(): void {
    this.cache.clear()
  }

  public getCacheKey(provider: string, symbol: string, timeframe: string, startDate: string, endDate: string): string {
    return `${provider}_${symbol}_${timeframe}_${startDate}_${endDate}`
  }
}

// Declare the data provider classes
class AlphaVantageProvider implements DataProvider {
  name = "AlphaVantage"
  description = "AlphaVantage data provider"
  supportedAssets = ["stock", "forex", "crypto"]
  supportedTimeframes = ["1min", "5min", "15min", "30min", "60min", "daily", "weekly", "monthly"]
  requiresAuthentication = true
  isPremium = false
  maxHistoricalDataYears = 20

  async getHistoricalData(
    symbol: string,
    timeframe: string,
    startDate: string,
    endDate: string,
  ): Promise<HistoricalData[]> {
    // Implementation here
    return []
  }

  async getAvailableSymbols(): Promise<string[]> {
    // Implementation here
    return []
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
      attribution: "AlphaVantage",
      website: "https://www.alphavantage.co/",
    }
  }

  async testConnection(): Promise<{ success: boolean; message: string }> {
    // Implementation here
    return { success: true, message: "Connection successful" }
  }
}

class YahooFinanceProvider implements DataProvider {
  name = "Yahoo Finance"
  description = "Yahoo Finance data provider"
  supportedAssets = ["stock", "forex", "crypto"]
  supportedTimeframes = ["1min", "5min", "15min", "30min", "60min", "daily", "weekly", "monthly"]
  requiresAuthentication = false
  isPremium = false
  maxHistoricalDataYears = 10

  async getHistoricalData(
    symbol: string,
    timeframe: string,
    startDate: string,
    endDate: string,
  ): Promise<HistoricalData[]> {
    // Implementation here
    return []
  }

  async getAvailableSymbols(): Promise<string[]> {
    // Implementation here
    return []
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
      attribution: "Yahoo Finance",
      website: "https://finance.yahoo.com/",
    }
  }

  async testConnection(): Promise<{ success: boolean; message: string }> {
    // Implementation here
    return { success: true, message: "Connection successful" }
  }
}

class OandaProvider implements DataProvider {
  name = "Oanda"
  description = "Oanda data provider"
  supportedAssets = ["forex"]
  supportedTimeframes = ["1min", "5min", "15min", "30min", "60min", "daily"]
  requiresAuthentication = true
  isPremium = false
  maxHistoricalDataYears = 5

  async getHistoricalData(
    symbol: string,
    timeframe: string,
    startDate: string,
    endDate: string,
  ): Promise<HistoricalData[]> {
    // Implementation here
    return []
  }

  async getAvailableSymbols(): Promise<string[]> {
    // Implementation here
    return []
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
      attribution: "Oanda",
      website: "https://www.oanda.com/",
    }
  }

  async testConnection(): Promise<{ success: boolean; message: string }> {
    // Implementation here
    return { success: true, message: "Connection successful" }
  }
}

class PolygonProvider implements DataProvider {
  name = "Polygon"
  description = "Polygon data provider"
  supportedAssets = ["stock", "forex", "crypto"]
  supportedTimeframes = ["1min", "5min", "15min", "30min", "60min", "daily", "weekly", "monthly"]
  requiresAuthentication = true
  isPremium = false
  maxHistoricalDataYears = 15

  async getHistoricalData(
    symbol: string,
    timeframe: string,
    startDate: string,
    endDate: string,
  ): Promise<HistoricalData[]> {
    // Implementation here
    return []
  }

  async getAvailableSymbols(): Promise<string[]> {
    // Implementation here
    return []
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
      attribution: "Polygon",
      website: "https://polygon.io/",
    }
  }

  async testConnection(): Promise<{ success: boolean; message: string }> {
    // Implementation here
    return { success: true, message: "Connection successful" }
  }
}

class IEXCloudProvider implements DataProvider {
  name = "IEX Cloud"
  description = "IEX Cloud data provider"
  supportedAssets = ["stock"]
  supportedTimeframes = ["1min", "5min", "15min", "30min", "60min", "daily"]
  requiresAuthentication = true
  isPremium = false
  maxHistoricalDataYears = 5

  async getHistoricalData(
    symbol: string,
    timeframe: string,
    startDate: string,
    endDate: string,
  ): Promise<HistoricalData[]> {
    // Implementation here
    return []
  }

  async getAvailableSymbols(): Promise<string[]> {
    // Implementation here
    return []
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
      attribution: "IEX Cloud",
      website: "https://iexcloud.io/",
    }
  }

  async testConnection(): Promise<{ success: boolean; message: string }> {
    // Implementation here
    return { success: true, message: "Connection successful" }
  }
}

class BinanceProvider implements DataProvider {
  name = "Binance"
  description = "Binance data provider"
  supportedAssets = ["crypto"]
  supportedTimeframes = [
    "1min",
    "3min",
    "5min",
    "15min",
    "30min",
    "1h",
    "2h",
    "4h",
    "6h",
    "8h",
    "12h",
    "1d",
    "3d",
    "1w",
    "1M",
  ]
  requiresAuthentication = false
  isPremium = false
  maxHistoricalDataYears = 3

  async getHistoricalData(
    symbol: string,
    timeframe: string,
    startDate: string,
    endDate: string,
  ): Promise<HistoricalData[]> {
    // Implementation here
    return []
  }

  async getAvailableSymbols(): Promise<string[]> {
    // Implementation here
    return []
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
      attribution: "Binance",
      website: "https://www.binance.com/",
    }
  }

  async testConnection(): Promise<{ success: boolean; message: string }> {
    // Implementation here
    return { success: true, message: "Connection successful" }
  }
}

class MT5Provider implements DataProvider {
  name = "MT5"
  description = "MT5 data provider"
  supportedAssets = ["forex", "stock", "crypto"]
  supportedTimeframes = ["1min", "5min", "15min", "30min", "60min", "daily", "weekly", "monthly"]
  requiresAuthentication = true
  isPremium = false
  maxHistoricalDataYears = 10

  async getHistoricalData(
    symbol: string,
    timeframe: string,
    startDate: string,
    endDate: string,
  ): Promise<HistoricalData[]> {
    // Implementation here
    return []
  }

  async getAvailableSymbols(): Promise<string[]> {
    // Implementation here
    return []
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
      attribution: "MT5",
      website: "https://www.mt5.com/",
    }
  }

  async testConnection(): Promise<{ success: boolean; message: string }> {
    // Implementation here
    return { success: true, message: "Connection successful" }
  }
}

class DukascopyProvider implements DataProvider {
  name = "Dukascopy"
  description = "Dukascopy data provider"
  supportedAssets = ["forex", "crypto"]
  supportedTimeframes = ["1min", "5min", "15min", "30min", "60min", "daily", "weekly", "monthly"]
  requiresAuthentication = true
  isPremium = false
  maxHistoricalDataYears = 5

  async getHistoricalData(
    symbol: string,
    timeframe: string,
    startDate: string,
    endDate: string,
  ): Promise<HistoricalData[]> {
    // Implementation here
    return []
  }

  async getAvailableSymbols(): Promise<string[]> {
    // Implementation here
    return []
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
      attribution: "Dukascopy",
      website: "https://www.dukascopy.com/",
    }
  }

  async testConnection(): Promise<{ success: boolean; message: string }> {
    // Implementation here
    return { success: true, message: "Connection successful" }
  }
}

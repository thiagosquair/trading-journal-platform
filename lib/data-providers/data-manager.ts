import { type DataProvider, type HistoricalData, DataCache, getDataProvider } from "./data-provider"

export class DataManager {
  private static instance: DataManager
  private dataCache: DataCache = DataCache.getInstance()
  private activeProviders: Map<string, DataProvider> = new Map()

  private constructor() {}

  public static getInstance(): DataManager {
    if (!DataManager.instance) {
      DataManager.instance = new DataManager()
    }
    return DataManager.instance
  }

  public async getHistoricalData(
    providerName: string,
    symbol: string,
    timeframe: string,
    startDate: string,
    endDate: string,
  ): Promise<HistoricalData[]> {
    // Check cache first
    const cacheKey = this.dataCache.getCacheKey(providerName, symbol, timeframe, startDate, endDate)
    const cachedData = this.dataCache.get(cacheKey)

    if (cachedData) {
      console.log(`Using cached data for ${cacheKey}`)
      return cachedData
    }

    // Get or initialize the provider
    let provider = this.activeProviders.get(providerName)
    if (!provider) {
      provider = getDataProvider(providerName)
      this.activeProviders.set(providerName, provider)
    }

    // Fetch the data
    const data = await provider.getHistoricalData(symbol, timeframe, startDate, endDate)

    // Cache the result
    this.dataCache.set(cacheKey, data)

    return data
  }

  public async getAvailableProviders(): Promise<{ name: string; description: string; isPremium: boolean }[]> {
    // Return info about all available providers
    return [
      {
        name: "alphavantage",
        description: "Alpha Vantage - Free and premium stock, forex, and crypto data",
        isPremium: false,
      },
      { name: "yahoo", description: "Yahoo Finance - Free historical market data", isPremium: false },
      { name: "oanda", description: "OANDA - Forex and CFD data", isPremium: true },
      { name: "polygon", description: "Polygon.io - Stocks, options, forex, and crypto data", isPremium: true },
      { name: "iex", description: "IEX Cloud - Financial data infrastructure", isPremium: true },
      { name: "binance", description: "Binance - Cryptocurrency data", isPremium: false },
      { name: "mt5", description: "MetaTrader 5 - Connect to your MT5 platform", isPremium: false },
      { name: "dukascopy", description: "Dukascopy - Swiss forex bank and marketplace", isPremium: true },
    ]
  }

  public async getProviderInfo(providerName: string) {
    let provider = this.activeProviders.get(providerName)
    if (!provider) {
      provider = getDataProvider(providerName)
      this.activeProviders.set(providerName, provider)
    }

    return provider.getDataSourceInfo()
  }

  public async testProviderConnection(providerName: string): Promise<{ success: boolean; message: string }> {
    try {
      let provider = this.activeProviders.get(providerName)
      if (!provider) {
        provider = getDataProvider(providerName)
        this.activeProviders.set(providerName, provider)
      }

      return await provider.testConnection()
    } catch (error) {
      return { success: false, message: `Error initializing provider: ${error.message}` }
    }
  }

  public async getAvailableSymbols(providerName: string): Promise<string[]> {
    let provider = this.activeProviders.get(providerName)
    if (!provider) {
      provider = getDataProvider(providerName)
      this.activeProviders.set(providerName, provider)
    }

    return await provider.getAvailableSymbols()
  }

  public clearCache(): void {
    this.dataCache.clear()
  }
}

import type { TradingAccount, Trade } from "@/lib/trading-types"

export interface ConnectionCredentials {
  platform: string
  name: string
  broker?: string
  server?: string
  login?: string
  password?: string
  investorPassword?: string
  apiKey?: string
  apiSecret?: string
  username?: string
  accountId?: string
  [key: string]: any
}

export interface PlatformAdapter {
  name: string
  connect(credentials: ConnectionCredentials): Promise<boolean>
  fetchAccounts(): Promise<TradingAccount[]>
  fetchTrades(accountId: string): Promise<Trade[]>
  syncAccount(accountId: string): Promise<void>
  disconnect(accountId: string): Promise<void>
  getConnectionStatus?(accountId: string): Promise<ConnectionStatus>
  getLastSyncTime?(accountId: string): Promise<string | null>
  getSupportedFeatures?(): PlatformFeatures
}

export interface ConnectionStatus {
  connected: boolean
  lastSyncTime?: string
  error?: string
  statusMessage?: string
  syncInProgress?: boolean
}

export interface PlatformFeatures {
  realTimeData: boolean
  historicalData: boolean
  orderExecution: boolean
  paperTrading: boolean
  readOnly: boolean
  multipleAccounts: boolean
  supportedTimeframes: string[]
  supportedOrderTypes: string[]
  supportedAssetClasses: string[]
  apiRateLimit?: number
}

// Factory to get the right adapter
export function getPlatformAdapter(platform: string): PlatformAdapter {
  switch (platform.toLowerCase()) {
    case "mt4":
      return new MetaTraderAdapter("MetaTrader 4")
    case "mt5":
      return new MetaTraderAdapter("MetaTrader 5")
    case "tradingview":
      return new TradingViewAdapter()
    case "dxtrade":
      return new DXtradeAdapter()
    case "ninjatrader":
      return new NinjaTraderAdapter()
    case "ctrader":
      return new CTraderAdapter()
    case "dxfeed":
      return new DXfeedAdapter() // DX Trade
    case "tradestation":
      return new TradeStationAdapter()
    case "thinkorswim":
      return new ThinkOrSwimAdapter()
    case "interactivebrokers":
      return new InteractiveBrokersAdapter()
    case "matchtrader":
      return new MatchTraderAdapter()
    case "tradovate":
      return new TradovateAdapter()
    case "rithmic":
      return new RithmicAdapter()
    case "sierrachart":
      return new SierraChartAdapter()
    case "tradelocker":
      return new TradeLockerAdapter()
    default:
      throw new Error(`Unsupported platform: ${platform}`)
  }
}

// Import adapters
import { MetaTraderAdapter } from "./metatrader-adapter"
import { TradingViewAdapter } from "./tradingview-adapter"
import { DXtradeAdapter } from "./dxtrade-adapter"
import { NinjaTraderAdapter } from "./ninjatrader-adapter"
import { CTraderAdapter } from "./ctrader-adapter"
import { DXfeedAdapter } from "./dxfeed-adapter"
import { TradeStationAdapter } from "./tradestation-adapter"
import { ThinkOrSwimAdapter } from "./thinkorswim-adapter"
import { InteractiveBrokersAdapter } from "./interactivebrokers-adapter"
import { MatchTraderAdapter } from "./matchtrader-adapter"
import { TradovateAdapter } from "./tradovate-adapter"
import { RithmicAdapter } from "./rithmic-adapter"
import { SierraChartAdapter } from "./sierrachart-adapter"
import { TradeLockerAdapter } from "./tradelocker-adapter"

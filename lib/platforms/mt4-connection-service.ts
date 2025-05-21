import type { ConnectionCredentials } from "./platform-adapter"
import { MetaTraderAdapter } from "./metatrader-adapter"

// Singleton service to manage MT4 connections
export class MT4ConnectionService {
  private static instance: MT4ConnectionService
  private currentAdapter: MetaTraderAdapter | null = null
  private isConnected = false
  private accountDetails = {
    server: "OANDA-Demo-1",
    login: "400929",
    password: "Thi202023@",
    accountName: "OANDA MT4 Demo",
    broker: "OANDA",
  }

  private constructor() {}

  public static getInstance(): MT4ConnectionService {
    if (!MT4ConnectionService.instance) {
      MT4ConnectionService.instance = new MT4ConnectionService()
    }
    return MT4ConnectionService.instance
  }

  public async connect(): Promise<boolean> {
    if (this.isConnected) {
      console.log("Already connected to MT4 account")
      return true
    }

    try {
      const credentials: ConnectionCredentials = {
        platform: "mt4",
        name: this.accountDetails.accountName,
        broker: this.accountDetails.broker,
        server: this.accountDetails.server,
        login: this.accountDetails.login,
        password: this.accountDetails.password,
      }

      this.currentAdapter = new MetaTraderAdapter("MetaTrader 4")
      const connected = await this.currentAdapter.connect(credentials)

      if (connected) {
        this.isConnected = true
        console.log(`Successfully connected to MT4 account ${this.accountDetails.login}`)
        return true
      }

      return false
    } catch (error) {
      console.error("Error connecting to MT4 account:", error)
      this.isConnected = false
      this.currentAdapter = null
      return false
    }
  }

  public async disconnect(): Promise<boolean> {
    if (!this.isConnected || !this.currentAdapter) {
      return true
    }

    try {
      await this.currentAdapter.disconnect(this.accountDetails.login)
      this.isConnected = false
      this.currentAdapter = null
      console.log(`Disconnected from MT4 account ${this.accountDetails.login}`)
      return true
    } catch (error) {
      console.error("Error disconnecting from MT4 account:", error)
      return false
    }
  }

  public getAccountDetails() {
    return {
      ...this.accountDetails,
      password: "********", // Hide password in returned details
    }
  }

  public isAccountConnected(): boolean {
    return this.isConnected
  }

  public getAdapter(): MetaTraderAdapter | null {
    return this.currentAdapter
  }
}

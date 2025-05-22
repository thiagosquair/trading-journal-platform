// src/lib/platforms/metaapi-service.ts

import MetaApi from 'metaapi.cloud-sdk';

export interface MT5ConnectionConfig {
  login: string;
  password: string;
  server: string;
  accountId: string;
}

export class MetaApiService {
  private api: any;
  private connections: Record<string, any> = {};

  constructor() {
    // Get token from environment variables
    const token = process.env.METAAPI_TOKEN;
    if (!token) {
      console.error('MetaAPI token not found in environment variables');
    }
    this.api = new MetaApi(token);
  }

  async connectAccount(config: MT5ConnectionConfig): Promise<{ success: boolean; accountId?: string; error?: string; details?: any }> {
    try {
      const { login, password, server, accountId } = config;
      
      // Check if account already exists in MetaAPI
      const accounts = await this.api.metatraderAccountApi.getAccountsWithInfiniteScrollPagination();
      let account = accounts.find((a: any) => a.login === login && a.type.startsWith('cloud'));
      
      // If account doesn't exist, create it
      if (!account) {
        console.log('Adding MT5 account to MetaApi');
        account = await this.api.metatraderAccountApi.createAccount({
          name: `Trading Journal Account - ${login}`,
          type: 'cloud',
          login: login,
          password: password,
          server: server,
          platform: 'mt5',
          magic: 1000
        });
      } else {
        console.log('MT5 account already added to MetaApi', account.id);
      }
      
      // Deploy account if not already deployed
      if (account.state !== 'DEPLOYED') {
        console.log('Deploying account');
        await account.deploy();
      }
      
      // Connect to the account
      console.log('Connecting to MT5 account');
      const connection = account.getRPCConnection();
      await connection.connect();
      
      // Wait for synchronization
      console.log('Waiting for synchronization');
      await connection.waitSynchronized();
      
      // Store connection for future use
      this.connections[accountId] = {
        connection,
        account
      };
      
      return { success: true, accountId };
    } catch (error: any) {
      console.error('Error connecting to MT5:', error);
      return { 
        success: false, 
        error: error.message,
        details: error.details || {} 
      };
    }
  }

  async getAccountInformation(accountId: string): Promise<any> {
    try {
      const conn = this.connections[accountId];
      if (!conn) {
        throw new Error('Account not connected');
      }
      
      return await conn.connection.getAccountInformation();
    } catch (error) {
      console.error('Error getting account information:', error);
      throw error;
    }
  }

  async getTradeHistory(accountId: string, startDate: Date, endDate: Date): Promise<any> {
    try {
      const conn = this.connections[accountId];
      if (!conn) {
        throw new Error('Account not connected');
      }
      
      // Get history orders
      const historyOrders = await conn.connection.getHistoryOrdersByTimeRange(
        startDate,
        endDate
      );
      
      // Get history deals
      const historyDeals = await conn.connection.getDealsByTimeRange(
        startDate,
        endDate
      );
      
      return {
        orders: historyOrders,
        deals: historyDeals
      };
    } catch (error) {
      console.error('Error getting trade history:', error);
      throw error;
    }
  }

  async getPositions(accountId: string): Promise<any> {
    try {
      const conn = this.connections[accountId];
      if (!conn) {
        throw new Error('Account not connected');
      }
      
      return await conn.connection.getPositions();
    } catch (error) {
      console.error('Error getting positions:', error);
      throw error;
    }
  }

  async disconnectAccount(accountId: string): Promise<{ success: boolean; message?: string; error?: string }> {
    try {
      const conn = this.connections[accountId];
      if (!conn) {
        return { success: true, message: 'Account not connected' };
      }
      
      await conn.connection.close();
      delete this.connections[accountId];
      
      return { success: true };
    } catch (error: any) {
      console.error('Error disconnecting account:', error);
      return { success: false, error: error.message };
    }
  }
}

export default new MetaApiService();


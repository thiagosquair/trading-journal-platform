const MetaApi = require('metaapi.cloud-sdk').default;

class MT5Connection {
  constructor() {
    this.api = new MetaApi(process.env.TOKEN);
    this.connections = {};
  }

  async connectAccount(accountData) {
    try {
      const { login, password, serverName, accountId } = accountData;
      
      // Check if account already exists in MetaAPI
      const accounts = await this.api.metatraderAccountApi.getAccountsWithInfiniteScrollPagination();
      let account = accounts.find(a => a.login === login && a.type.startsWith('cloud'));
      
      // If account doesn't exist, create it
      if (!account) {
        console.log('Adding MT5 account to MetaApi');
        account = await this.api.metatraderAccountApi.createAccount({
          name: `Trading Journal Account - ${login}`,
          type: 'cloud',
          login: login,
          password: password,
          server: serverName,
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
    } catch (error) {
      console.error('Error connecting to MT5:', error);
      return { 
        success: false, 
        error: error.message,
        details: error.details || {} 
      };
    }
  }

  async getAccountInformation(accountId) {
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

  async getTradeHistory(accountId, startDate, endDate) {
    try {
      const conn = this.connections[accountId];
      if (!conn) {
        throw new Error('Account not connected');
      }
      
      // Get history orders
      const historyOrders = await conn.connection.getHistoryOrdersByTimeRange(
        new Date(startDate),
        new Date(endDate)
      );
      
      // Get history deals
      const historyDeals = await conn.connection.getDealsByTimeRange(
        new Date(startDate),
        new Date(endDate)
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

  async getPositions(accountId) {
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

  async disconnectAccount(accountId) {
    try {
      const conn = this.connections[accountId];
      if (!conn) {
        return { success: true, message: 'Account not connected' };
      }
      
      await conn.connection.close();
      delete this.connections[accountId];
      
      return { success: true };
    } catch (error) {
      console.error('Error disconnecting account:', error);
      return { success: false, error: error.message };
    }
  }
}

module.exports = new MT5Connection();

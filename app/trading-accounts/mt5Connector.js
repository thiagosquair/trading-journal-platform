// /app/trading-accounts/mt5Connector.js

const BACKEND_URL = process.env.NEXT_PUBLIC_MT5_BACKEND_URL || "http://localhost:3001";

export class MT5Connector {
  constructor() {
    // No direct MetaAPI SDK usage here
  }

  async connectToAccount(accountId, login, password, server) {
    try {
      const response = await fetch(`${BACKEND_URL}/api/mt5/connect`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accountId, login, password, server }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to connect to account");
      }
      return data;
    } catch (error) {
      console.error(`Error connecting to account ${accountId}:`, error);
      throw error;
    }
  }

  async disconnectFromAccount(accountId) {
    try {
      const response = await fetch(`${BACKEND_URL}/api/mt5/disconnect`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accountId }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to disconnect from account");
      }
      return data;
    } catch (error) {
      console.error(`Error disconnecting from account ${accountId}:`, error);
      throw error;
    }
  }

  async getAccountInfo(accountId) {
    try {
      const response = await fetch(`${BACKEND_URL}/api/mt5/account-info?accountId=${accountId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get account info");
      }
      return data;
    } catch (error) {
      console.error(`Error getting account info for ${accountId}:`, error);
      throw error;
    }
  }

  async getHistory(accountId, startDate, endDate) {
    try {
      const response = await fetch(`${BACKEND_URL}/api/mt5/history?accountId=${accountId}&startDate=${startDate}&endDate=${endDate}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get history");
      }
      return data;
    } catch (error) {
      console.error(`Error getting history for ${accountId}:`, error);
      throw error;
    }
  }

  // This method might need to be adjusted based on what your backend's /api/mt5/account-info returns
  async getLiveData(accountId) {
    try {
      const accountInfo = await this.getAccountInfo(accountId);
      // Assuming accountInfo contains all necessary live data, or you might need more specific backend calls
      return accountInfo;
    } catch (error) {
      console.error(`Error getting live data for ${accountId}:`, error);
      throw error;
    }
  }
}

// Create a singleton instance
export const mt5Connector = new MT5Connector();



// Test script to validate MetaTrader API connection
// Run this script to verify that real account data is being retrieved

import { connectToMT5, fetchMT5AccountData, fetchMT5Trades } from '../lib/mt5-api-client';

// Configuration for testing
const testConfig = {
  server: 'demo.metaapi.cloud', // Replace with actual server if needed
  login: '12345678',            // Replace with actual login if available
  password: 'password123',      // Replace with actual password if available
  isInvestor: true
};

async function testMetaTraderConnection() {
  console.log('Testing MetaTrader API connection...');
  
  try {
    // Step 1: Test connection
    console.log('Step 1: Testing connection to MetaTrader server...');
    const connected = await connectToMT5(testConfig);
    console.log('Connection result:', connected ? 'SUCCESS' : 'FAILED');
    
    if (!connected) {
      console.error('Failed to connect to MetaTrader server');
      return;
    }
    
    // Step 2: Fetch account data
    console.log('\nStep 2: Fetching account data...');
    try {
      const accountData = await fetchMT5AccountData(testConfig.server, testConfig.login);
      console.log('Account data retrieved successfully:');
      console.log(JSON.stringify(accountData, null, 2));
    } catch (error) {
      console.error('Error fetching account data:', error);
    }
    
    // Step 3: Fetch trades
    console.log('\nStep 3: Fetching trade history...');
    try {
      const trades = await fetchMT5Trades(testConfig.server, testConfig.login);
      console.log(`Retrieved ${trades.length} trades:`);
      console.log(JSON.stringify(trades.slice(0, 2), null, 2)); // Show first 2 trades
      if (trades.length > 2) {
        console.log(`... and ${trades.length - 2} more trades`);
      }
    } catch (error) {
      console.error('Error fetching trades:', error);
    }
    
    console.log('\nTest completed. Check the results above to verify real data is being retrieved.');
    
  } catch (error) {
    console.error('Test failed with error:', error);
  }
}

// Run the test
testMetaTraderConnection();

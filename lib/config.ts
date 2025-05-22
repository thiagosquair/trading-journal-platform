// config.ts
export const config = {
  // API credentials
  CTRADER_CLIENT_ID: process.env.CTRADER_CLIENT_ID || '',
  CTRADER_CLIENT_SECRET: process.env.CTRADER_CLIENT_SECRET || '',
  CTRADER_HOST: process.env.CTRADER_HOST || 'demo.ctraderapi.com',
  CTRADER_PORT: process.env.CTRADER_PORT || '5035',
  
  // Feature flags
  USE_MOCK_DATA: process.env.USE_MOCK_DATA || process.env.NODE_ENV === 'development' ? 'true' : 'false',
};

// src/pages/api/mt5/connect.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import metaApiService from '@/lib/platforms/metaapi-service';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { login, password, serverName, accountId } = req.body;
    
    if (!login || !password || !serverName || !accountId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    const result = await metaApiService.connectAccount({
      login,
      password,
      server: serverName,
      accountId
    });
    
    if (result.success) {
      return res.status(200).json({ success: true, accountId });
    } else {
      return res.status(400).json({ 
        success: false, 
        error: result.error,
        details: result.details 
      });
    }
  } catch (error: any) {
    console.error('Error connecting to MT5:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}

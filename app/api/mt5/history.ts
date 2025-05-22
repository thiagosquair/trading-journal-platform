// src/pages/api/mt5/history.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import metaApiService from '@/lib/platforms/metaapi-service';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { accountId, startDate, endDate } = req.query;
    
    if (!accountId || !startDate || !endDate) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    const history = await metaApiService.getTradeHistory(
      accountId as string, 
      new Date(startDate as string), 
      new Date(endDate as string)
    );
    
    return res.status(200).json(history);
  } catch (error: any) {
    console.error('Error getting trade history:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}

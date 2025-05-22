// src/pages/api/mt5/positions.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import metaApiService from '@/lib/platforms/metaapi-service';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { accountId } = req.query;
    
    if (!accountId) {
      return res.status(400).json({ message: 'Missing accountId' });
    }
    
    const positions = await metaApiService.getPositions(accountId as string);
    
    return res.status(200).json(positions);
  } catch (error: any) {
    console.error('Error getting positions:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}

'use client';
import { useEffect, useState } from 'react';
import { mt5Connector } from '../../mt5Connector';

export default function LiveMonitorPage({ params }) {
  const { accountId } = params;
  const [liveData, setLiveData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchLiveData() {
      try {
        setLoading(true);
        // Connect to the account if not already connected
        if (!mt5Connector.connections[accountId]) {
          await mt5Connector.connectToAccount(accountId);
        }
        
        // Get live data
        const data = await mt5Connector.getLiveData(accountId);
        setLiveData(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching live data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchLiveData();
    
    // Set up interval to refresh data
    const interval = setInterval(fetchLiveData, 5000);
    
    // Clean up
    return () => clearInterval(interval);
  }, [accountId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!liveData) return <div>No data available</div>;

  return (
    <div>
      <h1>Live Monitor for Account {accountId}</h1>
      <div>
        <h2>Account Information</h2>
        <pre>{JSON.stringify(liveData.accountInfo, null, 2)}</pre>
      </div>
      <div>
        <h2>Positions</h2>
        <pre>{JSON.stringify(liveData.positions, null, 2)}</pre>
      </div>
      <div>
        <h2>Orders</h2>
        <pre>{JSON.stringify(liveData.orders, null, 2)}</pre>
      </div>
    </div>
  );
}

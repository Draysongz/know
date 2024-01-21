// pages/dashboard.js
import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/router';

const Dashboard = ({ adAccounts, accessToken }) => {
    const router = useRouter();
    const [adsMetrics, setAdsMetrics] = useState([]);
  const accountsToDisplay = adAccounts.data || [];
  useEffect(() => {
    const adAccountId = accountsToDisplay[0]?.account_id;
  
    if (adAccountId && accessToken) {
      const fetchAdsMetrics = async () => {
        try {
          console.log('Fetching ads metrics for ad account:', adAccountId);
  
          const response = await fetch(`/api/adsMetric?adAccountId=${adAccountId}&accessToken=${accessToken}`);
  
          if (response.ok) {
            const data = await response.json();
            console.log('Ads metrics:', data);
            setAdsMetrics(data);
          } else {
            console.error('Error fetching ads metrics:', response.statusText);
            console.log('Full response:', response);
          }
        } catch (error) {
          console.error('Error fetching ads metrics:', error);
        }
      };
  
      fetchAdsMetrics();
    }
  }, [adAccounts, accessToken]);
  

  const createAd = async () => {
    // Add logic to create an ad using the Facebook Marketing API
    // Make a POST request to `/act_{ad_account_id}/ads` with the necessary parameters
    // Update the ad metrics after creating the ad
    // For demonstration purposes, consider this as a placeholder
    console.log('Ad creation logic here');
  };

  return (
    <div>
      <h1>Your Facebook Ads Accounts</h1>
      <ul>
        {accountsToDisplay.map((account) => (
          <li key={account.account_id}> Your Ad account Id: {account.account_id}</li>
        ))}
      </ul>
      <div>
      <h1>Your Facebook Ads Dashboard</h1>
      <button onClick={createAd}>Create Ad</button>
      <h2>Ads Metrics</h2>
      <ul>
        {adsMetrics && adsMetrics.map((metric) => (
          <li key={metric.id}>{JSON.stringify(metric)}</li>
        ))}
      </ul>
      <p>Access Token: {accessToken}</p>
    </div>
    </div>
  );
};

// Fetch ad account data from the server
Dashboard.getInitialProps = async ({ query }) => {
    return {
      adAccounts: JSON.parse(query.adAccounts || '{"data": []}'),
      accessToken: query.accessToken || '',
    };
  };

export default Dashboard;

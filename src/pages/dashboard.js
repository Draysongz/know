// pages/dashboard.js
import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const Dashboard = ({ adAccounts, accessToken }) => {
    const router = useRouter();
    const [adsMetrics, setAdsMetrics] = useState([]);
  const accountsToDisplay = adAccounts.data || [];
  console.log(accountsToDisplay)

  useEffect(() => {
    const fetchData = async () => {
      const adId = accountsToDisplay[0]?.id;

      try {
        const response = await fetch(`/api/ads?adId=${adId}&accessToken=${accessToken}`);

        if (response.ok) {
          const data = await response.json();
          setAdsMetrics(data);
        } else {
          console.error('Error fetching ad metrics:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching ad metrics:', error);
      }
    };

    fetchData();
  }, []);
  

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
          <div>
          <li key={account.account_id}> Your Ad account Id: {account.id}</li>
          <li key={account.name}>Your ad Name: {account.name}</li>
          </div>
          
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

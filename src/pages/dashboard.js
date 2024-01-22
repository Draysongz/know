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
      const adId = adAccounts.data[0]?.id;

      try {
        const response = await fetch(`/api/ads?adId=${adId}&accessToken=${accessToken}`);

        if (response.ok) {
          const data = await response.json();
          console.log('Data:', data);
          setAdsMetrics(data.data); // Assuming data.data contains the array of ads
        } else {
          console.error('Error fetching ad metrics:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching ad metrics:', error);
      }
    };

    fetchData();
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
          <li key={account.account_id}> Your Ad account Id: {account.id} <br/> Your Ad Name: {account.name}</li>
        ))}
      </ul>
      <div>
      <h1>Your Facebook Ads</h1>
      <ul>
        {adsMetrics.map((ad) => (
          <li key={ad.id}>
            <p>ID: {ad.id}</p>
            <p>Name: {ad.name}</p>
            <p>Status: {ad.status}</p>
          </li>
        ))}
      </ul>
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

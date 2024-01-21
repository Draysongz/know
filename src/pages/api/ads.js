// pages/api/ads.js
import axios from 'axios';

export default async function handler(req, res) {
  try {
    const { query: { adId, accessToken } } = req;

    if (!adId || !accessToken) {
      return res.status(400).json({ error: 'Missing ad ID or access token' });
    }

    const fields = 'insights{impressions}';
    const apiUrl = `https://graph.facebook.com/v18.0/${adId}?fields=${fields}&access_token=${accessToken}`;

    const response = await axios.get(apiUrl);

    if (response.data && response.data.insights) {
      const adMetrics = response.data.insights;
      res.status(200).json(adMetrics);
    } else {
      res.status(500).json({ error: 'Failed to fetch ad metrics' });
    }
  } catch (error) {
    console.error('Error fetching ad metrics:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

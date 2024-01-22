// pages/api/ads.js

export default async function handler(req, res) {
    try {
      const { adId, accessToken } = req.query;
  
      if (!adId || !accessToken) {
        console.log('Params missing');
        return res.status(400).json({ error: 'Missing ad account ID or access token' });
      }
  
      const apiUrl = `https://graph.facebook.com/v18.0/${adId}/ads?fields=id,name,status&access_token=${accessToken}`;
  
      const response = await fetch(apiUrl);
  
      if (response.ok) {
        const data = await response.json();
        console.log('Data:', data);
        const adMetrics = data.data;
        console.log('Ad Metrics:', adMetrics);
        res.status(200).json(data);
      } else {
        console.error('Error fetching ad metrics:', response);
        res.status(response.status).json({ error: 'Error fetching ad metrics' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
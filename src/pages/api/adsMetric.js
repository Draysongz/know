import axios from "axios";

const getAdsMetricsHandler = async (req, res) => {
    try {
      const { adAccountId, accessToken } = req.query;
      console.log('accessToken', accessToken);
      console.log('ads Id', adAccountId);
  
      if (!adAccountId || !accessToken) {
        return res.status(400).json({ error: 'Missing ad account ID or access token' });
      }
  
      const fields = 'impressions,clicks,spend';
      const apiUrl = `${FACEBOOK_GRAPH_API_BASE_URL}/${adAccountId}/insights?fields=${fields}&access_token=${accessToken}`;
      console.log('API URL:', apiUrl);
  
      const response = await axios.get(apiUrl);
      console.log('API Response:', response.data);
  
      if (response.data && response.data.data) {
        const adMetrics = response.data.data;
        console.log('ads metric', adMetrics);
        res.status(200).json(adMetrics);
      } else {
        res.status(500).json({ error: 'Failed to fetch ad metrics' });
      }
    } catch (error) {
      console.error('Error fetching ad metrics:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  export default getAdsMetricsHandler
  
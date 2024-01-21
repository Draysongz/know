import axios from 'axios';


const FACEBOOK_GRAPH_API_BASE_URL = 'https://graph.facebook.com/v18.0'; // Replace with the desired API version

const getAdsMetricsHandler = async (req, res) => {
  try {
    const { adAccountId, accessToken } = req.query;
    console.log('accessToken', accessToken)
    console.log('ads Id', adAccountId)

    if (!adAccountId || !accessToken) {
      return res.status(400).json({ error: 'Missing ad account ID or access token' });
    }

    // Fetch ad metrics from the Facebook Marketing API
    const fields = 'impressions,clicks,spend'; // Customize with the metrics you need
    const apiUrl = `${FACEBOOK_GRAPH_API_BASE_URL}/${adAccountId}?fields=insights{${fields}}&access_token=${accessToken}`;
    console.log('API URL:', apiUrl);
    const response = await axios.get(apiUrl);
    console.log(response)

    if (response.data && response.data.data) {
      const adMetrics = response.data.data;
      console.log('ads metric', adMetrics)
      res.status(200).json(adMetrics);
    } else {
      res.status(500).json({ error: 'Failed to fetch ad metrics' });
    }
  } catch (error) {
    console.error('Error fetching ad metrics:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default getAdsMetricsHandler;

import axios from 'axios';

const FACEBOOK_GRAPH_API_BASE_URL = 'https://graph.facebook.com/v13.0'; // Replace with the desired API version

const getAdsHandler = async (req, res) => {
  try {
    const { adAccountId, accessToken } = req.query;
    console.log(adAccountId)
    console.log(accessToken)

    if (!adAccountId || !accessToken) {
      return res.status(400).json({ error: 'Missing ad account ID or access token' });
    }else{
        // // Fetch all ad groups (ads) for the given ad account
    const apiUrl = `${FACEBOOK_GRAPH_API_BASE_URL}/${adAccountId}/adgroups?fields=id,name,status&access_token=${accessToken}`;
    const response = await axios.get(apiUrl);

    console.log(response)
    // if (response.data) {
    //   const ads = response.data;
    //   console.log('Ads:', ads);
    //   res.status(200).json(ads);
    // } else {
    //   res.status(500).json({ error: 'Failed to fetch ads' });
    // }
    }

  
  } catch (error) {
    console.error('Error fetching ads:', error.message);
    return res.json(error.message)
  }
};

export default getAdsHandler;
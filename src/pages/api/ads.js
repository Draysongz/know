import axios from 'axios';

const FACEBOOK_GRAPH_API_BASE_URL = 'https://graph.facebook.com/v13.0'; // Replace with the desired API version

const getAdsHandler = async (req, res) => {
//   try {
//     const { adAccountId, accessToken } = req.query;

//     if (!adAccountId || !accessToken) {
//       return res.status(400).json({ error: 'Missing ad account ID or access token' });
//     }

//     // Fetch all ad groups (ads) for the given ad account
//     const apiUrl = `${FACEBOOK_GRAPH_API_BASE_URL}/${adAccountId}/adgroups?fields=id,name,status&access_token=${accessToken}`;
//     const response = await axios.get(apiUrl);

//     if (response.data && response.data.data) {
//       const ads = response.data.data;
//       console.log('Ads:', ads);
//       res.status(200).json(ads);
//     } else {
//       res.status(500).json({ error: 'Failed to fetch ads' });
//     }
//   } catch (error) {
//     console.error('Error fetching ads:', error.message);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
return res.status(200).json('hello')
};

export default getAdsHandler;
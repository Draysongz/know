// pages/api/callback.js
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const clientId = '738539361562109';
const clientSecret = '8158044eafa5566582a749267606fc19';
const redirectUri = 'https://know-dv1g466gw-brandai.vercel.app/api/callback';

const callbackHandler = async (req, res) => {
  try {
    // Step 2: Exchange code for access token
    const { code } = req.query;
    const tokenUrl = `https://graph.facebook.com/v12.0/oauth/access_token?client_id=${clientId}&redirect_uri=${redirectUri}&client_secret=${clientSecret}&code=${code}`;
    const { data: tokenResponse } = await axios.get(tokenUrl);

    // Step 3: Use the access token to make requests to the Facebook Marketing API
    const accessToken = tokenResponse.access_token;
    const refreshToken = tokenResponse.refresh_token

    console.log('access token', accessToken)
    console.log('token response', tokenResponse)
    // You can now use the accessToken to make requests to the Facebook Marketing API

    // For example, fetching ad accounts
    const adAccountsUrl = `https://graph.facebook.com/v12.0/me/adaccounts?access_token=${accessToken}`;
    const { data: adAccounts } = await axios.get(adAccountsUrl);

    console.log('Ad Accounts:', adAccounts);

    // Here, you can store the user's access token in your database for future use

    // Redirect back to the home page or wherever you want
    res.redirect(`/dashboard?adAccounts=${JSON.stringify(adAccounts)}&accessToken=${accessToken}`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default callbackHandler;

// pages/api/login.js
import { NextApiRequest, NextApiResponse } from 'next';

const clientId = '738539361562109';
const redirectUri = 'https://know-phi.vercel.app/api/callback';

const loginHandler = (req, res) => {
  try {
    // Redirect users to Facebook login page
    const loginUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=ads_management`;
    res.writeHead(302, { Location: loginUrl });
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default loginHandler;

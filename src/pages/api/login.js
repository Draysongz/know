// pages/api/login.js
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const clientId = '738539361562109';
const clientSecret = '8158044eafa5566582a749267606fc19';
const redirectUri = 'https://know-phi.vercel.app/api/callback';

const loginHandler = async (req, res) => {
  try {
    // Step 1: Redirect users to Facebook login page
    const loginUrl = `https://www.facebook.com/v12.0/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=ads_management`;
    res.redirect(loginUrl);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default loginHandler;

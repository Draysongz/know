// pages/api/login.js
import { NextApiRequest, NextApiResponse } from 'next';

const loginHandler = async (req, res) => {
  try {
    // Step 1: Redirect users to Facebook login page
    res.send(`
      <html>
        <head>
          <script>
            function loginWithFacebook() {
              FB.login(function(response) {
                if (response.authResponse) {
                  // User is logged in and has granted your app permissions
                  window.location.href = '/api/callback?code=' + response.authResponse.accessToken;
                } else {
                  // User cancelled login or did not grant permissions
                  console.log('Login cancelled');
                }
              }, { scope: 'ads_management' });
            }
          </script>
        </head>
        <body>
          <button onclick="loginWithFacebook()">Login with Facebook Ads</button>
        </body>
      </html>
    `);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default loginHandler;

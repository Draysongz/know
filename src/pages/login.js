// pages/login.js
import React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const Login = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect users to Facebook login page
    const loginUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=738539361562109&redirect_uri=https://know-phi.vercel.app/api/callback&scope=ads_management`;
    window.location.href = loginUrl;
  }, []);

  return <div>Redirecting...</div>;
};

export default Login;

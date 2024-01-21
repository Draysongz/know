// pages/login.js
import React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const Login = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the server route for handling Facebook Ads authentication
    window.location.href = '/api/login';
  }, []);

  return <div>Redirecting...</div>;
};

export default Login;

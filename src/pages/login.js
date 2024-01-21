// pages/login.js
import React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const Login = () => {
  const router = useRouter();

  useEffect(() => {
    const loginWithFacebook = async () => {
      try {
        const response = await fetch('/api/login');
        if (response.ok) {
          // Redirect to Facebook login page
          window.location.href = response.url;
        } else {
          console.error('Error initiating Facebook login:', response.statusText);
        }
      } catch (error) {
        console.error('Error initiating Facebook login:', error);
      }
    };

    loginWithFacebook();
  }, []);

  return <div>Redirecting...</div>;
};

export default Login;

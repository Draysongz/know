// pages/index.js
import React from 'react';
import Link from 'next/link';

const Home = () => {
  return (
    <div>
      <h1>Welcome to your Ad Manager</h1>
      <Link href="/login">Login with Facebook Ads</Link>
    </div>
  );
};

export default Home;

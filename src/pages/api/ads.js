// pages/api/ads.js
async function handler(adId, accessToken) {
    try {
      if (!adId || !accessToken) {
        console.log('params missing');
        return; // Added return statement to exit the function when params are missing
      }
  
      const fields = 'insights{impressions}';
      const apiUrl = `https://graph.facebook.com/v18.0/${adId}?fields=${fields}&access_token=${accessToken}`;
  
      const response = await fetch(apiUrl);
  
      if (response.ok) {
        const data = await response.json();
        console.log(response)
        const adMetrics = data.insights;
        console.log(adMetrics);
      } else {
        console.error('Error fetching ad metrics:', response);
      }
    } catch (error) {
      console.error('Error fetching ad metrics:', error);
    }
  }
  
  handler("act_784150678869646", "EAAKfsphMbf0BO29UApuFYBTGe84blF1IwZAvTNrVtr2HymhPkUHKffxpU0mjFpwcngcsIQaZAwKHhcK7blJPxcwl6uFt6T66LYv6JZBZBElzZB0dBE0zbUNYMXHZBxo3R1cpp8c5Kksjq6kSbGYsLrrt060W39wzymNPgdABSS5SiOZCyMzyZAsZA6khGbjorW2JAPXaSDTZAQNECwNNfmYojT7D3GeErFYXzVVjOFZCUsvHsRuksKXHpwxuBTQO3Ogg3qljQ9b2leUtz5j")
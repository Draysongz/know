import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    window.fbAsyncInit = function() {
      FB.init({
        appId: '738539361562109',
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v18.0',
      });
    };

    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }, []);
  return <Component {...pageProps} />;
}

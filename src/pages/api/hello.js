const express = require('express');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const session = require('express-session');
const bodyParser = require('body-parser');
const { FacebookAdsApi, FacebookAdsApiException } = require('facebook-nodejs-business-sdk');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'your_secret_key', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

const FACEBOOK_APP_ID = 'your_facebook_app_id';
const FACEBOOK_APP_SECRET = 'your_facebook_app_secret';
const FACEBOOK_CALLBACK_URL = 'your_callback_url';

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'displayName', 'emails']
}, (accessToken, refreshToken, profile, done) => {
    // Use the Facebook profile information (profile.id, profile.displayName, profile.emails, etc.) to store in the database if needed.
    return done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

// Facebook Ads API initialization
const accessToken = 'your_facebook_ads_access_token';
const accountId = 'your_facebook_ads_account_id';
const api = FacebookAdsApi.init(accessToken);

app.get('/login', passport.authenticate('facebook'));

app.get('/callback', passport.authenticate('facebook', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/connected');
});

app.get('/connected', (req, res) => {
    // Use the Facebook Ads API to perform actions with the connected account
    const account = new FacebookAdsApi.AdAccount(accountId);
    account.read()
        .then((account) => {
            // Connected successfully, perform further actions
            res.send(`Connected to Facebook Ads account: ${account.name}`);
        })
        .catch((error) => {
            if (error instanceof FacebookAdsApiException) {
                // Handle API error
                console.error('Facebook Ads API Error:', error);
                res.status(500).send('Error connecting to Facebook Ads account.');
            } else {
                // Handle other errors
                console.error('Error:', error);
                res.status(500).send('Error connecting to Facebook Ads account.');
            }
        });
});

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

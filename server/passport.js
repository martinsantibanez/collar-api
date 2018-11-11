const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const serverConfig = require('../config');
const findOrCreate = require('./api/auth/controller').findOrCreate;
const getUser = require('./api/auth/controller').getUser;

const passportConfig = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());
    passport.serializeUser((user, done) => {
      done(null, user._id);
    });
      
    passport.deserializeUser((id, done) => {
      getUser(id).then(
        (user) => { done(null, user); },
        (error) => { done(error); }
      );
    });

    // Use the GoogleStrategy within Passport.
    //   Strategies in Passport require a `verify` function, which accept
    //   credentials (in this case, an accessToken, refreshToken, and Google
    //   profile), and invoke a callback with a user object.
    passport.use(new GoogleStrategy({
        clientID: serverConfig.GOOGLE_CLIENT_ID,
        clientSecret: serverConfig.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/api/auth/callback",
        authorizationURL: "https://accounts.google.com/o/oauth2/v2/auth?prompt=select_account"
        }, 
        findOrCreate
    ));
};

module.exports = passportConfig;

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const serverConfig = require('../config');
const passportConfig = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());

    // Use the GoogleStrategy within Passport.
    //   Strategies in Passport require a `verify` function, which accept
    //   credentials (in this case, an accessToken, refreshToken, and Google
    //   profile), and invoke a callback with a user object.
    passport.use(new GoogleStrategy({
        clientID: serverConfig.GOOGLE_CLIENT_ID,
        clientSecret: serverConfig.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://www.example.com/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
            return done(err, user);
        });
    }
    ));
};

module.exports = passportConfig;

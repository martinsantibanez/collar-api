const passport = require('passport');
const serverConfig = require('../config');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var LocalStrategy = require('passport-local').Strategy;
const User = require('./api/usuarios/model');
var localOptions = {
  usernameField: 'email'
};

var localLogin = new LocalStrategy(localOptions, function(email, password, done){
  var errLogin = new Error("Error al iniciar sesión. Por favor inténtalo nuevamente.");
  errLogin.status = 403;
  User.findOne({
    email: email
  }, function(err, user){
    if(err){
      return done(err);
    }
    if(!user){
      return done(errLogin);
    }
    user.comparePassword(password, function(err, isMatch){
      if(err){
        return done(err);
      }
      if(!isMatch){
        return done(errLogin);
      }
      return done(null, user);
    });
  }); 
});

var jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: serverConfig.SECRET
};

var jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
    User.findById(payload._id, function(err, user){
      if(err){
        console.log(err);
        return done(err, false);
      }
      if(user){
        done(null, user);
      } else {
        done(null, false);
      }
    });
});

const passportConfig = (app) => {  
  passport.use(jwtLogin);
  passport.use(localLogin);
};

module.exports = passportConfig;

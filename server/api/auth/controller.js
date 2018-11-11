const User = require('./model');
const jwt = require('jsonwebtoken');
const serverConfig = require('../../../config');

const authenticateUser = (email, password, done) => {
    User.findOne({ email: email }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!_validPassword(user, password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
    });
};

const findOrCreate = (accessToken, refreshToken, profile, done) => {
    // find a user in Mongo with provided userId
    User.findOne({ googleId: profile.id }, function(err, user) {
      console.log(profile);
      // In case of any error return
      if (err){
        console.log('Error in SignUp: '+err);
        return done(err);
      }
      if (!user) {
        // if there is no user with that id create it
        user = new User();
        // set the user's local credentials
        user.googleId = profile.id;
        user.email = profile.emails[0].value;
        // save the user
        user.save(function(err) {
          if (err){
            console.log('Error in Saving user: '+err);  
            return done(err);
          }
          console.log('User Registration succesful');    
        });
      }
      return done(err, user);
    });
}

const getUser = (id) => {
  return new Promise((resolve, reject) => {
    User.
    findById(id, (err, res) => {
      if(err) reject(err);
      else {
        resolve(res);
      }
    });
  });
}

const getPerfilPropio = (req, res) => {
  return new Promise((resolve, reject) => {
    getUser(req.authData.userId).then(
      (user) => { resolve(user); },
      (error) => { reject(error); }
    )
  });
}

module.exports = {
  authenticateUser,
  findOrCreate,
  getUser,
  getPerfilPropio
};

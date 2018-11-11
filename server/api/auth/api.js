const passport = require('passport');

const express = require('express');
const router = express.Router();
const authService = require('../services/auth');
const getPerfilPropio = require('./controller').getPerfilPropio

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
router.get('/auth',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.email'] }));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/auth/callback', passport.authenticate('google', {session: false}), (req, res) => {
  authService.signToken(req, res);
});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/api');
});

router.get('/perfil', authService.requireLogin, (req, res) => {
  getPerfilPropio(req, res).then(
    (result) => { res.send(result); },
    (error) => { console.log(error); res.status(400).send(error); }
  );
});
module.exports = router;

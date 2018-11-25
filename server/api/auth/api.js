const passport = require('passport');

const express = require('express');
const router = express.Router();
const authService = require('./service');
// const getPerfilPropio = require('./controller').getPerfilPropio;
var requireLogin = passport.authenticate('local', {session: false});

// router.post('/register', authService.register);
router.post('/login', requireLogin, authService.login);

router.get('/me', authService.requireLogin, (req, res) => {
  authService.getPerfilPropio(req.user._id).then(
    (result) => { res.send(result); },
    (error) => { console.log(error); res.status(400).send(error); }
  );
});
module.exports = router;

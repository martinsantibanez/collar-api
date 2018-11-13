const passport = require('passport');

const express = require('express');
const router = express.Router();
const authService = require('../services/auth');
const getPerfilPropio = require('./controller').getPerfilPropio;
var AuthenticationController = require('./controller');
var requireLogin = passport.authenticate('local', {session: false});

router.post('/register', AuthenticationController.register);
router.post('/login', requireLogin, AuthenticationController.login);

router.get('/perfil', authService.requireLogin, (req, res) => {
  getPerfilPropio(req, res).then(
    (result) => { res.send(result); },
    (error) => { console.log(error); res.status(400).send(error); }
  );
});
module.exports = router;

//para lokear rutas
// var requireAuth = passport.authenticate('jwt', {session: false}),
//     requireLogin = passport.authenticate('local', {session: false});
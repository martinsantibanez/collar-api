const passport = require('passport');

const express = require('express');
const router = express.Router();
const authService = require('./service');
// const getPerfilPropio = require('./controller').getPerfilPropio;
var requireLogin = passport.authenticate('local', {session: false});

// router.post('/register', authService.register);
router.post('/login', requireLogin, authService.login);


// TODO
// router.get('/perfil', authService.requireLogin, (req, res) => {
//   getPerfilPropio(req, res).then(
//     (result) => { res.send(result); },
//     (error) => { console.log(error); res.status(400).send(error); }
//   );
// });
module.exports = router;

//para lokear rutas
// var requireAuth = passport.authenticate('jwt', {session: false}),
//     requireLogin = passport.authenticate('local', {session: false});
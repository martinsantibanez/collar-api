/**
 * module dependencies for routes configuration
 */
const path = require('path');
const express = require('express');
const mascotasAPI = require('./mascotas/api');
const usuariosAPI = require('./usuarios/api');
const alertasAPI = require('./alertas/api');
const veterinariosAPI = require('./veterinarios/api');
const authAPI = require('./auth/api');
const passport = require('passport');
const authService = require('./auth/service');

/**
 * routes configurations
 */
const routesConfig = (app) => {
  // serves static files from public directory
  const publicPath = path.resolve(__dirname, '../public');
  app.use(express.static(publicPath));

  // serve api endpoint
  app.get('/api', (req, res) => {
    res.send('Hello from API endpoint');
  });


  // apply apis
  app.use('/api', authAPI);
  app.use('/api', authService.requireLogin, authService.roleAuthorization(['vet']), usuariosAPI);
  // app.use('/api', authService.requireLogin, usuariosAPI);
  app.use('/api', authService.requireLogin, mascotasAPI);
  app.use('/api', authService.requireLogin, alertasAPI);
  app.use('/api', veterinariosAPI);

  app.use(function(req, res, next) {
    var err = new Error('Not found');
    err.status = 404;
    next(err);
  })
  // all get request will send index.html for react-router
  // to handle the route request
  // app.get('*', (req, res) => {
  //   res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
  // });

  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    // res.locals.message = err.message;
    // res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    console.log(err);
    res.status(err.status || 500).send({ message: err.message });
  });

};

module.exports = routesConfig;

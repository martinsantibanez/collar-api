const getUsuario = require('./controller').getUsuario;
const getAllUsuarios = require('./controller').getAllUsuarios;
const createUsuario = require('./controller').createUsuario;
const editUsuario = require('./controller').editUsuario;
const deleteUsuario = require('./controller').deleteUsuario;
const createMascota = require('../mascotas/controller').createMascota;
const getMascotas = require('./controller').getMascotas;

const express = require('express');
const router = express.Router();

//get all usuarios
router.get('/usuarios', (req, res) => {
  getAllUsuarios().then(
    (result) => { res.send(result); },
    (error) => { console.log(error); res.status(500).send(error); }
  );
})
//get single Usuario
router.get('/usuarios/:id', (req,res) => {
  getUsuario(req.params.id).then(
    (result) => { res.send(result); },
    (error) => { res.status(400).send(error); }
  );
});
//create new Usuario
router.post('/usuarios', (req, res) => {
  createUsuario(req.body).then(
    (result) => { res.send(Object.assign({}, result, { created: true })); },
    (error) => { console.log(error); res.status(400).send({ created: false }); }
  );
});

//edit Usuario
router.put('/usuarios/:id', (req, res) => {
  editUsuario(req.params.id, req.body).then(
    (result) => { res.send(result); },
    (error) => { console.log(error); res.status(400).send(error)}
  );
});
//remove Usuario
router.delete('/usuarios/:id', (req, res) => {
  deleteUsuario(req.params.id, req.body).then(
    (result) => { res.send(result); },
    (error) => { res.status(400).send(error) }
  );
});
//get Mascotas from Usuario
router.get('/usuarios/:id/mascotas', (req, res) => {
  getMascotas(req.params.id, req.body).then(
    (result) => { res.send(result); },
    (error) => { res.status(400).send(error); }
  );
});
//add Mascota to Usuario
router.post('/usuarios/:id/mascotas', (req, res) => {
  req.body.dueno = req.params.id;
  console.log(req.body.dueno);
  createMascota(req.body).then(
    (result) => { res.send(result); },
    (error) => { console.log(error); res.status(400).send(error); }
  );
});

module.exports = router;

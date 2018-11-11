const getUsuario = require('./controller').getUsuario;
const getAllUsuarios = require('./controller').getAllUsuarios;
const createUsuario = require('./controller').createUsuario;
const editUsuario = require('./controller').editUsuario;
const deleteUsuario = require('./controller').deleteUsuario;

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
    (result) => { res.send(Object.assign({}, result._doc, { created: true })); },
    (error) => { res.status(400).send({ created: false }); }
  );
});

//edit Usuario
router.put('/usuarios/:id', (req, res) => {
  editUsuario(req.params.id, req.body).then(
    (result) => { res.send(result); },
    (error) => { res.status(400).send(error)}
  );
});
//remove Usuario
router.delete('/usuarios/:id', (req, res) => {
  deleteUsuario(req.params.id, req.body).then(
    (result) => { res.send(result); },
    (error) => { res.status(400).send(error) }
  );
});

module.exports = router;

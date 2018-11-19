const getAdvertencia = require('./controller').getAdvertencia;
const getAllAdvertencias = require('./controller').getAllAdvertencias;
const createAdvertencia = require('./controller').createAdvertencia;
const editAdvertencia = require('./controller').editAdvertencia;
const deleteAdvertencia = require('./controller').deleteAdvertencia;

const express = require('express');
const router = express.Router();

//get all advertencias
router.get('/advertencias', (req, res) => {
  getAllAdvertencias().then(
    (result) => { res.send(result); },
    (error) => { console.log(error); res.status(500).send(error); }
  );
})
//get single Advertencia
router.get('/advertencias/:id', (req,res) => {
  getAdvertencia(req.params.id).then(
    (result) => { res.send(result); },
    (error) => { res.status(400).send(error); }
  );
});
//create new Advertencia
router.post('/advertencias', (req, res) => {
  createAdvertencia(req.body).then(
    (result) => { res.send(Object.assign({}, result._doc, { created: true })); },
    (error) => { res.status(400).send({ created: false }); }
  );
});

//edit Advertencia
router.put('/advertencias/:id', (req, res) => {
  editAdvertencia(req.params.id, req.body).then(
    (result) => { res.send(result); },
    (error) => { res.status(400).send(error)}
  );
});
//remove Advertencia
router.delete('/advertencias/:id', (req, res) => {
  deleteAdvertencia(req.params.id, req.body).then(
    (result) => { res.send(result); },
    (error) => { res.status(400).send(error) }
  );
});

module.exports = router;

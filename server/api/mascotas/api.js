const getMascota = require('./controller').getMascota;
const getAllMascotas = require('./controller').getAllMascotas;
const createMascota = require('./controller').createMascota;
const editMascota = require('./controller').editMascota;
const deleteMascota = require('./controller').deleteMascota;

const express = require('express');
const router = express.Router();

//get all mascotas
router.get('/mascotas', (req, res) => {
  getAllMascotas().then(
    (result) => { res.send(result); },
    (error) => { console.log(error); res.status(500).send(error); }
  );
})
//get single Mascota
router.get('/mascotas/:id', (req,res) => {
  getMascota(req.params.id).then(
    (result) => { res.send(result); },
    (error) => { res.status(400).send(error); }
  );
});
//create new Mascota
router.post('/mascotas', (req, res) => {
  createMascota(req.body).then(
    (result) => { res.send(Object.assign({}, result._doc, { created: true })); },
    (error) => { res.status(400).send({ created: false }); }
  );
});

//edit Mascota
router.put('/mascotas/:id', (req, res) => {
  editMascota(req.params.id, req.body).then(
    (result) => { res.send(result); },
    (error) => { res.status(400).send(error)}
  );
});
//remove Mascota
router.delete('/mascotas/:id', (req, res) => {
  deleteMascota(req.params.id, req.body).then(
    (result) => { res.send(result); },
    (error) => { res.status(400).send(error) }
  );
});

module.exports = router;

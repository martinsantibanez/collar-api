const getMascota = require('./controller').getMascota;
const getAllMascotas = require('./controller').getAllMascotas;
const createMascota = require('./controller').createMascota;
const editMascota = require('./controller').editMascota;
const deleteMascota = require('./controller').deleteMascota;
const sincronizar = require('./controller').sincronizar;

const createAlerta = require('../alertas/controller').createAlerta;

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
// sincronizar collar
router.post('/mascotas/:id/sincronizar', (req, res, next) => {
  console.log(req.body)
  sincronizar(req.params.id, req.body.id_collar).then(
    (result) => { res.send(result); },
    (error) => { next(error); }
  )
});
//create alert for Mascota
router.post('/mascotas/:id_mascota/alertas', (req, res) => {
  req.body.mascota = req.params.id_mascota;
  createAlerta(req.body).then(
    (result) => { res.send(result); },
    (error) => { res.status(400).send(error) }    
  );
});
module.exports = router;

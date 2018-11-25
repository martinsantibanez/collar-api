const getAlerta = require('./controller').getAlerta;
const getAllAlertas = require('./controller').getAllAlertas;
const createAlerta = require('./controller').createAlerta;
const editAlerta = require('./controller').editAlerta;
const deleteAlerta = require('./controller').deleteAlerta;
const leerAlerta = require('./controller').leerAlerta;

const express = require('express');
const router = express.Router();

//get all alertas
router.get('/alertas', (req, res) => {
  getAllAlertas().then(
    (result) => { res.send(result); },
    (error) => { console.log(error); res.status(500).send(error); }
  );
})
//get single Alerta
router.get('/alertas/:id', (req,res) => {
  getAlerta(req.params.id).then(
    (result) => { res.send(result); },
    (error) => { res.status(400).send(error); }
  );
});
//create new Alerta
router.post('/alertas', (req, res) => {
  createAlerta(req.body).then(
    (result) => { res.send(Object.assign({}, result._doc, { created: true })); },
    (error) => { res.status(400).send({ created: false }); }
  );
});

//edit Alerta
router.put('/alertas/:id', (req, res) => {
  editAlerta(req.params.id, req.body).then(
    (result) => { res.send(result); },
    (error) => { res.status(400).send(error)}
  );
});
//remove Alerta
router.delete('/alertas/:id', (req, res) => {
  deleteAlerta(req.params.id, req.body).then(
    (result) => { res.send(result); },
    (error) => { res.status(400).send(error) }
  );
});

router.post('/alertas/:id/leer', (req, res) => {
  leerAlerta(req.params.id, req.user._id).then(
    (result) => { res.send(result); },
    (error) => { res.status(400).send(error) }
  );
})
module.exports = router;

const getAllVeterinarios = require('./controller').getAllVeterinarios;

const express = require('express');
const router = express.Router();

//get all vets
router.get('/veterinarios', (req, res) => {
  getAllVeterinarios().then(
    (result) => { res.send(result); },
    (error) => { console.log(error); res.status(500).send(error); }
  );
})


module.exports = router;

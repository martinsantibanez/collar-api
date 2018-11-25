const Alerta = require('./model');
const Mascota = require('../mascotas/model')
const getAllAlertas = () => {
  return new Promise((resolve, reject) => {
    Alerta
    .find()
    .populate('mascota', 'veterinario')
    .lean()
    .exec((error, result) => {
      if (error) { console.log(error); reject(error); }
      else if (!result) { console.log("nulo"); reject(null); }
      else { resolve(result); }
    })
  })
}

/**
 * get a single alerta
 * @param  {String} alerta_id
 * @return {Promise}
 */
const getAlerta = (alerta_id) => {
  // console.log(alerta_id);
  return new Promise((resolve, reject) => {
    Alerta
    .findById(alerta_id)
    .lean()
    .exec((error, result) => {
      if (error) { console.log(error); reject(error); }
      else if (!result) { console.log("nulo"); reject(null); }
      else { resolve(result); }
    });
  });
};

const createAlerta = (alerta) => {
  return new Promise((resolve, reject) => {
    const newAlerta = new Alerta(alerta);
    newAlerta.save((error) => {
      if(error) { console.log(error); reject(error); }
      else { resolve(newAlerta); }
    });
  });
}

const editAlerta = (alerta_id, alerta) => {
  return new Promise((resolve, reject) => {
    Alerta
    .findByIdAndUpdate(alerta_id, alerta, (error, result) => {
      if(error) { console.log(error); reject(error); }
      else { resolve(result); }
    });
  });
}

const deleteAlerta = (alerta_id) => {
  return new Promise((resolve, reject) => {
    Alerta
    .findByIdAndRemove(alerta_id, (error, result) => {
      if(error) { console.log(error); reject(error); }
      else { resolve(result); }
    });
  });
}

const leerAlerta = (alerta_id, usuario_id) => {
  return new Promise((resolve, reject) => {
    Alerta
    .findById(alerta_id, (error, alerta) => {
      if(error) { reject(error); }
      else
        Mascota.findById(alerta.mascota._id, (error, mascota) => {
          if(error) reject(error);
          else
            if(mascota.dueno._id == usuario_id){
              alerta.leida = true;
              alerta.fechaLeida = new Date();
              alerta.save((err, alerta) => {
                if(err) reject(err);
                resolve(alerta);
              });
            }
        })
    })
  })
}

module.exports = {
  getAllAlertas,
  getAlerta,
  createAlerta,
  editAlerta,
  deleteAlerta,
  leerAlerta
}
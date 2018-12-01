const Mascota = require('./model');
const Usuario = require('../usuarios/model')
const Alerta = require('../alertas/model')

const getAllMascotas = () => {
  return new Promise((resolve, reject) => {
    Mascota
    .find()
    .populate('dueno', 'nombre')
    .lean()
    .exec((error, result) => {
      if (error) { console.log(error); reject(error); }
      else if (!result) { console.log("nulo"); reject(null); }
      else { resolve(result); }
    })
  })
}

/**
 * get a single mascota
 * @param  {String} mascota_id
 * @return {Promise}
 */
const getMascota = (mascota_id) => {
  // console.log(mascota_id);
  return new Promise((resolve, reject) => {
    Mascota
    .findById(mascota_id)
    .populate('alertas')
    .lean()
    .exec((error, result) => {
      if (error) { console.log(error); reject(error); }
      else if (!result) { console.log("nulo"); reject(null); }
      else { resolve(result); }
    });
  });
};

const createMascota = (mascota) => {
  return new Promise((resolve, reject) => {
    Usuario
    .findById(mascota.dueno, function (err, usuario) {
      if(err || !usuario) reject(err);
      else {
        var newMascota = new Mascota({
          nombre: mascota.nombre,
          nacimiento: mascota.nacimiento,
          raza: mascota.raza,
          dueno: usuario._id
        });
        newMascota.save((error) => {
          if(error) { console.log(error); reject(error); }
          else { resolve(newMascota); }
        });
      }
    });
  });
};

const editMascota = (mascota_id, mascota) => {
  return new Promise((resolve, reject) => {
    Mascota
    .findByIdAndUpdate(mascota_id, mascota, (error, result) => {
      if(error) { console.log(error); reject(error); }
      else { resolve(result); }
    });
  });
}

const deleteMascota = (mascota_id) => {
  return new Promise((resolve, reject) => {
    Mascota
    .findByIdAndRemove(mascota_id, (error, result) => {
      if(error) { console.log(error); reject(error); }
      else { 
        Alerta.deleteMany({ mascota: result._id }).exec();
        resolve(result);
      }
    });
  });
}

const sincronizar = (mascota_id, collar_id) => {
  return new Promise((resolve, reject) => {
    if(!collar_id) reject(new Error('Debes especificar un id de collar.'));
    Mascota.findById(mascota_id, (error, mascota) => {
      if(error) reject(error);
      mascota.collar = collar_id;
      mascota.save((error) => {
        if(error) reject(error);
        resolve(mascota);
      });
    })
  })
}

const deleteCollar = (mascota_id) => {
  return new Promise((resolve, reject) => {
    Mascota.findById(mascota_id, (error, mascota) => {
      if(error) reject(error);
      mascota.collar = undefined;
      mascota.save((error) => {
        if(error) reject(error);
        resolve(mascota);
      });
    })
  })
}

module.exports = {
  getAllMascotas,
  getMascota,
  createMascota,
  editMascota,
  deleteMascota,
  sincronizar,
  deleteCollar
}
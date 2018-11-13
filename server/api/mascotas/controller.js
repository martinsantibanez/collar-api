const Mascota = require('./model');

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
    const newMascota = new Mascota(mascota);
    newMascota.save((error) => {
      if(error) { console.log(error); reject(error); }
      else { resolve(newMascota); }
    });
  });
}

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
      else { resolve(result); }
    });
  });
}

module.exports = {
  getAllMascotas,
  getMascota,
  createMascota,
  editMascota,
  deleteMascota
}
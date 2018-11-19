const Advertencia = require('./model');

const getAllAdvertencias = () => {
  return new Promise((resolve, reject) => {
    Advertencia
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
 * get a single advertencia
 * @param  {String} advertencia_id
 * @return {Promise}
 */
const getAdvertencia = (advertencia_id) => {
  // console.log(advertencia_id);
  return new Promise((resolve, reject) => {
    Advertencia
    .findById(advertencia_id)
    .lean()
    .exec((error, result) => {
      if (error) { console.log(error); reject(error); }
      else if (!result) { console.log("nulo"); reject(null); }
      else { resolve(result); }
    });
  });
};

const createAdvertencia = (advertencia) => {
  return new Promise((resolve, reject) => {
    const newAdvertencia = new Advertencia(advertencia);
    newAdvertencia.save((error) => {
      if(error) { console.log(error); reject(error); }
      else { resolve(newAdvertencia); }
    });
  });
}

const editAdvertencia = (advertencia_id, advertencia) => {
  return new Promise((resolve, reject) => {
    Advertencia
    .findByIdAndUpdate(advertencia_id, advertencia, (error, result) => {
      if(error) { console.log(error); reject(error); }
      else { resolve(result); }
    });
  });
}

const deleteAdvertencia = (advertencia_id) => {
  return new Promise((resolve, reject) => {
    Advertencia
    .findByIdAndRemove(advertencia_id, (error, result) => {
      if(error) { console.log(error); reject(error); }
      else { resolve(result); }
    });
  });
}

module.exports = {
  getAllAdvertencias,
  getAdvertencia,
  createAdvertencia,
  editAdvertencia,
  deleteAdvertencia
}
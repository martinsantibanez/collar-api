const Usuario = require('../auth/model');

const getAllUsuarios = () => {
  return new Promise((resolve, reject) => {
    Usuario
    .find()
    .lean()
    .exec((error, result) => {
      if (error) { console.log(error); reject(error); }
      else if (!result) { console.log("nulo"); reject(null); }
      else { resolve(result); }
    })
  })
}

/**
 * get a single usuario
 * @param  {String} usuario_id
 * @return {Promise}
 */
const getUsuario = (usuario_id) => {
  // console.log(usuario_id);
  return new Promise((resolve, reject) => {
    Usuario
    .findById(usuario_id)
    .lean()
    .exec((error, result) => {
      if (error) { console.log(error); reject(error); }
      else if (!result) { console.log("nulo"); reject(null); }
      else { resolve(result); }
    });
  });
};

const createUsuario = (usuario) => {
  return new Promise((resolve, reject) => {
    const newUsuario = new Usuario(usuario);
    newUsuario.save((error) => {
      if(error) { console.log(error); reject(error); }
      else { resolve(newUsuario); }
    });
  });
}

const editUsuario = (usuario_id, usuario) => {
  return new Promise((resolve, reject) => {
    Usuario
    .findByIdAndUpdate(usuario_id, usuario, (error, result) => {
      if(error) { console.log(error); reject(error); }
      else { resolve(result); }
    });
  });
}

const deleteUsuario = (usuario_id) => {
  return new Promise((resolve, reject) => {
    Usuario
    .findByIdAndRemove(usuario_id, (error, result) => {
      if(error) { console.log(error); reject(error); }
      else { resolve(result); }
    });
  });
}

module.exports = {
  getAllUsuarios,
  getUsuario,
  createUsuario,
  editUsuario,
  deleteUsuario
}
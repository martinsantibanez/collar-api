const Usuario = require('../auth/model');
const Mascota = require('../mascotas/model');

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
    .select('-password')
    .populate('mascotas')
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
    var email = usuario.email;
    var password = usuario.password;
    var role = usuario.role;
    var nombre = usuario.nombre;
    if(!email){
      // return res.status(422).send({error: 'You must enter an email address'});
      reject(new Error());
    } 
    if(!password){
      reject(new Error());
      // return res.status(422).send({error: 'You must enter a password'});
    }
    Usuario.findOne({email: email}, function(err, existingUser){
      if(err){
        reject(err);
      }
      if(existingUser){
        reject(new Error());
          // return res.status(422).send({error: 'That email address is already in use'});
      }
      var user = new Usuario({
        email: email,
        password: password,
        role: role,
        nombre: nombre
      });
      user.save(function(err, user){
        if(err){
          reject(err);
        }
        resolve(user);
      });
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

const createMascota = (usuario_id, mascota) => {
  return new Promise((resolve, reject) => {
    Usuario
    .findById(usuario_id, function (err, usuario) {
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

const getMascotas = (usuario_id) => {
  return new Promise((resolve, reject) => {
    Usuario.findById(usuario_id, (err, usuario) => {
      if(err || !usuario) reject(err);
      else {
        Mascota.find({dueno: usuario_id}, (err, mascotas) => {
          if(err) reject(err);
          else {
            console.log(mascotas);
            resolve(mascotas);
          }
        })
      }
    });
  });
}

module.exports = {
  getAllUsuarios,
  getUsuario,
  createUsuario,
  editUsuario,
  deleteUsuario,
  createMascota,
  getMascotas
}
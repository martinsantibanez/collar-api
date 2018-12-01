const Usuario = require('./model');
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
    var telefono = usuario.telefono;
    var domicilio = usuario.domicilio;
    if(!email){
      // return res.status(422).send({error: 'You must enter an email address'});
      reject(new Error('Debes indicar un email.'));
    } 
    if(!password){
      reject(new Error('Debes indicar una contraseña'));
      // return res.status(422).send({error: 'You must enter a password'});
    }
    Usuario.findOne({email: email}, function(err, existingUser){
      if(err){
        reject(err);
      }
      if(existingUser){
        reject(new Error('El email está en uso.'));
          // return res.status(422).send({error: 'That email address is already in use'});
      }
      var user = new Usuario({
        email: email,
        password: password,
        role: role,
        nombre: nombre,
        telefono: telefono,
        domicilio: domicilio
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
    .findById(usuario_id, (err, existingUser) => {
      if(err || !existingUser) reject(err);
      else {
        existingUser.email = usuario.email;
        if(usuario.password && usuario.password !='')
          existingUser.password = usuario.password;
        existingUser.role = usuario.role;
        existingUser.nombre = usuario.nombre;
        existingUser.telefono = usuario.telefono;
        existingUser.domicilio = usuario.domicilio;
        existingUser.save(function(err, user){
          if(err) reject(err);
          resolve(user);
        })
      }
    });
  });
}

const deleteUsuario = (usuario_id) => {
  return new Promise((resolve, reject) => {
    Usuario
    .findByIdAndRemove(usuario_id, (error, result) => {
      if(error) { console.log(error); reject(error); }
      else { 
        Mascota.deleteMany({dueno: result._id}).exec();
        resolve(result); 
      }
    });
  });
}

const getMascotas = (usuario_id) => {
  return new Promise((resolve, reject) => {
    Usuario.findById(usuario_id, (err, usuario) => {
      if(err || !usuario) reject(err);
      else {
        Mascota.find({dueno: usuario_id})
        .populate({
          path: 'alertas',
          match: { leida: false }
        })
        .lean()
        .exec((err, mascotas) => {
          if(err) reject(err);
          else {
            resolve(mascotas);
          }
        })
      }
    });
  });
}

const getClientes = () => {
  return new Promise((resolve, reject) => {
    Usuario.find( { role: 'user' } , (err, clientes) => {
      if(err) reject(err);
      resolve(clientes);
    })
  })
}

module.exports = {
  getAllUsuarios,
  getUsuario,
  createUsuario,
  editUsuario,
  deleteUsuario,
  getMascotas,
  getClientes
}
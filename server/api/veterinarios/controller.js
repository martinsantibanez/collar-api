const Usuario = require('../usuarios/model');

const getAllVeterinarios = () => {
  return new Promise((resolve, reject) => {
    Usuario
    .find({role: 'vet'})
    .lean()
    .exec((error, result) => {
      if (error) { console.log(error); reject(error); }
      else if (!result) { console.log("nulo"); reject(null); }
      else { resolve(result); }
    })
  })
}

module.exports = {
  getAllVeterinarios,
}
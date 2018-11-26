var jwt = require('jsonwebtoken'); 
var User = require('../usuarios/model');
var getUsuario = require('../usuarios/controller').getUsuario;
var editUsuario = require('../usuarios/controller').editUsuario;
var getMascotas = require('../usuarios/controller').getMascotas;
var serverConfig = require('../../../config');
 
function generateToken(user){
    return jwt.sign(user, serverConfig.SECRET, {
        expiresIn: 10080
    });
}
 
function setUserInfo(request){
    return {
        _id: request._id,
        email: request.email,
        role: request.role
    };
}
 
exports.login = function(req, res, next){
    var userInfo = setUserInfo(req.user);
    res.status(200).json({
        token: generateToken(userInfo),
        user: userInfo
    });
 
}
 
 
exports.roleAuthorization = function(roles){
  return function(req, res, next){
    var user = req.user;
    User.findById(user._id, function(err, foundUser){
      if(err){
        res.status(422).json({error: 'No user found.'});
        return next(err);
      }
      if(roles.indexOf(foundUser.role) > -1){
        return next();
      }
      res.status(401).json({error: 'You are not authorized to view this content'});
      return next('Unauthorized');
    });
  }
}

// check if Token exists on request Header and attach token to request as attribute
exports.requireLogin = (req, res, next) => {
    var errLogin = new Error();
    errLogin.status = 403;
    errLogin.message = "Por favor inicia sesión";
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        req.token = bearerHeader.split(' ')[1];
        jwt.verify(req.token, serverConfig.SECRET, (err, authData) => {
            if(err) {
                next(errLogin);
            } else {
                req.user = authData;
                next();
            }
        })
    } else {
        next(errLogin);
    }
};

exports.getPerfilPropio = (id_usuario) => {
    return new Promise((resolve, reject) => {
        getUsuario(id_usuario).then(
            (result) => resolve(result),
            (error) => reject(error)
        )
    })
}

exports.editPerfilPropio = (id_usuario, usuario) => {
    return new Promise((resolve, reject) => {
        editUsuario(id_usuario, usuario).then(
            (result) => resolve(result),
            (error) => reject(error)
        );
    })
}

exports.getMascotas = (id_usuario) => {
    return new Promise((resolve, reject) => {
        getMascotas(id_usuario).then(
            (result) => resolve(result),
            (error) => reject(error)
        );
    })
}
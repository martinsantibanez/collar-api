const jwt = require('jsonwebtoken');
const serverConfig = require('../../../config');
const User = require('../auth/model');

// check if Token exists on request Header and attach token to request as attribute
exports.requireLogin = (req, res, next) => {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        req.token = bearerHeader.split(' ')[1];
        jwt.verify(req.token, serverConfig.SECRET, (err, authData) => {
            if(err) {
                res.sendStatus(403);
            } else {
                req.user = authData;
                next();
            }
        })
    } else {
        res.sendStatus(403);
    }
};

// Issue Token
exports.signToken = (req, res) => {
    return new Promise((resolve, reject) => {
        jwt.sign({_id: req.user._id}, serverConfig.SECRET, {expiresIn:'7 days'}, (err, token) => {
            if(err){
                reject(err);
            } else {
                resolve(token);
            }
        });
    });
}

// Autorizar a los roles del arreglo roles.
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
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = Schema({
    googleId: { type: String, required: true },
    email: { type: String, required: true },
    role: {
        type: String,
        enum: ['usuario', 'veterinario', 'admin'],
        default: 'usuario'
    }
    //TODO: mas datos
});

var User = mongoose.model('User', userSchema);

module.exports = User;
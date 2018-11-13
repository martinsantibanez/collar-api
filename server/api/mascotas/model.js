var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mascotaSchema = Schema({
    nombre: {type: String, required: true},
    nacimiento: Number,
    raza: String,
    dueno: {type: Schema.Types.ObjectId, ref: 'User', required: true},
//   order: [{
    // product: {type: Schema.Types.ObjectId, ref: 'Product'},
    // quantity: Number
//   }],
//   status: String //AVAILABLE, OPEN, BILLED - TODO enum
});

mascotaSchema.pre('findOneAndUpdate', function(next) {
  this.options.runValidators = true;
  next();
});

module.exports = mongoose.model('Mascota', mascotaSchema);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mascotaSchema = Schema({
    nombre: {type: String, required: true},
    nacimiento: Number,
    raza: String,
    dueno: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    sexo: {
      type: String,
      enum: ['M', 'F']
    },
    collar: String
});

// TODO retornar edad

mascotaSchema.virtual('alertas', {
  ref: 'Alerta',
  localField: '_id',
  foreignField: 'mascota'
});
mascotaSchema.pre('findOneAndUpdate', function(next) {
  this.options.runValidators = true;
  next();
});

module.exports = mongoose.model('Mascota', mascotaSchema);
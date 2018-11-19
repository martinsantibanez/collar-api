var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var alertaSchema = Schema({
    descripcion: {type: String, required: true},
    gravedad: {
      type: String,
      enum: ['Leve', 'Moderada', 'Grave'],
      default: 'Leve',
      required: true
    },
    tipo: {
      type: String,
    },
    leida: {
      type: Boolean,
      default: false
    },
    fechaLeida: Date,
    mascota: {type: Schema.Types.ObjectId, ref: 'Mascota', required: true},
    veterinario: {type: Schema.Types.ObjectId, ref: 'User', required: true},
}, { 
    timestamps: true 
});

alertaSchema.pre('findOneAndUpdate', function(next) {
  this.options.runValidators = true;
  next();
});

module.exports = mongoose.model('Alerta', alertaSchema);
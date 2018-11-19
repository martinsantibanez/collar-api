var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var advertenciaSchema = Schema({
    descripcion: {type: String, required: true},
    mascota: {type: Schema.Types.ObjectId, ref: 'Mascota', required: true}
}, { 
    timestamps: true 
});

advertenciaSchema.pre('findOneAndUpdate', function(next) {
  this.options.runValidators = true;
  next();
});

module.exports = mongoose.model('Alerta', advertenciaSchema);
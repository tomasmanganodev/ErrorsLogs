const mongoose = require('mongoose');

const errorLogSchema = new mongoose.Schema({
  sistema: { type: String, required: true },
  fechaHora: { type: Date, default: Date.now },
  gravedad: { type: String, enum: ['ALTA', 'MEDIA', 'BAJA'], required: true },
  mensaje: { type: String, required: true },
  detalles: {
    usuario: { type: String },
    accion: { type: String },
    errorCod: { type: String },
    descripcion: { type: String }
  },
  entorno: {
    os: { type: String },
    versionApp: { type: String },
    ip: { type: String }
  }
});

const ErrorLog = mongoose.model('ErrorLog', errorLogSchema);

module.exports = ErrorLog;
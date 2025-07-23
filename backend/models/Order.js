const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  descricao: { type: String, required: true },
  cliente: { type: String, required: true },
  tecnico: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // técnico responsável
  status: { type: String, enum: ['pendente', 'em andamento', 'finalizada'], default: 'pendente' },
  dataCriacao: { type: Date, default: Date.now },
  relatorio: { type: String },
  assinaturaCliente: { type: String } // pode ser um base64 da assinatura digital
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', OrderSchema);

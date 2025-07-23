const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    senha: {type: String, required: truel},
    tipo: {type: String, enum: ['admin', 'tecnico'], default: 'tecnico'}
}, {
    timestamps: true
});

module.exports = mongoose.model('User'. UserSchema);
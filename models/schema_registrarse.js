const { Schema } = require("mongoose");
const db = require('../database');

const schema = new Schema({
    nombre_usuario: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwd: { type: String, required: true }
});

module.exports = db.model('Registro', schema)
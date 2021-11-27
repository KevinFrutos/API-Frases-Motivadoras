const { Schema } = require("mongoose");
const db_usuarios = require('../database/dbUsuarios');

const schema = new Schema({
    nombre_usuario: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwd: { type: String, required: true },
    api_key: { type: String },
    post: [{
        _id: { type: Date },
        description: { type: String, required: true }
    }]
});

module.exports = db_usuarios.model('Registro', schema)
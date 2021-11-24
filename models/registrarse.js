const { Schema } = require("mongoose");
const db = require('../database');

const schema = new Schema({
    nombre: { type: String, minlength: 3, maxlength: 50 },
    email: { type: String, minlength: 5, maxlength: 50 }
});

const Registrarse = db.model('Registrarse', schema)

module.exports = Registrarse
const { Schema } = require("mongoose");
const db = require('../database');

const schema = new Schema({
    nombre: { type: String, min: 3, max: 50 },
    email: { type: String, unique: true}
});

module.exports = db.model('Registro', schema)
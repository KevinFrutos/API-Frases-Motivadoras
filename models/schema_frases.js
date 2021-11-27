const { Schema } = require("mongoose");
const db_frases = require('../database/dbFrases');

const schema = new Schema({
    frase: { type: String, required: true, unique: true },
    autor: { type: String },
});

module.exports = db_frases.model('Frase', schema)
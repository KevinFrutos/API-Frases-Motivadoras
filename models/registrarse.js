const { Schema } = require("mongoose");

const registrarse = new Schema({
    nombre: {type: Text, minlength: 3, maxlength: 50},
    email: {type: Text, minlength: 5, maxlength:50}
})

module.exports = registrarse
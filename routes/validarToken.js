const jwt = require('jsonwebtoken')// USO ESTA LIBRERIA PARA VALIDAR LA API-KEY
const db = require('../database');
const bcrypt = require("bcryptjs"); // CON ESTA LIBRERIA COMPARO EL TOKEN CON EL HASH ALMACENADO EN LA BASE DE DATOS

// MODDLEWARE ES UNA RUTA INTERMEDIA PARA PROTEGER LAS RUTAS QUE SON SOLO ACCESIBLES CON UN TOKEN
const validarToken = async (req, res, next) => {
    const token = req.header('auth_token')
    if (!token) {
        return res.status(401).json({ error: 'Acceso denegado' })
    }
    try {
        const cursor = await db.collection('registros').findOne({ nombre_usuario: req.query.nombre_usuario })
        bcrypt.compare(token, cursor.api_key, async function (err, resultado) {
            if (!resultado) {
                res.status(400).json({
                    error: err,
                    data: 'Algo fue mal'
                })
            } else {
                const token_valido = jwt.verify(token, process.env.TOKEN_SECRET) // COMPRUEBA SI EL TOKEN ES CORRECTO
                req.token = token_valido
                next() // EN CASO DE QUE EL TOKEN SEA CORRECTO, CONTINUA A LA RUTA PROTEGIDA
            }
        })
    } catch (error) {
        res.status(400).json({ error: 'El token no es válido' })
    }
}

module.exports = validarToken
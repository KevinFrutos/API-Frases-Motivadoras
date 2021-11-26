const jwt = require('jsonwebtoken')
const aws = require('aws-sdk');

// MODDLEWARE ES UNA RUTA INTERMEDIA PARA PROTEGER LAS RUTAS QUE SON SOLO ACCESIBLES CON UN TOKEN
const validarToken = (req, res, next) => {
    let s3 = new aws.S3({
        TOKEN_SECRET: process.env.TOKEN_SECRET
      });
    const token = req.header('auth-token')
    if (!token) {
        return res.status(401).json({ error: 'Acceso denegado' })
    }
    try {
        const token_valido = jwt.verify(token, s3.TOKEN_SECRET) // COMPRUEBA SI EL TOKEN ES CORRECTO
        req.token = token_valido
        next() // EN CASO DE QUE EL TOKEN SEA CORRECTO, CONTINUA A LA RUTA PROTEGIDA
    } catch (error) {
        res.status(400).json({ error: 'El token no es válido' })
    }
}

module.exports = validarToken
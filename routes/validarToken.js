const jwt = require('jsonwebtoken')

// MODDLEWARE ES UNA RUTA INTERMEDIA PARA PROTEGER LAS RUTAS QUE SON SOLO ACCESIBLES CON UN TOKEN
const validarToken = (req, res, next) => {
    const token = req.header('auth-token')
    if (!token) {
        return res.status(401).json({ error: 'Acceso denegado' })
    }
    try {
        jwt.verify(token, process.env.TOKEN_SECRET) // COMPRUEBA SI EL TOKEN ES CORRECTO
        next() // EN CASO DE QUE EL TOKEN SEA CORRECTO, CONTINUA A LA RUTA PROTEGIDA
    } catch (error) {
        res.status(400).json({ error: 'token no es válido' })
    }
}

module.exports = validarToken
const router = require('express').Router();
const db = require('../database');
const Registrarse = require('../models/schema_registrarse')
const bcrypt = require("bcryptjs"); // CON ESTA LIBRERIA COMPARO LA CONTRASEÑA DEL USUARIO CON EL HASH ALMACENADO EN LA BASE DE DATOS
const jwt = require('jsonwebtoken'); // USO ESTA LIBRERIA PARA CREAR LA API-KEY

router.post('/login', async (req, res) => {
    try {
        // BUSCO SI EXISTE ALGUN USUARIO EN LA BASE DE DATOS CON EL NOMBRE QUE ME HAN PROPORCONADO
        // EN CASO DE QUE EXISTE ME ENVIA SUS DATOS
        const cursor = await db.collection('registros').find({ nombre_usuario: req.body.nombre_usuario }).toArray()
        // UTILIZO EL HASH DE CONTRASEÑA QUE ME HA ENVIADO LA BASE DE DATOS 
        // Y LA COMPARO CON LA CONTRASEÑA QUE EL USUARIO HA INTRODUCIDO
        bcrypt.compare(req.body.passwd, cursor[0].passwd, async function (err, resultado) {
            //console.log(resultado) // TRUE SI EL PASSWORD ES CORRECTO
            if (!resultado) {
                res.status(400).json({
                    error: err,
                    data: 'Algo fue mal'
                })
            } else {
                // SE CREA EL TOKEN
                const token = jwt.sign({
                    nombre_usuario: req.body.nombre_usuario,
                    passwd: req.body.passwd
                }, process.env.TOKEN_SECRET)
                // ENCRIPTO LA API_KEY
                const api_key = bcrypt.hashSync(token, 10)
                await Registrarse.updateOne({ nombre_usuario: req.body.nombre_usuario }, { api_key: api_key })
                res.status(200).header('auth-token', token).json({
                    error: null,
                    description: "Este es tu token recuerda no compartirlo con nadie",
                    data: token
                })
            }
        });
    } catch (err) {
        console.log(err)
    }
})

module.exports = router;
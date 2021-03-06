const router = require('express').Router();
const Registrarse = require('../models/schema_registrarse')
const { body, validationResult } = require('express-validator'); // USO ESTA LIBRERIA PARA VALIDAR LOS DATOS ANTES DE GUARDARLOS.
const bcrypt = require("bcryptjs"); // USO ESTA LIBRERIA PARA ENCRIPTAR LA CONTRASEÑA ANTES DE ENVIARLA A LA BASE DE DATOS
const jwt = require('jsonwebtoken'); // USO ESTA LIBRERIA PARA CREAR LA API-KEY

router.post('/registrarse',
    // UTILIZO EXPRESS-VALIDATOR PARA VALIDAR LOS CAMPOS SIGUIENTES
    body('nombre_usuario').isLength({ min: 6 }),
    body('email').isEmail(),
    body('passwd').isLength({ min: 6 }),
    (req, res) => {
        // USO EL METODO VALIDATIONRESULT PARA CAPTURAR LOS POSIBLES ERRORES EN LA VALIDACION DE CAMPOS
        const errors = validationResult(req);
        // EN CASO DE CAPTURAR ALGUN ERROR, SE DEVUELVE UN STATUS 400 Y UN JSON CON EL ERROR Y EL CAMPO AFECTADO.
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // ENCRIPTO LA CONTRASEÑA
        const password = bcrypt.hashSync(req.body.passwd, 10)
        // SE CREA EL TOKEN UTILIZANDO EL NOMBRE DE USUARIO Y LA CONTRASEÑA
        const token = jwt.sign({
            nombre_usuario: req.body.nombre_usuario,
            email: req.body.email
        }, process.env.TOKEN_SECRET)
        // ENCRIPTO LA API_KEY
        const api_key = bcrypt.hashSync(token, 10)
        // EN CASO DE QUE LOS DATOS ESTEN CORRECTOS SE UTILIZA EL SCHEMA QUE HE CREADO PARA LA INSERCION DE DATOS EN LA BASE DE DATOS
        // Y SE RELLENAN LOS CAMPOS CON LOS DATOS OBTENIDOS DEL FORMULARIO.
        const registrarse = new Registrarse({
            nombre_usuario: req.body.nombre_usuario,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            passwd: password,
            api_key: api_key
        })
        // SE ENVIA EL OBJETO JSON A LA BASE DE DATOS Y SE CREA LA ENTRADA CON LOS DATOS ENVIADOS.
        registrarse.save(err => {
            if (err) {
                console.log(err);
                res.status(400).json({
                    error: err,
                    data: 'Algo fue mal'
                })
            } else {
                // EN CASO QUE EL USUARIO SEA CORRECTO Y SE GUARDE EN LA BASE DE DATOS SE ENVIA EL TOKEN
                res.status(200).header('auth_token', token).json({
                    error: null,
                    description: "Este es tu token recuerda no compartirlo con nadie",
                    data: token
                })
            }
        });
    })

module.exports = router;
const router = require('express').Router();
const Registrarse = require('../models/schema_registrarse')
const { body, validationResult } = require('express-validator'); // USO ESTA LIBRERIA PARA VALIDAR LOS DATOS ANTES DE GUARDARLOS.

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
        // EN CASO DE QUE LOS DATOS ESTEN CORRECTOS SE UTILIZA EL SCHEMA QUE HE CREADO PARA LA INSERCION DE DATOS EN LA BASE DE DATOS
        // Y SE RELLENAN LOS CAMPOS CON LOS DATOS OBTENIDOS DEL FORMULARIO.
        const registrarse = new Registrarse({
            nombre_usuario: req.body.nombre_usuario,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            passwd: req.body.passwd
        })
        // SE ENVIA EL OBJETO JSON A LA BASE DE DATOS Y SE CREA LA ENTRADA CON LOS DATOS ENVIADOS.
        registrarse.save(err => {
            if (err) {
                console.log(err);
                res.json({
                    error: err,
                    data: 'Algo fue mal'
                })
            }else{
                res.json({
                    error: null,
                    data: 'Conexion correcta'
                })
            }
        });
    })

module.exports = router;
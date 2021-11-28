const router = require('express').Router();
const Frases = require('../models/schema_frases')
const { body, validationResult } = require('express-validator'); // USO ESTA LIBRERIA PARA VALIDAR LOS DATOS ANTES DE GUARDARLOS.

router.post('/frase',
    // UTILIZO EXPRESS-VALIDATOR PARA VALIDAR LOS CAMPOS SIGUIENTES
    body('frase').isLength({ min: 6 }),
    (req, res) => {
        // USO EL METODO VALIDATIONRESULT PARA CAPTURAR LOS POSIBLES ERRORES EN LA VALIDACION DE CAMPOS
        const errors = validationResult(req);
        // EN CASO DE CAPTURAR ALGUN ERROR, SE DEVUELVE UN STATUS 400 Y UN JSON CON EL ERROR Y EL CAMPO AFECTADO.
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let frase = req.body.frase
        let autor = ""
        if (req.body.autor) {
            autor = req.body.autor
        }
        // EN CASO DE QUE LOS DATOS ESTEN CORRECTOS SE UTILIZA EL SCHEMA QUE HE CREADO PARA LA INSERCION DE DATOS EN LA BASE DE DATOS
        // Y SE RELLENAN LOS CAMPOS CON LOS DATOS OBTENIDOS DEL FORMULARIO.
        const insertar_frase = new Frases({
            frase: frase,
            autor: autor
        })
        // SE ENVIA EL OBJETO JSON A LA BASE DE DATOS Y SE CREA LA ENTRADA CON LOS DATOS ENVIADOS.
        insertar_frase.save(err => {
            if (err) {
                console.log(err);
                res.status(400).json({
                    error: err,
                    data: 'Algo fue mal'
                })
            } else {
                // EN CASO QUE EL USUARIO SEA CORRECTO Y SE GUARDE EN LA BASE DE DATOS SE ENVIA EL TOKEN
                res.status(200).json({
                    error: null,
                    description: "Envio realizado correctamente"
                })
            }
        });
    })

module.exports = router;
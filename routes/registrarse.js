const router = require('express').Router();
const Registrarse = require('../models/schema_registrarse')
const { body, validationResult } = require('express-validator'); // USO ESTA LIBRERIA PARA VALIDAR LOS DATOS ANTES DE GUARDARLOS.

router.post('/registrarse',
    body('nombre_usuario').isLength({ min: 6 }),
    body('email').isEmail(),
    body('passwd').isLength({ min: 6 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const registrarse = new Registrarse({
            nombre_usuario: req.body.nombre_usuario,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            passwd: req.body.passwd
        })
        registrarse.save(err => {
            if (err) {
                console.log(err);
            }
        });
        res.json({
            error: null,
            data: 'funciona todo ok!'
        })
    })

module.exports = router;
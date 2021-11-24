const router = require('express').Router();
const Registrarse = require('../models/schema_registrarse')

router.post('/registrarse', async (req, res) => {
    console.log(req.body.nombre)
    console.log(req.body.email);
    const registrarse = new Registrarse({
        nombre: req.body.nombre,
        email: req.body.email
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
const router = require('express').Router();
const registrarse = require('../models/schema_registrarse')

router.post('/registrarse', async (req, res) => {
    console.log(req.body.nombre)
    console.log(req.body.email);
    //res.json(req.body)
    res.json({
        error: null,
        data: 'funciona todo ok!'
    })
})

module.exports = router;
const router = require('express').Router();
const Registrarse = require('../models/schema_registrarse')

router.post('/post', async (req, res) => {
    try {
        await Registrarse.updateOne(
            { nombre_usuario: req.body.nombre_usuario },
            { $push: { post: { _id: Date.now(), description: req.body.description } } }
        );
        res.status(200).send("Tu post se ha guardado correctamente")
    } catch (error) {
        console.log(error)

    }
})

module.exports = router
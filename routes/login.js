const router = require('express').Router();
const db = require('../database');
const bcrypt = require("bcryptjs"); // CON ESTA LIBRERIA COMPARO LA CONTRASEÑA DEL USUARIO CON EL HASH ALMACENADO EN LA BASE DE DATOS   

router.post('/login', async (req,res) => {
    try{
        const cursor = await db.collection('registros').find({nombre_usuario: req.body.nombre_usuario}).toArray()
        bcrypt.compare(req.body.passwd, cursor[0].passwd, function(err, resultado) {
            //console.log(resultado)
            res.json({
                error: null,
                data: 'Log-In realizado correctamente'
            })
        });
      }catch(err){
        console.log(err)
      }
})

module.exports = router;
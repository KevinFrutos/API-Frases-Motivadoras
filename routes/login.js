const router = require('express').Router();
const db = require('../database');
const bcrypt = require("bcryptjs"); // CON ESTA LIBRERIA COMPARO LA CONTRASEÑA DEL USUARIO CON EL HASH ALMACENADO EN LA BASE DE DATOS   

router.post('/login', async (req,res) => {
    try{
        // BUSCO SI EXISTE ALGUN USUARIO EN LA BASE DE DATOS CON EL NOMBRE QUE ME HAN PROPORCONADO
        // EN CASO DE QUE EXISTE ME ENVIA SUS DATOS
        const cursor = await db.collection('registros').find({nombre_usuario: req.body.nombre_usuario}).toArray()
        // UTILIZO EL HASH DE CONTRASEÑA QUE ME HA ENVIADO LA BASE DE DATOS 
        // Y LA COMPARO CON LA CONTRASEÑA QUE EL USUARIO HA INTRODUCIDO
        bcrypt.compare(req.body.passwd, cursor[0].passwd, function(err, resultado) {
            //console.log(resultado) // TRUE SI EL PASSWORD ES CORRECTO
            if(err){
                res.json({
                    error: err,
                    data: 'Algo fue mal'
                })
            }else{
                res.json({
                    error: null,
                    data: 'Log-In realizado correctamente'
                })
            }
        });
      }catch(err){
        console.log(err)
      }
})

module.exports = router;
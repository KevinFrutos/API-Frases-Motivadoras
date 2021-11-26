const router = require('express').Router();
const db = require('../database');

router.get('/usuario', async (req, res) => {
  try{
    // COMPRUEBO SI HAY ALGUN USUARIO REGISTRADO CON EL NOMBRE DE USUARIO PROPORCIONADO
    const cursor = await db.collection('registros').find({nombre_usuario: req.query.nombre_usuario}).toArray()
    // EN CASO DE QUE EL USUARIO EXISTA, SE ENVIAN LOS DATOS
    res.send(cursor)
  }catch(err){
    console.log(err)
  }
})

module.exports = router
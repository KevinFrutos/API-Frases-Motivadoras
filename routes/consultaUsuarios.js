const router = require('express').Router();
const db = require('../database');

router.get('/usuario', async (req, res) => {
  try{
    if(req.token.nombre_usuario == req.query.nombre_usuario){
      // COMPRUEBO SI HAY ALGUN USUARIO REGISTRADO CON EL NOMBRE DE USUARIO PROPORCIONADO
      const cursor = await db.collection('registros').findOne({nombre_usuario: req.query.nombre_usuario})
      // LA SIGUIENTE LINEA ME DA ESTE ERROR: Error: Collection method find is synchronous
      // POR ESA RAZON HE CAMBIADO EL find() POR findOne() Y HE QUITADO EL toArray()
      // const cursor = await db.collection('registros').find({nombre_usuario: req.query.nombre_usuario}).toArray()
      
      // EN CASO DE QUE EL USUARIO EXISTA, SE ENVIAN LOS DATOS
      res.status(200).send(cursor)
    }else{
      res.status(400).json({ error: 'token no es válido' })
    }

  }catch(err){
    console.log(err)
  }
})

module.exports = router
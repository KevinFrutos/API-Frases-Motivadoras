const router = require('express').Router();
const db = require('../database');
const jwt = require('jsonwebtoken'); // USO ESTA LIBRERIA PARA VALIDAR LA API-KEY

router.get('/usuario', async (req, res) => {
  const token = req.header('auth-token')
  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado' })
  }
  try {
    const token_validado = jwt.verify(token, process.env.TOKEN_SECRET)
    if (token_validado) {
      // COMPRUEBO SI HAY ALGUN USUARIO REGISTRADO CON EL NOMBRE DE USUARIO PROPORCIONADO
      const cursor = await db.collection('registros').findOne({ nombre_usuario: req.query.nombre_usuario })
      // LA SIGUIENTE LINEA ME DA ESTE ERROR: Error: Collection method find is synchronous
      // POR ESA RAZON HE CAMBIADO EL find() POR findOne() Y HE QUITADO EL toArray()
      // const cursor = await db.collection('registros').find({nombre_usuario: req.query.nombre_usuario}).toArray()

      // EN CASO DE QUE EL USUARIO EXISTA, SE ENVIAN LOS DATOS
      res.send(cursor)
    }
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
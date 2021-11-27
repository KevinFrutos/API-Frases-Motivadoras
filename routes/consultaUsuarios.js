const router = require('express').Router();
const db_usuarios = require('../database/dbUsuarios');

router.get('/usuario', async (req, res) => {
  try {
    if (req.token.nombre_usuario == req.query.nombre_usuario) {
      // COMPRUEBO SI HAY ALGUN USUARIO REGISTRADO CON EL NOMBRE DE USUARIO PROPORCIONADO
      const cursor = await db_usuarios.collection('registros').findOne({ nombre_usuario: req.query.nombre_usuario })
      // LA SIGUIENTE LINEA ME DA ESTE ERROR: Error: Collection method find is synchronous
      // POR ESA RAZON HE CAMBIADO EL find() POR findOne() Y HE QUITADO EL toArray()
      // const cursor = await db_usuarios.collection('registros').find({nombre_usuario: req.query.nombre_usuario}).toArray()

      // EN CASO DE QUE EL USUARIO EXISTA, SE ENVIAN LOS DATOS
      res.status(200).json({
        nombre_usuario: cursor.nombre_usuario,
        nombre: cursor.nombre,
        apellido: cursor.apellido,
        email: cursor.email,
      })
    } else {
      res.status(400).json({ error: 'token no es válido' })
    }

  } catch (err) {
    console.log(err)
  }
})

module.exports = router
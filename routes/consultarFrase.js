const router = require('express').Router();
const db_frases = require('../database/dbFrases');

router.get('/frase', async (req, res) => {
  try {
    if (req.token.nombre_usuario == req.query.nombre_usuario) {
      // TRAIGO LAS FRASES DE LA BASE DE DATOS
      const cursor = await db_frases.collection('frases').find().toArray()
      // USANDO EL INDICE DEL CURSOR GENERO UN NUMERO ALEATORIO
      const indice = Math.floor((Math.random() * (cursor.length) + 0))
      // UTILIZO EL UNUMERO ALEATORIO PARA MOSTRAR LA FRASE EN ESA POSICION DEL CURSOR
      res.status(200).json({
        frase: cursor[indice].frase,
        autor: cursor[indice].autor,
      })
    } else {
      res.status(400).json({ error: 'token no es válido' })
    }

  } catch (err) {
    console.log(err)
  }
})

module.exports = router
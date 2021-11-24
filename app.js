const express = require('express');
const bodyparser = require('body-parser');
require('dotenv').config()
const db = require('./database');
const autentificacion = require('./routes/usuarios')

const app = express();

// CAPTURAR DATOS DEL BODY
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// FORMATEAR LOS JSON
app.set('json spaces', 2);

app.get('/', (req, res) => {
  res.send("CONECTADO")
})

app.use('/api/user', autentificacion)

app.get('/prueba', (req, res) => {
  db.collection('registrarse').find().toArray()
    .then(results => {
      res.send(results)
    })
    .catch(error => console.error(error))
})

// SI EL USUARIO INTENTA ENTRAR A ALGUNA RUTA QUE NO ESTE CONFIGURADA LE SALTARA LA PAGINA DE ERROR 404
app.use((req, res, next) => {
  res.status(404).json({"error": "404", "descripcion": "Pagina no encontrada"})
})

// ABRO LA CONEXION DE LA API Y LE DIGO EL PUERTO QUE DEBE USAR
app.listen(process.env.PORT, () => {
  console.log('Accede al servidor desde el puerto ' + process.env.PORT)
})
const express = require('express');
const bodyparser = require('body-parser');
require('dotenv').config()
const cors = require('cors')
const registrarse = require('./routes/registrarse')
const api_key_generator = require('./routes/api')
const consultaUsuarios = require('./routes/consultaUsuarios')
const post = require('./routes/post')
const agregarFrase = require('./routes/agregarFrase')
const consultarFrase = require('./routes/consultarFrase')
const validarToken = require('./routes/validarToken')

const app = express();

// CUALQUIER RUTA PUEDE ACCEDER A LA API
app.use(cors())

// CAPTURAR DATOS DEL BODY
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// FORMATEAR LOS JSON
app.set('json spaces', 2);

app.get('/', (req, res) => {
  res.status(200).json({
    "error": null, 
    "descripcion": "Conectado a API-General"
  })
})

// RUTA DE REGISTRO DE USUARIO
app.use('/perfil', registrarse)

// RUTA PARA RE-GENERAR UNA API_KEY
app.use('/perfil', api_key_generator)

// ESTO ES UNA RUTA MODDLEWARE, ES UNA RUTA INTERMEDIA PARA PROTEGER LAS RUTAS 
// QUE SON SOLO ACCESIBLES EN ESTE CASO CON UN TOKEN
app.use('/consultas', validarToken, consultaUsuarios)

// RUTA INACTIVA QUE SIRVE PARA AGREGAR POSTS
app.use('/entradas', post)

// RUTAS PARA AGREGAR Y CONSULTAR FRASES
app.use('/frases', validarToken, agregarFrase)
app.use('/frases', validarToken, consultarFrase)


// SI EL USUARIO INTENTA ENTRAR A ALGUNA RUTA QUE NO ESTE CONFIGURADA LE SALTARA LA PAGINA DE ERROR 404
app.use((req, res, next) => {
  res.status(404).json({"error": "404", "descripcion": "Pagina no encontrada"})
})

// ABRO LA CONEXION DE LA API Y LE DIGO EL PUERTO QUE DEBE USAR
app.listen(process.env.PORT, () => {
  console.log('Accede al servidor desde el puerto ' + process.env.PORT)
})
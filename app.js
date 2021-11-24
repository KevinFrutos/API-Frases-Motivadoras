const express = require('express');
const bodyparser = require('body-parser');
require('dotenv').config()
const registrarse = require('./routes/registrarse')
const consultaUsuarios = require('./routes/consultaUsuarios')

const app = express();

// CAPTURAR DATOS DEL BODY
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// FORMATEAR LOS JSON
app.set('json spaces', 2);

app.get('/', (req, res) => {
  res.send("CONECTADO")
})

app.use('/perfil', registrarse)

app.use('/consultas', consultaUsuarios)


// SI EL USUARIO INTENTA ENTRAR A ALGUNA RUTA QUE NO ESTE CONFIGURADA LE SALTARA LA PAGINA DE ERROR 404
app.use((req, res, next) => {
  res.status(404).json({"error": "404", "descripcion": "Pagina no encontrada"})
})

// ABRO LA CONEXION DE LA API Y LE DIGO EL PUERTO QUE DEBE USAR
app.listen(process.env.PORT, () => {
  console.log('Accede al servidor desde el puerto ' + process.env.PORT)
})
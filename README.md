# API-Frases-Motivadoras

_Esta es la primera API que he creado, esta comentada casi linea por linea para 
usarla como documentacion en un futuro a la hora de hacer otra API_

## Comenzando 🚀

_Para empezar a usr la API lo primero que necesitas hacer es registrarte usando la ruta de registro, y una vez que tienes tu API_KEY puedes disfrutar del servicio de la API._

### Instalación 🔧

_A continuación mostrare las rutas disponibles, y una breve descripción de como usar la API_

_# CONECTADO_
__En esta ruta todo lo que haces es comprobar que tienes acceso a la API y que esta funcionando__

```
GET /
```

_# REGISTRARSE_

```
POST /perfil/registrarse
body: JSON.stringify({
    nombre_usuario: "nombre_usuario",
    nombre: "nombre",
    apellido: "apellido",
    email: "email",
    passwd: "passwd"
})
```

_# GENERA NUEVA API_KEY_

```
POST /perfil/api
body: JSON.stringify({
    nombre_usuario: "nombre_usuario",
    passwd: "passwd"
})
```

_# CONSULTA TUS DATOS DE USUARIO_

```
GET /consultas/usuario
headers: {
    "auth-token": "API_KEY"
}
```

_# INSERTAR NUEVA FRASE_

```
headers: {
    'Content-Type': 'application/json',
    "auth_token":  "API_KEY"
},
body: JSON.stringify({
    frase: "frase",
    autor: "autor"
})
```

_# CONSULTAR FRASE_

```
GET /frases/frase
headers: {
    "auth_token":  "API_KEY"
}
```

_Gracias por usar mi API 💜_


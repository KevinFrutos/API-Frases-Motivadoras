const router = require('express').Router();

router.post('/login', (req,res) => {

})

module.exports = router;

/*
req.body.passwd: aqui va la contraseña que el usuario introduce en el login
hash: aqui va la contraseña encriptada que esta guardada en la base de datos, asociada al nombre de Usuario
bcrypt.compare(req.body.passwd, hash, function(err, res) {
                    console.log(res)
                });

*/
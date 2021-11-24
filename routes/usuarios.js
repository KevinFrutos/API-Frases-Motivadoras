const router = require('express').Router();

router.post('/registrarse', async (req, res) => {
    res.json({
        error: null,
        data: 'funciona todo ok!'
    })
})

module.exports = router;
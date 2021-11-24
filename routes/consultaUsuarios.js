const router = require('express').Router();
const db = require('../database');

router.get('/usuarios', async (req, res) => {
    db.collection('registros').find().toArray()
    .then(results => {
      res.send(results)
    })
    .catch(error => console.error(error))
})

module.exports = router
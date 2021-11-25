const router = require('express').Router();
const db = require('../database');

router.get('/usuarios', async (req, res) => {
  try{
    const cursor = await db.collection('registros').find().toArray()
    res.send(cursor)
  }catch(err){
    console.log(err)
  }
})

module.exports = router
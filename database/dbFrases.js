const mongoose = require('mongoose');

const url_frases = "mongodb+srv://" + process.env.USER + ":" + process.env.PASSWORD + "@" + process.env.HOST + "/" + process.env.DBFRASES + "?retryWrites=true&w=majority";

const db_frases = mongoose.createConnection(url_frases, { useNewUrlParser: true, useUnifiedTopology: true })
db_frases.on('error', (err) => {
  reject(err);
 });

module.exports = db_frases;

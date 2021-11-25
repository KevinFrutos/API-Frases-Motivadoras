const mongoose = require('mongoose');

const url = "mongodb+srv://" + process.env.USER + ":" + process.env.PASSWORD + "@api-general.xdns4.mongodb.net/" + process.env.DBNAME + "?retryWrites=true&w=majority";

const db = mongoose.createConnection(url, 
  { useNewUrlParser: true, useUnifiedTopology: true }
)
db.on('error', (err) => {
  reject(err);
 });

module.exports = db;

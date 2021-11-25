const mongoose = require('mongoose');
// AWS-SDK ES PARA QUE LA APP FUNCIONE EN HEROKU
const aws = require('aws-sdk');

let s3 = new aws.S3({
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  DBNAME: process.env.DBNAME
});

const url = "mongodb+srv://" + process.env.USER + ":" + process.env.PASSWORD + "@api-general.xdns4.mongodb.net/" + process.env.DBNAME + "?retryWrites=true&w=majority";

const db = mongoose.createConnection(url, 
  { useNewUrlParser: true, useUnifiedTopology: true }
)
db.on('error', (err) => {
  reject(err);
 });

module.exports = db;

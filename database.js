const mongoose = require('mongoose');
const aws = require('aws-sdk');

let s3 = new aws.S3({
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  DBNAME: process.env.DBNAME
});

const url = "mongodb+srv://" + s3.USER + ":" + s3.PASSWORD + "@api-general.xdns4.mongodb.net/" + s3.DBNAME + "?retryWrites=true&w=majority";

const db = mongoose.createConnection(url, { useNewUrlParser: true, useUnifiedTopology: true })
db.on('error', (err) => {
  reject(err);
 });

module.exports = db;

var mysql = require('mysql');

// connection with ddbb

connection = mysql.createConnection({
  host: 'eu-cdbr-west-02.cleardb.net',
  user: 'b1f0181ad445c3',
  password: 'f5b72c32',
  database: 'heroku_747ea78b85bca6a'
});

let queryModels = {}


module.exports = queryModels;

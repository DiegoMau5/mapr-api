'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var server = require('http').Server(app);
var morgan = require('morgan');

//routes del SERVIDOR

require('./routes/routes.js')(app);

//middleware

app.use(morgan('dev'));
app.use(bodyParser.json());


server.listen(process.env.PORT || 3000, function(){
  console.log('Servidor running...')
});

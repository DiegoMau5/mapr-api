'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var server = require('http').Server(app);

server.listen(process.env.PORT || 3000, function(){
  console.log('Servidor running...')
});

app.get('/', function(req, res){
  res.status(200).send("SERVIDOR ACITVO API")
});

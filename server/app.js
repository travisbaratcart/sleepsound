var path = require('path');
var express = require('express');
var app = express();

var clientPath = path.normalize(__dirname + '/../client');
app.use(express.static(clientPath));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    next();
});


var requestHandler = require(__dirname + '/request_handler.js');

app.get('/agencies', requestHandler.agencies);
app.get('/lines', requestHandler.lines);
app.get('/times', requestHandler.times);


app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

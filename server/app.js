'use strict'

const path = require('path');
const express = require('express');
const app = express();

const clientPath = path.normalize(__dirname + '/../client');
app.use(express.static(clientPath));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    next();
});

app.set('view engine', 'ejs');
app.set('views', clientPath);

const requestHandler = require(__dirname + '/request_handler.js');

app.get('/agencies', requestHandler.agencies);
app.get('/lines', requestHandler.lines);
app.get('/times', requestHandler.times);


app.get('/', (req, res) => {
  res.render('index');
});

app.listen(8080, () => {
  console.log('App listening on port 8080!');
});

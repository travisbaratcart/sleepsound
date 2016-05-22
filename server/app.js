const path = require('path');
const express = require('express');
const app = express();

const clientPath = path.normalize(__dirname + '/../client');
app.use(express.static(clientPath));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    next();
});


const requestHandler = require(__dirname + '/request_handler.js');

app.get('/agencies', requestHandler.agencies);
app.get('/lines', requestHandler.lines);
app.get('/times', requestHandler.times);


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});

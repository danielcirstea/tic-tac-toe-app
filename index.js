require('dotenv').config();

const express = require('express');
const app = express();
const http = require('http');
const helmet = require('helmet');
const config = require('./config')();

app.use(helmet({contentSecurityPolicy: false}));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.use('/config', (req, res) => {
    res.status(200).json({ ...config.app });
});

http.createServer(app).listen(config.app.port, () => {
    console.log(`Listening on ${config.app.port}.`);
});
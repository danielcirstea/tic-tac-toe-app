const express = require('express');
const app = express();
const http = require('http');
const helmet = require('helmet');
const port = process.env.PORT || 4000;

app.use(helmet({contentSecurityPolicy: false}));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('index');
});

http.createServer(app).listen(port, () => {
    console.log(`Listening on ${port}.`);
});
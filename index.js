require('dotenv').config();

const express = require('express');
const app = express();
const http = require('http');
const config = require('./lib/common/config')();
const helmet = require('helmet');
const handlebars = require('express-handlebars');

app.use(helmet({ contentSecurityPolicy: false }));

app.engine('hbs', handlebars({
    defaultLayout: 'main',
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index');
});

http.createServer(app).listen(config.app.port, () => {
    console.log(`Listening on ${config.app.port}.`);
});
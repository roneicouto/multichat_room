/* PASSO 3 importar os módulos */
var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

//fim importação dos módulos

/*inicialização */
var app = express();

//engines
app.set('view engine','ejs');
app.set('views', './app/views');

//middlewares
app.use(express.static('./app/public'));
app.use(bodyParser.urlencoded({extended:true}));

//express-validator
app.use(expressValidator());

//consign --autoload dos objetos
consign()
    .include('app/routes')
    .then('app/models')
    .then('app/controllers')
    .into(app);

//exportando objetos do APP , exemplo: app.js
module.exports = app;
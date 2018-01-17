/* importar o módulo do framework express */
var express = require("express");

/* importar o módulo do consign */
var consign = require("consign");

/* importar o módulo body-parser */
var bodyParser = require("body-parser");

/* importar o módulo express-validator */
var expressValidator = require("express-validator");

/* iniciar o objeto express */
var app = express();

/* configurar o ejs */
/* setar as variáveis 'view engine' e 'views' do express */
app.set("view engine", "ejs");
app.set("views", "./app/view");

/* configuração de middlewares */
/* express.static para os assets*/
app.use(express.static("./app/public"));

/* body-parser */
app.use(bodyParser.urlencoded({extended: true}));

/* express-validator */
app.use(expressValidator());

/* configurar o consign para autoload */
consign()
	.include("app/route")
	.then("app/model")
	.then("app/controller")
	.into(app);

/* exportar o objeto app */
module.exports = app;
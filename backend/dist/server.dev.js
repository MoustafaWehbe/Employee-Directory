"use strict";

var express = require('express');

var log = require('morgan')('dev');

var bodyParser = require('body-parser');

var cors = require('cors');

var db = require('./db/connection');

var properties = require('./config/properties');

var emplyeesRoutes = require('./routes/employee');

var countriesRoutes = require('./routes/country');

var departmentsRoutes = require('./routes/department');

var app = express(); //configure bodyparser

var bodyParserJSON = bodyParser.json();
var bodyParserURLEncoded = bodyParser.urlencoded({
  extended: false
}); //initialise express router

var router = express.Router();
app.use(bodyParser.json({
  limit: '5mb'
}));
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '5mb'
}));
db();
app.use(log);
app.use(bodyParserJSON);
app.use(bodyParserURLEncoded); // Error handling

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization");
  next();
});
app.use(cors());
app.use('/api/v1', router);
app.use('/public', express["static"]('./public')); //call heros routing

emplyeesRoutes(router);
countriesRoutes(router);
departmentsRoutes(router);
app.listen(properties.PORT, function () {
  console.log("Server is running on port: ".concat(properties.PORT));
});
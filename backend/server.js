const express = require('express');
const log = require('morgan')('dev');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db/connection');
const properties = require('./config/properties');

const emplyeesRoutes = require('./routes/employee');
const countriesRoutes = require('./routes/country');
const departmentsRoutes = require('./routes/department');

const app = express();

//configure bodyparser
var bodyParserJSON = bodyParser.json();
var bodyParserURLEncoded = bodyParser.urlencoded({ extended: true });

//initialise express router
var router = express.Router();

// app.use(cors());
// app.use(express.json());
app.use(bodyParser.json({limit:'5mb'})); 
app.use(bodyParser.urlencoded({extended:true, limit:'5mb'}));

db();

app.use(log);
app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

// Error handling
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization");
    next();
});

// const exercisesRouter = require('./routes/exercises');
// const usersRouter = require('./routes/users');

// app.use('/exercises', exercisesRouter);
// app.use('/users', usersRouter);

// use express router
app.use('/api/v1', router);
app.use('uploads', express.static('uploads'));
//call heros routing
emplyeesRoutes(router);
countriesRoutes(router);
departmentsRoutes(router);

app.listen(properties.PORT, () => {
    console.log(`Server is running on port: ${properties.PORT}`);
});
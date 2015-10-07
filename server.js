'use strict';

// Set 'NODE_ENV' variable
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Load module dependencies
var mongoose = require('./config/mongoose'),
    express = require('./config/express');
    passport = require('./config/passport');

// create mongoose connection instance
var db = mongoose();  

// create express instance
var app = express();

// configure passport middleware
var passport = passport();

app.listen(process.env.PORT, process.env.IP);

console.log('server running');

module.exports = app;
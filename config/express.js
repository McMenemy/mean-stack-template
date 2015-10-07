'use strict';

// Load module dependencies
var config = require('./config'),
    express = require('express'),
    morgan = require('morgan'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    flash = require('connect-flash'),
    passport = require('passport');

// Define Express configuration method    
module.exports = function() {
    var app = express();
    
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }
    
    // Use 'body-parser' and 'method-override' middleware functions
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    
    // Configure 'session' middleware
    app.use(session({
        saveUninitialized : true,
        resave : true,
        secret : config.sessionSecret
    }));
    
    // Set application view engine and 'views' folder
    app.set('views', './app/views');
    app.set('view engine', 'ejs');
    
    // Configure flash messages middleware
    app.use(flash());
    
    // Configure the Passport middleware
    app.use(passport.initialize());
    app.use(passport.session());
    
    // Load routing files
    require('../app/routes/index.server.routes.js')(app);
    require('../app/routes/users.server.routes.js')(app);
    require('../app/routes/articles.server.routes.js')(app);
    
    // Configure static file serving
    app.use(express.static('./public'));
    
    return app;
};
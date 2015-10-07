'use strict';

// load module dependicies
var config = require('./config'),
    mongoose = require('mongoose');
 
// define mongoose configuration   
module.exports = function() {
    var db = mongoose.connect(config.db);
    
    // load models 
    require('../app/models/user.server.model');
    require('../app/models/article.server.model');
    
    return db;
};
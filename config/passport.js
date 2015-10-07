'use strict';

// load module dependicies
var passport = require('passport'),
    mongoose = require('mongoose');

// define passport configuration    
module.exports = function() {
    // load user model
    var User = mongoose.model('User');
    
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    
    passport.deserializeUser(function(id, done) {
        User.findOne({
            _id : id
        }, '-password -salt', function(err, user) {
            done(err, user);
        });
    });
    
    // load passports strageties files
    require('./strategies/local.js')();
};
'use strict';

// Load module dependencies
var users = require('../../app/controllers/users.server.controller'),
	passport = require('passport');

// Define the routes
module.exports = function(app) {
	// Set up 'signup' routes 
	app.route('/signup')
	   .get(users.renderSignup)
	   .post(users.signup);

	// Set up 'signin' routes 
	app.route('/signin')
	   .get(users.renderSignin)
	   .post(passport.authenticate('local', {
			successRedirect: '/',
			failureRedirect: '/signin',
			failureFlash: true
	   }));

	// Set up 'signout' route
	app.get('/signout', users.signout);
};
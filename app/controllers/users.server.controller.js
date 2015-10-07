'use strict';

// Load module dependencies
var User = require('mongoose').model('User'),
	passport = require('passport');

// handle errors
var getErrorMessage = function(err) {
	var message = '';

	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Username already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	return message;
};

// render signin page
exports.renderSignin = function(req, res, next) {
	if (!req.user) {
		res.render('signin', {
			title: 'Sign-in Form',
			messages: req.flash('error') || req.flash('info')
		});
	} else {
		return res.redirect('/');
	}
};

// render signup page
exports.renderSignup = function(req, res, next) {
	if (!req.user) {
		res.render('signup', {
			title: 'Sign-up Form',
			messages: req.flash('error')
		});
	} else {
		return res.redirect('/');
	}
};

// create new user
exports.signup = function(req, res, next) {
	if (!req.user) {
		var user = new User(req.body);
		var message = null;

		user.provider = 'local';

		user.save(function(err) {
			if (err) {
				var message = getErrorMessage(err);

				req.flash('error', message);

				return res.redirect('/signup');
			}

			// use Passport 'login' method to login
			req.login(user, function(err) {
				if (err) return next(err);

				return res.redirect('/');
			});
		});
	} else {
		return res.redirect('/');
	}
};

// sign out
exports.signout = function(req, res) {
	// Use Passport 'logout' method to logout
	req.logout();

	res.redirect('/');
};

// authorize authenticated operations 
exports.requiresLogin = function(req, res, next) {
	if (!req.isAuthenticated()) {
		return res.status(401).send({
			message: 'User is not logged in'
		});
	}

	next();
};
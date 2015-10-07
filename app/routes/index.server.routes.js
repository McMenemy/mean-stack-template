'use strict';

// Define routes
module.exports = function(app) {
	var index = require('../controllers/index.server.controller');

	// Mount 'index' controller's 'render' method
	app.get('/', index.render);
};
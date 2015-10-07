'use strict';

// Create 'Authentication' service
angular.module('users').factory('Authentication', [
	function() {
		// Use rendered user object
		this.user = window.user;

		// Return authenticated user data
		return {
			user: this.user
		};
	}
]);
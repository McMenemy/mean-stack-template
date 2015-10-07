'use strict';

// Create 'articles' service
angular.module('articles').factory('Articles', ['$resource', function($resource) {
    return $resource('api/articles/:articleId', {
        articleId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);
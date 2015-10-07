'use strict';

// Create controller
angular.module('articles').controller('ArticlesController', ['$scope', '$routeParams', '$location', 'Authentication', 'Articles',
    function($scope, $routeParams, $location, Authentication, Articles) {
    	// Expose Authentication service
        $scope.authentication = Authentication;

        // create new articles
        $scope.create = function() {
        	// Use form fields to create a new article $resource object
            var article = new Articles({
                title: this.title,
                content: this.content
            });

            // Use article '$save' method to send POST request
            article.$save(function(response) {
                $location.path('articles/' + response._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // retrieve a list of articles
        $scope.find = function() {
        	// Use article 'query' method to send GET request
            $scope.articles = Articles.query();
        };

        // retrieve a single article
        $scope.findOne = function() {
        	// Use article 'get' method to send an appropriate GET request
            $scope.article = Articles.get({
                articleId: $routeParams.articleId
            });
        };

        // update a single article
        $scope.update = function() {
        	// Use article '$update' method to send an appropriate PUT request
            $scope.article.$update(function() {
                $location.path('articles/' + $scope.article._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // delete a single article
        $scope.delete = function(article) {
            if (article) {
            	// Use the article '$remove' method to delete the article
                article.$remove(function() {
                    for (var i in $scope.articles) {
                        if ($scope.articles[i] === article) {
                            $scope.articles.splice(i, 1);
                        }
                    }
                });
            } else {
            	// Otherwise, use article '$remove' method to delete the article
                $scope.article.$remove(function() {
                    $location.path('articles');
                });
            }
        };
    }
]);
'use strict';

var app = angular.module('route', ['ngRoute'])
app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: true
    });
    $routeProvider
      .when('/', {
        templateUrl: 'todos.html',
        controller: 'TodoController'
      })
      .when('/:id', {
        templateUrl: 'detail.html',
        controller: 'TodoDetailController'
      });
}]);
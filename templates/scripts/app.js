'use strict';

angular.module('admoWebuiApp', [])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/views/main.html',
        controller: window.AdmoApp.MainCtrl
      });
}]);


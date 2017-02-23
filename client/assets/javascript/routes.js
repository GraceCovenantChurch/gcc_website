angular.module('gccweb')
.config(function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'assets/templates/home.html'
  })
  .when('/about', {
    templateUrl: 'assets/templates/about.html'
  });
});

angular.module('gccweb')
.config(function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'assets/templates/home.html'
  })
  .when('/about', {
    templateUrl: 'assets/templates/about/about.html'
  })
  .when('/about/ami', {
    templateUrl: 'assets/templates/about/ami.html'
  })
  .when('/about/staff', {
    templateUrl: 'assets/templates/about/staff.html'
  });
});

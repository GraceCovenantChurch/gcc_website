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
  })
  .when('/about/believe', {
    templateUrl: 'assets/templates/about/believe.html'
  })
  .when('/about/imnew', {
    templateUrl: 'assets/templates/about/imnew.html'
  })
  .when('/familygroup', {
    templateUrl: 'assets/templates/familygroup/familygroup.html'
  });
});

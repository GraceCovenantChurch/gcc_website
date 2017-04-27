angular.module('gccweb')
.config(function($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');
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
  })
  .when('/giving', {
    templateUrl: 'assets/templates/giving/giving.html'
  })
  .when('/ministries', {
    templateUrl: 'assets/templates/ministries/ministries.html'
  })
  .when('/multimedia', {
    templateUrl: 'assets/templates/multimedia/multimedia.html'
  })
  .when('/calendar', {
    templateUrl: 'assets/templates/calendar/calendar.html'
  });
});

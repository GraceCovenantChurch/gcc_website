angular.module('gccweb-admin')
.config(function($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');
  $routeProvider
  .when('/', {
    templateUrl: 'assets/templates/main.html'
  })
  .when('/mainAnnouncements', {
    templateUrl: 'assets/templates/main.html',
    controller: 'mainAnnouncementsController'
  })
  .when('/smallAnnouncements', {
    templateUrl: 'assets/templates/main.html',
    controller: 'smallAnnouncementsController'
  })
  .when('/memoryVerses', {
    templateUrl: 'assets/templates/main.html',
    controller: 'memoryVersesController'
  });
});

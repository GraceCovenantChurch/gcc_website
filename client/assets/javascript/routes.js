angular.module('gccweb')
.config(function($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');
  $routeProvider.when('/', {
    templateUrl: 'assets/templates/home.html',
    resolve: {
        images : function(Preloader) {
          Preloader.preloadImages(['assets/images/home/philly.jpg'])
        }
    }
  })
  .when('/about', {
    templateUrl: 'assets/templates/about/about.html',
    resolve: {
        images : function(Preloader) {
          Preloader.preloadImages(['assets/images/about/jumbotron.jpg'])
        }
    }
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
    templateUrl: 'assets/templates/familygroup/familygroup.html',
    resolve: {
        images : function(Preloader) {
          Preloader.preloadImages(['assets/images/familygroup/jumbotron.jpeg'])
        }
    }
  })
  .when('/giving', {
    templateUrl: 'assets/templates/giving/giving.html',
    resolve: {
        images : function(Preloader) {
          Preloader.preloadImages(['assets/images/giving/jumbotron.jpeg'])
        }
    }
  })
  .when('/ministries', {
    templateUrl: 'assets/templates/ministries/ministries.html',
    resolve: {
        images : function(Preloader) {
          Preloader.preloadImages(['assets/images/ministries/jumbotron.jpeg'])
        }
    }
  })
  .when('/multimedia', {
    templateUrl: 'assets/templates/multimedia/multimedia.html'
  })
  .when('/calendar', {
    templateUrl: 'assets/templates/calendar/calendar.html'
  });
});

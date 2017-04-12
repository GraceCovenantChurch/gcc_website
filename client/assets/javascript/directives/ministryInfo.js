angular.module('gccweb').directive('ministryInfo', function() {
  return {
    restrict: 'E',
    templateUrl: 'assets/templates/ministries/info.html',
    scope: {
      list: "=",
      currentIndex: "="
    },
    controller: function($scope) {

    }
  };
})

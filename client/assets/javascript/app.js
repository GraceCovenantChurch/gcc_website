angular.module('gccweb', ['ngRoute', 'ngResource', 'angular-inview'])
  .controller('documentController', function($scope) {
    $scope.elementInView = function(inview, inviewInfo) {
      if (inview) {
        inviewInfo.element.removeClass("fade");
      }
    }
  });

angular.module('gccweb', ['ngRoute', 'ngResource', 'angular-inview', 'angular-preload-image'])
  .controller('documentController', function($scope) {
    $scope.elementInView = function(inview, inviewInfo) {
      if (inview) {
        inviewInfo.element.removeClass("fade");
      }
    }
  });

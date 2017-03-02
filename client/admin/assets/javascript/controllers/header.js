angular.module('gccweb-admin')
  .controller('headerController', function($scope, $location) {
    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
  });

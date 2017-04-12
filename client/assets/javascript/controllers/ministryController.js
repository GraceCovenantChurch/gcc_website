angular.module('gccweb')
  .controller("ministryController", function($scope, Ministry) {
    $scope.ministriesList = Ministry.query();
  });

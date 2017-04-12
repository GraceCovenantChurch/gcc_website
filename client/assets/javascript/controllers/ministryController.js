angular.module('gccweb')
  .controller("ministryController", function($scope, Ministry) {
    $scope.ministriesList = Ministry.query(function() {
      $scope.getSizeArray = function() {
        console.log("Here");
        return Array(Math.ceil($scope.ministriesList.length / 4));
      };
      $scope.getRow = function(index) {
        var first = index * 4;
        var second = first + 4;
        var slice = $scope.ministriesList.slice(first, second);
        return slice;
      };
    });
  });

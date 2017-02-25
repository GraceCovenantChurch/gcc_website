angular.module('gccweb')
  .controller('staffController', function($scope, Staff) {
    $scope.staffList = Staff.query();
  });

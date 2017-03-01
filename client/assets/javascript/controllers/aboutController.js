angular.module('gccweb')
  .controller('staffController', function($scope, Staff) {
    $scope.staffList = Staff.query();
  })
  .controller('believeController', function($scope, Believe) {
    $scope.believeList = Believe.query();
  });

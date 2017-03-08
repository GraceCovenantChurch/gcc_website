angular.module('gccweb')
  .controller('staffController', function($scope, Staff) {
    $scope.staffList = Staff.query();
  })
  .controller('believeController', function($scope, Believe) {
    $scope.believeList = Believe.query();
    $scope.tab = -1;
    $scope.select = function(number) {
      if ($scope.tab == number) $scope.tab = -1;
      else $scope.tab = number;
    }
  });

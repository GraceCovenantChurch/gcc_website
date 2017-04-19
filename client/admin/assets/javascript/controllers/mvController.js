angular.module('gccweb-admin')
  .controller('memoryVersesController', function($scope, MemoryVerse) {
    $scope.title = 'Memory Verses';
    $scope.route = 'memoryVerse';
    $scope.categories = ['reference', 'verse'];
    $scope.data = MemoryVerse.query();
    $scope.editForm = 'assets/templates/mvForm.html';
    $scope.setItem = function(item) {
        $scope.activeItem = item;
    };
    $scope.create = function() {
      $scope.activeItem = {
        reference: '',
        verse: ''
      }
      $scope.data.unshift($scope.activeItem);
    };
  });

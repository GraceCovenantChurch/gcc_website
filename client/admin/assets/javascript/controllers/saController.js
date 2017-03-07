angular.module('gccweb-admin')
  .controller('smallAnnouncementsController', function($scope, SmallAnnouncement) {
    $scope.title = 'Small Announcements';
    $scope.categories = ['text'];
    $scope.data = SmallAnnouncement.query();
    $scope.editForm = 'assets/templates/saForm.html';
    $scope.setItem = function(item) {
        $scope.activeItem = item;
    };
    $scope.create = function() {
      $scope.activeItem = {
        text: ''
      }
      $scope.data.unshift($scope.activeItem);
    };
  });

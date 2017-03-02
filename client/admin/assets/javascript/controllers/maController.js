angular.module('gccweb-admin')
  .controller('mainAnnouncementsController', function($scope, MainAnnouncement) {
    $scope.title = 'Main Announcements';
    $scope.categories = ['title', 'description', 'pic_url'];
    $scope.data = MainAnnouncement.query();
    $scope.editForm = 'assets/templates/maForm.html';
    $scope.setItem = function(item) {
        $scope.activeItem = item;
    };
    $scope.create = function() {
      $scope.activeItem = {
        title: '',
        description: ''
      }
      $scope.data.unshift($scope.activeItem);
    };
  });

angular.module('gccweb-admin')
  .controller('mainAnnouncementsController', function($scope, MainAnnouncement) {
    $scope.title = 'Main Announcements';
    $scope.route = 'mainAnnouncement';
    $scope.categories = ['title', 'description'];
    $scope.data = MainAnnouncement.query();
    $scope.editForm = 'assets/templates/maForm.html';
    $scope.setItem = function(item) {
        $scope.activeItem = item;
    };
  });

angular.module('gccweb-admin')
  .controller('smallAnnouncementsController', function($scope, SmallAnnouncement) {
    $scope.title = 'Small Announcements';
    $scope.route = 'smallAnnouncement';
    $scope.categories = ['text'];
    $scope.data = SmallAnnouncement.query();
    $scope.editForm = 'assets/templates/saForm.html';
    $scope.setItem = function(item) {
        $scope.activeItem = item;
    };
  });

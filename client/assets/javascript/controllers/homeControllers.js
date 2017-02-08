angular.module('gccweb')
  .controller("mainAnnouncementsController", function($scope, MainAnnouncement) {
    $scope.ma = MainAnnouncement.query();
  })
  .controller("smallAnnouncementsController", function($scope, SmallAnnouncement) {
    $scope.sa = SmallAnnouncement.query();
  });

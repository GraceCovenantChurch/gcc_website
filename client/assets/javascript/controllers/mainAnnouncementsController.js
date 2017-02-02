angular.module('gccweb')
  .controller("mainAnnouncementsController", function($scope, MainAnnouncement) {
    $scope.ma = MainAnnouncement.query();
    $scope.ma.pic = '/assets/iamges' + $scope.ma.pic;
  });

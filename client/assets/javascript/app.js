angular.module('gccweb', ['ngRoute', 'ngResource', 'angular-inview'])
  .controller('documentController', function($scope, Preloader) {
    $scope.elementInView = function(inview, inviewInfo) {
      if (inview) {
        inviewInfo.element.removeClass("fade");
      }
    };

    $scope.isLoading = true;
    $scope.isSuccessful = false;

    $scope.imageLocations = [
      "./assets/images/home/philly.jpg",
    ];

    Preloader.preloadImages($scope.imageLocations).then(
      function handleResolve(imageLocations) {
        $scope.isLoading = false;
        $scope.isSuccessful = true;
      },
      function handleReject(imageLocation) {
        $scope.isLoading = false;
        $scope.isSuccessful = false;

      }
    );
  });

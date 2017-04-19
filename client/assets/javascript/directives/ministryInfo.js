angular.module('gccweb').directive('ministryInfo', function($rootScope) {
  return {
    restrict: 'E',
    templateUrl: 'assets/templates/ministries/info.html',
    scope: {
      list: "=",
      currentIndex: "=",
      row: "="
    },
    link : function (scope, element, attr) {
      $rootScope.$on("tileClick", function(event, data) {
        if (scope.row == data.row) {
          var index = scope.findIndex(scope.row, data.col);
          var ministry = scope.list[index];

          scope.name = ministry.name;
          scope.pic = ministry.pic;
          scope.coordinator = ministry.coordinator;
          scope.contact = ministry.contact;
          scope.privileges = ministry.privileges;
          scope.timeCommitment = ministry.timeCommitment;

          scope.$apply();
          element.show();

          // $('html, body').scrollTop(element.offset().top - 100);

          $('html, body').stop(true).animate({
            scrollTop: element.offset().top - 100
          }, 500);
        }
        else element.hide();
      } );
    },
    controller : function($scope) {
      $scope.findIndex = function(row, col) {
        return row * 4 + col;
      }
    }
  };
})

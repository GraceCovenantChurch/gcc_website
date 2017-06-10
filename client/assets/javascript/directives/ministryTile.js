angular.module('gccweb').directive('ministryTile', function($rootScope) {
  return {
    restrict: 'E',
    templateUrl: 'assets/templates/ministries/tile.html',
    scope: {
      name: "=",
      pic: "=",
      row: "=",
      col: "="
    },
    link: function(scope, element, attrs) {
      element.on("click", function() {
        $rootScope.$emit("tileClick" , {"row" : scope.row, "col" : scope.col})
      });
    }
  };
})

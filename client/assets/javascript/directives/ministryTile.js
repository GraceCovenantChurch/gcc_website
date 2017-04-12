angular.module('gccweb').directive('ministryTile', function() {
  return {
    restrict: 'E',
    templateUrl: 'assets/templates/ministries/tile.html',
    scope: {
      name: "=",
      coordinator: "=",
      contact: "=",
      pic: "=",
      privileges: "=",
      timeCommitment: "="
    }
  };
})

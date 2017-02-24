angular.module('gccweb')
  .factory("Staff", function StaffFactory($resource) {
    return $resource("/staff", {}, {});
  });

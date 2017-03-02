angular.module('gccweb')
  .factory("Staff", function StaffFactory($resource) {
    return $resource("/staff", {}, {});
  })
  .factory("Believe", function BelieveFactory($resource) {
    return $resource("/believe", {}, {});
  });

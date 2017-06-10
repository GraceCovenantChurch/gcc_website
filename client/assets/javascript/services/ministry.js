angular.module('gccweb')
  .factory("Ministry", function MinistryFactory($resource) {
    return $resource("/ministry", {}, {});
  });

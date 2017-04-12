angular.module('gccweb')
  .factory("Ministry", function HomeFactory($resource) {
    return $resource("/ministry", {}, {});
  });

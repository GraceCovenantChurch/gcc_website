angular.module('gccweb')
  .factory("MainAnnouncement", function HomeFactory($resource) {
    return $resource("/mainAnnouncement", {}, {});
  });

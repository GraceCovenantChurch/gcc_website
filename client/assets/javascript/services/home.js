angular.module('gccweb')
  .factory("MainAnnouncement", function HomeFactory($resource) {
    return $resource("/mainAnnouncement", {}, {});
  })
  .factory("SmallAnnouncement", function SAFactory($resource) {
    return $resource("/smallAnnouncement", {}, {});
  });

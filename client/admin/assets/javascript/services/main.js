angular.module('gccweb-admin')
  .factory("MainAnnouncement", function HomeFactory($resource) {
    return $resource("/mainAnnouncement", {}, {});
  })
  .factory("SmallAnnouncement", function SAFactory($resource) {
    return $resource("/smallAnnouncement", {}, {});
  })
  .factory("MemoryVerse", function MVFactory($resource) {
    return $resource("/memoryVerse", {}, {});
  });

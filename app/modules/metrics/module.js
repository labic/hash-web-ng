(function () {
  'use strict';
  angular.module('hash.metrics', [])
  .run(function (settings) {
    settings.setFromFile('metrics.filters', '/data/metrics.config.json');
  });
})();

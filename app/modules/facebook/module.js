(function () {
  'use strict';
  angular.module('hash.facebook', [])
  .run(function (settings) {
    settings.setFromFile('facebook.filters', '/data/facebook.config.json');
  });
})();

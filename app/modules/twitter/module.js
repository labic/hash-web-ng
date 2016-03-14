(function () {
  'use strict';
  angular.module('hash.twitter', [])
  .run(function (settings) {
    settings.setFromFile('twitter.filters', '/data/twitter.config.json');
  });
})();

(function () {
  'use strict';
  angular.module('hash.twitter', [])
  .run(function (settings) {
    settings.setFromFile('twitter', '/data/twitter.settings.json');
  });
})();

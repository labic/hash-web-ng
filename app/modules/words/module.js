(function () {
  'use strict';
  angular.module('hash.words', [])
  .run(function (settings) {
    settings.setFromFile('words.filters', '/data/words.config.json');
  });
})();

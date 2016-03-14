(function () {
  'use strict';
  angular.module('hash.instagram', ['uiGmapgoogle-maps'])
  .run(function (settings) {
    settings.setFromFile('instagram.filters', '/data/instagram.config.json');
  });
})();

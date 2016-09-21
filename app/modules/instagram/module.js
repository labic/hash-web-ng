(function () {
  'use strict';
  angular.module('hash.instagram',[])
  .run(function (settings) {
    settings.setFromFile('instagram.filters', '/data/images.config.json');
  });
})();

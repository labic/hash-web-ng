// READ
// https://docs.angularjs.org/tutorial/step_11
// https://docs.angularjs.org/guide/filter
// https://docs.angularjs.org/api/ng/directive
// https://docs.angularjs.org/guide/directive
// https://docs.angularjs.org/api/ng/directive/ngController
// https://github.com/pablojim/highcharts-ng
(function () {
  'use strict';

  angular
    .module('hash.dash', [
      'checklist-model',
      'ui.router',
      'ui.bootstrap',
      'angular-cache',
      'hash.core',
      'hash.api',
      'hash.twitter-monitor'
    ])
    // .constant('HASH_API_BASE_URI', 'http://localhost:3000/v1')
    .constant('HASH_API_BASE_URI', 'https://hash-api.herokuapp.com:443/v1')
    .run(function ($http, CacheFactory) {
      $http.defaults.cache = CacheFactory('defaultCache', {
        maxAge: 15 * 60 * 1000, // Items added to this cache expire after 15 minutes
        cacheFlushInterval: 60 * 60 * 1000, // This cache will clear itself every hour
        deleteOnExpire: 'aggressive', // Items will be deleted from this cache when they expire
        storageMode: 'localStorage'
      });
    });
})()
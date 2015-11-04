(function () {
  'use strict';
  angular
    .module('hash.twitter-monitor')
    .config(function ($stateProvider) {
      $stateProvider
        .state('app.twitter-monitor', {
          templateUrl: 'modules/twitter-monitor/views/main.html',
          controller: 'TwitterMonitorCtrl'
        })
        .state('app.twitter-monitor.view', {
          url: '^/twitter',
          views: {
            'map-filter': {
              templateUrl: 'modules/twitter-monitor/views/partials/map-filter.html'
            }
          }
        });
    });

})();
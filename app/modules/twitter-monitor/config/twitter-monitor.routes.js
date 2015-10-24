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
            'vertical-menu': {
              templateUrl: 'modules/core/views/partials/vertical-menu.html'
            },
            'map-filter': {
              templateUrl: 'modules/twitter-monitor/views/partials/map-filter.html'
            },
            'time-granularity-filter': {
              templateUrl: 'modules/twitter-monitor/views/partials/time-granularity-filter.html'
            },
            'tweets-count': {
              templateUrl: 'modules/twitter-monitor/views/partials/tweets-count.html'
            },
            'words-filter': {
              templateUrl: 'modules/twitter-monitor/views/partials/words-filter.html'
            },
            'hashtags-filter': {
              templateUrl: 'modules/twitter-monitor/views/partials/hashtags-filter.html'
            },
            'tweets-list': {
              templateUrl: 'modules/twitter-monitor/views/partials/tweets-list.html'
            },
            'images-list': {
              templateUrl: 'modules/twitter-monitor/views/partials/images-list.html'
            }
          }
        });
    });

})();
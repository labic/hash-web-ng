(function () {
  'use strict';
  angular
    .module('hash.metrics')
    .config(function ($stateProvider) {
      $stateProvider
        .state('mg-body', {
          url: '/estatisticas',
          views: {
            '': { templateUrl: 'modules/metrics/views/main.html' }
          }
        });
    });

})();

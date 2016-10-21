(function () {
  'use strict';
  angular
    .module('hash.metrics')
    .config(function ($stateProvider) {
      $stateProvider
        .state('relatorio', {
          url: '/estatisticas',
          views: {
            '': { templateUrl: 'modules/metrics/views/main.html' }
          }
        });
    });

})();

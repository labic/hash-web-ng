(function () {
  'use strict';
  angular
    .module('hash.words')
    .config(function ($stateProvider) {
      $stateProvider
        .state('relatorio', {
          url: '/relatorio',
          views: {
            '': { templateUrl: 'modules/statistics/views/main.html' }
          }
        });
    });

})();

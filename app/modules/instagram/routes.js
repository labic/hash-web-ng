(function () {
  'use strict';
  angular
    .module('hash.instagram')
    .config(function ($stateProvider) {
      $stateProvider
        .state('instagram', {
          url: '/imagens',
          views: {
            '': { templateUrl: 'modules/instagram/views/main.html' }
          }
        });
    });

})();

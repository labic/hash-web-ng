(function () {
  'use strict';
  angular
    .module('hash.instagram')
    .config(function ($stateProvider) {
      $stateProvider
        .state('instagram', {
          url: '/images',
          views: {
            '': { templateUrl: 'modules/instagram/views/main.html' }
          }
        });
    });

})();

(function () {
  'use strict';
  angular
    .module('hash.instagram')
    .config(function ($stateProvider) {
      $stateProvider
        .state('instagram', {
          url: '/instagram',
          views: {
            '': { templateUrl: 'app/modules/instagram/views/main.html' }
          }
        });
    });

})();

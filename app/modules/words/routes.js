(function () {
  'use strict';
  angular
    .module('hash.words')
    .config(function ($stateProvider) {
    $stateProvider
      .state('palavra', {
      url: '/palavras',
      views: {
        '': { templateUrl: 'modules/words/views/main.html' },
      }
    });
  });
})();
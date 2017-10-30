(function () {
  'use strict';
  angular
    .module('hash.core')
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/twitter');
    });
})();

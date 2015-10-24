(function () {
  'use strict';
  angular
    .module('hash.twitter-monitor')
    .run(function ($rootScope) {
      $rootScope.addModuleMenu('Twitter', 'app.twitter-monitor.view', 'fa-edit');
    });

})();
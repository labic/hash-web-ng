(function () {
  'use strict';
  /**
   * @ngdoc function
   * @name com.module.core.controller:RouteCtrl
   * @description Redirect for acess
   * @requires $q
   * @requires $scope
   * @requires $state
   * @requires $location
   * @requires AppAuth
   **/
  angular
    .module('hash.core')
    //.controller('RouteCtrl', function (ApiService, AppAuth, $location) {
    .controller('RouteCtrl', function ($location) {

      $location.path('/app');

      // ApiService.checkConnection()
      //   .then(function () {
      //     console.log('ApiService.checkConnection success');
      //     if (!AppAuth.currentUser) {
      //       $location.path('/login');
      //     } else {
      //       $location.path('/app');
      //     }
      //   })
      //   .catch(function (err) {
      //     console.log('ApiService.checkConnection err: ' + err);
      //     $location.path('/error');
      //   });

    });

})();

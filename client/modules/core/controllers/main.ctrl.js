(function () {
  'use strict';
  /**
   * @ngdoc function
   * @name com.module.core.controller:MainCtrl
   * @description Login Controller
   * @requires $scope
   * @requires $state

   * @requires CoreService
   * @requires User
   * @requires gettextCatalog
   **/
  angular
    .module('hash.core')
    // .controller('MainCtrl', function ($scope, $rootScope, $state, AppAuth, CoreService, User, gettextCatalog) {
    .controller('MainCtrl', function ($scope, $rootScope, $state) {
      $scope.modulesMenu = $rootScope.modulesMenu;
      
      // AppAuth.ensureHasCurrentUser(function () {
      //   //This call also serves to redirect a user to the login screen, via the interceptor in users.auth.js, if they are not authenticated.
      //   $scope.currentUser = User.getCurrent();
      // });


      // $scope.logout = function () {
      //   AppAuth.logout(function () {
      //     CoreService.toastSuccess(gettextCatalog.getString('Logged out'),
      //       gettextCatalog.getString('You are logged out!'));
      //     $state.go('login');
      //   });
      // };

    });

})();

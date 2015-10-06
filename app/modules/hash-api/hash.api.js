(function () {
  'use strict';
  angular.module('hash.api', ['ngResource'])
  .constant('BASE_URI', 'https://hash-api.herokuapp.com:443/v1');
})();
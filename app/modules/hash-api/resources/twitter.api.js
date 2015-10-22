(function () {
  'use strict';

  angular
    .module('hash.api')
    .factory('Tweet', function($resource, HASH_API_BASE_URI) {
      
      return $resource('', null, {
          get: {
            method: 'GET', 
            url:  HASH_API_BASE_URI + '/tweets/:userId', 
            params: { id_str: null },
            cache: true
          }
        }
      );
    });
})();
(function () {
  'use strict';

  angular
    .module('hash.api')
    .factory('Twitter', function($resource, HASH_API_BASE_URI) {
      
      var Twitter = $resource(
        HASH_API_BASE_URI + '/tweets/count',
        {
          where: null,
        },{
          count: {
            method: 'GET',
            cache: false
          }
        }
      );
      
      Twitter.analytics = $resource(
        HASH_API_BASE_URI + '/tweets/analytics',
        {
          type: null,
          filter: null,
        },{
          get: {
            method: 'GET',
            cache: true,
            isArray: true
          }
        }
      );

      return Twitter;
    });

})();
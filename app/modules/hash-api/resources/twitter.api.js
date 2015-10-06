(function () {
  'use strict';

  angular
    .module('hash.api')
    .factory('Twitter', function($resource, BASE_URI) {
      var Twitter = {};
      
      Twitter.analytics = $resource(
        BASE_URI + '/tweets/analytics',
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
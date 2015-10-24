(function () {
  'use strict';

  angular
    .module('hash.api')
    .factory('MetricsFacebook', function($resource, HASH_API_BASE_URI) {

      var metricsParams = {
        period: null, 
        'profile_type': null, 
        'post_type[]': [], 
        retrive_blocked: null, 
        page: null, 
        per_page: null 
      };
      
      return $resource('', null, {
        count: {
          method: 'GET', 
          url:  HASH_API_BASE_URI + '/metrics/facebook/count', 
          params: metricsParams,
          cache: true
        },
      });

    });

})();
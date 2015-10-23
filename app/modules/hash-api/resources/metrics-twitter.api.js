(function () {
  'use strict';

  angular
    .module('hash.api')
    .factory('MetricsTwitter', function($resource, HASH_API_BASE_URI) {

      var metricsParams = {
        period: null, 
        'tags[]': [], 
        'hashtags[]': [], 
        retrive_blocked: null, 
        page: null, 
        per_page: null 
      };
      
      return $resource('', null, {
        count: {
          method: 'GET', 
          url:  HASH_API_BASE_URI + '/metrics/twitter/count', 
          params: metricsParams,
          cache: true
        },
      });

    });

})();
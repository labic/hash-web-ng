(function () {
  'use strict';

  angular
    .module('hash.api')
    .factory('MetricsFacebook', function($resource, HASH_API_BASE_URI) {

      var metricsParams = {
        'profile_type': null, // String
        'node': null, // String
        'period': null, // String
        'granularity': null, // String 
        'filter[with_tags]': [], // Array of String
        'filter[contain_tags]': [], // Array of String
        'filter[hashtags]': [], // Array of String 
        'filter[mentions]': [], // Array of String
        'filter[profiles]': [], // Array of String
        'filter[types]': [], // Array of String
        'last': null, // Number
        'page': null, // Number 
        'per_page': null // Number
      };
      
      return $resource('', null, {
        interationsRate: {
          method: 'GET', 
          url:  HASH_API_BASE_URI + '/metrics/facebook/interations_rate', 
          params: metricsParams,
          isArray: true,
          cache: true
        },
        profilesRate: {
          method: 'GET', 
          url:  HASH_API_BASE_URI + '/metrics/facebook/profiles_rate', 
          params: metricsParams,
          isArray: true,
          cache: true
        },
        tagsCount: {
          method: 'GET', 
          url:  HASH_API_BASE_URI + '/metrics/facebook/tags_count', 
          params: metricsParams,
          isArray: true,
          cache: true
        }
      });

    });

})();
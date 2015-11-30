(function () {
  'use strict';

  angular
    .module('hash.api')
    .factory('MetricsTwitter', function($resource, HASH_API_BASE_URI) {

      var metricsParams = {
        'period': null, // String
        'granularity': null, // String 
        'filter[with_tags]': [], // Array of String
        'filter[contain_tags]': [], // Array of String
        'filter[hashtags]': [], // Array of String
        'filter[mentions]': [], // Array of String
        'filter[users]': [], // Array of String 
        'filter[has]': [], // Array of String
        'filter[retweeted]': null, // Bollean
        'filter[blocked]': null, // Bollean
        'last': null, // Number
        'page': null, // Number 
        'per_page': null // Number
      };
      
      return $resource('', null, {
        interationsRate: {
          method: 'GET', 
          url:  HASH_API_BASE_URI + '/metrics/twitter/interations_rate', 
          params: metricsParams,
          isArray: true,
          cache: true
        },
        tagsCount: {
          method: 'GET', 
          url:  HASH_API_BASE_URI + '/metrics/twitter/tags_count', 
          params: metricsParams,
          isArray: true,
          cache: true
        },
        usersRate: {
          method: 'GET', 
          url:  HASH_API_BASE_URI + '/metrics/twitter/users_rate', 
          params: metricsParams,
          isArray: true,
          cache: true
        }
      });

    });

})();
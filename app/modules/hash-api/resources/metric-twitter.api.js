(function () {
  'use strict';

  angular
    .module('hash.api')
    .factory('MetricTwitter', function($resource, HASH_API_BASE_URI) {

      var metricsParamsWithoutPagination = {
        since: null,
        until: null,
        tags: [],
        hashtags: []
      };

      var metricsParamsWithPagination = metricsParamsWithoutPagination;
      metricsParamsWithPagination.page = 1;
      metricsParamsWithPagination.per_page = 25;
      
      return $resource('', null, {
        count: {
          method: 'GET', 
          url:  HASH_API_BASE_URI + '/metrics/twitter/count', 
          params: metricsParamsWithoutPagination,
          cache: true
        },
        countImage: {
          method: 'GET', 
          url:  HASH_API_BASE_URI + '/metrics/twitter/count_images', 
          params: metricsParamsWithoutPagination,
          cache: true
        },
        countRetweets: {
          method: 'GET', 
          url:  HASH_API_BASE_URI + '/metrics/twitter/count_retweets', 
          params: metricsParamsWithPagination,
          isArray: true,
          cache: true
        },
        countTags: {
          method: 'GET', 
          url:  HASH_API_BASE_URI + '/metrics/twitter/count_tags', 
          params: metricsParamsWithPagination,
          isArray: true,
          cache: true
        },
        topRetweets: {
          method: 'GET', 
          url:  HASH_API_BASE_URI + '/metrics/twitter/top_retweets', 
          params: metricsParamsWithPagination,
          isArray: true,
          cache: true
        },
        topHashtags: {
          method: 'GET', 
          url:  HASH_API_BASE_URI + '/metrics/twitter/top_hashtags', 
          params: metricsParamsWithPagination,
          isArray: true,
          cache: true
        },
        topMentions: {
          method: 'GET', 
          url:  HASH_API_BASE_URI + '/metrics/twitter/top_mentions', 
          params: metricsParamsWithPagination,
          isArray: true,
          cache: true
        },
        topURLs: {
          method: 'GET', 
          url:  HASH_API_BASE_URI + '/metrics/twitter/top_urls', 
          params: metricsParamsWithPagination,
          isArray: true,
          cache: true
        },
        topImages: {
          method: 'GET', 
          url:  HASH_API_BASE_URI + '/metrics/twitter/top_images', 
          params: metricsParamsWithPagination,
          isArray: true,
          cache: true
        },
        usersMostActive: {
          method: 'GET', 
          url:  HASH_API_BASE_URI + '/metrics/twitter/users_most_active', 
          params: metricsParamsWithPagination,
          isArray: true,
          cache: true
        },
        geolocation: {
          method: 'GET', 
          url:  HASH_API_BASE_URI + '/metrics/twitter/geolocation', 
          params: metricsParamsWithPagination,
          isArray: true,
          cache: true
        }
      });

    });

})();
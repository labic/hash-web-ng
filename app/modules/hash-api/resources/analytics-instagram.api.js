(function () {
  'use strict';

  angular
    .module('hash.api')
    .factory('AnalyticsTwitter', function($resource, HASH_API_BASE_URI) {

      var PARAMS = {
        'period': null, 
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
        geolocation: {
          method: 'GET', 
          url:  HASH_API_BASE_URI + '/analytics/instagram/geolocation', 
          params: PARAMS,
          cache: true
        },
        mostActiveUsers: {
          method: 'GET', 
          url:  HASH_API_BASE_URI + '/analytics/instagram/most_active_users', 
          params: PARAMS,
          isArray: true,
          cache: true
        },
        mostCommentedMedias: {
          method: 'GET', 
          url:  HASH_API_BASE_URI + '/analytics/instagram/most_commented_medias', 
          params: PARAMS,
          isArray: true,
          cache: true
        },
        mostLikedMedias: {
          method: 'GET', 
          url:  HASH_API_BASE_URI + '/analytics/instagram/most_liked_medias', 
          params: PARAMS,
          isArray: true,
          cache: true
        },
        mostRetweetedTweets: {
          method: 'GET', 
          url:  HASH_API_BASE_URI + '/analytics/twitter/most_popular_users', 
          params: PARAMS,
          isArray: true,
          cache: true
        }
      });
    });
})();
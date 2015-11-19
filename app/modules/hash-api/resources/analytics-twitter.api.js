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
          url:  HASH_API_BASE_URI + '/analytics/twitter/geolocation', 
          params: PARAMS,
          isArray: true,
          cache: true
        },
        mostActiveUsers: {
          method: 'GET', 
          url:  HASH_API_BASE_URI + '/analytics/twitter/most_active_users', 
          params: PARAMS,
          isArray: true,
          cache: true
        },
        mostMentionedUsers: {
          method: 'GET', 
          url:  HASH_API_BASE_URI + '/analytics/twitter/most_mentioned_users', 
          params: PARAMS,
          isArray: true,
          cache: true
        },
        mostRecurringHashtags: {
          method: 'GET', 
          url:  HASH_API_BASE_URI + '/analytics/twitter/most_recurring_hashtags', 
          params: PARAMS,
          isArray: true,
          cache: true
        },
        mostRecentlyRetweetedTweets: {
          method: 'GET', 
          url:  HASH_API_BASE_URI + '/analytics/twitter/most_recently_retweeted_tweets', 
          params: PARAMS,
          isArray: true,
          cache: true
        },
        mostRetweetedTweets: {
          method: 'GET', 
          url:  HASH_API_BASE_URI + '/analytics/twitter/most_retweeted_tweets', 
          params: PARAMS,
          isArray: true,
          cache: true
        },
        mostRecurringImages: {
          method: 'GET', 
          url:  HASH_API_BASE_URI + '/analytics/twitter/most_recurring_images', 
          params: PARAMS,
          isArray: true,
          cache: true
        },
        mostRecurringUrls: {
          method: 'GET', 
          url:  HASH_API_BASE_URI + '/analytics/twitter/most_recurring_urls', 
          params: PARAMS,
          isArray: true,
          cache: true
        }
      });
    });
})();
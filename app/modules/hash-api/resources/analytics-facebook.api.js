(function () {
  'use strict';

  angular
    .module('hash.api')
    .factory('AnalyticsFacebook', function($resource, CONFIG) {

      var PARAMS = {
        'profile_type': null, // Required: String
        'period': null, // String
        'filter[contain_tags]': [], // Array of String
        'filter[hashtags]': [], // Array of String
        'filter[mentions]': [], // Array of String
        'filter[profiles]': [], // Array of String 
        'filter[post_type]': [], // Array of String
        'filter[blocked]': null, // Bollean
        'last': null, // Number
        'page': null, // Number 
        'per_page': null // Number
      };
      
      return $resource('', null, {
        mostActiveProfiles: {
          method: 'GET', 
          url:  CONFIG.HASH_API_URL + '/analytics/facebook/most_active_profiles', 
          params: PARAMS,
          isArray: true,
          cache: true
        },
        mostCommentedPosts: {
          method: 'GET', 
          url:  CONFIG.HASH_API_URL + '/analytics/facebook/most_commented_posts', 
          params: PARAMS,
          isArray: true,
          cache: true
        },
        mostLikedComments: {
          method: 'GET', 
          url:  CONFIG.HASH_API_URL + '/analytics/facebook/most_liked_comments', 
          params: PARAMS,
          isArray: true,
          cache: true
        },
        mostLikedPosts: {
          method: 'GET', 
          url:  CONFIG.HASH_API_URL + '/analytics/facebook/most_liked_posts', 
          params: PARAMS,
          isArray: true,
          cache: true
        },
        mostRecurringImages: {
          method: 'GET', 
          url:  CONFIG.HASH_API_URL_V2 + '/analytics/facebook/most_recurring_images', 
          params: PARAMS,
          isArray: true,
          cache: true
        },
        mostRecurringHashtags: {
          method: 'GET', 
          url:  CONFIG.HASH_API_URL_V2 + '/analytics/facebook/most_recurring_hashtags', 
          params: PARAMS,
          isArray: true,
          cache: true
        },
        mostSharedPosts: {
          method: 'GET', 
          url:  CONFIG.HASH_API_URL + '/analytics/facebook/most_shared_posts', 
          params: PARAMS,
          isArray: true,
          cache: true
        },
        mostRecurringUrls: {
          method: 'GET', 
          url:  CONFIG.HASH_API_URL + '/analytics/facebook/most_recurring_urls', 
          params: PARAMS,
          isArray: true,
          cache: true
        }
      });

    });

})();
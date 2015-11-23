(function () {
  'use strict';

  angular
    .module('hash.api')
    .factory('AnalyticsFacebook', function($resource, HASH_API_BASE_URI) {

      var PARAMS = {
        'profile_type': null, // String
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
        mostCommentedPosts: {
          method: 'GET', 
          url:  HASH_API_BASE_URI + '/analytics/facebook/most_active_profiles', 
          params: PARAMS,
          isArray: true,
          cache: true
        },
        mostCommentedPosts: {
          method: 'GET', 
          url:  HASH_API_BASE_URI + '/analytics/facebook/most_commented_posts', 
          params: PARAMS,
          isArray: true,
          cache: true
        },
        mostLikedComments: {
          method: 'GET', 
          url:  HASH_API_BASE_URI + '/analytics/facebook/most_liked_comments', 
          params: PARAMS,
          isArray: true,
          cache: true
        },
        mostLikedPosts: {
          method: 'GET', 
          url:  HASH_API_BASE_URI + '/analytics/facebook/most_liked_posts', 
          params: PARAMS,
          isArray: true,
          cache: true
        },
        mostRecurringImages: {
          method: 'GET', 
          url:  HASH_API_BASE_URI + '/analytics/facebook/most_recurring_images', 
          params: PARAMS,
          isArray: true,
          cache: true
        },
        mostActiveProfiles: {
          method: 'GET', 
          url:  HASH_API_BASE_URI + '/analytics/facebook/most_shared_posts', 
          params: PARAMS,
          isArray: true,
          cache: true
        }
      });

    });

})();
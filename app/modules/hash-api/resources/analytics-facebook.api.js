(function () {
  'use strict';

  angular
    .module('hash.api')
    .factory('AnalyticsFacebook', function($resource, HASH_API_BASE_URI) {

      var PARAMS = {
        period: null, 
        profile_type: null, 
        'post_type[]': [], 
        page: null, 
        per_page: null 
      };
      
      return $resource('', null, {
        mostLikedPosts: {
          method: 'GET', 
          url:  HASH_API_BASE_URI + '/analytics/facebook/most_liked_posts', 
          params: PARAMS,
          isArray: true,
          cache: true
        },
        mostSharedPosts: {
          method: 'GET', 
          url:  HASH_API_BASE_URI + '/analytics/facebook/most_shared_posts', 
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
        mostActiveProfiles: {
          method: 'GET', 
          url:  HASH_API_BASE_URI + '/analytics/facebook/most_active_profiles', 
          params: PARAMS,
          isArray: true,
          cache: true
        }
      });

    });

})();
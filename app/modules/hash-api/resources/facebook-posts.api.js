(function () {
  'use strict';

  angular
    .module('hash.api')
    .factory('FacebookPosts', function($resource, CONFIG) {

      return $resource('', null, {
        init: {
          method: 'GET',
          url: CONFIG.HASH_API_URL_V2 + '/facebook/page/posts',
          params: {
            'profile_type': null, // String
            'period': null, // String
            'period[since]': null, // Date ISO String
            'period[until]': null, // Date ISO String
            'filter[with_tags]': [], // Array of String
            'filter[contain_tags]': [], // Array of String
            'filter[hashtags]': [], // Array of String
            'filter[profiles]': [], // Array of String 
            'filter[mentions]': [], // Array of String
            'filter[types]': [], // Array of String
            'last': null // Number
          },
          isArray: true,
          cache: true
        },
        find: {
          method: 'GET',
          url: CONFIG.HASH_API_BASE_URI + '/facebook/:profile_type/posts',
          params: {
            'profile_type': null, // enum: page or user 
            'filter[order]': null, // string: created_time <ASC|DESC>, shares_count <ASC|DESC>
          },
          isArray: true,
          cache: true
        },
        count: {
          method: 'GET', 
          url:  CONFIG.HASH_API_URL_V2 + '/facebook/posts/count', 
          params: { 
            'profile_type': null, // String
            'period': null, // String
            'period[since]': null, // Date ISO String
            'period[until]': null, // Date ISO String
            'filter[with_tags]': [], // Array of String
            'filter[contain_tags]': [], // Array of String
            'filter[hashtags]': [], // Array of String
            'filter[profiles]': [], // Array of String 
            'filter[mentions]': [], // Array of String
            'filter[types]': [], // Array of String
            'last': null // Number
          },
          cache: true
        }
      });

    });

})();
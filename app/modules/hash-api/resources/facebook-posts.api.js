(function () {
  'use strict';

  angular
    .module('hash.api')
    .factory('FacebookPosts', function($resource, CONFIG) {

      return $resource('', null, {
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
(function () {
  'use strict';

  angular
    .module('hash.api')
    .factory('Tweet', function($resource, HASH_API_BASE_URI) {
      
      return $resource('', null, {
          get: {
            method: 'GET', 
            url:  HASH_API_BASE_URI + '/tweets/:id', 
            params: { id: null },
            cache: true
          },
          find: {
            method: 'GET', 
            url:  HASH_API_BASE_URI + '/tweets', 
            params: { 
              'period': null, 
              'filter[with_tags]': [], // Array of String
              'filter[contain_tags]': [], // Array of String
              'filter[hashtags]': [], // Array of String
              'filter[mentions]': [], // Array of String
              'filter[users]': [], // Array of String 
              'filter[has]': [], // Array of String
              'filter[retweeted]': null, // Bollean
              'filter[blocked]': null, // Bollean
              'last': null // Number
            },
            isArray: true,
            cache: true
          },
          count: {
            method: 'GET', 
            url:  HASH_API_BASE_URI + '/tweets/count', 
            params: { 
              'period': null, 
              'filter[with_tags]': [], // Array of String
              'filter[contain_tags]': [], // Array of String
              'filter[hashtags]': [], // Array of String
              'filter[mentions]': [], // Array of String
              'filter[users]': [], // Array of String 
              'filter[has]': [], // Array of String
              'filter[retweeted]': null, // Bollean
              'filter[blocked]': null, // Bollean
              'last': null // Number
            },
            cache: true
          }
        }
      );
    });
})();
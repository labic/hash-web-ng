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
              period: null,
              'filter[with_tags]': null,
              'filter[contain_tags]': null,
              'filter[hashtags]': null,
              'filter[users]': null,
              'filter[mentions]': null,
              'filter[has]': null,
              'filter[retweeted]': null,
              'filter[blocked]': null
            },
            isArray: true,
            cache: true
          },
          count: {
            method: 'GET', 
            url:  HASH_API_BASE_URI + '/tweets/count', 
            params: { 
              period: null,
              'filter[with_tags]': null,
              'filter[contain_tags]': null,
              'filter[hashtags]': null,
              'filter[users]': null,
              'filter[mentions]': null,
              'filter[has]': null,
              'filter[retweeted]': null,
              'filter[blocked]': null
            },
            cache: true
          }
        }
      );
    });
})();
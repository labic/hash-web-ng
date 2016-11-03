(function () {
  'use strict';

  angular
    .module('hash.api')
    .factory('FlickPhotos', function($resource, CONFIG) {

      var PARAMS = {
        'period': null, 
        'filter[with_tags]': [], // Array of String
        'filter[contain_tags]': [], // Array of String
        'filter[has]': [], // Array of String
        'filter[retweeted]': null, // Bollean
        'page': null, // Number 
        'per_page': null // Number
      };
      
      return $resource('', null, {
        get: {
          method: 'GET', 
          url:  CONFIG.HASH_API_URL_V2 + '/flickr/photos', 
          params: PARAMS,
          isArray: true,
          cache: true
        },
        count: {
          method: 'GET', 
          url:  CONFIG.HASH_API_URL_V2 + '/flickr/photos/count', 
          params: PARAMS,
          cache: true
        }
      });
    });
})();
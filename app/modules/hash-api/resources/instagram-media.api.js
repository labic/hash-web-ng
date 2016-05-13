(function () {
  'use strict';

  angular
    .module('hash.api')
    .factory('InstagramMedia', function($resource, CONFIG) {

      return $resource('', null, {
        count: {
          method: 'GET',
          url:  CONFIG.HASH_API_URL + '/instagram/medias/count',
          params: {
            'period': null, // String
            'period[since]': null, // Date ISO String
            'period[until]': null, // Date ISO String
            'filter[with_tags]': [], // Array of String
            'filter[contain_tags]': [], // Array of String
            'filter[hashtags]': [], // Array of String
            'filter[users]': [], // Array of String
            'filter[mentions]': [], // Array of String
            'filter[types]': [], // Array of String
            'last': null, // Number
          },
          cache: true
        },
        find: {
          method: 'GET',
          url:  CONFIG.INSTAGRAM_API_URL + '/instagram/media',
          params: {
            'period': 'recent',
            'tags[]': [],
            'geo': null,
            'page': 1,
            'per_page': 25,
          },
          isArray: true,
          cache: true
        }
      });

    });

})();

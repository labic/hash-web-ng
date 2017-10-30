(function () {
  'use strict';

  angular
    .module('word.api')
    .factory('WordTwitter', function($resource, CONFIG) {

      return $resource('', null, {
        wordConcurrence: {
          method: 'GET',
          url: CONFIG.WORD_API_URL + '/twitter/word_concur',
          params: {
            period: null,     // string
            max_depth: null,  // number
            max_words: null,  // number
            max_height: null, // number
            duplicity: null,  // boolean
            retweeted: null,  // boolean
            tags: [],         // array of string
            page: null,       // number
            per_page: null    // number
          },
          isArray: true,
          cache: true
        },
        mostRecurrentWords: {
          method: 'GET',
          url: CONFIG.WORD_API_URL + '/twitter/top_words',
          params: {
            'tags[]': [],
            period: '1h',
            page: 1,
            per_page: 25
          },
          isArray: true,
          cache: true
        },
        status: {
          method: 'GET',
          url: CONFIG.WORD_API_URL + '/twitter/word_posts',
          params: {
            period: null,  // string
            'tags[]': [],      // array of string
            word: null,    // string
            page: null,    // number
            per_page: null // number
          },
          isArray: true,
          cache: true
        },
        images: {
          method: 'GET',
          url: CONFIG.WORD_API_URL + '/twitter/word_images',
          params: {
            period: null,  // string
            'tags[]': [],      // array of string
            word: null,    // string
            page: null,    // number
            per_page: null // number
          },
          isArray: true,
          cache: true
        },
        geolocation: {
          method: 'GET',
          url: CONFIG.WORD_API_URL + '/twitter/map_volume',
          params: {
            period: null, // string
            'tags[]': [],     // array of string
            word: null   // string
          },
          isArray: true,
          cache: true
        },
        // TODO: Refactor
        mandala: {
          method: 'GET',
          url: CONFIG.MANDALA_API_URL + '/twitter/mandala',
          params: {
            max_words: 10,
            rt: false,
            period: '30m',
            max_depth: 3,
            'tags[]': [],
            max_height: 5,
            duplicity: false,
            repeated_text: false
          },
          isArray: false,
          cache: true
        }
      });

    });

})();

(function () {
  'use strict';

  angular
    .module('word.api')
    .factory('WordTwitter', function($resource, WORD_API_BASE_URI) {
      
      return $resource('', null, {
        wordConcurrence: {
          method: 'GET', 
          url: WORD_API_BASE_URI + '/twitter/word_concur', 
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
          url: WORD_API_BASE_URI + '/twitter/top_words', 
          params: {
            filter: null
            // period: null,  // string
            // tags: [],      // array of string
            // page: null,    // number
            // per_page: null // number
          },
          isArray: true,
          cache: true
        },
        status: {
          method: 'GET', 
          url: WORD_API_BASE_URI + '/twitter/word_posts', 
          params: {
            filter: null
            // period: null,  // string
            // tags: [],      // array of string
            // word: null,    // string
            // page: null,    // number
            // per_page: null // number
          },
          isArray: true,
          cache: true
        },
        images: {
          method: 'GET', 
          url: WORD_API_BASE_URI + '/twitter/word_images', 
          params: {
            filter: null
            // period: null,  // string
            // tags: [],      // array of string
            // word: null,    // string
            // page: null,    // number
            // per_page: null // number
          },
          isArray: true,
          cache: true
        },
        geolocation: {
          method: 'GET', 
          url: WORD_API_BASE_URI + '/twitter/map_volume', 
          params: {
            period: null, // string
            tags: [],     // array of string
            word: null   // string
          },
          cache: true
        }
      });

    });

})();
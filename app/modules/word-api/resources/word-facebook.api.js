(function () {
  'use strict';

  angular
    .module('word.api')
    .factory('WordFacebook', function($resource, WORD_API_BASE_URI) {
      
      return $resource('', null, {
        wordTree: {
          method: 'GET', 
          url: WORD_API_BASE_URI + '/facebook/word_concur', 
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
        topWords: {
          method: 'GET', 
          url: WORD_API_BASE_URI + '/facebook/top_words', 
          params: {
            period: null,  // string
            tags: [],      // array of string
            page: null,    // number
            per_page: null // number
          },
          isArray: true,
          cache: true
        },
        status: {
          method: 'GET', 
          url: WORD_API_BASE_URI + '/facebook/word_posts', 
          params: {
            period: null,  // string
            tags: [],      // array of string
            word: null,    // string
            page: null,    // number
            per_page: null // number
          },
          isArray: true,
          cache: true
        },
        images: {
          method: 'GET', 
          url: WORD_API_BASE_URI + '/facebook/word_images', 
          params: {
            period: null,  // string
            tags: [],      // array of string
            word: null,    // string
            page: null,    // number
            per_page: null // number
          },
          isArray: true,
          cache: true
        },
        geolocation: {
          method: 'GET', 
          url: WORD_API_BASE_URI + '/facebook/map_volume', 
          params: {
            period: null, // string
            tags: [],     // array of string
            word: null   // string
          },
          isArray: true,
          cache: true
        }
      });

    });

})();
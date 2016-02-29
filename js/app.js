var hashTwitter = angular.module('hashTwitter', [
  'ui.router',
  'ngResource',
  'hash.api',
  'word.api',
  'hash.core',
  'hash.twitter.dashboard',
  'hash.instagram',
  'hash.facebook',
  'hash.words',
  'hash.statistics',
  'infinite-scroll'
]);

hashTwitter
  .constant('HASH_API_BASE_URI', 'https://sdh-hash-api-dev.herokuapp.com/v2')
  // .constant('HASH_API_BASE_URI', 'https://sdh-hash-api.herokuapp.com/v2')
  .constant('WORD_API_BASE_URI', 'http://word-api.ddns.net:8081');

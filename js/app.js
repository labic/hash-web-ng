var hashTwitter = angular.module('hashTwitter', [
  'ui.router',
  'ngResource',
  'hash.core',
  'hash.twitter.dashboard',
  'hash.words',
  'hash.instagram',
  'hash.facebook',
  'hash.api',
  'word.api',
  'infinite-scroll'
]);

hashTwitter
  .constant('HASH_API_BASE_URI', 'https://sdh-hash-api-dev.herokuapp.com/v2')
  // .constant('HASH_API_BASE_URI', 'https://sdh-hash-api.herokuapp.com/v2')
  .constant('WORD_API_BASE_URI', 'http://word-api.ddns.net:8081')
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('relatorio', {
        url: '/relatorio',
        views: {
          '': { templateUrl: 'app/relatorio.html' }
        }
      });
  });

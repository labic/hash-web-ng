var hashTwitter = angular.module('hashTwitter', [
  'ui.router',
  'ngResource',
  'hash.core',
  'hash.twitter.dashboard',
  'hash.words',
  'hash.api',
  'word.api',
  'infinite-scroll'
]);

hashTwitter
  .constant('HASH_API_BASE_URI', 'https://sdh-hash-api-dev.herokuapp.com/v2')
//  .constant('HASH_API_BASE_URI', 'https://sdh-hash-api.herokuapp.com/v2')
  .constant('WORD_API_BASE_URI', 'http://word-api.ddns.net:8081')
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('instagram', {
        url: '/instagram',
        views: {
          '': { templateUrl: 'app/instagram.html' }
        }
      })
      .state('facebook', {
        url: '/facebook',
        views: {
          '': { templateUrl: 'app/facebook.html' },
          'facebook.word@facebook': { templateUrl: 'app/facebook/wordFacebook.html' },
          'facebook.conteudo@facebook': { templateUrl: 'app/facebook/postsFacebook.html' },
        }
      })
      .state('facebook.word', {
        url: '',
        views: {
          'facebook.word': { templateUrl: 'app/facebook/wordFacebook.html' },
        }
      })
      .state('facebook.posts', {
        url: '',
        views: {
          'facebook.conteudo': { templateUrl: 'app/facebook/postsFacebook.html' },
        }
      })
      .state('facebook.postsImage', {
        url: '',
        views: {
          'facebook.conteudo': { templateUrl: 'app/facebook/imgFacebook.html' },
          controller: function($scope) {
            var tamDiv = $('.geralTweets_result').css( 'width' );
            tamDiv = parseInt(tamDiv);
            $scope.alturaImg = tamDiv / 3;
          }
        }
      })
      .state('facebook.postsMosaico', {
        url: '',
        views: {
          'facebook.conteudo': { templateUrl: 'app/facebook/imgMosaicoFacebook.html' },
          controller: function($scope) {
            var tamDiv = $('.geralTweets_result').css( 'width' );
            tamDiv = parseInt(tamDiv);
            $scope.alturaImg = tamDiv / 15;
          }
        }
      })
      .state('relatorio', {
        url: '/relatorio',
        views: {
          '': { templateUrl: 'app/relatorio.html' }
        }
      });
});

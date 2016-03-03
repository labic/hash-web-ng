(function () {
  'use strict';
  angular
    // TODO: Change module name
    .module('hash.twitter.dashboard')
    .config(function ($stateProvider) {
      $stateProvider
        .state('painel', {
          url: '/painel',
          views: {
            '': { templateUrl: 'modules/twitter-dashboard/views/main.html' },
            'map@painel': { templateUrl: 'modules/twitter-dashboard/views/map.html' },
            'word&Tag@painel': { templateUrl: 'modules/twitter-dashboard/views/wordTweet.html' },
            'conteudo@painel': { templateUrl: 'modules/twitter-dashboard/views/twTweet.html' }
          }
        })
        .state('painel.word', {
          url: '',
          views: {
            'word&Tag': { templateUrl: 'modules/twitter-dashboard/views/wordTweet.html' },
          }
        })
        .state('painel.tag', {
          url: '',
          views: {
            'word&Tag': { templateUrl: 'modules/twitter-dashboard/views/tagTweet.html' },
          }
        })
        .state('painel.img', {
          url: '',
          views: {
            'conteudo': {
              templateUrl: 'modules/twitter-dashboard/views/imgTweet.html', controller: function($scope) {
                var tamDiv = $('.geralTweets_result').css( 'width' );
                tamDiv = parseInt(tamDiv);
                $scope.alturaImg = tamDiv / 3;
              }
            }
          }
        })
        .state('painel.tweet', {
          url: '',
          views: {
            'conteudo': { templateUrl: 'modules/twitter-dashboard/views/twTweet.html' },
          }
        })
        .state('painel.mosaico', {
          url: '',
          views: {
            'conteudo': {
              templateUrl: 'modules/twitter-dashboard/views/imgMosaicoTweet.html', controller: function($scope) {
                var tamDiv = $('.geralTweets_result').css( 'width' );
                tamDiv = parseInt(tamDiv);
                $scope.alturaImg = tamDiv / 15;
              }
            },
          }
        });
    });

})();

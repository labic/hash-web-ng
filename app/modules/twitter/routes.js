(function () {
  'use strict';
  angular
  // TODO: Change module name
    .module('hash.twitter')
    .config(function ($stateProvider) {
    $stateProvider
      .state('painel', {
      url: '/painel',
      views: {
        '': { templateUrl: 'modules/twitter/views/main.html' },
        'map@painel': { templateUrl: 'modules/twitter/views/map.html' },
        'word&Tag@painel': { templateUrl: 'modules/twitter/views/wordTweet.html' },
        'conteudo@painel': { templateUrl: 'modules/twitter/views/twTweet.html' }
      }
    })
      .state('painel.word', {
      url: '',
      views: {
        'word&Tag': { templateUrl: 'modules/twitter/views/wordTweet.html' },
      }
    })
      .state('painel.tag', {
      url: '',
      views: {
        'word&Tag': { templateUrl: 'modules/twitter/views/tagTweet.html' },
      }
    })
      .state('painel.tweet', {
      url: '',
      views: {
        'conteudo': { templateUrl: 'modules/twitter/views/twTweet.html' }
      }
    })
    .state('painel.tweetstweets', {
      url: '',
      views: {
        'conteudo': { templateUrl: 'modules/twitter/views/twTweetsTweets.html' }
      }
    })
      .state('painel.url', {
      url: '',
      views: {
        'conteudo': { templateUrl: 'modules/twitter/views/url.html' },
      }
    })
      .state('painel.user', {
      url: '',
      views: {
        'conteudo': { templateUrl: 'modules/twitter/views/user.html' },
      }
    })
      .state('painel.mentions', {
      url: '',
      views: {
        'conteudo': { templateUrl: 'modules/twitter/views/mentions.html' },
      }
    })
      .state('painel.mosaico', {
      url: '',
      views: {
        'conteudo': {
          templateUrl: 'modules/twitter/views/imgMosaicoTweet.html', controller: function($scope) {
            var tamDiv = $('.geralTweets_result').css( 'width' );
            tamDiv = parseInt(tamDiv);
            $scope.alturaImg = tamDiv / 15;
          }
        },
      }
    });
  });

})();

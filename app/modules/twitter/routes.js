(function () {
  'use strict';
  angular
  // TODO: Change module name
    .module('hash.twitter')
    .config(function ($stateProvider) {
    $stateProvider
<<<<<<< HEAD
      .state('painel', {
      url: '/twitter',
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
=======
      .state('twitter', {
        url: '/twitter',
        views: {
          '': { templateUrl: 'modules/twitter/views/main.html' },
          'map@twitter': { templateUrl: 'modules/twitter/views/map.html' },
          'word&Tag@twitter': { templateUrl: 'modules/twitter/views/wordTweet.html' },
          'conteudo@twitter': { templateUrl: 'modules/twitter/views/twTweet.html' }
        }
      })
      .state('twitter.word', {
        url: '',
        views: {
          'word&Tag': { templateUrl: 'modules/twitter/views/wordTweet.html' },
        }
      })
      .state('twitter.tag', {
        url: '',
        views: {
          'word&Tag': { templateUrl: 'modules/twitter/views/tagTweet.html' },
        }
      })
      .state('twitter.tweet', {
        url: '',
        views: {
          'conteudo': { templateUrl: 'modules/twitter/views/twTweet.html' }
        }
      })
      .state('twitter.tweetstweets', {
        url: '',
        views: {
          'conteudo': { templateUrl: 'modules/twitter/views/twTweetsTweets.html' }
        }
      })
      .state('twitter.url', {
        url: '',
        views: {
          'conteudo': { templateUrl: 'modules/twitter/views/url.html' },
        }
      })
      .state('twitter.user', {
        url: '',
        views: {
          'conteudo': { templateUrl: 'modules/twitter/views/user.html' },
        }
      })
      .state('twitter.mentions', {
        url: '',
        views: {
          'conteudo': { templateUrl: 'modules/twitter/views/mentions.html' },
        }
      })
      .state('twitter.mosaico', {
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
>>>>>>> 779b9b87b35d4b54b5d3227de198f7e55afe3136
  });

})();

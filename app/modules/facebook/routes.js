(function () {
  'use strict';
  angular
    .module('hash.facebook')
    .config(function ($stateProvider) {
      $stateProvider
        .state('facebook', {
          url: '/facebook',
          views: {
            '': { templateUrl: 'app/modules/facebook/views/main.html' },
            'facebook.word@facebook': { templateUrl: 'app/modules/facebook/views/wordFacebook.html' },
            'facebook.conteudo@facebook': { templateUrl: 'app/modules/facebook/views/postsFacebook.html' },
          }
        })
        .state('facebook.word', {
          url: '',
          views: {
            'facebook.word': { templateUrl: 'app/modules/facebook/views/wordFacebook.html' },
          }
        })
        .state('facebook.posts', {
          url: '',
          views: {
            'facebook.conteudo': { templateUrl: 'app/modules/facebook/views/postsFacebook.html' },
          }
        })
        .state('facebook.postsImage', {
          url: '',
          views: {
            'facebook.conteudo': { templateUrl: 'app/modules/facebook/views/imgFacebook.html' },
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
            'facebook.conteudo': { templateUrl: 'app/modules/facebook/views/imgMosaicoFacebook.html' },
            controller: function($scope) {
              var tamDiv = $('.geralTweets_result').css( 'width' );
              tamDiv = parseInt(tamDiv);
              $scope.alturaImg = tamDiv / 15;
            }
          }
        });
    });

})();

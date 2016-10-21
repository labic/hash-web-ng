(function () {
  'use strict';
  angular
    .module('hash.facebook')
    .config(function ($stateProvider) {
    $stateProvider
      .state('facebook', {
      url: '/facebook',
      views: {
        '': { templateUrl: 'modules/facebook/views/main.html' },
        'facebook.word&tag@facebook': { templateUrl: 'modules/facebook/views/wordFacebook.html' },
        'facebook.conteudo@facebook': { templateUrl: 'modules/facebook/views/postsFacebook.html' },
      }
    })
      .state('facebook.word', {
      url: '',
      views: {
        'facebook.word&tag': { templateUrl: 'modules/facebook/views/wordFacebook.html' },
      }
    })
      .state('facebook.tag', {
      url: '',
      views: {
        'facebook.word&tag': { templateUrl: 'modules/facebook/views/tagFacebook.html' },
      }
    })
      .state('facebook.posts', {
      url: '',
      views: {
        'facebook.conteudo': { templateUrl: 'modules/facebook/views/postsFacebook.html' },
      }
    });
  });
})();
(function () {
  'use strict';
  angular
    .module('hash.words')
    .config(function ($stateProvider) {
      $stateProvider
        .state('palavra', {
          url: '/palavras',
          views: {
            '': { templateUrl: 'modules/words/views/main.html' },
            'sunburst@palavra': { templateUrl: 'modules/words/views/sunburstPalavra.html' },
            'words@palavra': { templateUrl: 'modules/words/views/wordsPalavra.html' },
            'conteudo.tweet@palavra': { templateUrl: 'modules/words/views/twPalavra.html' }
          }
        })
        .state('palavra.tweet', {
          url: '',
          views: {
            'conteudo.palavra': { templateUrl: 'modules/words/views/twTweet.html' },
          }
        })
        .state('palavra.img', {
          url: '',
          views: {
            'conteudo.palavra': { templateUrl: 'modules/words/views/imgTweet.html' },
          }
        });
    });

})();

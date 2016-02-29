(function () {
  'use strict';
  angular
    .module('hash.words')
    .config(function ($stateProvider) {
      $stateProvider
        .state('palavra', {
          url: '/palavras',
          views: {
            '': { templateUrl: 'app/modules/words/views/main.html' },
            'sunburst@palavra': { templateUrl: 'app/modules/words/views/sunburstPalavra.html' },
            'words@palavra': { templateUrl: 'app/modules/words/views/wordsPalavra.html' },
            'conteudo.tweet@palavra': { templateUrl: 'app/modules/words/views/twPalavra.html' }
          }
        })
        .state('palavra.tweet', {
          url: '',
          views: {
            'conteudo.palavra': { templateUrl: 'app/modules/words/views/twTweet.html' },
          }
        })
        .state('palavra.img', {
          url: '',
          views: {
            'conteudo.palavra': { templateUrl: 'app/modules/words/views/imgTweet.html' },
          }
        });
    });

})();

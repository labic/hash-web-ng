var hashTwitter = angular.module('hashTwitter', ['ui.router','ngResource', 'hash.api', 'word.api', 'infinite-scroll']);

hashTwitter
  .constant('HASH_API_BASE_URI', 'https://sdh-hash-api-dev.herokuapp.com/v2')
  .constant('WORD_API_BASE_URI', 'http://word-api.ddns.net:8081')
  .config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  /* PAGINA: painel */

    .state('painel', {
    url: "/painel",
    views: {
      "": { templateUrl: "app/painel.html" },
      "map@painel": { templateUrl: "app/painel/map.html" },
      "word&Tag@painel": { templateUrl: "app/painel/wordTweet.html" },
      "conteudo@painel": { templateUrl: "app/painel/twTweet.html" }
    }
  })
    .state('painel.word', {
    url: '',
    views: {
      "word&Tag": { templateUrl: "app/painel/wordTweet.html" },
    }
  })
    .state('painel.tag', {
    url: '',
    views: {
      "word&Tag": { templateUrl: "app/painel/tagTweet.html" },
    }
  })
    .state('painel.img', {
    url: '',
    views: {
      "conteudo": { 
        templateUrl: "app/painel/imgTweet.html", controller: function($scope) {
          var tamDiv = $(".geralTweets_result").css( "width" );
          tamDiv = parseInt(tamDiv);
          $scope.alturaImg = tamDiv / 3;
        }
      }
    }
  })
    .state('painel.tweet', {
    url: '',
    views: {
      "conteudo": { templateUrl: "app/painel/twTweet.html" },
    }
  })
    .state('painel.mosaico', {
    url: '',
    views: {
      "conteudo": { 
        templateUrl: "app/painel/imgMosaicoTweet.html", controller: function($scope) {
          var tamDiv = $(".geralTweets_result").css( "width" );
          tamDiv = parseInt(tamDiv);
          $scope.alturaImg = tamDiv / 15;
        }
      },
    }
  })

  /* PAGINA: Palavra */

    .state('palavra', {
    url: "/palavras",
    views: {
      "": { templateUrl: "app/palavras.html" },
      "sunburst@palavra": { templateUrl: "app/palavra/sunburstPalavra.html" },
      "words@palavra": { templateUrl: "app/palavra/wordsPalavra.html" },
      "conteudo.tweet@palavra": { templateUrl: "app/palavra/twPalavra.html" }
    }
  })
  /*.state('palavra.sunburst', {
        url: '',
        templateUrl: "app/palavra/sunburstPalavra.html" ,
      })*/
    .state('palavra.tweet', {
    url: '',
    views: {
      "conteudo.palavra": { templateUrl: "app/palavra/twTweet.html" },
    }
  })
    .state('palavra.img', {
    url: '',
    views: {
      "conteudo.palavra": { templateUrl: "app/palavra/imgTweet.html" },
    }
  })

  /* PAGINA: Instagram */

    .state('instagram', {
    url: "/instagram",
    views: {
      "": { templateUrl: "app/instagram.html" }
    }
  })

  /* PAGINA: Facebook */

    .state('facebook', {
    url: "/facebook",
    views: {
      "": { templateUrl: "app/facebook.html" },
      "facebook.word@facebook": { templateUrl: "app/facebook/wordFacebook.html" },
      "facebook.conteudo@facebook": { templateUrl: "app/facebook/wordFacebook.html" },
    }
  })
    .state('facebook.word', {
    url: '',
    views: {
      "facebook.word": { templateUrl: "app/facebook/wordFacebook.html" },
    }
  })
  .state('facebook.posts', {
    url: '',
    views: {
      "facebook.conteudo": { templateUrl: "app/facebook/wordFacebook.html" },
    }
  })
  .state('facebook.postsImage', {
    url: '',
    views: {
      "facebook.conteudo": { templateUrl: "app/facebook/wordFacebook.html" },
    }
  })
  .state('facebook.postsMosaico', {
    url: '',
    views: {
      "facebook.conteudo": { templateUrl: "app/facebook/wordFacebook.html" },
    }
  });
});
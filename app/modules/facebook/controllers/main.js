hash.controller('mainFacebook', function ($scope, $http, settings, MetricsFacebook, AnalyticsFacebook, WordFacebook) {

  $scope.config = {
    filter: settings.get('facebook.filters')
  };

  // NOTA: Filtro para Ator do Facebook.
  // Mudancas: Entretanto precisa de otimização.
  $scope.filter = {
    time: '7d',
    word: '',
    tag: '',
    profileType: 'page',
    type: 'publicacoes',
    actor: $scope.config.filter.actors[0].tag,
    categoria: null,
    categorieNumber: 0,
    page: 1,
    per_page: 25
  };

  $scope.start = 1;
  $scope.countpage = 0;

  var tamDiv = $("#div2_monitor").css( "width" );
  tamDiv = parseInt(tamDiv);
  $scope.alturaImg = tamDiv / 3;
  $scope.alturaImgMosaico = tamDiv / 15;

  // Função usada para carregar mais tweets
  $scope.loadMore = function(x) {

    $scope.countpage = x + $scope.countpage;

    //    $scope.filter.page = $scope.countpage * 25;
    $scope.filter.page = $scope.countpage;
    $scope.filter.per_page = $scope.countpage * 25 + 25;
  };

  $scope.$watch('filter', function (newFilter, oldFilter) {

    var responseImg = [];
    var contResponseImg = 0;

    $scope.selectComentario = false;

    WordFacebook.topWords({
      'period': newFilter.time,
      'tags[]': [newFilter.actor],
      'page': 1,
      'per_page': 10
    }, function success(response) {
      $scope.words = response;
    }, errorHandler);

    $( ".geralTweets_result" ).scrollTop( "slow" );
    $scope.countpage = 0;

    if((newFilter.type != oldFilter.type) || (newFilter.tema != oldFilter.tema) || (newFilter.actor != oldFilter.actor) || ($scope.start == 1)){

      $( ".geralTweets_result" ).scrollTop( "slow" );
      $scope.countpage = 0;

      $scope.stateFilter = "tema";

      AnalyticsFacebook.mostLikedPosts({
        'period': newFilter.time,
        'profile_type': newFilter.profileType,
        'filter[with_tags]': [newFilter.actor],
        'page': 1,
        'per_page': 25
      }, function success(response) {
        $scope.posts = response;
      }, errorHandler);

      for(var x = 1; x <= 4; x++){
        AnalyticsFacebook.mostRecurringImages({
          'period': newFilter.time,
          'profile_type': newFilter.profileType,
          'filter[with_tags]': [newFilter.actor],
          'page': x,
          'per_page': 100
        }, function success(response) {

          contResponseImg++;
          responseImg = response.concat(responseImg);

          if(contResponseImg == 3){
            $scope.imgs = responseImg;
          }
        }, errorHandler);
      }

    }else if(newFilter.word != oldFilter.word){

      $( ".geralTweets_result" ).scrollTop( "slow" );
      $scope.countpage = 0;

      $scope.stateFilter = "word";

      WordFacebook.posts({
        period: newFilter.time,
        'tags[]': [newFilter.actor],
        'word': newFilter.word,
        'page': 1,
        'per_page': 25
      }, function success(response) {
        $scope.posts = response;
      }, errorHandler);

      WordFacebook.images({
        period: newFilter.time,
        'tags[]': [newFilter.actor],
        'word': newFilter.word,
        'page': 1,
        'per_page': 400
      },function success(response) {
        $scope.posts = response;
      }, errorHandler);

    }else if(newFilter.categoria != oldFilter.categoria){

      $( ".geralTweets_result" ).scrollTop( "slow" );
      $scope.countpage = 0;

      $scope.stateFilter = "categoria";

      AnalyticsFacebook.mostLikedPosts({
        'period': newFilter.time,
        'profile_type': newFilter.profileType,
        'filter[with_tags]': [newFilter.actor],
        'page': 1,
        'per_page': 25
      },function success(response) {
        $scope.posts = response;
      }, errorHandler);

      for(var x = 1; x <= 4; x++){
        AnalyticsFacebook.mostRecurringImages({
          'period': newFilter.time,
          'profile_type': newFilter.profileType,
          'filter[with_tags]': [newFilter.actor],
          'page': x,
          'per_page': 100
        },function success(response) {

          contResponseImg++;
          responseImg = response.concat(responseImg);

          if(contResponseImg == 3){
            $scope.imgs = responseImg;
          }
        }, errorHandler);
      }

    }else if(newFilter.time != oldFilter.time){

      $( ".geralTweets_result" ).scrollTop( "slow" );
      $scope.countpage = 0;

      if($scope.stateFilter == "tema"){

        AnalyticsFacebook.mostLikedPosts({
          'period': newFilter.time,
          'profile_type': newFilter.profileType,
          'filter[with_tags]': [newFilter.actor],
          'page': 1,
          'per_page': 25
        },function success(response) {
          $scope.posts = response;
        }, errorHandler);

        for(var x = 1; x <= 4; x++){

          AnalyticsFacebook.mostRecurringImages({
            'period': newFilter.time,
            'profile_type': newFilter.profileType,
            'filter[with_tags]': [newFilter.actor],
            'page': x,
            'per_page': 100
          },function success(response) {

            contResponseImg++;
            responseImg = response.concat(responseImg);

            if(contResponseImg == 3){
              $scope.imgs = responseImg;
            }
          }, errorHandler);
        }

      }else if($scope.stateFilter == "word"){

        WordFacebook.posts({
          period: newFilter.time,
          'tags[]': [newFilter.actor],
          'word': newFilter.word,
          'page': 1,
          'per_page': 25
        },function success(response) {
          $scope.posts = response;
        }, errorHandler);

        WordFacebook.images({
          period: newFilter.time,
          'tags[]': [newFilter.tema,newFilter.actor],
          'word': newFilter.word,
          'page': 1,
          'per_page': 400
        },
                            function success(response) {
          $scope.posts = response;
        }, errorHandler);

      }else if($scope.stateFilter == "categoria"){

        AnalyticsFacebook.mostLikedPosts({
          'period': newFilter.time,
          'profile_type': newFilter.profileType,
          'filter[with_tags]': [newFilter.actor],
          'page': 1,
          'per_page': 25
        },function success(response) {
          $scope.posts = response;
        }, errorHandler);

        for(var x = 1; x <= 4; x++){
          AnalyticsFacebook.mostRecurringImages({
            'period': newFilter.time,
            'profile_type': newFilter.profileType,
            'filter[with_tags]': [newFilter.actor],
            'page': x,
            'per_page': 100
          },function success(response) {

            contResponseImg++;
            responseImg = response.concat(responseImg);

            if(contResponseImg == 3){
              $scope.imgs = responseImg;
            }
          }, errorHandler);
        }
      }
    }else
      if(newFilter.page != oldFilter.page){

        if($scope.stateFilter == "tema"){

          AnalyticsFacebook.mostLikedPosts({
            'period': newFilter.time,
            'profile_type': newFilter.profileType,
            'filter[with_tags]': [newFilter.actor],
            'page': newFilter.page,
            'per_page': 25
          },function success(response){
            $scope.posts = response;

            var contData = Object.keys(response).length;

            if((contData >= 25) && (contData <= 100)){
              $scope.buttonNext = true;
            }else{
              $scope.buttonNext = false;
            }
          }, errorHandler);

        }else if($scope.stateFilter == "word"){

          WordFacebook.posts({
            period: newFilter.time,
            'tags[]': [newFilter.actor],
            'word': newFilter.word,
            'page': newFilter.page,
            'per_page': 25
          },function success(response) {
            $scope.posts = response;

            var contData = Object.keys(response).length;

            if((contData >= 25) && (contData <= 100)){
              $scope.buttonNext = true;
            }else{
              $scope.buttonNext = false;
            }
          }, errorHandler);

        }else if($scope.stateFilter == "categoria"){

          AnalyticsFacebook.mostLikedPosts({
            'period': newFilter.time,
            'profile_type': newFilter.profileType,
            'filter[with_tags]': [newFilter.actor],
            'page': newFilter.page,
            'per_page': 25
          },function success(response) {
            $scope.posts = response;

            var contData = Object.keys(response).length;

            if((contData >= 25) && (contData <= 100)){
              $scope.buttonNext = true;
            }else{
              $scope.buttonNext = false;
            }
          }, errorHandler);
        }
      }
    $scope.start = 0;
  },true);

  function errorHandler(err) {
    console.error(err);
  }
});

hashTwitter.controller('mainFacebook', function ($scope, $http, MetricsFacebook, AnalyticsFacebook, WordFacebook) {

  $scope.filter = {
    tema: 'tema-negros',
    time: '7d',
    word: '',
    profileType: 'page',
    type: 'publicacoes',
    actor: 'ator-imprensa',
    categoria: null,
    categorieNumber: 0,
    page: 1,
    per_page: 25
  };

  $scope.start = 1;

  var tamDiv = $("#div2_monitor").css( "width" );
  tamDiv = parseInt(tamDiv);
  $scope.alturaImg = tamDiv / 3;
  $scope.alturaImgMosaico = tamDiv / 15;

  $scope.$watch('filter', function (newFilter, oldFilter) {

    $http.get("data/test/conteudos.json").success(function (data) {
      $scope.conteudos = data[newFilter.categorieNumber];
    });

    if(newFilter.type == 'comentario'){

      $scope.selectComentario = true;

      WordFacebook.topWordsComments(
        {
          'period': newFilter.time,
          'tags[]': [newFilter.tema,newFilter.actor],      
          'page': 1,    
          'per_page': 10
        }, 
        function success(response) {
          $scope.words = response;
        }, errorHandler);

      if((newFilter.type != oldFilter.type) || (newFilter.tema != oldFilter.tema) || (newFilter.actor != oldFilter.actor)){

        $scope.stateFilter = "tema";

        AnalyticsFacebook.mostLikedComments(
          {
            'period': newFilter.time, 
            'filter[with_tags]': [newFilter.tema,newFilter.actor], 
            'page': 1, 
            'per_page': 25
          }, 
          function success(response) {
            $scope.posts = response;
          }, errorHandler);

      }else if(newFilter.word != oldFilter.word){

        $scope.stateFilter = "word";

        WordFacebook.postsComments(
          {
            period: newFilter.time,
            'tags[]': [newFilter.tema,newFilter.actor],
            'word': newFilter.word,
            'page': 1,    
            'per_page': 25
          }, 
          function success(response) {
            $scope.posts = response;
          }, errorHandler);

      }else if(newFilter.categoria != oldFilter.categoria){

        $scope.stateFilter = "categoria";

        AnalyticsFacebook.mostLikedComments(
          {
            'period': newFilter.time, 
            'filter[with_tags]': [newFilter.tema,newFilter.actor,newFilter.categoria], 
            'page': 1, 
            'per_page': 25
          }, 
          function success(response) {
            $scope.posts = response;
          }, errorHandler);

      }else if(newFilter.time != oldFilter.time){

        if($scope.stateFilter == "tema"){

          AnalyticsFacebook.mostLikedComments(
            {
              'period': newFilter.time, 
              'filter[with_tags]': [newFilter.tema,newFilter.actor], 
              'page': 1, 
              'per_page': 25
            }, 
            function success(response) {
              $scope.posts = response;
            }, errorHandler);


        }else if($scope.stateFilter == "word"){

          WordFacebook.postsComments(
            {
              period: newFilter.time,
              'tags[]': [newFilter.tema,newFilter.actor],
              'word': newFilter.word,
              'page': 1,    
              'per_page': 25
            }, 
            function success(response) {
              $scope.posts = response;
            }, errorHandler);

        }else if($scope.stateFilter == "categoria"){

          AnalyticsFacebook.mostLikedComments(
            {
              'period': newFilter.time, 
              'filter[with_tags]': [newFilter.tema,newFilter.actor,newFilter.categoria], 
              'page': 1, 
              'per_page': 25
            }, 
            function success(response) {
              $scope.posts = response;
            }, errorHandler);    
        } 
      }
    }else{

      var responseImg = [];
      var contResponseImg = 0;

      $scope.selectComentario = false;

      WordFacebook.topWords(
        {
          'period': newFilter.time,
          'tags[]': [newFilter.tema,newFilter.actor],      
          'page': 1,    
          'per_page': 10
        }, 
        function success(response) {
          $scope.words = response;
        }, errorHandler);

      if((newFilter.type != oldFilter.type) || (newFilter.tema != oldFilter.tema) || (newFilter.actor != oldFilter.actor) || ($scope.start == 1)){

        $scope.stateFilter = "tema";

        AnalyticsFacebook.mostLikedPosts(
          {
            'period': newFilter.time, 
            'profile_type': newFilter.profileType, 
            'filter[with_tags]': [newFilter.tema,newFilter.actor], 
            'page': 1, 
            'per_page': 25
          }, 
          function success(response) {
            $scope.posts = response;
          }, errorHandler);

        for(var x = 1; x <= 4; x++){
          AnalyticsFacebook.mostRecurringImages(
            {
              'period': newFilter.time, 
              'profile_type': newFilter.profileType, 
              'filter[with_tags]': [newFilter.tema,newFilter.actor], 
              'page': x, 
              'per_page': 100
            }, 
            function success(response) {

              contResponseImg++;
              responseImg = response.concat(responseImg);

              if(contResponseImg == 3){
                $scope.imgs = responseImg;
              }
            }, errorHandler
          );
        }

      }else if(newFilter.word != oldFilter.word){

        $scope.stateFilter = "word";

        WordFacebook.posts(
          {
            period: newFilter.time,
            'tags[]': [newFilter.tema,newFilter.actor],
            'word': newFilter.word,
            'page': 1,    
            'per_page': 25
          }, 
          function success(response) {
            $scope.posts = response;
          }, errorHandler);

        WordFacebook.images(
          {
            period: newFilter.time,
            'tags[]': [newFilter.tema,newFilter.actor],
            'word': newFilter.word,
            'page': 1,    
            'per_page': 400
          }, 
          function success(response) {
            $scope.posts = response;
          }, errorHandler);

      }else if(newFilter.categoria != oldFilter.categoria){

        $scope.stateFilter = "categoria";

        AnalyticsFacebook.mostLikedPosts(
          {
            'period': newFilter.time, 
            'profile_type': newFilter.profileType,
            'filter[with_tags]': [newFilter.tema,newFilter.actor,newFilter.categoria], 
            'page': 1, 
            'per_page': 25
          }, 
          function success(response) {
            $scope.posts = response;
          }, errorHandler);

        for(var x = 1; x <= 4; x++){
          AnalyticsFacebook.mostRecurringImages(
            {
              'period': newFilter.time, 
              'profile_type': newFilter.profileType, 
              'filter[with_tags]': [newFilter.tema,newFilter.actor,newFilter.categoria], 
              'page': x, 
              'per_page': 100
            }, 
            function success(response) {

              contResponseImg++;
              responseImg = response.concat(responseImg);

              if(contResponseImg == 3){
                $scope.imgs = responseImg;
              }
            }, errorHandler
          );
        }

      }else if(newFilter.time != oldFilter.time){

        if($scope.stateFilter == "tema"){

          AnalyticsFacebook.mostLikedPosts(
            {
              'period': newFilter.time, 
              'profile_type': newFilter.profileType, 
              'filter[with_tags]': [newFilter.tema,newFilter.actor], 
              'page': 1, 
              'per_page': 25
            }, 
            function success(response) {
              $scope.posts = response;
            }, errorHandler);

          for(var x = 1; x <= 4; x++){
            AnalyticsFacebook.mostRecurringImages(
              {
                'period': newFilter.time, 
                'profile_type': newFilter.profileType, 
                'filter[with_tags]': [newFilter.tema,newFilter.actor], 
                'page': x, 
                'per_page': 100
              }, 
              function success(response) {

                contResponseImg++;
                responseImg = response.concat(responseImg);

                if(contResponseImg == 3){
                  $scope.imgs = responseImg;
                }
              }, errorHandler
            );
          }

        }else if($scope.stateFilter == "word"){

          WordFacebook.posts(
            {
              period: newFilter.time,
              'tags[]': [newFilter.tema,newFilter.actor],
              'word': newFilter.word,
              'page': 1,    
              'per_page': 25
            }, 
            function success(response) {
              $scope.posts = response;
            }, errorHandler);

          WordFacebook.images(
            {
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

          AnalyticsFacebook.mostLikedPosts(
            {
              'period': newFilter.time, 
              'profile_type': newFilter.profileType,
              'filter[with_tags]': [newFilter.tema,newFilter.actor,newFilter.categoria], 
              'page': 1, 
              'per_page': 25
            }, 
            function success(response) {
              $scope.posts = response;
            }, errorHandler);

          for(var x = 1; x <= 4; x++){
            AnalyticsFacebook.mostRecurringImages(
              {
                'period': newFilter.time, 
                'profile_type': newFilter.profileType, 
                'filter[with_tags]': [newFilter.tema,newFilter.actor,newFilter.categoria], 
                'page': x, 
                'per_page': 100
              }, 
              function success(response) {

                contResponseImg++;
                responseImg = response.concat(responseImg);

                if(contResponseImg == 3){
                  $scope.imgs = responseImg;
                }
              }, errorHandler
            );
          }
        } 
      }
    }           
    $scope.start = 0;
  },true);

  function errorHandler(err) {
    console.log(err);
  }
});
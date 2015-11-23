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

  //  MetricsFacebook.count({
  //    period: $scope.filter.time, 
  //    profile_type: $scope.filter.actor, 
  //    'post_type[]': [$scope.filter.tema],
  //  }, function success(res) {
  //    $scope.countRetweet = res.count;
  //  });

  $scope.$watch('filter', function (newFilter, oldFilter) {

    $scope.analyticsFacebookParams = {
      'period': newFilter.time, 
      'profile_type': newFilter.profileType, 
      'filter[contain_tags]': [newFilter.tema,newFilter.actor], 
      'filter[hashtags]': [],
      'filter[mentions]': [],
      'filter[profiles]': [], 
      'filter[post_type]': [],
      'filter[blocked]': null,
      'last': null,
      'page': 1, 
      'per_page': 25
    };

    $scope.wordFacebookParams = {
      period: newFilter.time,
      'tags[]': [newFilter.tema,newFilter.actor],      
      page: 1,    
      per_page: 10
    };

    $http.get("data/test/conteudos.json").success(function (data) {
      $scope.conteudos = data[newFilter.categorieNumber];
    });

    WordFacebook.topWords(
      $scope.wordFacebookParams, 
      function success(response) {
        $scope.words = response;
      }, errorHandler);
    
    console.log(newFilter.type);

    if(newFilter.type == 'comentario'){

      // falta o receber os comentários mais curtidos e não os posts mais comentados.

      AnalyticsFacebook.mostLikedComments(
        $scope.analyticsFacebookParams, 
        function success(response) {
          $scope.posts = response;
        }, errorHandler);

    }else{

      AnalyticsFacebook.mostLikedPosts(
        $scope.analyticsFacebookParams, 
        function success(response) {
          $scope.posts = response;
        }, errorHandler);

    }
  },true);

  function errorHandler(err) {
    console.log(err);
  }
});
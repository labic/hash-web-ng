hashTwitter.controller('mainFacebook', function ($scope, $http, MetricsFacebook, AnalyticsFacebook, WordFacebook) {

  $scope.filter = {
    tema: 'tema-negros',
    time: '7d',
    word: '',
    type: 'comentario',
    actor: 'imprensa',
    categoria: null,
    categorieNumber: 0
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
      period: newFilter.time, 
      profile_type: newFilter.actor, 
      'post_type[]': [newFilter.tema], 
      page: null, 
      per_page: null
    };

    $scope.wordFacebookParams = {
      period: newFilter.time,
      tags: [newFilter.tema],      
      page: null,    
      per_page: null
    };

    $http.get("data/test/conteudos.json").success(function (data) {
      $scope.conteudos = data[newFilter.categorieNumber];
    });

    WordFacebook.topWords(
      $scope.wordFacebookParams, 
      function success(response) {
        $scope.words = response;
      }, errorHandler);

    if(newFilter.type == 'comentario'){

      AnalyticsFacebook.mostCommentedPosts(
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
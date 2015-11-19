hashTwitter.controller('mainFacebook', function ($scope, $http, MetricsFacebook, AnalyticsFacebook, WordFacebook) {

  $scope.filter = {
    tema: 'tema-negros',
    time: '7d',
    word: '',
    type: 'comentario',
    actor: null,
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
      //      period: newFilter.time, 
      //      profile_type: newFilter.actor, 
      //      'post_type[]': [newFilter.tema], 
      //      page: null, 
      //      per_page: null

      profile_type: 'page', // Requiried
      period: newFilter.time,
      'filter[with_tags]': [newFilter.tema],
      'filter[contain_tags]': [],
      'filter[hashtags]': [],
      'filter[profiles]': [],
      'filter[mentions]': [],
      'filter[type]': []
    };

    $scope.wordFacebookParams = {
      period: newFilter.time,
      tags: [newFilter.tema],      
      page: 1,    
      per_page: 20
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

      // falta o receber os comentários mais curtidos e não os posts mais comentados.

      //      AnalyticsFacebook.mostCommentedPosts(
      //        $scope.analyticsFacebookParams, 
      //        function success(response) {
      //          $scope.posts = response;
      //        }, errorHandler);

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
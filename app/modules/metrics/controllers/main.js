hash.controller('mainMetrics', function ($scope, $http, settings, MetricsFacebook, MetricsTwitter, Tweet, FacebookPosts, InstagramMedia, MetricsInstagram) {
  $scope.config = {
    filter: settings.get('metrics.filters'),
  };

  Tweet.count({
    'period': $scope.config.filter.period,
    'filter[contain_tags]': []
  }, function success(res) {
    $scope.twitterTweets = res.count;
  });

  Tweet.count({
    'period': $scope.config.filter.period,
    'filter[contain_tags]': [],
    'filter[has]': ['media']
  }, function success(res) {
    $scope.twitterImage = res.count;
  });

  FacebookPosts.count({
    'period': $scope.config.filter.period,
    'profile_type': 'page',
    'filter[contain_tags]': [],
  }, function success(res) {
    $scope.facebookPosts = res.count;
  });

  FacebookPosts.count({
    'period': $scope.config.filter.period,
    'profile_type': 'page',
    'filter[contain_tags]': [],
    'filter[types]':['photo']
  }, function success(res) {
    $scope.facebookImage = res.count;
  });

  $scope.functionStatistics = function(){

    var statisticsURL = 'http://188.166.40.27:8090/estatisticas/7d';

    $http.get(statisticsURL).success(function (data) {
      plotGraph("twitter1",data.data.twitter,"Twitter",1);
      plotGraph("twitter2",data.data["twitter-categorias"],"Twitter: Categorias",1);
      plotGraph("facebook1",data.data.facebook,"Facebook",1);
      plotGraph("facebook2",data.data["facebook-categorias"],"Facebook: Categorias",1);
    }).error(function(data, status) {
    });
  };
  
  $scope.functionStatistics();
});
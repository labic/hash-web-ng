hash.controller('mainMetrics', function ($scope, $http, settings, MetricsFacebook, MetricsTwitter, Tweet, FacebookPosts, InstagramMedia, MetricsInstagram) {
  $scope.config = {
    filter: settings.get('metrics.filters'),
  };

  $scope.filter = {
    period: $scope.config.filter.period.values[0].value
  };

  $scope.times = $scope.config.filter.period.values;

  $scope.$watch('filter', function (newFilter, oldFilter) {

    d3.select("#twitter1").select('svg').remove();
    d3.select("#twitter2").select('svg').remove();
    d3.select("#facebook1").select('svg').remove();
    d3.select("#facebook2").select('svg').remove();

    Tweet.count({
      'period': newFilter.period,
      'filter[contain_tags]': []
    }, function success(res) {
      $scope.twitterTweets = res.count;
    });

    Tweet.count({
      'period': newFilter.period,
      'filter[contain_tags]': [],
      'filter[has]': ['media']
    }, function success(res) {
      $scope.twitterImage = res.count;
    });

    FacebookPosts.count({
      'period': newFilter.period,
      'profile_type': 'page',
      'filter[contain_tags]': [],
    }, function success(res) {
      $scope.facebookPosts = res.count;
    });

    FacebookPosts.count({
      'period': newFilter.period,
      'profile_type': 'page',
      'filter[contain_tags]': [],
      'filter[types]':['photo']
    }, function success(res) {
      $scope.facebookImage = res.count;
    });

    $scope.functionStatistics(newFilter.period);
  },true);

  $scope.functionStatistics = function(period){

    var statisticsURL = 'http://188.166.40.27:8090/estatisticas/'+period;
    var paramTime;

    period == '7d' ? paramTime = 7 : paramTime = 1;

    $http.get(statisticsURL).success(function (data) {
      plotGraph("twitter1",data.data.twitter,"Twitter",paramTime);
      plotGraph("twitter2",data.data["twitter-categorias"],"Twitter: Categorias",paramTime);
      plotGraph("facebook1",data.data.facebook,"Facebook",paramTime);
      plotGraph("facebook2",data.data["facebook-categorias"],"Facebook: Categorias",paramTime);
    }).error(function(data, status) {
    });
  };  
});
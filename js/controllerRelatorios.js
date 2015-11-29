hashTwitter.controller('mainRelatorio', function ($scope, $http, MetricsFacebook, MetricsTwitter, Tweet) {

  Tweet.count({
    period: "7d",
    'filter[contain_tags]': ["tema-negros","tema-generos","tema-indigena","tema-lgbt"]
  }, function success(res) {
    $scope.countTweetTwitter = res.count;
  });

  Tweet.count({
    period: "7d",
    'filter[contain_tags]': ["tema-negros","tema-generos","tema-indigena","tema-lgbt"],
    'filter[has]': ['media']
  }, function success(res) {
    $scope.countImageTwitter = res.count;
  });

});
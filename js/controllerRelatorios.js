hashTwitter.controller('mainRelatorio', function ($scope, $http, MetricsFacebook, MetricsTwitter, Tweet, FacebookPosts) {

  Tweet.count({
    period: "7d",
    'filter[contain_tags]': ["tema-negros","tema-genero","tema-indigena","tema-lgbt"]
  }, function success(res) {
    $scope.TwitterTweet = res.count;
  });

  Tweet.count({
    period: "7d",
    'filter[contain_tags]': ["tema-negros","tema-genero","tema-indigena","tema-lgbt"],
    'filter[has]': ['media']
  }, function success(res) {
    $scope.TwitterImage = res.count;
  });

  FacebookPosts.count({
    period: "7d",
    profile_type: 'page',
    'filter[contain_tags]': ["tema-negros","tema-genero","tema-indigena","tema-lgbt"],
  }, function success(res) {
    $scope.FacebookPosts = res.count;
  });

//  FacebookPosts.count({
//    'granularity': "7d",
//    profile_type: 'page',
//    'filter[contain_tags]': ["tema-negros","tema-genero","tema-indigena","tema-lgbt"],
//  }, function success(res) {
//    $scope.FacebookPosts = res.count;
//  });

//  MetricsTwitter.interationsRate({
//    'granularity': "7d",
//    'filter[contain_tags]': ["tema-negros","tema-generos","tema-indigena","tema-lgbt"]
//  }, function success(res) {
//    console.log(res);
//  });

  var colorMap = {"indigena":"#c7144f","genero":"#426083","negros":"#f7931e","lgbt":"#8c6239"};

  var widthLineChart = $("#lineChart").width();
  var widthBarChart = $("#barChart").width();
  
  $scope.countBar = 0;
  
  Tweet.count({
    period: "7d",
    'filter[contain_tags]': ["tema-negros"]
  }, function success(res) {
    $scope.TwitterNegros = res.count;
    $scope.countBar++;
  });
  
  Tweet.count({
    period: "7d",
    'filter[contain_tags]': ["tema-genero"]
  }, function success(res) {
    $scope.TwitterGenero = res.count;
    $scope.countBar++;
  });
  
  Tweet.count({
    period: "7d",
    'filter[contain_tags]': ["tema-indigena"]
  }, function success(res) {
    $scope.TwitterIndigena = res.count;
    $scope.countBar++;
  });
  
  Tweet.count({
    period: "7d",
    'filter[contain_tags]': ["tema-lgbt"]
  }, function success(res) {
    $scope.TwitterLgbt = res.count;
    $scope.countBar++;
  });
  
  $scope.$watch('countBar', function (newFilter, oldFilter) {
    if(newFilter == 4){
      var barChart =
      {
        "twitter":{"indigena": $scope.TwitterIndigena, "genero": $scope.TwitterGenero, "negros": $scope.TwitterNegros, "lgbt": $scope.TwitterLgbt},
        "facebook":{"indigena": 127,"genero": 198,"negros": 136,"lgbt": 235},
        "instagram":{"indigena": 156,"genero": 106,"negros": 302,"lgbt": 123}
      };
  
  console.log(barChart);

  plotBarChart(barChart,"barChart",widthBarChart,120,15,25,colorMap);
    }  
  });
});
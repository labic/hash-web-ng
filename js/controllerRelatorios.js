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

  FacebookPosts.count({
    period: "7d",
    profile_type: 'page',
//    'filter[contain_tags]': ["tema-negros","tema-genero","tema-indigena","tema-lgbt"],
    'filter[types]':['photo']
  }, function success(res) {
    $scope.FacebookImage = res.count;
  });

//  MetricsTwitter.interationsRate({
//    'period':'7d',
//    'granularity': "7d",
////    'filter[contain_tags]': ["tema-negros","tema-generos","tema-indigena","tema-lgbt"]
//  }, function success(res) {
//    console.log(res);
//  });
  
  MetricsTwitter.interationsRate({
    'granularity': "7d",
    'filter[contain_tags]': ["tema-negros","tema-genero","tema-indigena","tema-lgbt"],
  }, function success(res) {
    alert(5);
//    $scope.TwitterImage = res.count;
  });

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
  
  FacebookPosts.count({
    period: "7d",
    profile_type: 'page',
    'filter[contain_tags]': ["tema-negros"],
  }, function success(res) {
    $scope.FacebookNegros = res.count;
    $scope.countBar++;
  });
  
  FacebookPosts.count({
    period: "7d",
    profile_type: 'page',
    'filter[contain_tags]': ["tema-genero"],
  }, function success(res) {
    $scope.FacebookGenero = res.count;
    $scope.countBar++;
  });
  
  FacebookPosts.count({
    period: "7d",
    profile_type: 'page',
    'filter[contain_tags]': ["tema-indigena"],
  }, function success(res) {
    $scope.FacebookIndigena = res.count;
    $scope.countBar++;
  });
  
  FacebookPosts.count({
    period: "7d",
    profile_type: 'page',
    'filter[contain_tags]': ["tema-lgbt"],
  }, function success(res) {
    $scope.FacebookLgbt = res.count;
    $scope.countBar++;
  });
  
  $scope.$watch('countBar', function (newFilter, oldFilter) {
    if(newFilter == 8){
      var barChart =
      {
        "twitter":{"indigena": $scope.TwitterIndigena, "genero": $scope.TwitterGenero, "negros": $scope.TwitterNegros, "lgbt": $scope.TwitterLgbt},
        "facebook":{"indigena": $scope.FacebookIndigena,"genero": $scope.FacebookGenero,"negros": $scope.FacebookNegros,"lgbt": $scope.FacebookLgbt},
        "instagram":{"indigena": 156,"genero": 106,"negros": 302,"lgbt": 123}
      };
  
  console.log(barChart);

  plotBarChart(barChart,"barChart",widthBarChart,120,15,25,colorMap);
    }  
  });
});
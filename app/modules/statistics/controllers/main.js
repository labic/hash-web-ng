hash.controller('mainRelatorio', function ($scope, $http, MetricsFacebook, MetricsTwitter, Tweet, FacebookPosts, InstagramMedia, MetricsInstagram) {

  var colorMap = {"indigena":"#c7144f","genero":"#426083","negros":"#f7931e","lgbt":"#8c6239"};

  var widthLineChart = $("#lineChart").width();
  var widthBarChart = $("#barChart").width();

  $(".loading_relatorio").show();
  $(".fade_white").show();

  $scope.countBar = 0;
  $scope.countLoad = 0;

  $scope.filterLineChart = {
    count : 0,
    status : "twitter"
  }

  Tweet.count({
    period: "7d",
    'filter[contain_tags]': ["tema-negros","tema-genero","tema-indigena","tema-lgbt"]
  }, function success(res) {
    $scope.TwitterTweet = res.count;
    $scope.countLoad++;
  });

  Tweet.count({
    period: "7d",
    'filter[contain_tags]': ["tema-negros","tema-genero","tema-indigena","tema-lgbt"],
    'filter[has]': ['media']
  }, function success(res) {
    $scope.TwitterImage = res.count;
    $scope.countLoad++;
  });

  FacebookPosts.count({
    period: "7d",
    profile_type: 'page',
    'filter[contain_tags]': ["tema-negros","tema-genero","tema-indigena","tema-lgbt"],
  }, function success(res) {
    $scope.FacebookPosts = res.count;
    $scope.countLoad++;
  });

  FacebookPosts.count({
    period: "7d",
    profile_type: 'page',
    //    'filter[contain_tags]': ["tema-negros","tema-genero","tema-indigena","tema-lgbt"],
    'filter[types]':['photo']
  }, function success(res) {
    $scope.FacebookImage = res.count;
    $scope.countLoad++;
  });

  InstagramMedia.count({
    'period': "7d",
    'filter[contain_tags]': ["tema-negros","tema-genero","tema-indigena","tema-lgbt"],
  }, function success(res) {
    $scope.InstagramImage = res.count;
    $scope.countLoad++;
  });

  MetricsTwitter.interationsRate({
    'granularity': "7d",
    'filter[contain_tags]': ["tema-negros","tema-genero","tema-indigena","tema-lgbt"],
  }, function success(res) {
    $scope.TwitterInteration = res.splice(0,7);
    $scope.filterLineChart.count++;
    $scope.countLoad++;
  });

  MetricsFacebook.interationsRate({
    profile_type: 'page',
    'granularity': "7d",
    'filter[contain_tags]': ["tema-negros","tema-genero","tema-indigena","tema-lgbt"],
  }, function success(res) {
    $scope.FacebookInteration = res.splice(0,7);
    $scope.filterLineChart.count++;
    $scope.countLoad++;
  });

  MetricsInstagram.interationsRate({
    'node':'media',
    'granularity': "7d",
    'filter[contain_tags]': ["tema-negros","tema-genero","tema-indigena","tema-lgbt"],
  }, function success(res) {
    $scope.InstagramInteration = res.splice(0,7);
    $scope.filterLineChart.count++;
    $scope.countLoad++;
  });

  Tweet.count({
    period: "7d",
    'filter[contain_tags]': ["tema-negros"]
  }, function success(res) {
    $scope.TwitterNegros = res.count;
    $scope.countBar++;
    $scope.countLoad++;
  });

  Tweet.count({
    period: "7d",
    'filter[contain_tags]': ["tema-genero"]
  }, function success(res) {
    $scope.TwitterGenero = res.count;
    $scope.countBar++;
    $scope.countLoad++;
  });

  Tweet.count({
    period: "7d",
    'filter[contain_tags]': ["tema-indigena"]
  }, function success(res) {
    $scope.TwitterIndigena = res.count;
    $scope.countBar++;
    $scope.countLoad++;
  });

  Tweet.count({
    period: "7d",
    'filter[contain_tags]': ["tema-lgbt"]
  }, function success(res) {
    $scope.TwitterLgbt = res.count;
    $scope.countBar++;
    $scope.countLoad++;
  });

  FacebookPosts.count({
    period: "7d",
    profile_type: 'page',
    'filter[contain_tags]': ["tema-negros"],
  }, function success(res) {
    $scope.FacebookNegros = res.count;
    $scope.countBar++;
    $scope.countLoad++;
  });

  FacebookPosts.count({
    period: "7d",
    profile_type: 'page',
    'filter[contain_tags]': ["tema-genero"],
  }, function success(res) {
    $scope.FacebookGenero = res.count;
    $scope.countBar++;
    $scope.countLoad++;
  });

  FacebookPosts.count({
    period: "7d",
    profile_type: 'page',
    'filter[contain_tags]': ["tema-indigena"],
  }, function success(res) {
    $scope.FacebookIndigena = res.count;
    $scope.countBar++;
    $scope.countLoad++;
  });

  FacebookPosts.count({
    period: "7d",
    profile_type: 'page',
    'filter[contain_tags]': ["tema-lgbt"],
  }, function success(res) {
    $scope.FacebookLgbt = res.count;
    $scope.countBar++;
    $scope.countLoad++;
  });

  InstagramMedia.count({
    period: "7d",
    'filter[contain_tags]': ["tema-negros"]
  }, function success(res) {
    $scope.InstagramNegros = res.count;
    $scope.countBar++;
    $scope.countLoad++;
  });

  InstagramMedia.count({
    period: "7d",
    'filter[contain_tags]': ["tema-genero"]
  }, function success(res) {
    $scope.InstagramGenero = res.count;
    $scope.countBar++;
    $scope.countLoad++;
  });

  InstagramMedia.count({
    period: "7d",
    'filter[contain_tags]': ["tema-indigena"]
  }, function success(res) {
    $scope.InstagramIndigena = res.count;
    $scope.countBar++;
    $scope.countLoad++;
  });

  InstagramMedia.count({
    period: "7d",
    'filter[contain_tags]': ["tema-lgbt"]
  }, function success(res) {
    $scope.InstagramLgbt = res.count;
    $scope.countBar++;
    $scope.countLoad++;
  });

  $scope.$watch('countBar', function (newFilter, oldFilter) {
    if(newFilter == 12){
      var barChart =
          {
            "twitter":{"indigena": $scope.TwitterIndigena, "genero": $scope.TwitterGenero, "negros": $scope.TwitterNegros, "lgbt": $scope.TwitterLgbt},
            "facebook":{"indigena": $scope.FacebookIndigena,"genero": $scope.FacebookGenero,"negros": $scope.FacebookNegros,"lgbt": $scope.FacebookLgbt},
            "instagram":{"indigena": $scope.InstagramIndigena,"genero": $scope.InstagramGenero,"negros": $scope.InstagramNegros,"lgbt": $scope.InstagramLgbt}
          };

      plotBarChart(barChart,"barChart",widthBarChart,120,15,25,colorMap);
    }  
  });

  $scope.$watch('filterLineChart', function (newFilter, oldFilter) {
    console.log(newFilter.status);
    console.log(oldFilter.status);

    if((newFilter.count == 3) || (newFilter.status != oldFilter.status)){
      var redes = [newFilter.status];
      var lineChart = 
          {
            "facebook":$scope.FacebookInteration,
            "twitter":$scope.TwitterInteration,
            "instagram":$scope.InstagramInteration
          };
      d3.select("#lineChart").select('svg').remove();
      plotLineCharts(lineChart,"lineChart",widthLineChart-100,150, redes);
    }
  },true);

  $scope.$watch('countLoad', function (newFilter, oldFilter) {
    if(newFilter == 20){
      $(".loading_relatorio").hide();
    }  
  });
});
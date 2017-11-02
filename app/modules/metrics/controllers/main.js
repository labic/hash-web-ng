hash.controller('mainMetrics', function ($scope, $http, settings, MetricsFacebook, MetricsTwitter, Tweet, FacebookPosts, InstagramMedia, MetricsInstagram) {
  $scope.config = {
    filter: settings.get('metrics.filters'),
  };

  $scope.filter = {
    period: $scope.config.filter.period.values[0].value,
    network: $scope.config.filter.networks[0].value
  };

  $scope.times = $scope.config.filter.period.values;

  $scope.$watch('filter', function (newFilter, oldFilter) {

    d3.select("#mg-stats-main").html("");    

    $scope.functionStatistics(newFilter.period, newFilter.network);
  },true);

  $scope.functionStatistics = function(period,network){

    var statisticsURL = 'https://api-estatistica.herokuapp.com/estatisticas/' + period;        

    console.log(statisticsURL);
    console.log(network);
    

    $http.get(statisticsURL).success(function (data) {
      console.log(data);
      if(data.resposta == false){

      }else{
        console.log(data.data[network])
        plotGraphics("mg-stats-main",trataEntrada(data.data[network],network))  
      }
            
    }).error(function(data, status) {
    });
  };  
});
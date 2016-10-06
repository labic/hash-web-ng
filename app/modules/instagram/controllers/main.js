hash.controller('mainInstagram', function ($scope, settings, InstagramMedia, AnalyticsFacebook, AnalyticsTwitter) {
  $scope.config = {
    filter: settings.get('instagram.filters'),
  };

  // Filter: Filtro para preencher post de requisição API RPS
  $scope.filter = {
    tag: $scope.config.filter.main[1].tag,
    title: $scope.config.filter.main[1].title,
    social: $scope.config.filter.main[1].title,
    period: $scope.config.filter.period.values[2].value,
    number: $scope.config.filter.period.values[2].number,
    unit: $scope.config.filter.period.values[2].unit
  };

  $scope.$watch('filter', function (newFilter, oldFilter) {

    $scope.loading();

    if(newFilter.social == "Facebook"){

      AnalyticsFacebook.mostRecurringImages({
        'period': newFilter.period,
        'profile_type': 'page',
        'filter[with_tags]': newFilter.tag,
        'page': 1,
        'per_page': 100
      }, function success(response) {
        response != '' ? $scope.sucess(response) : $scope.empty();   
      }, function error(err) {
        $scope.error();
      });

    }else if(newFilter.social == "Twitter"){

      AnalyticsTwitter.mostRecurringImages({
        period: newFilter.period,
        'filter[with_tags]': newFilter.tag,
        retrive_blocked: undefined,
        page: 1,
        per_page: 100
      },function success(response) {
        response != '' ? $scope.sucess(response) : $scope.empty();
      }, function error(err) {
        $scope.error();
      });

    }else if(newFilter.social == "Flickr"){

    }
  },true);

  $scope.loading = function(){
    $("#loading").show();
    $("#error").hide();
    $("#empty").hide();
    $("#images-display").hide();
  } 

  $scope.sucess = function(data){
    $("#loading").hide();
    $("#images-display").show();
    $scope.imgs = data;
  } 

  $scope.empty = function(){
    $("#loading").hide();
    $("#empty").show();
  }  

  $scope.error = function(){
    $("#loading").hide();
    $("#error").show();
  } 
});
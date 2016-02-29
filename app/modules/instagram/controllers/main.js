hashTwitter.controller('mainInstagram', function ($scope, $http) {

  
//  $(".fade_white").show();
  
  $scope.filter = {
    tema: 'tema-negros',
    time: 'recent',
  };

  $scope.$watch('filter', function (newFilter, oldFilter) {
    $(".loading_instagram").show();
    $(".fade_white").show();
    
    var url = serviceBase+"/instagram/media?page=1&per_page=100&period=recent&geo=true&tags[]="+newFilter.tema+"";
    startMap(url,"instagram_map");

    var url1 = serviceBase+"/instagram/media?page=1&per_page=100&period=recent&tags[]="+newFilter.tema+"";
    startImageCloud(url1,"instagram_cloudImage",$("#instagram_cloudImage").width());
  },true);

});
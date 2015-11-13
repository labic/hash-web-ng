hashTwitter.controller('mainInstagram', function ($scope, $http) {

  $scope.filter = {
    tema: 'tema-negros',
    time: 'recent',
  };

  $scope.$watch('filter', function (newFilter, oldFilter) {
    d3.select("#instagram_cloudImage").select('svg').remove();
    
    var url = "http://107.170.35.149:8080/instagram/media?page=1&per_page=100&period=recent&geo=true&tags[]="+newFilter.tema+"";
    startMap(url,"instagram_map");

    var url1 = "http://107.170.35.149:8080/instagram/media?page=1&per_page=100&period=recent&tags[]="+newFilter.tema+"";
    startImageCloud(url1,"instagram_cloudImage",$("#instagram_container").width());
  },true);

});
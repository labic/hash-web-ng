angular
    .module('hash.ui.widgets')
    .controller('widgetTweetsMapCtrl', ['$scope', '$http', function($scope, $http) {
      $http.get('/us-population-density.json')
        .success(function(data) {
          console.log(data);
          
          angular.forEach(data, function(value, key) {
            value.code = value.code.toUpperCase();
          });

          $scope.data = data;
        })
    }]);
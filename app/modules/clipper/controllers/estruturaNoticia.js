angular.module('hash.clipper')
    .controller("estruturaNoticia", function($scope, $http, $location) { 
		var query = $location.search();
		$scope.url = 'https://inep-hash-data-api-dev.herokuapp.com/articles/'+query.id;
			    //acessando o JSON
			    $http({
			        url: $scope.url,
			        method:'GET'

			    })
			    .then(function (response) {
			    	$scope.noticia = response.data.data;

			    },
			    function (err) {
			        console.log(err);
			    });

});
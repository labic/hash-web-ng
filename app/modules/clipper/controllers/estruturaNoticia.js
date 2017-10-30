angular.module('hash.clipper')
    .controller("estruturaNoticia", function($scope, $http, $location,$sce) { 
		var query = $location.search();
		$scope.url = 'https://inep-hash-data-api-dev.herokuapp.com/articles/'+query.id;
	    //acessando o JSON
	    $http({
	        url: $scope.url,
	        method:'GET'

	    })
	    .then(function (response) {
	    	$scope.noticia = response.data.data;
	    	$scope.site = $scope.noticia.url.split('/')[2];
	    	$scope.html = $sce.trustAsHtml($scope.noticia.articleBody);

	    },
	    function (err) {
	        console.log("Notícia não encontrada");
	        document.getElementById('conteudo').innerHTML ="<h1><b>Erro ao carregar conteúdo</b></h1><br><br><a href='#/clipper' onclick='javascript:location.reload();'>Voltar</a>";
	    });

});
angular
    .module('hash.clipper')
    .controller("estruturaNoticia", function($scope, $http, $location) { 
		$scope.url = 'https://inep-hash-data-api-dev.herokuapp.com/articles';
			    //acessando o JSON
			    $http({
			        url: $scope.url,
			        method:'GET'
			        //falta parametro de pegar objeto por id
			    })
			    .then(function (response) {

			       //tratar o objeto aqui para carregar conteúdo na página
			       // document.getElementById('modalTitle').innerHTML = info.headline;
			       // document.getElementById('modalBody').innerHTML = info.articleBody;
			       // document.getElementById('modalFooter').innerHTML = '<a href="'+info.url+'" target="_blank">Ir para a notícia</a>';
		        
			    },
			    function (err) {
			        console.log(err);
			    });

});
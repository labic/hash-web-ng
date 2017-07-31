angular
    .module('hash.clipper')
    .controller("gridController", function($scope, $http) { 

    var url = 'https://inep-hash-data-api-dev.herokuapp.com/articles';

    $http({
        url: url,
        method:'GET'
    })
    .then(function (response) {
        $scope.novidades = response.data.data; 
    },
    function (err) {
        console.log(err);
    });

    $scope.filter = function() {
        //pegando os valores pro filtro composto
        var tempo = document.getElementById("demo").val();
        var categoria = document.getElementById("demo").val();
        var produto = document.getElementById("demo").val();
        var tipo = document.getElementById("demo").val();
        var alcance = document.getElementById("demo").val();
        var regiao = document.getElementById("demo").val();

        //tratando cada valor obtido pra inserir um filtro
        if(tempo != 'undefined'){
            //pegar data atual no formato correto pra ser referência 
            dataFilter = {
                "attr":"dateCreated",
                "type":"data",
                "values":["2017-07-01T00:00:00.000000",tempo],
                "operator":"between"
            };
            f.addFilter(filterManager,dataFilter);
        };

        if(categoria!='undefined'){
        };

        if(produto!='undefined'){

        };

        if(tipo!='undefined'){

        };

        if(alcance!='undefined'){

        };

        if(região!='undefined'){

        };

        $scope.novidades = 
    };
})

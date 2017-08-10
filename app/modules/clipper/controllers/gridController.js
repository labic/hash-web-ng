angular
    .module('hash.clipper')
    .controller("gridController", function($scope, $http) { 

    $scope.url = 'https://inep-hash-data-api-dev.herokuapp.com/articles';
    $scope.novidades = [];
    $scope.dados = [];
    $scope.quant = 30;
    
    //pegando todos os dados
    $http({
        url: $scope.url,
        method:'GET',
        params:{'per_page':$scope.quant}
    })
    .then(function (response) {
        angular.extend($scope.novidades, response.data.data);
    },
    function (err) {
        console.log(err);
    });

    $scope.showDialog = function(info) {
        console.log(info.headline);
        //mostrando conteúdo na modal
        document.getElementById('modalTitle').innerHTML = info.headline;
        document.getElementById('modalBody').innerHTML = info.articleBody;
        document.getElementById('modalFooter').innerHTML = '<a href="'+info.url+'" target="_blank">Ir para a notícia</a>';
        
        document.getElementById('abrirModal').style.display="block";
        
     };

    $scope.filtering = function() {
        var query='?';     //inicio de uma query
        //pegando os valores pro filtro composto
        var pesquisa = document.getElementById("taggy").value;
        var tempo = document.getElementById("selData").value;
        var categoria = document.getElementById("selCat").value;
        var produto = document.getElementById("selProd").value;
        var conteudo = document.getElementById("selCont").value;
        var alcance = document.getElementById("selAlc").value;
        var regiao = document.getElementById("selReg").value;
        
        // tratando cada valor obtido pra inserir um filtro
        if(tempo != 'undefined'){
            //temos na variável 'tempo' o dia de referência
            var horario ='';
            var d = new Date();
            //calcular o offset em tempo
            switch(tempo){
                case 'Hoje 8h':
                //tratando a hora e minutos
                    d.setHours(5);
                    d.setMinutes(0);
                    horario = d.toISOString();
                    break;
                case 'Hoje 12h':
                //tratando a hora e minutos
                    d.setHours(9);
                    d.setMinutes(0);
                    horario = d.toISOString();
                    break;
                case 'Hoje 18h':
                //tratando a hora e minutos
                    d.setHours(13);
                    d.setMinutes(0);
                    horario = d.toISOString();
                    break;
                case 'Ontem 8h':
                //reduzir um dia na data de hj
                    d.setDate(new Date().getDate()-1);
                    d.setHours(5);
                    d.setMinutes(0);
                    horario = d.toISOString();
                    break;
                case 'Ontem 12h':
                //reduzir um dia na data de hj
                    d.setDate(new Date().getDate()-1);
                    d.setHours(9);
                    d.setMinutes(0);
                    horario = d.toISOString();
                    break;
                case 'Ontem 18h':
                //reduzir um dia na data de hj
                    d.setDate(new Date().getDate()-1);
                    d.setHours(13);
                    d.setMinutes(0);
                    horario = d.toISOString();
                    break;
                default:
                //pegando a data pedida
                    d.setDate(tempo);
                    d.setHours(8);
                    d.setMinutes(0);
                    horario = d.toISOString();
                    break;
            }
            horario = horario.substring(0,(horario.length-1));  //remove o Z do iso string
            query = query.concat('data=',horario,'&');
        };

        if(pesquisa!="undefined"){
            query = query.concat('pesquisa=',pesquisa,'&');
        };

        if(categoria!='undefined'){
            query = query.concat('categoria=',categoria,'&');
        };

        if(produto!='undefined'){
            query = query.concat('produto=',produto,'&');
        };

        if(conteudo!='undefined'){
            query = query.concat('conteudo=',conteudo,'&');
        };

        if(alcance!='undefined'){
            query = query.concat('alcance=',alcance,'&');
        };

        if(regiao!='undefined'){
            query = query.concat('regiao=',regiao,'&');
        };
        
        query = query.substring(0,(query.length-1));    //remove o último '&'
        location.href = 'https://inep-enem-2017-web-dev.herokuapp.com/#/clipper'+query;
    };

    $scope.treatURL = function() {
        //pegando os valores pro filtro composto
        filterManager = createFilterManager($scope.novidades);
        var query = window.location.search.substring(1);
        var vars = query.split('&');
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');
            
            switch(pair[0]){
                case 'pesquisa':
                    textFilter = {
                            "attr":"description",  
                            "type":"text",
                            "values":pair[1],
                            "operator":"contains"
                        }
                    addFilter(filterManager,textFilter);
                    textFilter2 = {
                            "attr":"articleBody",  
                            "type":"text",
                            "values":pair[1],
                            "operator":"contains"
                        }
                    addFilter(filterManager,textFilter2);
                    textFilter3 = {
                            "attr":"headline",  
                            "type":"text",
                            "values":pair[1],
                            "operator":"contains"
                        }
                    addFilter(filterManager,textFilter3);
                    //falta pesquisar no ID
                    break;

                case 'categoria':
                    break;

                case 'data':
                //pegar data atual, colocar offset de 3h e converter pra ISO String
                    var agora = new Date().setHours(new Date().getHours()-3).toISOString();
                    //remover o Z do tempo
                    agora = agora.substring(0,(agora.length-1));
                    dataFilter = {
                        "attr":"dateCreated",
                        "type":"data",
                        "values":[pair[1],agora],
                        "operator":"between"
                    };
                    addFilter(filterManager,dataFilter);
                    break;

                case 'produto':
                    break;

                case 'conteudo':
                    break;

                case 'alcance':
                    break;

                case 'regiao':
                    break;

                default:
                    //colocar todas as notícias na variável de dados
                    break;
            }



        }
        
        console.log(getData(filterManager).length);
        data = getData(filterManager);
    };
})

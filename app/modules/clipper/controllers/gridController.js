angular
    .module('hash.clipper')
    .controller("gridController", function($scope, $http, $location) { 

    $scope.url = 'https://inep-hash-data-api-dev.herokuapp.com/articles';
    $scope.novidades = [];
    $scope.dados = [];
    $scope.quant = 30;
    $scope.numPage = 1;
    
    //pegando todos os dados
    $http({
        url: $scope.url,
        method:'GET',
        params:{'per_page':$scope.quant}
    })
    .then(function (response) {

        $scope.dados = response.data.data;

        $scope.treatURL();
        //loading more (gambiarra para melhorar)
        for(var i = 0 ; i < 3 ; i++) {
            $scope.loadMore();
        }
    },
    function (err) {
        console.log(err);
    });

    $scope.showDialog = function(info) {
        //mostrando conteúdo na modal
        document.getElementById('modalTitle').innerHTML = info.headline;
        document.getElementById('modalBody').innerHTML = info.articleBody;
        document.getElementById('modalFooter').innerHTML = '<a href="'+info.url+'" target="_blank">Ir para a notícia</a>';
        
        document.getElementById('abrirModal').style.display="block";
        
     };

     $scope.loadMore = function() {
        $scope.numPage = $scope.numPage + 1;
        //load the rest of items       
            $http({
                url: $scope.url,
                method:'GET',
                params:{'per_page':$scope.quant,'page':$scope.numPage}
            })
            .then(function (response) {

                $scope.dados = mergeArrays($scope.dados,response.data.data);

                $scope.treatURL();
            },
            function (err) {
                console.log(err);
            });
    };

    $scope.filtering = function() {
        var query='?';     //inicio de uma query
        //pegando os valores pro filtro composto
        var pesquisa = document.getElementById("taggy").value;
        var tempo = document.getElementById("selData").value;
        var categoria = document.getElementById("selCat").value;
        var produto = document.getElementById("selProd").value;
        var conteudo = document.getElementById("selCont").value;
        // var alcance = document.getElementById("selAlc").value;
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
                case 'Hoje 17h':
                //tratando a hora e minutos
                    d.setHours(12);
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
                case 'Ontem 17h':
                //reduzir um dia na data de hj
                    d.setDate(new Date().getDate()-1);
                    d.setHours(12);
                    d.setMinutes(0);
                    horario = d.toISOString();
                    break;
                default:
                //pegando a data pedida
                    d.setDate(tempo);
                    d.setHours(5);
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
            query = query.concat('tag=',categoria,'&');
        };

        if(produto!='undefined'){
            query = query.concat('tag=',produto,'&');
        };

        if(conteudo!='undefined'){
            query = query.concat('tag=',conteudo,'&');
        };

        // if(alcance!='undefined'){
        //     query = query.concat('alcance=',alcance,'&');
        // };

        if(regiao!='undefined'){
            query = query.concat('tag=',regiao,'&');
        };
                
        console.log(query);
        query = query.substring(0,(query.length-1));    //remove o último '&'
        //muda o endereço da pagina à partir do endereço base
        location.href = window.location.href.split('?')[0]+query;
        //carrega a página com a pesquisa
        location.reload();
    };

    $scope.treatURL = function() {
        var query = $location.search();
        //verifica se existe pesquisa
        if(Object.keys(query).length === 0) {
            angular.extend($scope.novidades, $scope.dados);
            return 0;
        };
        //pegando os valores pro filtro composto
        filterManager = createFilterManager($scope.dados);

        if((query.pesquisa != undefined)&(query.pesquisa != '')) {
            textFilter = {
                    "attr":"description",  
                    "type":"text",
                    "values":query.pesquisa,
                    "operator":"contains"
                }
            addFilter(filterManager,textFilter);
            $scope.novidades = mergeArrays($scope.novidades,getData(filterManager));
            removeFilter(filterManager,"description");

            textFilter2 = {
                    "attr":"articleBody",  
                    "type":"text",
                    "values":query.pesquisa,
                    "operator":"contains"
                }
            addFilter(filterManager,textFilter2);
            $scope.novidades = mergeArrays($scope.novidades,getData(filterManager));
            removeFilter(filterManager,"articleBody");

            textFilter3 = {
                    "attr":"headline",  
                    "type":"text",
                    "values":query.pesquisa,
                    "operator":"contains"
                }
            addFilter(filterManager,textFilter3);
            $scope.novidades = mergeArrays($scope.novidades,getData(filterManager));
            removeFilter(filterManager,"headline");
            
            textFilter4 = {
                    "attr":"keywords",  
                    "type":"tags",
                    "values":query.pesquisa
                }
            addFilter(filterManager,textFilter4);
            $scope.novidades = mergeArrays($scope.novidades,getData(filterManager));
            removeFilter(filterManager,"keywords");

            //falta pesquisar no ID
            //trocar o array de dados principal pelo filtrado pra continuar a pesquisa
            filterManager = createFilterManager($scope.novidades);
        }

         if((query.tag != undefined)&(query.tag != '')) {
            tagFilter = {
                "attr":"keywords",
                "type":"tags",
                "values":query.tag
            }
            addFilter(filterManager,tagFilter);
            $scope.novidades = getData(filterManager);
            //trocar o array de dados principal pelo filtrado pra continuar a pesquisa
            filterManager = createFilterManager($scope.novidades);
        }

        if((query.data != undefined)&(query.data != '')) {
            //pegar data atual, colocar offset de 3h e converter pra ISO String
            var agora = new Date();
            agora.setHours(new Date().getHours()-3);
            var limiteTempo = agora.toISOString();
            //remover o Z do tempo
            dataFilter = {
                "attr":"dateCreated",
                "type":"data",
                "values":[],
                "operator":"between"
            };
            dataFilter["values"][0] = query.data,
            dataFilter["values"][1] = limiteTempo.substring(0,(limiteTempo.length-1));
            addFilter(filterManager,dataFilter);
            $scope.novidades = getData(filterManager);
            
        }         
    };

    var mergeArrays = function(array1,array2) {

        for (index = 0; index < array2.length; ++index) {
            if(array1.indexOf(array2[index])<0){
                array1.push(array2[index]);
            }
        }
        return array1;
    };
})

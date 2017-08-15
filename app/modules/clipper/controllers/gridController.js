angular
    .module('hash.clipper')
    .controller("gridController", function($scope, $http) { 

    $scope.url = 'https://inep-hash-data-api-dev.herokuapp.com/articles';
    $scope.novidades = [];
    $scope.dados = [];
    $scope.quant = 20;
    
    //pegando todos os dados
    $http({
        url: $scope.url,
        method:'GET',
        params:{'per_page':$scope.quant}
    })
    .then(function (response) {

        $scope.dados = response.data.data;

        $scope.treatURL();
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
            query = query.concat('categoria=',categoria,'&');
        };

        if(produto!='undefined'){
            query = query.concat('produto=',produto,'&');
        };

        if(conteudo!='undefined'){
            query = query.concat('conteudo=',conteudo,'&');
        };

        // if(alcance!='undefined'){
        //     query = query.concat('alcance=',alcance,'&');
        // };

        if(regiao!='undefined'){
            query = query.concat('regiao=',regiao,'&');
        };
        
        query = query.substring(0,(query.length-1));    //remove o último '&'
        //muda o endereço da pagina à partir do endereço base
        location.href = window.location.href.split('?')[0]+query;
        //carrega a página com a pesquisa
        location.reload();
    };

    $scope.treatURL = function() {
        var query = window.location.href.split('?')[1];
        //verifica se existe pesquisa
        if(query== null) {
            angular.extend($scope.novidades, $scope.dados);
            return 0;
        };

        var vars = query.split('&');
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');
            //pegando os valores pro filtro composto
            filterManager = createFilterManager($scope.dados);
        
            switch(pair[0]){
                case 'pesquisa':

                    if(pair[1]=='')
                        break;

                    textFilter = {
                            "attr":"description",  
                            "type":"text",
                            "values":pair[1],
                            "operator":"contains"
                        }
                    addFilter(filterManager,textFilter);
                    $scope.novidades = mergeArrays($scope.novidades,getData(filterManager));

                    removeFilter(filterManager,"description");
                    textFilter2 = {
                            "attr":"articleBody",  
                            "type":"text",
                            "values":pair[1],
                            "operator":"contains"
                        }
                    addFilter(filterManager,textFilter2);
                    $scope.novidades = mergeArrays($scope.novidades,getData(filterManager));
                    
                    removeFilter(filterManager,"articleBody");
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

                    console.log("filtro de categoria");
                    break;

                case 'data':
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
                    dataFilter["values"][0] = pair[1];
                    dataFilter["values"][1] = limiteTempo.substring(0,(limiteTempo.length-1));
                    addFilter(filterManager,dataFilter);
                    break;

                case 'produto':
                    //filtrar nas tags
                    console.log("filtro de produto");
                    break;

                case 'conteudo':
                    //filtrar nas tags
                    console.log("filtro de conteudo");
                    break;

                // case 'alcance':

                //     console.log("filtro de alcance");
                //     break;

                case 'regiao':
                    //filtrar nas tags
                    console.log("filtro de regiao");
                    break;

                default:

                    console.log("filtro default");
                    //colocar todas as notícias na variável de dados
                    break;
            }


        // console.log(getData(filterManager).length);
        $scope.novidades = mergeArrays($scope.novidades,getData(filterManager));
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

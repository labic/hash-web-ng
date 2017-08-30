angular
    .module('hash.clipper')
    .controller("gridController", function($scope, $http, $location, Tweet) { 

    $scope.url = 'https://inep-hash-data-api-dev.herokuapp.com/articles';
    $scope.novidades = [];
    $scope.dados = [];
    $scope.quant = 30;
    $scope.numPage = 1;
    $scope.noticiaSelecionada = [];
    
    //pegando todos os dados
    $http({
        url: $scope.url,
        method:'GET',
        params:{'per_page':$scope.quant},
        cache: true
    })
    .then(function (response) {
        $scope.dados = response.data.data;

        //verificando modo de exibição
        if(location.href.indexOf("exibicao=") > -1) {
            document.getElementById('exibicao').value = location.href.substring(location.href.indexOf("exibicao=")+9,location.href.length);
            location.href = location.href.substring(0, location.href.indexOf("exibicao=")-1);
        };

        $scope.treatURL();
        //loading more (melhorar)
        for(var i = 0 ; i < 3 ; i++) {
            $scope.loadMore();
        }
    },
    function (err) {
        //console.log(err);
    });

    //função para manter o ng-show das notícias com imagem ou sem imagem
    $scope.exibirImagem = function () {
      var exibicao = document.getElementById('exibicao').value;

      if(exibicao == 'ComImagens') {
        return true;
      } else {
        return false;
      }
    };

    //função para editar conteúdo da div usando os dados do objeto
    $scope.showDialog = function(info) {
        //mostrando conteúdo na modal
        document.getElementById('modalTitle').innerHTML = info.headline;
        document.getElementById('modalBody').innerHTML = info.articleBody;
        document.getElementById('modalFooter').innerHTML = '<a href="'+info.url+'" target="_blank">Ir para a notícia</a>';
        
        document.getElementById('abrirModal').style.display="block";
        document.getElementById('modalTitle').blur();
     };

     //função para carregar mais notícias
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
            //console.log(err);
        });
    };

    //função para o menu de filtros chamar a página
    $scope.filtering = function() {
        var query='?';     //inicio de uma query
        //pegando os valores pro filtro composto
        var pesquisa = document.getElementById("taggy").value;
        var tempo = document.getElementById("inicioDia").value;
        var categoria = document.getElementById("selCat").value;
        var produto = document.getElementById("selProd").value;
        var conteudo = document.getElementById("selCont").value;
        // var alcance = document.getElementById("selAlc").value;
        //var regiao = document.getElementById("selReg").value;

        // tratando cada valor obtido pra inserir um filtro
        if(tempo != 'undefined'){
            //temos na variável 'tempo' o dia de referência
            var horario ='';
            var dInicio = new Date();
            var dFim = new Date();
            

            //tratando a hora e minutos
            dInicio.setDate(document.getElementById("inicioDia").value);
            dInicio.setHours(document.getElementById("inicioHora").value -3);
            dInicio.setMonth(document.getElementById("inicioMes").value);
            dInicio.setMinutes(0);

            dFim.setDate(document.getElementById("fimDia").value);
            dFim.setHours(document.getElementById("fimHora").value -3);
            dFim.setMonth(document.getElementById("fimMes").value);
            dFim.setMinutes(0);

            horario = dInicio.toISOString()+','+dFim.toISOString();
            query = query.concat('data=',horario,'&');
        };

        if((pesquisa != 'undefined')&(pesquisa != '')){
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

        // if(regiao!='undefined'){
        //     query = query.concat('tag=',regiao,'&');
        // };

        //informando o metodo de vizualização
        query = query.concat('exibicao=',document.getElementById('exibicao').value);
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
            var dias = query.data.split(',');
            
            //remover o Z do tempo
            dataFilter = {
                "attr":"dateCreated",
                "type":"data",
                "values":[],
                "operator":"between"
            };
            dataFilter["values"][0] = dias[0].substring(0,(dias[0].length-1));
            dataFilter["values"][1] = dias[1].substring(0,(dias[1].length-1));
            addFilter(filterManager,dataFilter);
            $scope.novidades = getData(filterManager);
            
        } 

    };

    //juntar arrays sem repetir notícias
    var mergeArrays = function(array1, array2) {
        for (index = 0; index < array2.length; ++index) {
            if(array1.indexOf(array2[index])<0){
                array1.push(array2[index]);
            }
        }
        return array1;
    };

    //função para pesquisa do input e das tags
    $scope.quickSearch = function(tipo,parametro) {
        if(tipo === 'pesquisa') {
            parametro = document.getElementById("taggy").value;
        };
        var exibicao = document.getElementById('exibicao').value;
        var complemento = '?'+tipo+'='+parametro+'&exibicao='+exibicao;
        //muda o endereço da pagina à partir do endereço base
        location.href = window.location.href.split('?')[0]+complemento;
        //carrega a página com a pesquisa
        location.reload();
    };

    //função para criar conjunto de notícias para relatório
})

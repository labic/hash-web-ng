angular
    .module('hash.clipper')
    .controller("gridController", function($scope, $http, $location, Tweet, $filter) { 

    $scope.url = 'https://inep-hash-data-api-dev.herokuapp.com/articles';
    $scope.novidades = [];
    $scope.dados = [];
    $scope.quant = 30;
    $scope.numPage = 1;
    $scope.noticiaSelecionada = [];
    
    //pegando todos os dados
    $scope.loadData = function() {
        $http({
            url: $scope.url,
            method:'GET',
            params:{'per_page':$scope.quant}
            //cache: true
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
            console.log("Notícia não encontrada");
            document.getElementById('notNovas').innerHTML ="<h1><b>Erro ao carregar conteúdo</b></h1><br><br><a href='#/clipper'>Atualizar</a>";
        });
    };

    $scope.adicionaNoticia = function (data) {
        //verifica se a notícia já não foi adicionada
        if($scope.noticiaSelecionada.indexOf(data)<0){
            $scope.noticiaSelecionada.push(data);
        }
        else {
            $scope.noticiaSelecionada.splice($scope.noticiaSelecionada.indexOf(data),1);
        }
    };

    $scope.geraRelatorio = function () {
        document.getElementById('modalTitle').innerHTML = 'Relatório customizado';
        var conteudo='';
        var angularDateFilter = $filter('date');
        console.log($scope.noticiaSelecionada.length);
        //percorre todas as notícias selecionadas
        for (index = 0; index < $scope.noticiaSelecionada.length; ++index) {
            conteudo = conteudo.concat('<h4><b>',$scope.noticiaSelecionada[index].headline,'</b></h4><br>');
            conteudo = conteudo.concat('Publicado em ',angularDateFilter($scope.noticiaSelecionada[index].datePublished, "dd/MM 'às' HH'h'mm"),'<br>');
            conteudo = conteudo.concat('Link interno: https://inep-enem-2017-web-dev.herokuapp.com/#/clipper/noticia?id=',$scope.noticiaSelecionada[index].id,'<br>');
            conteudo = conteudo.concat('Link externo: ',$scope.noticiaSelecionada[index].url,'<br><br>');
        }
        document.getElementById('modalBody').innerHTML = conteudo;
        document.getElementById('abrirModal').style.display="block";
    
    };

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
        document.getElementById('modalBody').innerHTML ='<a href="'+info.url+'" target="_blank">Ir para a notícia</a><br>' + info.articleBody;
        
        document.getElementById('abrirModal').style.display="block";
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
            // mostrar o que está sendo pesquisado
            document.getElementById("taggy").value = query.pesquisa;
        
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

         if((query.tagP != undefined)&(query.tagP != '')) {
            //mostrar valor do produto pesquisado
            document.getElementById("selProd").value = query.tagP;
        
            tagFilter1 = {
                "attr":"keywords",
                "type":"tags",
                "values":query.tagP
            }
            addFilter(filterManager,tagFilter1);
            $scope.novidades = mergeArrays($scope.novidades,getData(filterManager));
            //trocar o array de dados principal pelo filtrado pra continuar a pesquisa
            filterManager = createFilterManager($scope.novidades);
        }

         if((query.tagC1 != undefined)&(query.tagC1 != '')) {
            //mostrar valor do categoria pesquisado
            document.getElementById("selCat").value = query.tagC1;
        
            tagFilter2 = {
                "attr":"keywords",
                "type":"tags",
                "values":query.tagC1
            }
            addFilter(filterManager,tagFilter2);
            $scope.novidades = mergeArrays($scope.novidades,getData(filterManager));
            //trocar o array de dados principal pelo filtrado pra continuar a pesquisa
            filterManager = createFilterManager($scope.novidades);
        }

         if((query.tagC2 != undefined)&(query.tagC2 != '')) {
            //mostrar valor do conteúdo pesquisado
            document.getElementById("selCont").value = query.tagC2;

            tagFilter3 = {
                "attr":"keywords",
                "type":"tags",
                "values":query.tagC2
            }
            addFilter(filterManager,tagFilter3);
            $scope.novidades = mergeArrays($scope.novidades,getData(filterManager));
            //trocar o array de dados principal pelo filtrado pra continuar a pesquisa
            filterManager = createFilterManager($scope.novidades);
        }

        if((query.data != undefined)&(query.data != '')) {
            var dias = query.data.split(',');
            
            dataFilter = {
                "attr":"dateCreated",
                "type":"data",
                "values":[],
                "operator":"between"
            };
            //remover o Z do tempo
            dataFilter["values"][0] = dias[0].substring(0,(dias[0].length-1));
            dataFilter["values"][1] = dias[1].substring(0,(dias[1].length-1));
            addFilter(filterManager,dataFilter);
            angular.extend($scope.novidades, getData(filterManager));
            
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

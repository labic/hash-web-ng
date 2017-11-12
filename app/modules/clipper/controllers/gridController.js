angular
    .module('hash.clipper')
    .controller("gridController", function($scope, $http, $location, Tweet, $filter) { 

    $scope.url = 'https://inep-hash-data-api-dev.herokuapp.com/articles';
    $scope.keywords = [];
    $scope.dados = [];
    $scope.quant = 10;
    $scope.numPage = 1;
    $scope.noticiaSelecionada = [];
    
    //pegando todos os dados
    $scope.loadData = function(keywords,data) {
        var params;

        if(keywords.length > 1){
            if(data != undefined) {
                data = data.replace('I','/');
                params = {'per_page':$scope.quant,'page':$scope.numPage, 'filters[keywords]':keywords, 'filters[datePublished]':data};
            } else {
                params = {'per_page':$scope.quant,'page':$scope.numPage, 'filters[keywords]':keywords};
            }
        } else {
            if(data != undefined) {
                data = data.replace('I','/');
                params = {'per_page':$scope.quant,'page':$scope.numPage, 'filters[datePublished]':data};
            } else {
            params = {'per_page':$scope.quant,'page':$scope.numPage};
            }
        };


        $http({
            url: $scope.url,
            method:'GET',
            params:params
            //cache: true
        })
        .then(function (response) {
            $scope.dados = response.data.data;
        },
        function (err) {
            console.log("Notícia não encontrada");
            document.getElementById('notNovas').innerHTML ="<h1><b>Erro ao carregar conteúdo</b></h1><br><br><a href='#/clipper' onclick='javascript:location.reload();'>Página inicial</a>";
        });
    };

    $scope.deletar = function(item) {
        var r = confirm("Tem certeza que quer deletar a notícia?");
        if (r === false) {
            return;
        } 

        $http({
            url: 'https://inep-hash-data-api-dev.herokuapp.com/articles/'+item.id,
            method:'DELETE'
        })
        .then(function (response) {
            console.log('Item deletado com sucesso!');
        },
        function (rejection) {
            console.log("Erro ao deletar arquivo!");
        });

        $scope.dados.splice($scope.dados.indexOf(item),1);

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
        //percorre todas as notícias selecionadas
        for (index = 0; index < $scope.noticiaSelecionada.length; ++index) {
            conteudo = conteudo.concat('<h4><b>',$scope.noticiaSelecionada[index].headline,'</b></h4><br>');
            conteudo = conteudo.concat('Publicado em ',angularDateFilter($scope.noticiaSelecionada[index].datePublished, "dd/MM/yyyy 'às' HH'h'mm'",'UTC-4'),'<br>');
            conteudo = conteudo.concat('Link interno: https://hash-inep.labic.net/#/clipper/noticia?id=',$scope.noticiaSelecionada[index].id,'<br>');
            conteudo = conteudo.concat('Link externo: ',$scope.noticiaSelecionada[index].url,'<br><br>');
        }
        document.getElementById('modalBody').innerHTML = conteudo;
        document.getElementById('abrirModal').style.display="block";
        document.getElementsByClassName('navbar')[0].style.zIndex = '0';
    
    };

    //função para manter o ng-show das notícias com imagem ou sem imagem
    $scope.exibirImagem = function () {

        if($location.search().exibicao === 'Lista') {
        //temos que adicionar o parametro de lista na pagina
            return false;
          } else {
            return true;
                };
    };

    //função para editar conteúdo da div usando os dados do objeto
    $scope.showDialog = function(info) {
        //mostrando conteúdo na modal
        document.getElementById('modalTitle').innerHTML = info.headline;
        document.getElementById('modalBody').innerHTML ='<a href="'+info.url+'" target="_blank">Ir para a notícia</a><br>' + info.articleBody;
        
        document.getElementById('abrirModal').style.display="block";
        document.getElementsByClassName('navbar')[0].style.zIndex = '0';
    };

     //função para carregar mais notícias
    $scope.loadMore = function(offset) {

        //mudando o numero da pagina
        $scope.numPage += offset;

        //estamos na primeira página?
        if($scope.numPage < 1){
            $scope.numPage = 1;
            return;
        }

        //para carregar mais páginas, devemos verificar se há filtros ativos e qual a página atual
        var query = $location.search();

        //quando não existe parametros para considerar
        if(Object.keys(query).length === 0) {
            //sei que a pagina eh maior que UM, devo recarregar a pagina com novo numero

            //muda o endereço da pagina à partir do endereço base
            location.href = window.location.href.split('?')[0]+'?page='+$scope.numPage;
            //carrega a página com a nova paginacao
            location.reload();
            return;
        };

        //tenho pesquisa/outra pagina/modo de exibicao para considerar
        var stringURL='?page='+$scope.numPage+'&';

         //verificando modo de exibição
        if((query.exibicao != undefined)&&(query.exibicao != '')) {
            stringURL = stringURL.concat('exibicao=',query.exibicao,'&');
        };

        //verifica a pesquisa por data
        if((query.data != undefined)&&(query.data != '')) {
            stringURL = stringURL.concat('data=',query.data,'&');
        }

        //verifica a pesquisa por produto
        if((query.tagP != undefined)&&(query.tagP != '')) {
            stringURL = stringURL.concat('tagP=',query.tagP,'&');
        }

        //verifica a pesquisa por produto
        if((query.tagC != undefined)&&(query.tagC != '')) {
            stringURL = stringURL.concat('tagC=',query.tagC,'&');
        }

        //verifica a pesquisa por produto
        if((query.param != undefined)&&(query.param != '')) {
            stringURL = stringURL.concat('param=',query.param,'&');
        }

        //remove o ultimo caractere
        stringURL = stringURL.substring(0,stringURL.length-1);

        //ja podemos solicitar a nova pagina com os itens filtrados
        location.href = window.location.href.split('?')[0]+stringURL;
        //carrega a página com a nova paginacao
        location.reload();

    };

    $scope.treatURL = function() {
        var query = $location.search();
        //verifica se existe pesquisa
        if(Object.keys(query).length === 0) {
            //chama o loadData para pagina 1 sem filtros
            $scope.loadData('');
            return;
        };

        //verificando a pagina pedida
        if((query.page != undefined)&&(query.page != '')) {
            $scope.numPage = parseInt(query.page);
        };

        //criando a string de filtros
        var keywords ='';
        var data ='';

        //verifica a pesquisa por produto
        if((query.tagP != undefined)&&(query.tagP != '')) {
            //mostrar valor do produto pesquisado
            keywords = keywords.concat(query.tagP,',');
        }

        //verifica a pesquisa por categoria
        if((query.tagC != undefined)&&(query.tagC != '')) {
            //mostrar valor do categoria pesquisado
            keywords = keywords.concat(query.tagC,',');
        }

        //verifica a pesquisa por produto
        if((query.param != undefined)&&(query.param != '')) {
            //mostrar valor do produto pesquisado
            keywords = keywords.concat(query.param,',');
        }

        //remove a última vírgula
        if (keywords.length > 1)
            keywords = keywords.substring(0,keywords.length-1);

        $scope.loadData(keywords,query.data);

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
    $scope.quickSearch = function(parametro) {
        var exibicao = "&exibicao=ComImagens";
        //pegar parametro de exibicao
        if(($location.search().exibicao != undefined)&($location.search().exibicao != '')) {
            exibicao = '&exibicao='+$location.search().exibicao;
        };

        //muda o endereço da pagina à partir do endereço base
        location.href = window.location.href.split('?')[0]+'?param='+parametro+exibicao;
        //carrega a página com a pesquisa
        location.reload();
    };

})

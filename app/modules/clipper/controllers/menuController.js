angular
    .module('hash.clipper')
    .controller('menuController', [ '$scope','$location', function ($scope, $location) {

    $scope.produto = '';
    $scope.midia = '';
     
    $scope.mudarExibicao = function (type) {
      //definir se exibição das notícias será com ou sem imagem
      $location.search().exibicao = type === 0 ? 'Lista' : 'ComImagens';

      // if(Object.keys($location.search()).length === 0) {
      //   //temos que adicionar o parametro de lista na pagina
      //   location.href = window.location.href + '?exibicao=Lista';
      // } else if($location.search().exibicao === undefined) {
      //           location.href = window.location.href + '&exibicao=Lista';
      //     } else if ($location.search().exibicao === 'ComImagens') {
      //       //substituir apenas o modo de exibicao
      //           location.href = window.location.href.replace('ComImagens','Lista');
      //         } else {
      //             location.href = window.location.href.replace('Lista','ComImagens');
      //           };
    };

    $scope.atualiza = function (produto,midia) {
        var query = '?';
      //tratar data primeiro
      data1 = document.getElementById("picker1").value;
      data2 = document.getElementById("picker2").value;

      if((data1 != '')&&(data2 != '')) {
          query = query + 'data=' + data1 + 'I' + data2 + '&';
      };

      //verifica a pesquisa por produto
      if((produto != undefined)&&(produto != '')) {
          query = query + 'tagP=' + produto + '&';
      }

      //verifica a pesquisa por categoria
      if((midia != undefined)&&(midia != '')) {
          query = query + 'tagC=' + midia+ '&';
      }

      if(($location.search().exibicao != undefined)&&($location.search().exibicao != ''))
        query = query.concat('exibicao=',$location.search().exibicao,'&');

      //remove o último caractere
      query = query.substring(0,query.length-1);

      location.href = window.location.href.split('?')[0] + query;
      location.reload();

    };

    $scope.prod = [
      {label:'Educação Básica',value:'educação básica'},
      {label:'ANA',value:'ana'},
      {label:'ANEB',value:'aneb'},
      {label:'ANRESC (Prova Brasil)',value:'anresc'},
      {label:'Enceeja',value:'enceeja'},
      {label:'ENEM',value:'enem'},
      {label:'IDEB',value:'ideb'},
      {label:'SAEB',value:'saeb'},
      {label:'Educação Superior',value:'educação superior'},
      {label:'ANASEM',value:'anasem'},
      {label:'ENADE',value:'enade'},
      {label:'Indicadores de Qualidade',value:'indicadores de qualidade'},
      {label:'REVALIDA',value:'revalida'},
      {label:'SAEG',value:'saeg'},
      {label:'SINAES',value:'sinaes'},
      {label:'Institucional',value:'institucional'},
      {label:'Banco de Dados Terminológicos do Mercosul (BDT)',value:'bdt'},
      {label:'Bibliografia Brasileira da Educação (BBE)',value:'bbe'},
      {label:'Biblioteca e Arquivo Histórico da Educação Brasileira',value:'biblioteca e arquivo histórico da educação brasileira'},
      {label:'Centro de Informação e Biblioteca em Educação (Cibec)',value:'cibec'},
      {label:'Serviço de Atendimento ao Pesquisador (SAP)',value:'sap'},
      {label:'Thesaurus Brasileiro da Educação (Brased)',value:'brased'},
      {label:'Internacional',value:'internacional'},
      {label:'Agenda 2030',value:'agenda 2030'},
      {label:'ARCU-SUL',value:'arcu-sul'},
      {label:'CELPE-BRAS',value:'celpe-bras'},
      {label:'EaG',value:'eag'},
      {label:'Estudos Regionais Comparativos ERCE/LLECE',value:'erce/llece'},
      {label:'Metas Educativas 2021',value:'metas educativas 2021'},
      {label:'Pesquisa TALIS',value:'pesquisa talis'},
      {label:'PISA',value:'pisa'},
      {label:'RIACES',value:'riaces'},
      {label:'SEM',value:'sem'}
    ];

    $scope.tipoMidia = [
     // {
     //  label:'Sites'
     // },
     // {
     //  label:'Impresso'
     // },
      {
      label:'Vídeo',
      value:'video'
     },
      {
      label:'Áudio',
      value:'audio'
     }
    ];

    //função para o menu de filtros chamar a página
    $scope.setValues = function() {
        var query = $location.search();
        //verifica se existe pesquisa
        if(Object.keys(query).length === 0) {
          //não precisa atualizar nenhum valor de filtro
            return;
        };

        if((query.data != undefined)&(query.data != '')) {
            //mostrar valor do produto pesquisado
            document.getElementById("picker1").value = query.data.split('I')[0];
            document.getElementById("picker2").value = query.data.split('I')[1];
        };

       
        //verifica a pesquisa por produto
        if((query.tagP != undefined)&(query.tagP != '')) {
            //mostrar valor do produto pesquisado
            $scope.produto = query.tagP;
        };
        
        //verifica a pesquisa por categoria
        if((query.tagC != undefined)&(query.tagC != '')) {
            //mostrar valor do categoria pesquisado
            $scope.midia = query.tagC;
        };

    };

    $scope.cleanFilter = function () {
      location.href = window.location.href.split('?')[0];
      location.reload();
    };

    }]);

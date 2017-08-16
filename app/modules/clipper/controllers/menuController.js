angular
    .module('hash.clipper')
    .controller('menuController', [ '$scope',  function ($scope,$mdSidenav) {
     $scope.openLeftMenu = function() {
        $mdSidenav('left').toggle();
      };
     $scope.news = 2;
     $scope.mLat = [ 
      { 
        id: 'iconNot', 
        link: '#', 
        coverAtv: 'img/clipper/menu1_atv.PNG', 
        coverDes: 'img/clipper/menu1_des.PNG' 
      }, 
      { 
        id: 'iconGraf', 
        link: '#', 
        coverAtv: 'img/clipper/menu2_atv.PNG', 
        coverDes: 'img/clipper/menu2_des.PNG' 
      }, 
    ];
    $scope.plusOne = function (index) {
         $scope.news += 1;
        };
    $scope.minusOne = function (index) {
         $scope.news -= 1;
        };
    $scope.ultHora = [
     {
      label:'Hoje 8h'
     },
     {
      label:'Hoje 12h'
     },
      {
      label:'Hoje 17h'
     },
      {
      label:'Ontem 8h'
     },
      {
      label:'Ontem 12h'
     },
      {
      label:'Ontem 17h'
     },
      {
      label:'Outro'
     }
    ];

    $scope.categ = [
     {
      label:'Educação Básica'
     },
     {
      label:'Educação Superior'
     },
      {
      label:'Internacional'
     },
      {
      label:'Institucional'
     }
    ];

    $scope.prod = [
     {
      label:'Educação Básica',
      submenu:['SAEB','ANEB','ANRESC (Prova Brasil)','ANA','IDEB','ENEM','Enceeja']
     },
     {
      label:'Educação Superior',
      submenu:['SINAES','ENADE','ANASEM','Indicadores de Qualidade','REVALIDA','SAEG']
     },
      {
      label:'Institucional',
      submenu:['Centro de Informação e Biblioteca em Educação (Cibec)','Biblioteca e Arquivo Histórico da Educação Brasileira','Thesaurus Brasileiro da Educação (Brased)','Banco de Dados Terminológicos do Mercosul (BDT)','Bibliografia Brasileira da Educação (BBE)','Serviço de Atendimento ao Pesquisador (SAP)']
     },
      {
      label:'Internacional',
      submenu:['CELPE-BRAS','PISA','ARCU-SUL','EaG','Pesquisa TALIS','SEM','Metas Educativas 2021','Agenda 2030','RIACES','Estudos Regionais Comparativos ERCE/LLECE']
     }
    ];

    $scope.tipoCont = [
     {
      label:'Sites'
     },
     {
      label:'Impresso'
     },
      {
      label:'Vídeo'
     },
      {
      label:'Áudio'
     }
    ];

    $scope.alcance = [
     {
      label:'Alcance1'
     },
     {
      label:'Alcance2'
     },
      {
      label:'Alcance3'
     },
      {
      label:'Alcance4'
     },
      {
      label:'Outro'
     }
    ];

    $scope.regiao = [
     {
      label:'Centro-Oeste'
     },
     {
      label:'Nordeste'
     },
      {
      label:'Norte'
     },
      {
      label:'Sul'
     },
      {
      label:'Sudeste'
     }
    ];

    $scope.mSupE = [ 
      { 
        id: 'iconNext', 
        onclick: '#', 
        coverAtv: 'img/clipper/icon5.PNG'
      },
      // { 
      //   id: 'iconRef', 
      //   onclick: '#', 
      //   coverAtv: 'img/clipper/icon6.PNG' 
      // },
      // { 
      //   id: 'iconRead', 
      //   onclick: '#', 
      //   coverAtv: 'img/clipper/icon7.PNG'
      // },
    ];
    }]);
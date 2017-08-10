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
      label:'Hoje 18h'
     },
      {
      label:'Ontem 8h'
     },
      {
      label:'Ontem 12h'
     },
      {
      label:'Ontem 18h'
     },
      {
      label:'Outro'
     }
    ];

    $scope.categ = [
     {
      label:'Cat1'
     },
     {
      label:'Cat2'
     },
      {
      label:'Cat3'
     },
      {
      label:'Cat4'
     },
      {
      label:'Outro'
     }
    ];

    $scope.prod = [
     {
      label:'Educação Básica',
      value:'',
      submenu:[{label:'SAEB'},{label:'ANEB'},{label:'ANRESC (Prova Brasil)'},{label:'ANA'},{label:'IDEB'},{label:'ENEM'},{label:'Enceeja'}
      ]
     },
     {
      label:'Educação Superior',
      value:'',
      submenu:[{label:'SINAES'},{label:'ENADE'},{label:'ANASEM'},{label:'INDICADORES DE QUALIDADE'},{label:'ANASEM'},{label:'REVALIDA'},{label:'SAEG'}
      ]
     },
      {
      label:'Institucional',
      value:'',
      submenu:[{label:'Centro de Informação e Biblioteca em Educação (Cibec)'},{label:'Biblioteca e Arquivo Histórico da Educação Brasileira'},
      {label:'Thesaurus Brasileiro da Educação (Brased)'},{label:'Banco de Dados Terminológicos do Mercosul (BDT)'},{label:'Bibliografia Brasileira da Educação (BBE)'},
      {label:'Serviço de Atendimento ao Pesquisador (SAP)'}
      ]
     },
      {
      label:'Internacional',
      value:'',
      submenu:[{label:'CELPE-BRAS'},{label:'PISA'},{label:'ARCU-SUL'},{label:'EaG'},{label:'Pesquisa TALIS'},
      {label:'SEM'},{label:'Metas Educativas 2021'},{label:'Agenda 2030'},{label:'RIACES'},{label:'Estudos Regionais Comparativos ERCE/LLECE'}
      ]
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
     },
      {
      label:'Outro'
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
angular
    .module('hash.clipper')
    .controller('menuController', [ '$scope',  function ($scope) {
     
    $scope.mudarExibicao = function () {
      //definir se exibição das notícias será com ou sem imagem
      var exibicao = document.getElementById('exibicao').value;

      if(exibicao == 'ComImagens') {
        document.getElementById('exibicao').value ="Lista";
      } else {
        document.getElementById('exibicao').value ="ComImagens";
      }
    };

    $scope.relatorios = [
     {
      label:'1º Relatório dia útil (8h)',
      value: 8
     },
     {
      label:'2º Relatório dia útil (12h)',
      value: 12
     },
      {
      label:'3º Relatório dia útil (17h)',
      value: 17
     },
      {
      label:'1º Relatório FDS (12h)',
      value: 12
     },
      {
      label:'2º Relatório FDS (20h)',
      value: 20
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
      submenu:['SAEB','ANEB','ANRESC (Prova Brasil)','ANA','IDEB',
      'ENEM','Enceeja']
     },
     {
      label:'Educação Superior',
      submenu:['SINAES','ENADE','ANASEM','Indicadores de Qualidade',
      'REVALIDA','SAEG']
     },
      {
      label:'Institucional',
      submenu:['Centro de Informação e Biblioteca em Educação (Cibec)'
      ,'Biblioteca e Arquivo Histórico da Educação Brasileira','Thesaurus Brasileiro da Educação (Brased)','Banco de Dados Terminológicos do Mercosul (BDT)','Bibliografia Brasileira da Educação (BBE)','Serviço de Atendimento ao Pesquisador (SAP)']
     },
      {
      label:'Internacional',
      submenu:['CELPE-BRAS','PISA','ARCU-SUL','EaG','Pesquisa TALIS'
      ,'SEM','Metas Educativas 2021','Agenda 2030','RIACES','Estudos Regionais Comparativos ERCE/LLECE']
     }
    ];

    $scope.tipoCont = [
     // {
     //  label:'Sites'
     // },
     // {
     //  label:'Impresso'
     // },
      {
      label:'Vídeo'
     },
      {
      label:'Áudio'
     }
    ];

    // $scope.alcance = [
    //  {
    //   label:'Alcance1'
    //  },
    //  {
    //   label:'Alcance2'
    //  },
    //   {
    //   label:'Alcance3'
    //  },
    //   {
    //   label:'Alcance4'
    //  },
    //   {
    //   label:'Outro'
    //  }
    // ];

    // $scope.regiao = [
    //  {
    //   label:'Centro-Oeste'
    //  },
    //  {
    //   label:'Nordeste'
    //  },
    //   {
    //   label:'Norte'
    //  },
    //   {
    //   label:'Sul'
    //  },
    //   {
    //   label:'Sudeste'
    //  }
    // ];

    $scope.dias = [1,2,3,4,5,6,7,8,9,10,
    11,12,13,14,15,16,17,18,19,20,
    21,22,23,24,25,26,27,28,29,30,31];

    $scope.meses = [
    {
      label:'Janeiro',
      value:0
    },
    {
      label:'Fevereiro',
      value:1
    },
    {
      label:'Março',
      value:2
    },
    {
      label:'Abril',
      value:3
    },
    {
      label:'Maio',
      value:4
    },
    {
      label:'Junho',
      value:5
    },
    {
      label:'Julho',
      value:6
    },
    {
      label:'Agosto',
      value:7
    },
    {
      label:'Setembro',
      value:8
    },
    {
      label:'Outubro',
      value:9
    },
    {
      label:'Novembro',
      value:10
    },
    {
      label:'Dezembro',
      value:11
    }];

    $scope.horas = [0,1,2,3,4,5,6,7,8,9,10,
    11,12,13,14,15,16,17,18,19,20,21,22,23];

    }]);
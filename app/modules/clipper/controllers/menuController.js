angular
    .module('hash.clipper')
    .controller('menuController', [ '$scope',  function ($scope) {
     
    $scope.mudarExibicao = function () {
      var exibicao = document.getElementById('exibicao').value;

      if(exibicao == 'ComImagens') {
        document.getElementById('exibicao').value ="Lista";
      } else {
        document.getElementById('exibicao').value ="ComImagens";
      }
    };

    $scope.ultHora = [
     {
      label:'1º Relatório dia útil (8h)'
     },
     {
      label:'2º Relatório dia útil (12h)'
     },
      {
      label:'3º Relatório dia útil (17h)'
     },
      {
      label:'1º Relatório FDS (12h)'
     },
      {
      label:'2º Relatório FDS (20h)'
     },
      {
      label:'Customizado'
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

    }]);
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
            dInicio.setHours(document.getElementById("inicioHora").value +3);
            dInicio.setMonth(document.getElementById("inicioMes").value);
            dInicio.setMinutes(0);

            dFim.setDate(document.getElementById("fimDia").value);
            dFim.setHours(document.getElementById("fimHora").value +3);
            dFim.setMonth(document.getElementById("fimMes").value);
            dFim.setMinutes(0);

            horario = dInicio.toISOString()+','+dFim.toISOString();
            query = query.concat('data=',horario,'&');
        };

        if((pesquisa != 'undefined')&(pesquisa != '')){
            query = query.concat('pesquisa=',pesquisa,'&');
        };

        if(categoria!='undefined'){
            query = query.concat('tagC1=',categoria,'&');
        };

        if(produto!='undefined'){
            query = query.concat('tagP=',produto,'&');
        };

        if(conteudo!='undefined'){
            query = query.concat('tagC2=',conteudo,'&');
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

    }]);
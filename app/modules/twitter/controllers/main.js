'use strict';

/* NOTA: MONITOR - CONTROLLER */
hash.controller('mainMonitor', function ($scope, $http, settings, MetricsTwitter, 
                                         AnalyticsTwitter, WordTwitter, Tweet, WORD_API_BASE_URI) {

  $scope.settings = settings.get('twitter');

  // Variavel para inicializar o watch, quando esta falso executa um if com a inicialização da tela.
  var firstRun = false;

  // Variavel Turn que falará em qual filtro está a página.
  var turn;

  var defaultLimit = 24;

  // Conta em que pagina você está serve para a paginação.
  $scope.countpage = 0;

  // Filter: Filtro para preencher post de requisição API RPS
  $scope.filter = {
    theme: $scope.settings.keywords[1].tag,
    period: $scope.settings.period.values[1].value,
    category: undefined,
    word: undefined,
    hashTag: undefined,
    location: undefined,
    pagination:{
      analyticsTwitter:{
        paginationTweet: 1,
        paginationImages: 1,
        paginationTag: 1
      },
      analyticsWord: {}
    }
  };

  // Filter: Estrutura de requisição para requisiçõs API DAVID
  $scope.filterAnalyticsWord = function(period,word,tag,theme,category,location,limit){

    var categories = $scope.filterCategories(theme, category, location); 

    var filter = {
      where:{
        period: period,
        word: word,
        tag: tag,       
        categories:{
          all:categories,
        }
      },
      limit: limit
    };
    return filter;
  }

  $scope.changeFilterWord = function(text){
    $scope.filter.word = text;
    $scope.$apply();
  }

  $scope.filterCategories = function(theme, category, location){
    var filterCategories = []

    if(category == undefined){
      if(location == undefined){
        filterCategories = [theme];
      }else{
        filterCategories = [theme,location];
      }
    }else{
      if(location == undefined){
        filterCategories = [theme,category];
      }else{
        filterCategories = [theme,category,location];
      }
    }

    return filterCategories;
  }

  $scope.functionConteudoWord = function(){

    var wordConteudo =  WORD_API_BASE_URI+'/twitter/word_posts?filter='+$scope.analyticsWordFeed;
    $scope.loading('TwitterPosts','painel-posts-list');

    $http.get(wordConteudo).success(function (data) {

      data != '' ? $scope.sucess('TwitterPosts','painel-posts-list') : $scope.empty('TwitterPosts'); 
      $scope.twittes = data;
      //
      //        contData = Object.keys(data).length;
      //
      //        if(contData < nlimit){
      //          $scope.buttonNext = false;
      //        }else{
      //          $scope.buttonNext = true;
      //        }
    }).error(function(data, status) {
      $scope.error('TwitterPosts');
    });
  }

  $scope.functionHashTag = function(){

    $scope.loading('TwitterTopHashTags','str_hashTag');

    AnalyticsTwitter.mostRecurringHashtags(
      $scope.analyticsParams,
      function success(data) {
        data != '' ? $scope.sucess('TwitterTopHashTags','str_hashTag') : $scope.empty('TwitterTopHashTags'); 
        $scope.tags = data.splice(0,13);
      }, function (error){
        $scope.error('TwitterTopHashTags');
      });
  };

  $scope.functionWord = function(period, theme, category, location){
    var cloudWidth = $("#div3_monitor").width();
    $scope.loading('TwitterTopWords','wordCloud');

    WordTwitter.mostRecurrentWords(
      $scope.analyticsParams,
      function(data) {
        data != '' ? $scope.sucess('TwitterTopWords','wordCloud') : $scope.empty('TwitterTopWords');  
        plotWordCloud(cloudWidth, 330, 'wordCloud', data); 
      },
      function(data, status) {
        $scope.error('TwitterTopWords');
      })
  };

  $scope.functionTopTags = function(period,theme){

    var topTagsLink = "http://107.170.24.135:4025/topTags?rede=twitter&categoria="+theme+"&period="+period;
    $scope.loading('TwitterTopTags','str_topTags');

    $http.get(topTagsLink).success(function (data){
      data != '' ? $scope.sucess('TwitterTopTags','str_topTags') : $scope.empty('TwitterTopTags'); 
      $scope.topTags = data.tags.splice(0,5);
    }).error(function(data, status) {
      $scope.error('TwitterTopTags');
    });
  };

  // NOTA: Funções que REALIZAM as requisições
  $scope.functionConteudo = function(){
    var contData;

    $scope.loading('TwitterPosts','painel-posts-list');

    AnalyticsTwitter.mostRetweetedTweets(
      $scope.analyticsParams,
      function success(data) {
        data != '' ? $scope.sucess('TwitterPosts','painel-posts-list') : $scope.empty('TwitterPosts');  
        //        contData = Object.keys(data).length;
        //
        //        if(contData-2 < 24){
        //          $scope.buttonNext = false;
        //        }else{
        //          $scope.buttonNext = true;
        //        }

        $scope.twittes = data;
      }, function (error){
        $scope.error('TwitterPosts');
      });
  };
  
  $scope.functionConteudoTweets = function(){
    $scope.loading('TwitterPosts','painel-posts-list');

    Tweet.find(
      $scope.analyticsParams,
      function success(data) {
        data != '' ? $scope.sucess('TwitterPosts','painel-posts-list') : $scope.empty('TwitterPosts');  
        $scope.twittes = data;
      }, function (error){
        $scope.error('TwitterPosts');
      });
  };

  $scope.functionUser = function(){

    $scope.loading('TwitterPosts','str_TwitterUser');

    AnalyticsTwitter.mostActiveUsers(
      $scope.analyticsParams,
      function success(data) {
        data != '' ? $scope.sucess('TwitterPosts','str_TwitterUser') : $scope.empty('TwitterPosts');
        $scope.users = data;
      }, function (error){
        $scope.error('TwitterPosts');
      });
  };  

  $scope.functionMention = function(){
    $scope.loading('TwitterPosts','str_TwitterMentions');

    AnalyticsTwitter.mostMentionedUsers(
      $scope.analyticsParams,
      function success(data) {
        data != '' ? $scope.sucess('TwitterPosts','str_TwitterMentions') : $scope.empty('TwitterPosts');
        $scope.mentions = data;
      }, function (error){
        $scope.error('TwitterPosts');
      });
  };

  $scope.functionUrl = function(){
    $scope.loading('TwitterPosts','str_TwitterUrl');

    AnalyticsTwitter.mostRecurringUrls(
      $scope.analyticsParams,
      function success(data) {
        data != '' ? $scope.sucess('TwitterPosts','str_TwitterUrl') : $scope.empty('TwitterPosts');
        $scope.urls = data;
      }, function (error){
        $scope.error('TwitterPosts');
      });
  };

  function getColors(vetor, corA, corB){
    var min = d3.min(vetor, function(d){return d.count;});
    var max = d3.max(vetor, function(d){return d.count;});

    var colorScale = d3.scale
    .linear()
    .domain([min, max])
    .range([corA, corB]);

    for (var i in vetor ){
      vetor[i].cor = colorScale(vetor[i].count);
    }
    return vetor;
  };

  $scope.functionMap = function(){

    var monitorLinkMap = WORD_API_BASE_URI+'/twitter/map_volume?filter='+$scope.analyticsMap;
    $("#svg-map a path").css( "fill", "#d1e8c5" );

    $scope.legendMetade = 0;
    $scope.legendMax = 0;
    $scope.dataMapaON = true;
    $scope.textLoadDisplayMap = true;

    $http.get(monitorLinkMap).success(function (data) {
      var maxCont = 0;

      for(var x=0; x<27 ;x++){
        if(data[x].count > maxCont){
          maxCont = data[x].count;
        }
      }

      getColors(data,"#d1e8c5","#426083");

      $scope.mapAC = data[0].cor;
      $scope.mapAL = data[1].cor;
      $scope.mapAM = data[2].cor;
      $scope.mapAP = data[3].cor;
      $scope.mapBA = data[4].cor;
      $scope.mapCE = data[5].cor;
      $scope.mapDF = data[6].cor;
      $scope.mapES = data[7].cor;
      $scope.mapGO = data[8].cor;
      $scope.mapMA = data[9].cor;
      $scope.mapMG = data[10].cor;
      $scope.mapMS = data[11].cor;
      $scope.mapMT = data[12].cor;
      $scope.mapPA = data[13].cor;
      $scope.mapPB = data[14].cor;
      $scope.mapPE = data[15].cor;
      $scope.mapPI = data[16].cor;
      $scope.mapPR = data[17].cor;
      $scope.mapRJ = data[18].cor;
      $scope.mapRN = data[19].cor;
      $scope.mapRO = data[20].cor;
      $scope.mapRR = data[21].cor;
      $scope.mapRS = data[22].cor;
      $scope.mapSC = data[23].cor;
      $scope.mapSE = data[24].cor;
      $scope.mapSP = data[25].cor;
      $scope.mapTO = data[26].cor;

      $("#svg-map a path").removeAttr( "style" );

      $scope.legendMetade = Math.floor(maxCont/2);
      $scope.legendMax = maxCont;

      $scope.dataMapaON = false;
      $scope.textLoadDisplayMap = false;
    });
  };

  // NOTA: Funções que CHAMAM as funções que fazem as requisições. Cada um carrega uma parte da tela
  // All chama todas as partes da tela
  $scope.loadAll = function(period, theme, category, location){
    $scope.loadFeed();
    $scope.functionHashTag();
    $scope.functionWord(period, theme, category, location);
    $scope.functionTopTags(period, theme);
  };

  // Min chama apenas a 3º parte da tela
  $scope.loadFeed = function(){
    $scope.functionConteudo();
    $scope.functionUrl();
    $scope.functionMention();
    $scope.functionUser();
  };

  // NOTA: Colocando parametros 
  $scope.setAnalyticsParam = function(period,theme,category,location,word,tag){

    var filterTags = $scope.filterCategories(theme, category, location);

    $scope.analyticsParams = {
      period: period,
      'filter[with_tags]': filterTags,
      'filter[hashtags]': tag,
      retrive_blocked: undefined,
      page: 1,
      per_page: 25
    };

    //    $scope.analyticsImageParams = {
    //      period: period,
    //      'filter[with_tags]': filterTags,
    //      'filter[hashtags]': tag,
    //      retrive_blocked: undefined,
    //      page: 1,
    //      per_page: 100
    //    }

    $scope.analyticsWordFeed = JSON.stringify($scope.filterAnalyticsWord(period, word, tag, theme, category, location, 24));
    $scope.analyticsWordCloud = JSON.stringify($scope.filterAnalyticsWord(period, word, tag, theme, category, location, 50));
    $scope.analyticsMap = JSON.stringify($scope.filterAnalyticsWord(period, word, tag, theme, category, location));
  }

  // Função que carrega os contadores de Tweets e Imagens
  $scope.loadContadores = function(period,theme){
    Tweet.count({
      period: period,
      'filter[with_tags]': [theme]
    }, function success(res) {
      $scope.countRetweet = res.count;
    });

    Tweet.count({
      period: period,
      'filter[with_tags]': [theme],
      'filter[has]': ['media']
    }, function success(res) {
      $scope.countImage = res.count;
    });
  };

  $scope.setAnalyticsParam($scope.filter.period, $scope.filter.theme, 
                           undefined, undefined, undefined, undefined);

  // Quando o filtro mudar...
  $scope.$watch('filter', function (newFilter, oldFilter) {

    // Primeira entrada no site
    if(firstRun == false){

      //      $scope.setAnalyticsParam(newFilter.period, newFilter.theme, undefined, undefined, undefined, undefined);

      // Contadores ao iniciar a página.
      $scope.loadContadores(newFilter.period,newFilter.theme);
      $scope.functionMap();

      //      $scope.loadAll(newFilter.period, newFilter.theme, undefined, undefined);

      firstRun = true;
    }else{
      // Toda vez que for alterado alguma coisa a paginação volta a 0
      $scope.countpage = 0;
      // E... o scroll volta a ficar em cima
      $( "#painel-posts-list" ).scrollTop( "slow" );

      if(newFilter.theme != oldFilter.theme){
        $scope.setAnalyticsParam(newFilter.period, newFilter.theme, undefined, undefined, undefined, undefined);
        $scope.loadContadores(newFilter.period,newFilter.theme);
        $scope.loadAll(newFilter.period, newFilter.theme, undefined, undefined);
        $scope.functionMap();
      }

      if(newFilter.hashTag != oldFilter.hashTag){
        $scope.setAnalyticsParam(newFilter.period, newFilter.theme, undefined, undefined, undefined, newFilter.hashTag);
        $scope.loadFeed();
      }

      if(newFilter.period != oldFilter.period){
        $scope.setAnalyticsParam(newFilter.period, newFilter.theme, undefined, undefined, undefined, undefined);
        $scope.loadContadores(newFilter.period,newFilter.theme);  
        $scope.loadAll(newFilter.period, newFilter.theme, undefined, undefined);
        $scope.functionMap();
      }

      if(newFilter.location != oldFilter.location){
        $scope.setAnalyticsParam(newFilter.period, newFilter.theme, undefined, newFilter.location, undefined, undefined);
        $scope.loadAll(newFilter.period, newFilter.theme, undefined, newFilter.location);
      }

      if(newFilter.category != oldFilter.category){
        $scope.setAnalyticsParam(newFilter.period, newFilter.theme, newFilter.category, undefined, undefined, undefined);
        $scope.loadFeed();
      }

      if(newFilter.word != oldFilter.word){
        $scope.setAnalyticsParam(newFilter.period, newFilter.theme,  undefined, undefined, newFilter.word, undefined);
        $scope.functionConteudoWord();
      }
    }
  },true);
  
  /*************** Funções de tratamento ***************/

  $scope.loading = function(divId,divResult){
    $("#loading"+divId).show();
    $("#error"+divId).hide();
    $("#empty"+divId).hide();
    $("#"+divResult).hide();
  } 

  $scope.sucess = function(divId,divResult){
    $("#loading"+divId).hide();
    $("#"+divResult).show();
  } 

  $scope.empty = function(divId){
    $("#loading"+divId).hide();
    $("#empty"+divId).show();
  }  

  $scope.error = function(divId){
    $("#loading"+divId).hide();
    $("#error"+divId).show();
  } 
});
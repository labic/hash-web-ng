'use strict';

/* NOTA: MONITOR - CONTROLLER */
hash.controller('mainMonitor', function ($scope, $http, settings, MetricsTwitter, AnalyticsTwitter, WordTwitter, Tweet, WORD_API_BASE_URI) {

  $scope.config = {
    filter: settings.get('twitter.filters')
  };

  // Variavel para inicializar o watch, quando esta falso executa um if com a inicialização da tela.
  var firstRun = false;

  // Variavel Turn que falará em qual filtro está a página.
  var turn;

  var defaultLimit = 24;

  // Conta em que pagina você está serve para a paginação.
  $scope.countpage = 0;

  // Filter: Filtro para preencher post de requisição API RPS
  $scope.filter = {
    theme: $scope.config.filter.main[0].tag,
    period: "7d",
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
  function filterDavid(period,word,tag,theme,category,location,limit){

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

  // NOTA: Funções que REALIZAM as requisições
  $scope.functionConteudo = function(){
    var contData;

    $scope.dataLoadTweetON = false;
    $scope.dataLoadTweet404 = false;
    $scope.dataLoadTweetOFF = true;
    $scope.dataLoadTweetERROR = false;

    AnalyticsTwitter.mostRetweetedTweets(
      $scope.analyticsParams,
      function success(response) {
        if(response == ""){
          $scope.dataLoadTweetON = false;
          $scope.dataLoadTweetOFF = false;
          $scope.dataLoadTweet404 = true;
          $scope.dataLoadTweetERROR = false;
        }else{
          $scope.dataLoadTweetON = true;
          $scope.dataLoadTweetOFF = false;
          $scope.dataLoadTweet404 = false;
          $scope.dataLoadTweetERROR = false;
        }

        contData = Object.keys(response).length;

        if(contData-2 < 24){
          $scope.buttonNext = false;
        }else{
          $scope.buttonNext = true;
        }

        $scope.twittes = response;
      }, errorHandlerTweet
    );
  };

  $scope.functionImage = function(){

    var responseImg = [];
    var contResponseImg = 0;

    $scope.dataLoadImageON = false;
    $scope.dataLoadImage404 = false;
    $scope.dataLoadImageOFF = true;
    $scope.dataLoadImageERROR = false;

    for(var x = 1; x <= 4; x++){
      AnalyticsTwitter.mostRecurringImages(
        $scope.analyticsImageParams,
        function success(response) {

          contResponseImg++;
          responseImg = response.concat(responseImg);

          if(contResponseImg == 3){

            if(responseImg == ""){
              $scope.dataLoadImageON = false;
              $scope.dataLoadImageOFF = false;
              $scope.dataLoadImage404 = true;
              $scope.dataLoadImageERROR = false;
            }else{
              $scope.dataLoadImageON = true;
              $scope.dataLoadImageOFF = false;
              $scope.dataLoadImage404 = false;
              $scope.dataLoadImageERROR = false;
            }

            $scope.imgs = responseImg.splice(0,24);
            $scope.imgsMos = responseImg;
            $scope.imgsMos = $scope.imgsMos.concat($scope.imgs);
          }
        }, errorHandlerImage
      );
    }
  };

  $scope.functionHashTag = function(){

    $scope.dataLoadTagON = false;
    $scope.dataLoadTag404 = false;
    $scope.dataLoadTagOFF = true;
    $scope.dataLoadTagERROR = false;

    AnalyticsTwitter.mostRecurringHashtags(
      $scope.analyticsParams,
      function success(response) {

        $scope.tags = response.splice(0,13);

        if(response == ""){
          $scope.dataLoadTagON = false;
          $scope.dataLoadTagOFF = false;
          $scope.dataLoadTag404 = true;
          $scope.dataLoadTagERROR = false;
        }else{
          $scope.dataLoadTagON = true;
          $scope.dataLoadTagOFF = false;
          $scope.dataLoadTag404 = false;
          $scope.dataLoadTagERROR = false;
        }      
      }, errorHandlerTag
    );
  };

  $scope.functionWord = function(period, theme, category, location){

    var wordJson = JSON.stringify(filterDavid(period, undefined, undefined, theme, category, location, 50));

    var monitorLinkWord =  WORD_API_BASE_URI+'/twitter/top_words?filter='+wordJson;

    var cloudWidth = $("#div3_monitor").width();
    
    $scope.loadWordTagON = false;
    $scope.loadWordTag404 = false;
    $scope.loadWordTagOFF = true;
    $scope.loadWordTagERROR = false;

    $http.get(monitorLinkWord).success(function (data) {

      plotWordCloud(cloudWidth,330,"wordCloud",data); //(width,heigth,divId,url)
      $scope.words = data;

      if(data == ""){
        $scope.loadWordTagON = false;
        $scope.loadWordTagOFF = false;
        $scope.loadWordTag404 = true;
      }else{
        $scope.loadWordTag404 = false;
        $scope.loadWordTagOFF = false;
        $scope.loadWordTagON = true;
      }
    }).error(function(data, status) {
      $scope.loadWordTagERROR = true;
      $scope.loadWordTag404 = false;
      $scope.loadWordTagOFF = false;
      $scope.loadWordTagON = false;
      console.log(status);
    });

    // TODO: refactor
//    $scope.conteudos =  _.find($scope.config.filter.main, {tag: $scope.filter.theme}).children;
  };

  $scope.functionTopTags = function(period,theme){

    var topTagsLink = "http://188.166.40.27:4025/topTags?rede=twitter&categoria="+theme+"&period="+period;

    $scope.dataLoadWordON = false;
    $scope.dataLoadWord404 = false;
    $scope.dataLoadWordOFF = true;
    $scope.dataLoadWordERROR = false;

    $http.get(topTagsLink).success(function (data){

      $scope.topTags = data.tags.splice(0,5);

      if(data == ""){
        $scope.dataLoadWordON = false;
        $scope.dataLoadWordOFF = false;
        $scope.dataLoadWord404 = true;
      }else{
        $scope.dataLoadWord404 = false;
        $scope.dataLoadWordOFF = false;
        $scope.dataLoadWordON = true;
      }
    }).error(function(data, status) {
      $scope.dataLoadWordERROR = true;
      $scope.dataLoadWord404 = false;
      $scope.dataLoadWordOFF = false;
      $scope.dataLoadWordON = false;
      console.log(status);
    });
  }

  $scope.functionUrl = function(){
    AnalyticsTwitter.mostRecurringUrls(
      $scope.analyticsParams,
      function success(response) {
        if(response == ""){
          $scope.dataLoadTweetON = false;
          $scope.dataLoadTweetOFF = false;
          $scope.dataLoadTweet404 = true;
          $scope.dataLoadTweetERROR = false;
        }else{
          $scope.dataLoadTweetON = true;
          $scope.dataLoadTweetOFF = false;
          $scope.dataLoadTweet404 = false;
          $scope.dataLoadTweetERROR = false;
        }

        $scope.urls = response;
      }, errorHandlerTweet);
  }

  $scope.functionMention = function(){
    AnalyticsTwitter.mostMentionedUsers(
      $scope.analyticsParams,
      function success(response) {
        if(response == ""){
          $scope.dataLoadTweetON = false;
          $scope.dataLoadTweetOFF = false;
          $scope.dataLoadTweet404 = true;
          $scope.dataLoadTweetERROR = false;
        }else{
          $scope.dataLoadTweetON = true;
          $scope.dataLoadTweetOFF = false;
          $scope.dataLoadTweet404 = false;
          $scope.dataLoadTweetERROR = false;
        }

        $scope.mentions = response;
      }, errorHandlerTweet);
  }

  $scope.functionUser = function(){
    AnalyticsTwitter.mostActiveUsers(
      $scope.analyticsParams,
      function success(response) {
        if(response == ""){
          $scope.dataLoadTweetON = false;
          $scope.dataLoadTweetOFF = false;
          $scope.dataLoadTweet404 = true;
          $scope.dataLoadTweetERROR = false;
        }else{
          $scope.dataLoadTweetON = true;
          $scope.dataLoadTweetOFF = false;
          $scope.dataLoadTweet404 = false;
          $scope.dataLoadTweetERROR = false;
        }

        $scope.users = response;
      }, errorHandlerTweet);
  }  

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
  }

  $scope.functionMap = function(period, theme, category){

    var mapJson = JSON.stringify(filterDavid(period,undefined,undefined,theme,category,undefined,undefined));

    var monitorLinkMap = WORD_API_BASE_URI+'/twitter/map_volume?filter='+mapJson;

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

      $scope.legendMetade = maxCont/2;
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
    $scope.functionMap(period, theme, category);
  };

  // Min chama apenas a 3º parte da tela
  $scope.loadFeed = function(){
    $scope.functionConteudo();
    $scope.functionImage();
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
      per_page: 24
    }

    $scope.analyticsImageParams = {
      period: period,
      'filter[with_tags]': filterTags,
      //      'filter[with_tags]': (category === undefined ? (location === undefined ? [theme] : [theme, location]) : (location === undefined ? [theme, category] : [theme, category,location])),
      'filter[hashtags]': tag,
      retrive_blocked: undefined,
      page: 1,
      per_page: 100
    }
  }

  // Função usada para carregar mais tweets
  $scope.loadMore = function(x) {
    $scope.countpage = x + $scope.countpage;

    var nskip = $scope.countpage * 24;
    var nlimit = $scope.countpage * 24 + 24;

    if(turn == "tweet"){
      $scope.analyticsParams = {
        period: $scope.filter.period,
        'filter[with_tags]': [$scope.filter.theme],
        'filter[hashtags]': [],
        retrive_blocked: undefined,
        page: 1,
        per_page: nlimit
      }

      functionConteudo($scope.filter.period, $scope.filter.theme, undefined, undefined, undefined, undefined, nlimit, 0);

    }else if(turn == "word"){

      functionConteudo($scope.filter.period, $scope.filter.theme, undefined, undefined, $scope.filter.word, undefined, nlimit, 0);

    }else if(turn == "tag"){

      $scope.analyticsParams = {
        period: $scope.filter.period,
        'filter[with_tags]': [$scope.filter.theme],
        'filter[hashtags]': [$scope.filter.tag],
        retrive_blocked: undefined,
        page: 1,
        per_page: nlimit
      }

      functionConteudo($scope.filter.period, $scope.filter.theme, undefined, undefined, undefined, $scope.filter.tag, nlimit, 0);

    }else if(turn == "category"){

      $scope.analyticsParams = {
        period: $scope.filter.period,
        'filter[with_tags]': [$scope.filter.theme, $scope.filter.category],
        'filter[hashtags]': [],
        retrive_blocked: undefined,
        page: 1,
        per_page: nlimit
      }

      functionConteudo($scope.filter.period, $scope.filter.theme, $scope.filter.category, undefined, undefined, undefined, nlimit, 0);
    }
  };

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

  // Quando o filtro mudar...
  $scope.$watch('filter', function (newFilter, oldFilter) {

    // Primeira entrada no site
    if(firstRun == false){

      $scope.setAnalyticsParam(newFilter.period, newFilter.theme, undefined, undefined, undefined, undefined);

      // Contadores ao iniciar a página.
      $scope.loadContadores(newFilter.period,newFilter.theme);

      $scope.loadAll(newFilter.period, newFilter.theme, undefined, undefined);

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
      }
      
      if(newFilter.hashTag != oldFilter.hashTag){
        $scope.setAnalyticsParam(newFilter.period, newFilter.theme, undefined, undefined, undefined, newFilter.hashTag);
        $scope.loadFeed();
      }

      if(newFilter.period != oldFilter.period){
        $scope.setAnalyticsParam(newFilter.period, newFilter.theme, undefined, undefined, undefined, undefined);
        $scope.loadContadores(newFilter.period,newFilter.theme);  
        $scope.loadAll(newFilter.period, newFilter.theme, undefined, undefined);
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

        $scope.setMin(newFilter.period, newFilter.theme,  undefined, undefined, newFilter.word, undefined, defaultLimit, 0);
      }
    }
  },true);

  // NOTA: Retorno para erros na busca de tweet/imagem/hashtags.
  function errorHandlerTweet(err) {
    $scope.dataLoadTweetON = false;
    $scope.dataLoadTweet404 = false;
    $scope.dataLoadTweetOFF = false;
    $scope.dataLoadTweetERROR = true;
    console.log(err);
  }

  function errorHandlerImage(err) {
    $scope.dataLoadImageON = false;
    $scope.dataLoadImage404 = false;
    $scope.dataLoadImageOFF = false;
    $scope.dataLoadImageERROR = true;
    console.log(err);
  }

  function errorHandlerTag(err) {
    $scope.dataLoadTagON = false;
    $scope.dataLoadTag404 = false;
    $scope.dataLoadTagOFF = false;
    $scope.dataLoadTagERROR = true;
    console.log(err);
  }
});
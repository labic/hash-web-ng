'use strict';

/* NOTA: MONITOR - CONTROLLER */
hashTwitter.controller('mainMonitor', function ($scope, $http, MetricsTwitter, AnalyticsTwitter, WordTwitter) {

  var firstRun = false;

  $scope.categorieNumber = 0;
  $scope.countpage = 0;

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

  function functionConteudo(localTime, dataNow, linkTema, linkCategoria, linkLocalidade, word, tag, nlimit, nskip){
    var contData;

    if(word === null){

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

          if(contData-2 < nlimit){
            $scope.buttonNext = false;
          }else{
            $scope.buttonNext = true;
          }

          $scope.twittes = response;
        }, errorHandlerTweet);

    }else if(tag === null){

      var twRtJson = JSON.stringify(filterDavid($scope.filter.time, linkTema, linkCategoria, linkLocalidade, word, null, nlimit),["where","period","word","categories","all","limit"]);

      var monitorLinkTweet =  serviceBase+'word_posts?filter='+twRtJson;

      $scope.dataLoadTweetON = false;
      $scope.dataLoadTweet404 = false;
      $scope.dataLoadTweetOFF = true;
      $scope.dataLoadTweetERROR = false;

      $http.get(monitorLinkTweet).success(function (data) {

        if(data == ""){
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

        contData = Object.keys(data).length;

        console.log(contData);
        console.log(nlimit);

        if(contData < nlimit){
          $scope.buttonNext = false;
        }else{
          $scope.buttonNext = true;
        }

        $scope.twittes = data;

        //        contData = Object.keys(data).length;

        //        if((data == "") || (contData < 25)){
        //
        //          $scope.buttonNext = false;
        //
        //          $http.get($scope.monitorlinkNoRtTweet).success(function (data1) {
        //            $scope.twittes = data.concat(data1);
        //
        //            if(data1 == ""){
        //              $scope.twittes = data;
        //            }else{
        //              $scope.twittes = data.concat(data1);
        //            }
        //
        //            if((data1 == "") && (data == "")){
        //              $scope.dataLoadON = false;
        //              $scope.dataLoadOFF = false;
        //              $scope.dataLoad404 = true;
        //            }else{
        //              $scope.dataLoad404 = false;
        //              $scope.dataLoadOFF = false;
        //              $scope.dataLoadON = true;
        //            }
        //          });
        //        }else{
        //          $scope.twittes = data;
        //
        //          $scope.buttonNext = true;
        //
        //          $scope.dataLoad404 = false;
        //          $scope.dataLoadOFF = false;
        //          $scope.dataLoadON = true;
        //        }
      }).error(function(data, status) {
        $scope.dataLoadTweetERROR = true;
        $scope.dataLoadTweet404 = false;
        $scope.dataLoadTweetOFF = false;
        $scope.dataLoadTweetON = false;
        console.log(status);
      });   
    }
  };

  /* function functionNoRtConteudo(localTime, dataNow, linkTema, linkCategoria, linkLocalidade, word, tag){

    if((word === undefined) && (tag === undefined)){

      //      return baseURL+'?filter={"where":{"status.retweeted_status":{"exists":false},"categories":{"all":['+linkTema+''+linkCategoria+''+linkLocalidade+']}},"limit":25,"skip":0, "order": "status.timestamp_ms DESC"}';

      AnalyticsTwitter.mostRetweetedTweets(
        $scope.analyticsParams, 
        function success(response) {
          $scope.twittes = response;
        }, errorHandler);

    }else if(tag === undefined){

      var twNoRtJson = JSON.stringify(filterDavid($scope.filter.time, linkTema, linkCategoria, linkLocalidade, word, null, 25),["where","period","word","categories","all","limit"]);

      $scope.monitorlinkNoRtTweet =  serviceBase+'word_no_rt?filter='+twNoRtJson;

      //      $scope.monitorlinkNoRtTweet = serviceBase+'word_no_rt?filter={"where":{"period":"'+$scope.filter.time+'","word":"'+word+'","categories":{"all":['+linkTema+''+linkCategoria+''+linkLocalidade+']}},"limit":25}';

    }else if(word === undefined){

      AnalyticsTwitter.mostRetweetedTweets(
        $scope.analyticsParams, 
        function success(response) {
          $scope.twittes = response;
        }, errorHandler);

      //      $scope.monitorlinkNoRtTweet = baseURL+'?filter={"where":{"status.entities.hashtags.text":{"all":["'+tag+'"]},"status.retweeted_status":{"exists":false},"status.created_at":{"gte":"'+localTime+'","lte":"'+dataNow+'"},"categories":{"all":['+linkTema+''+linkCategoria+''+linkLocalidade+']}},"limit":25,"skip":0}';

    }
  };*/

  function functionImage(localTime, dataNow, linkTema, linkCategoria, linkLocalidade, word, tag){

    if(word === null){

      $scope.dataLoadImageON = false;
      $scope.dataLoadImage404 = false;
      $scope.dataLoadImageOFF = true;
      $scope.dataLoadImageERROR = false;

      AnalyticsTwitter.mostRetweetedImages(
        {
          period: $scope.filter.time, 
          'tags[]': [$scope.filter.tema], 
          'hashtags[]': [], 
          retrive_blocked: null, 
          page: 1, 
          per_page: 399 
        }, 
        function success(response) {
          if(response == ""){
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
          $scope.imgs = response.splice(0,24);
          $scope.imgsMos = response;
        }, errorHandlerImage);

    }else if(tag === null){

      var imgJson = JSON.stringify(filterDavid($scope.filter.time,linkTema, linkCategoria, linkLocalidade, word, null, 399),["where","period","word","categories","all","limit"]);

      var monitorLinkImage =  serviceBase+'word_images?filter='+imgJson;

      $scope.dataLoadImageON = false;
      $scope.dataLoadImage404 = false;
      $scope.dataLoadImageOFF = true;
      $scope.dataLoadImageERROR = false;

      $http.get(monitorLinkImage).success(function (data) {
        $scope.imgs = data.splice(0,24);
        $scope.imgsMos = data;
        if(data == ""){
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
      }).error(function(data, status) {
        $scope.dataLoadImageERROR = true;
        $scope.dataLoadImage404 = false;
        $scope.dataLoadImageOFF = false;
        $scope.dataLoadImageON = false;
        console.log(status);
      });

      //      $scope.monitorLinkImg = serviceBase+'word_images?filter={"where":{"period":"'+$scope.filter.time+'","word":"'+word+'","categories":{"all":['+linkTema+''+linkCategoria+''+linkLocalidade+']}},"limit":400}';

    }
  };

  function functionTag(localTime, dataNow, linkTema, linkCategoria, linkLocalidade){

    $scope.dataLoadTagON = false;
    $scope.dataLoadTag404 = false;
    $scope.dataLoadTagOFF = true;
    $scope.dataLoadTagERROR = false;

    AnalyticsTwitter.mostPopularHashtags(
      $scope.analyticsParams, 
      function success(response) {
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
        $scope.tags = response.splice(0,19);
      }, errorHandlerTag);
  };

  function functionWord(localTime, dataNow, linkTema, linkCategoria, linkLocalidade){

    var wordJson = JSON.stringify(filterDavid($scope.filter.time,linkTema,null,null,20),["where","period","categories","all","limit"]);

    var monitorLinkWord =  serviceBase+'top_words?filter='+wordJson;

    $scope.dataLoadWordON = false;
    $scope.dataLoadWord404 = false;
    $scope.dataLoadWordOFF = true;
    $scope.dataLoadWordERROR = false;

    $http.get(monitorLinkWord).success(function (data) {
      $scope.words = data;
      $scope.words = data.splice(0,11);
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

    $http.get("data/test/conteudos.json").success(function (data) {
      $scope.conteudos = data[$scope.categorieNumber];
    });
  };

  function functionMap(localTime, dataNow, linkTema, linkCategoria){

    var mapJson = JSON.stringify(filterDavid($scope.filter.time, linkTema, null, null),["where","period","categories","all"]);

    var monitorLinkMap = serviceBase+'map_volume?filter='+mapJson;

    var maxCont = 0;

    $("#svg-map a path").css( "fill", "#d1e8c5" );

    $scope.legendMetade = 0;
    $scope.legendMax = 0;

    $scope.dataMapaON = true;
    $scope.textLoadDisplayMap = true;

    $http.get(monitorLinkMap).success(function (data) {

      maxCont = 0;

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

  $scope.setAll = function(localTime, dataNow, linkTema, linkCategoria, linkLocalidade, word, tag, nlimit, nskip){
    console.log("entreiALL");

    //    functionNoRtConteudo(localTime, dataNow, linkTema, linkCategoria, linkLocalidade, word, tag);
    functionConteudo(localTime, dataNow, linkTema, linkCategoria, linkLocalidade, word, tag, nlimit, nskip);

    functionImage(localTime, dataNow, linkTema, linkCategoria, linkLocalidade, word, tag);
    functionTag(localTime, dataNow, linkTema, linkCategoria, linkLocalidade);
    functionWord(localTime, dataNow, linkTema, linkCategoria, linkLocalidade);
    functionMap(localTime, dataNow, linkTema, linkCategoria);
  };

  $scope.setHalf = function(localTime, dataNow, linkTema, linkCategoria, linkLocalidade, word, tag, nlimit, nskip){
    console.log("entreiHalf");

    //    functionNoRtConteudo(localTime, dataNow, linkTema, linkCategoria, linkLocalidade, word, tag);
    functionConteudo(localTime, dataNow, linkTema, linkCategoria, linkLocalidade, word, tag, nlimit, nskip);

    functionImage(localTime, dataNow, linkTema, linkCategoria, linkLocalidade, word, tag);
    functionTag(localTime, dataNow, linkTema, linkCategoria, linkLocalidade);
    functionWord(localTime, dataNow, linkTema, linkCategoria, linkLocalidade);
  };

  $scope.setMin = function(localTime, dataNow, linkTema, linkCategoria, linkLocalidade, word, tag, nlimit, nskip){
    console.log("entreimin");

    functionConteudo(localTime, dataNow, linkTema, linkCategoria, linkLocalidade, word, tag, nlimit, nskip);
    //    functionNoRtConteudo(localTime, dataNow, linkTema, linkCategoria, linkLocalidade, word, tag);
    functionImage(localTime, dataNow, linkTema, linkCategoria, linkLocalidade, word, tag);
  };

  $scope.loadMore = function(x) {
    $scope.countpage = x + $scope.countpage;

    var nskip = $scope.countpage * 25;
    var nlimit = $scope.countpage * 25 + 25;

    if(turn == "tweet"){
      $scope.analyticsParams = {
        period: $scope.filter.time, 
        'tags[]': [$scope.filter.tema], 
        'hashtags[]': [], 
        retrive_blocked: null, 
        page: 1, 
        per_page: nlimit 
      }

      functionConteudo($scope.filter.time, dataNow, $scope.filter.tema, null, null, null, null, nlimit, 0);

    }else if(turn == "word"){

      functionConteudo($scope.filter.time, dataNow, $scope.filter.tema, null, null, $scope.filter.word, null, nlimit, 0);

    }else if(turn == "tag"){

      $scope.analyticsParams = {
        period: $scope.filter.time, 
        'tags[]': [$scope.filter.tema], 
        'hashtags[]': [$scope.filter.tag], 
        retrive_blocked: null, 
        page: 1, 
        per_page: nlimit 
      }

      functionConteudo($scope.filter.time, dataNow, $scope.filter.tema, null, null, null, $scope.filter.tag, nlimit, 0);

    }else if(turn == "categoria"){

      $scope.analyticsParams = {
        period: $scope.filter.time, 
        'tags[]': [$scope.filter.tema, $scope.filter.categoria], 
        'hashtags[]': [], 
        retrive_blocked: null, 
        page: 1, 
        per_page: nlimit  
      }

      functionConteudo($scope.filter.time, dataNow, $scope.filter.tema, $scope.filter.categoria, null, null, null, nlimit, 0);
    }
  };

  $scope.filter = {
    tema: "tema-negros",
    time: "7d",
    categoria: null,
    word: null,
    tag: null,
    localidade: null,
    pagination:{
      analyticsTwitter:{
        paginationTweet: 1,
        paginationImages: 1,
        paginationTag: 1
      },
      analyticsWord:{

      }    
    }
  };

  function filterDavid(period,tema,categoria,localidade,word,tag,limit){
    var filter = {
      where:{
        word: word,
        tag: tag,
        period: period,
        categories:{
          all:[
            tema,
            categoria,
            localidade
          ]
        }
      },
      limit: limit
    }
    return filter;
  }

  var turn;

  $scope.$watch('filter', function (newFilter, oldFilter) {

    if(firstRun == false){

      $scope.analyticsParams = {
        period: newFilter.time, 
        'tags[]': [newFilter.tema], 
        'hashtags[]': [], 
        retrive_blocked: null, 
        page: 1, 
        per_page: 25 
      }

      turn = "tweet";

      MetricsTwitter.count({
        period: newFilter.time,
        'tags[]': [newFilter.tema]
      }, function success(res) {
        $scope.countRetweet = res.count;
      });

      MetricsTwitter.count({
        period: newFilter.time,
        'tags[]': [newFilter.tema],
        'has[]': ['media']
      }, function success(res) {
        $scope.countImage = res.count;
      });

      $scope.setAll($scope.filter.time, dataNow, newFilter.tema, null, null, null, null, 25, 0);

      firstRun = true;
    }else{

      $scope.countpage = 0;
      $( ".geralTweets_result" ).scrollTop( "slow" );

      if(newFilter.tema != oldFilter.tema){     

        turn = "tweet";

        $scope.analyticsParams = {
          period: newFilter.time, 
          'tags[]': [newFilter.tema], 
          'hashtags[]': [], 
          retrive_blocked: null, 
          page: 1, 
          per_page: 25 
        }

        MetricsTwitter.count({
          period: newFilter.time,
          'tags[]': [newFilter.tema]
        }, function success(res) {
          $scope.countRetweet = res.count;
        });

        MetricsTwitter.count({
          period: newFilter.time,
          'tags[]': [newFilter.tema],
          'has[]': ['media']
        }, function success(res) {
          $scope.countImage = res.count;
        });

        $scope.setAll($scope.timeMonitor, dataNow, newFilter.tema, null, null, null, null, 25, 0);
      }

      if(newFilter.time != oldFilter.time){

        if(turn == "tweet"){
          $scope.analyticsParams = {
            period: newFilter.time, 
            'tags[]': [newFilter.tema], 
            'hashtags[]': [], 
            retrive_blocked: null, 
            page: 1, 
            per_page: 25 
          }

          $scope.setAll($scope.filter.time, dataNow, newFilter.tema, null, null, null, null, 25, 0);

        }else if(turn == "word"){

          $scope.setAll($scope.filter.time, dataNow, newFilter.tema, null, null, newFilter.word, null, 25, 0);

        }else if(turn == "tag"){

          $scope.analyticsParams = {
            period: newFilter.time, 
            'tags[]': [newFilter.tema], 
            'hashtags[]': [], 
            retrive_blocked: null, 
            page: 1, 
            per_page: 25 
          }

          $scope.setAll($scope.filter.time, dataNow, newFilter.tema, null, null, null, newFilter.tag, 25, 0);

        }else if(turn == "categoria"){

          $scope.analyticsParams = {
            period: newFilter.time, 
            'tags[]': [newFilter.tema, newFilter.categoria], 
            'hashtags[]': [], 
            retrive_blocked: null, 
            page: 1, 
            per_page: 25 
          }

          $scope.setAll($scope.filter.time, dataNow, newFilter.tema, newFilter.categoria, null, null, null, 25, 0);
        }
      }			

      if(newFilter.localidade != oldFilter.localidade){

        $scope.analyticsParams = {
          period: newFilter.time, 
          'tags[]': [newFilter.tema], 
          'hashtags[]': [], 
          retrive_blocked: null, 
          page: 1, 
          per_page: 25 
        }

        $scope.setHalf($scope.timeMonitor, dataNow, newFilter.tema, null, newFilter.localidade, null, null, 25, 0);
      }

      if(newFilter.categoria != oldFilter.categoria){

        turn = "categoria";

        $scope.analyticsParams = {
          period: newFilter.time, 
          'tags[]': [newFilter.tema,newFilter.categoria], 
          'hashtags[]': [], 
          retrive_blocked: null, 
          page: 1, 
          per_page: 25 
        }

        $scope.setMin($scope.timeMonitor, dataNow, newFilter.tema, newFilter.categoria, null, null, null, 25, 0);
      }

      if(newFilter.word != oldFilter.word){

        turn = "word";

        $scope.setMin($scope.timeMonitor, dataNow, newFilter.tema,  null, null, newFilter.word, null, 25, 0);
      }

      if(newFilter.tag != oldFilter.tag){

        turn = "tag";

        $scope.analyticsParams = {
          period: newFilter.time, 
          'tags[]': [newFilter.tema], 
          'hashtags[]': [newFilter.tag], 
          retrive_blocked: null, 
          page: 1, 
          per_page: 25 
        }

        $scope.setMin($scope.timeMonitor, dataNow, newFilter.tema, null, null, null, newFilter.tag, 25, 0);
      }		

      if(newFilter.pagination.analyticsTwitter.paginationTweet != oldFilter.pagination.analyticsTwitter.paginationTweet){

      }
    }
  },true);

//  $scope.monitorCountTweet = baseURL+'/count?where={}';
//  $scope.monitorCountImage = baseURL+'/count?where={"status.entities.media":{"exists":true}}';

  //  MetricsTwitter.count({
  //    period: 15d,
  //    'tags[]': ['tema-negros','tema-lgbt','tema-indigena','tema-genero'],
  ////    'has[]': ['media']
  //  }, 
  //                       function success(res) {
  //    $scope.countRetweet = res.count;
  //  });

  //  MetricsTwitter.count({
  //    period: newFilter.period,
  //    'tags[]': newFilter.tags,
  //    'hashtags[]': newFilter.hashtag === null ? null : [newFilter.hashtag],
  //    'has[]': ['media']
  //  }, 
  //                       function success(res) {
  //    $scope.data.twitter.images.count = res.count;
  //  }, 
  //                       errorHandler);
  //
//  $http.get($scope.monitorCountTweet).success(function (data) {
//    $scope.countRetweet = data;
//  });
//
//  $http.get($scope.monitorCountImage).success(function (data) {
//    $scope.countImage = data;
//  });
});
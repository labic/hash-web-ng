hashTwitter.controller('mainPalavras', function ($scope, $http) {

  /*******************************/
  /* NOTA: PALAVRAS - CONTROLLER */
  /*******************************/

  var urlsun;
  var firstRun = false;

  function functionWord(time, tema){

    var wordJson = JSON.stringify(filterDavid(time,tema,null,170),["where","period","categories","all","limit"]);

    var linkWord =  serviceBase+'top_words?filter='+wordJson;

    $scope.dataLoadWordON = false;
    $scope.dataLoadWord404 = false;
    $scope.dataLoadWordOFF = true;
    $scope.dataLoadWordERROR = false;

    $http.get(linkWord).success(function (data) {
      $scope.word10 = data.splice(0,10);
      $scope.word1000 = data.splice(10,200);
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
  };

  function functionSunburst(time,tema,word,limit,height,depth,duplicity,rt,repeat){

    if(word == null){
      var SunburstJson = JSON.stringify(filterDavid(time,tema,word,limit,height,depth,duplicity,rt,repeat),["where","period","categories","all","MAX_WORDS","MAX_HEIGHT","MAX_DEPTH","duplicity","rt","repeated_text"]);
    }else{
      var SunburstJson = JSON.stringify(filterDavid(time,tema,word,limit,height,depth,duplicity,rt,repeat),["where","period","categories","all","top_words","MAX_WORDS","MAX_HEIGHT","MAX_DEPTH","duplicity","rt","repeated_text"]);
    }

    var linkSunburst =  serviceBase+'word_concur?filter='+SunburstJson;
    d3Sunburst(linkSunburst,word);
  };

  // estrutura de requisição para requisiçõs API DAVID
  function filterDavid(period,tema,word,limit,height,depth,duplicity,rt,repeat){
    var filter = {
      where:{
        word: word,
        period: period,
        categories:{
          all:[
            tema
          ]
        }
      },
      limit: limit,
      top_words: [word],
      MAX_WORDS: limit,
      MAX_HEIGHT: height,
      MAX_DEPTH: depth,
      duplicity: duplicity,
      rt: rt,
      repeated_text: repeat
    }
    return filter;
  }

  /* Variaveis globais dos parametros da requisição */
  $scope.sunburstON = true;
  $scope.sunburstOFF = false;

  $scope.filter = {
    tema: 'tema-negros',
    time: '30m',
    word: ''
  };

  $scope.cleanSunburst = function(){
    d3.select("#palavras_div2_sunburstZoom").select('svg').remove();
    d3.select("#palavras_div2_sunburstZoom").select('g').remove();
    d3.select("#palavras_div2_sunburstZoom_fixed").select('p').remove();
    d3.select("#tweets_count_ofWord").select('p').remove();
  }

  $scope.$watch('filter', function (newFilter, oldFilter) {

    if(firstRun == false){

      //      $scope.sunburstON = false;
      //      $scope.sunburstOFF = true;

      functionWord(newFilter.time, newFilter.tema);

      $scope.cleanSunburst();

      functionSunburst(newFilter.time, newFilter.tema,null,10,5,3,false,false,false);

      $scope.dataLoadON = true;
      $scope.dataLoad404 = false;
      $scope.dataLoadOFF = false;

      firstRun = true;
    }else{

      if(newFilter.time != oldFilter.time){
        functionWord(newFilter.time, newFilter.tema);

       $scope.cleanSunburst();

        functionSunburst(newFilter.time, newFilter.tema,null,10,5,3,false,false,false);
      }

      if(newFilter.word != oldFilter.word){
        $scope.sunburstON = true;
        $scope.sunburstOFF = false;

        $scope.cleanSunburst();

        console.log(newFilter.word);

        functionSunburst(newFilter.time, newFilter.tema, newFilter.word,10,5,3,false,false,false);
      }

      if(newFilter.tema != oldFilter.tema){ 
        $scope.sunburstON = true;
        $scope.sunburstOFF = false;

        functionWord(newFilter.time, newFilter.tema);

        $scope.cleanSunburst();

        functionSunburst(newFilter.time, newFilter.tema,null,10,5,3,false,false,false);
      }
    }
  },true);
});
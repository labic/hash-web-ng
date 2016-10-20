hash.controller('mainFacebook', function ($scope, $http, settings, MetricsFacebook, AnalyticsFacebook, WordFacebook) {

  // Mudancas: Estão ocorrendo modificações no codigo pois antes não havia Categorias dinamicas e Hashtags

  $scope.config = {
    filter: settings.get('facebook.filters')
  };

  // NOTA: Filtro para Ator do Facebook.
  $scope.filter = {
    time: '7d',
    profileType: 'page',
    actor: $scope.config.filter.actors[0].tag,
    word: undefined,
    theme: undefined,
    tag: undefined,
    page: 1,
    per_page: 25
  };
  
  $scope.changeFilterWord = function(text){
    $scope.filter.word = text;
    $scope.$apply();
  }

  // Functions: Estrutura de funções que chamarão por zonas da página
  // Request: AnalyticsFacebook.mostLikedPosts / AnalyticsFacebook.mostRecurringImages
  $scope.replyPost = function(time,type,actor,word,theme,tag){

    AnalyticsFacebook.mostLikedPosts({
      'period': time,
      'profile_type': type,
      'filter[with_tags]': (theme === undefined ? [actor] : [actor, theme]),
      'word': word,
      'filter[hashtags]': tag,
      'page': 1,
      'per_page': 25
    }, function success(response) {
      $scope.posts = response;
    }, errorHandler);
  }

  // Request: WordFacebook.topWords
  $scope.replyTopWords = function(time,type,actor){

    var cloudWidth = $("#div3_monitor").width();

    $scope.loadWordTagON = false;
    $scope.loadWordTagOFF = true;
    $scope.loadWordTag404 = false;
    $scope.loadWordTagERROR = false;

    WordFacebook.topWords({
      'period': time,
      'tags[]': [actor],
      'page': 1,
      'per_page': 50
    }, function success(data) {

      plotWordCloud(cloudWidth,330,"wordCloud",data);

      if(data == ""){
        $scope.loadWordTagOFF = false;
        $scope.loadWordTag404 = true;
      }else{
        $scope.loadWordTagOFF = false;
        $scope.loadWordTagON = true;
      }

    }, errorWordTag);
  }
  
  $scope.replyWordPosts = function(time,actor,word){
    WordFacebook.posts({
      'period': time,
      'tags[]': [actor],
      'word': word,
      'page': 1,
      'per_page': 25
    }, function success(data) {
      $scope.posts = data;
    }, errorHandler);
  }

  // Request: AnalyticsFacebook.mostRecurringHashtags
  $scope.replyTopHashtags = function(time,type,actor){

    $scope.loadHashTagON = false;
    $scope.loadHashTagOFF = true;
    $scope.loadHashTag404 = false;
    $scope.loadHashTagERROR = false;

    AnalyticsFacebook.mostRecurringHashtags({
      'period': time,
      'profile_type': type,
      'filter[with_tags]': [actor],
      'page': 1,
      'per_page': 13
    }, function success(data) {
      $scope.hashtags = data;
      if(data == ""){
        $scope.loadHashTagOFF = false;
        $scope.loadHashTag404 = true;
      }else{
        $scope.loadHashTagOFF = false;
        $scope.loadHashTagON = true;
      }
    }, errorHashTag);
  }

  // Request: TopTags = Themes
  $scope.replyTopTags = function(time,actor){

    var topTagsLink = "http://188.166.40.27:4025/topTags?rede=facebook&categoria="+actor+"&period="+time;

    $http.get(topTagsLink).success(function (data){

      $scope.themes = data.tags.splice(0,5);

      if(data == ""){

      }else{

      }
    }).error(function(data, status) {});
  }

  // Request: When click on Actor or time
  $scope.loadReplys = function(time,type,actor){
    $scope.replyPost(time,type,actor,undefined,undefined,undefined);
    $scope.replyTopWords(time,type,actor);
    $scope.replyTopHashtags(time,type,actor);
    $scope.replyTopTags(time,actor);
    // FUTURO: Tophashtags
  }

  // Função usada para carregar mais posts
  $scope.loadMore = function(x) {

    $scope.countpage = x + $scope.countpage;

    //    $scope.filter.page = $scope.countpage * 25;
    $scope.filter.page = $scope.countpage;
    $scope.filter.per_page = $scope.countpage * 25 + 25;
  };

  $scope.startPage = 1;

  // Watch assiste a todos os filtros presentes na página esperando alguma alteração.
  $scope.$watch('filter', function (newFilter, oldFilter) {

    $( ".geralTweets_result" ).scrollTop( "slow" );
    $scope.countpage = 0;

    if($scope.startPage == 1){

      $scope.loadReplys(newFilter.time,newFilter.profileType,newFilter.actor);

      $scope.startPage = 0;
    }else{

      if((newFilter.actor != oldFilter.actor) || (newFilter.time != oldFilter.time)){
        $scope.loadReplys(newFilter.time,newFilter.profileType,newFilter.actor);
      }
      if(newFilter.word != oldFilter.word){
        $scope.replyWordPosts(newFilter.time,newFilter.actor,newFilter.word);
      }
      if(newFilter.theme != oldFilter.theme){
        $scope.replyPost(newFilter.time,newFilter.profileType,newFilter.actor,undefined,newFilter.theme,undefined);
      }
      if(newFilter.tag != oldFilter.tag){
        $scope.replyPost(newFilter.time,newFilter.profileType,newFilter.actor,undefined,undefined,newFilter.tag);
      }
    }
  },true);

  // Handler: Tratamento de Erros das requisições
  function errorHashTag(erro) {
    $scope.loadHashTagOFF = false;
    $scope.loadHashTagERROR = true;
    console.log(erro);
  }
  
  function errorWordTag(erro) {
    $scope.loadWordTagOFF = false;
    $scope.loadWordTagERROR = true;
    console.log(erro);
  }

  function errorHandler(erro) {
    console.error(erro);
  }
});
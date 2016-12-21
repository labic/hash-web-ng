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

  // Pega a palavra selecionada no WordCloud
  $scope.changeFilterWord = function(text){
    $scope.filter.word = text;
    $scope.$apply();
  }

  // Functions: Estrutura de funções que chamarão por zonas da página
  // Request: AnalyticsFacebook.mostLikedPosts
  $scope.replyPost = function(time,type,actor,word,theme,tag){

    $scope.loading('FacebookPosts','facebookPosts');

    AnalyticsFacebook.mostLikedPosts({
      'period': time,
      'profile_type': type,
      'filter[with_tags]': (theme === undefined ? [actor] : [actor, theme]),
      'word': word,
      'filter[hashtags]': tag,
      'page': 1,
      'per_page': 25
    }, function (data){
      data != '' ? $scope.sucess('FacebookPosts','facebookPosts') : $scope.empty('FacebookPosts');  
      $scope.posts = data;
    }, function (error){
      $scope.error('FacebookPosts');
    });
  }

  // Request: WordFacebook.topWords
  $scope.replyTopWords = function(time,type,actor){

    var cloudWidth = $("#div3_monitor").width();

    $scope.loading('FacebookTopWords','wordCloud');

    WordFacebook.topWords({
      'period': time,
      'tags[]': [actor],
      'page': 1,
      'per_page': 50
    }, function (data){
      data != '' ? $scope.sucess('FacebookTopWords','wordCloud') : $scope.empty('FacebookTopWords');  
      plotWordCloud(cloudWidth,330,"wordCloud",data);
    }, function (error){
      $scope.error('FacebookTopWords');
    });
  }

  // Request: WordPosts = Clica na palavra do WordCloud
  $scope.replyWordPosts = function(time,actor,word){
    WordFacebook.posts({
      'period': time,
      'tags[]': [actor],
      'word': word,
      'page': 1,
      'per_page': 25
    }, function success(data) {
      $scope.posts = data;
    }, function (error){
      $scope.error('FacebookPosts');
    });
  }

  // Request: AnalyticsFacebook.mostRecurringHashtags
  $scope.replyTopHashtags = function(time,type,actor){
    
    $scope.loading('FacebookTopHashTags','str_hashTag');

    AnalyticsFacebook.mostRecurringHashtags({
      'period': time,
      'profile_type': type,
      'filter[with_tags]': [actor],
      'page': 1,
      'per_page': 13
    }, function (data){
      data != '' ? $scope.sucess('FacebookTopHashTags','str_hashTag') : $scope.empty('FacebookTopHashTags');
      $scope.hashtags = data;
    }, function (error){
      $scope.error('FacebookTopHashTags');
    });
  }

  // Request: TopTags = Themes
  $scope.replyTopTags = function(time,actor){

    var topTagsLink = "http://107.170.24.135:4025/topTags?rede=facebook&categoria="+actor+"&period="+time;
    
    $scope.loading('FacebookTopTags','str_topTags');

    $http.get(topTagsLink).success(function (data){
      data != '' ? $scope.sucess('FacebookTopTags','str_topTags') : $scope.empty('FacebookTopTags');
      $scope.themes = data.tags.splice(0,5);
    }).error(function(data, status) {
      $scope.error('FacebookTopTags');
    });
  }

  // Request: When click on Actor or time
  $scope.loadReplys = function(time,type,actor){
    $scope.replyPost(time,type,actor,undefined,undefined,undefined);
    $scope.replyTopWords(time,type,actor);
    $scope.replyTopHashtags(time,type,actor);
    $scope.replyTopTags(time,actor);
  }

  // Função usada para carregar mais posts
//  $scope.loadMore = function(x) {
//
//    $scope.countpage = x + $scope.countpage;
//
//    //    $scope.filter.page = $scope.countpage * 25;
//    $scope.filter.page = $scope.countpage;
//    $scope.filter.per_page = $scope.countpage * 25 + 25;
//  };

  $scope.startPage = 1;

  // Watch assiste a todos os filtros presentes na página esperando alguma alteração.
  $scope.$watch('filter', function (newFilter, oldFilter) {

    $( ".geralTweets_result" ).scrollTop( "slow" );
    $scope.countpage = 0;

    if($scope.startPage == 1){

      $scope.replyPost(newFilter.time,newFilter.profileType,newFilter.actor,undefined,undefined,undefined);

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
hash.controller('mainFacebook', function ($scope, $http, settings, MetricsFacebook, AnalyticsFacebook, FacebookPosts, WordFacebook) {

  // Mudancas: Estão ocorrendo modificações no codigo pois antes não havia Categorias dinamicas e Hashtags

  $scope.config = {
    filter: settings.get('facebook.filters')
  };

  // NOTA: Filtro para Ator do Facebook.
  $scope.filter = {
    time: $scope.config.filter.period.values[2].value,
    profileType: 'page',
    actor: $scope.config.filter.actors[0].tag,
    word: undefined,
    theme: undefined,
    tag: undefined,
    page: 1,
    per_page: 25,
    skip: 0,
    limit: 25,
    order: undefined,
    where: undefined
  };

  // Pega a palavra selecionada no WordCloud
  $scope.changeFilterWord = function (text) {
    $scope.filter.word = text;
    $scope.$apply();
  }

  // Functions: Estrutura de funções que chamarão por zonas da página
  // Request: AnalyticsFacebook.mostLikedPosts
  //TODO POG refatorar pelamor de NEO
  $scope.replyPost = function (time, type, actor, word, theme, tag) {
    $scope.loading('FacebookPosts', 'facebookPosts');
    $scope.loadContadoresFB(time, actor);

    $scope.filter.time = time;
    $scope.filter.actor = actor;
    $scope.filter.profileType = type;
    $scope.filter.word = word;
    $scope.filter.theme = theme;
    $scope.filter.tag = tag;
    // $scope.filter.where = tag;
    $scope.filter.order = ["created_time_ms DESC"];

    $scope.getFBPosts();

  };

  $scope.getFBPosts = function () {
    $scope.loading('FacebookPosts', 'facebookPosts');

    var _time;
    //acertar valores de filtros de tempo
    switch ($scope.filter.time) {
      case '1h':
        _time = 3600000;
        break;
      case '6h':
        _time = 21600000;
        break;
      case '1d':
        _time = 86400000;
        break;
      case '7d':
        _time = 604800000;
        break;
    }

    FacebookPosts.init({
      filter: {
        where: {
          created_time_ms: {
            gt: Date.now() - _time
          },
          keywords: {inq: [$scope.filter.actor]}
        },
        order: $scope.filter.order,
        skip: $scope.filter.skip, // 25, 50, 75
        limit: $scope.filter.limit,
        cache: false
      },
      'word': $scope.filter.word
    }, function (data) {
      data != '' ? $scope.sucess('FacebookPosts', 'facebookPosts') : $scope.empty('FacebookPosts');
      $scope.posts = data;
      $scope.currentCount = data.length;
      $scope.loadLessMoreButtons();
    }, function (error) {
      $scope.error('FacebookPosts');
    });
  }

  $scope.loadContadoresFB = function (period, actor) {
    FacebookPosts.count({
      period: 'P' + period.toUpperCase(),
      'filter[with_tags]': [actor]
    }, function success(res) {
      $scope.countPosts = res.count;
    });

    FacebookPosts.count({
      period: 'P' + period.toUpperCase(),
      'filter[with_tags]': [actor],
      'filter[types]': ['photo']
    }, function success(res) {
      $scope.countImage = res.count;
    });
  };

  // Request: WordFacebook.topWords
  $scope.replyTopWords = function (time, type, actor) {

    var options = {
      'width': $("#div3_monitor").width(),
      'height': 330,
      'divID': "wordCloud"
    }

    $scope.loading('FacebookTopWords', 'wordCloud');

    WordFacebook.topWords({
      'period': time,
      'tags[]': [actor],
      'page': 1,
      'per_page': 25
    }, function (data) {
      data != '' ? $scope.sucess('FacebookTopWords', 'wordCloud') : $scope.empty('FacebookTopWords');
      plotWordCloud(options, data);
    }, function (error) {
      $scope.error('FacebookTopWords');
    });
  }

  // Request: WordPosts = Clica na palavra do WordCloud
  $scope.replyWordPosts = function (time, actor, word) {
    WordFacebook.posts({
      'period': time,
      'tags[]': [actor],
      'word': word,
      'page': 1,
      'per_page': 25
    }, function success(data) {
      $scope.posts = data;
    }, function (error) {
      $scope.error('FacebookPosts');
    });
  }

  // Request: AnalyticsFacebook.mostRecurringHashtags
  $scope.replyTopHashtags = function (time, type, actor) {

    $scope.loading('FacebookTopHashTags', 'str_hashTag');
    var options = {
      'width': $("#div3_monitor").width(),
      'height': 330,
      'divID': "wordCloud"
    }

    AnalyticsFacebook.mostRecurringHashtags({
      'period': time,
      'profile_type': type,
      'filter[with_tags]': [actor],
      'page': 1,
      'per_page': 13
    }, function (data) {
      data != '' ? $scope.sucess('FacebookTopHashTags', 'str_hashTag') : $scope.empty('FacebookTopHashTags');
      // $scope.hashtags = data;
      plotWordCloud(options, data);
    }, function (error) {
      $scope.error('FacebookTopHashTags');
    });
  }

  // Request: TopTags = Themes
  $scope.replyTopTags = function (time, actor) {

    var topTagsLink = "http://107.170.24.135:4025/topTags?rede=facebook&categoria=" + actor + "&period=" + time;

    $scope.loading('FacebookTopTags', 'str_topTags');

    $http.get(topTagsLink).success(function (data) {
      data != '' ? $scope.sucess('FacebookTopTags', 'str_topTags') : $scope.empty('FacebookTopTags');
      $scope.themes = data.tags.splice(0, 5);
    }).error(function (data, status) {
      $scope.error('FacebookTopTags');
    });
  }

  // Request: TopTags = Themes
  $scope.replyTopTags = function (time, actor) {

    var topTagsLink = "http://107.170.24.135:4025/topTags?rede=facebook&categoria=" + actor + "&period=" + time;

    $scope.loading('FacebookTopTags', 'str_topTags');

    $http.get(topTagsLink).success(function (data) {
      data != '' ? $scope.sucess('FacebookTopTags', 'str_topTags') : $scope.empty('FacebookTopTags');
      $scope.themes = data.tags.splice(0, 5);
    }).error(function (data, status) {
      $scope.error('FacebookTopTags');
    });
  }

  // Request: When click on Actor or time
  $scope.loadReplys = function (time, type, actor) {
    $scope.replyPost(time, type, actor, undefined, undefined, undefined);
    $scope.replyTopWords(time, type, actor);
    $scope.replyTopHashtags(time, type, actor);
    $scope.replyTopTags(time, actor);
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

    $(".geralTweets_result").scrollTop("slow");
    $scope.countpage = 0;

    if ($scope.startPage == 1) {

      $scope.replyPost(newFilter.time, newFilter.profileType, newFilter.actor, undefined, undefined, undefined);

      $scope.startPage = 0;
    } else {

      if ((newFilter.actor != oldFilter.actor) || (newFilter.time != oldFilter.time)) {
        $scope.loadReplys(newFilter.time, newFilter.profileType, newFilter.actor);
      }
      if (newFilter.word != oldFilter.word) {
        $scope.replyWordPosts(newFilter.time, newFilter.actor, newFilter.word);
      }
      if (newFilter.theme != oldFilter.theme) {
        $scope.replyPost(newFilter.time, newFilter.profileType, newFilter.actor, undefined, newFilter.theme, undefined);
      }
      if (newFilter.tag != oldFilter.tag) {
        $scope.replyPost(newFilter.time, newFilter.profileType, newFilter.actor, undefined, undefined, newFilter.tag);
      }
    }
  }, true);

  /*************** Funções de tratamento ***************/

  $scope.loading = function (divId, divResult) {
    $("#loading" + divId).show();
    $("#error" + divId).hide();
    $("#empty" + divId).hide();
    $("#" + divResult).hide();
  }

  $scope.sucess = function (divId, divResult) {
    $("#loading" + divId).hide();
    $("#" + divResult).show();
  }

  $scope.empty = function (divId) {
    $("#loading" + divId).hide();
    $("#empty" + divId).show();
  }

  $scope.error = function (divId) {
    $("#loading" + divId).hide();
    $("#error" + divId).show();
  }

  /**
   * Function to refresh posts
   * @return getFBPosts()
   */
  $scope.fbRefresh = function () {
    $scope.getFBPosts();
  };

  /**
   * Function to set order to display FB Posts
   * @return getFBPosts()
   * @param order
   */
  $scope.setFilter = function(order){
    $scope.filter.order = order;
    $scope.getFBPosts();
  };


  $scope.loadLessMoreButtons = function () {
    $scope.buttonLess = $scope.filter.skip === 0;
    $scope.buttonMore = $scope.currentCount < $scope.filter.limit ? true : $scope.filter.skip === $scope.totalPages;
  };

  //Função para carregar mais posts
  $scope.loadMore = function (lesmor, type) {
    //TODO POG -_-'
    $scope.filter.skip = $scope.filter.skip += parseInt(lesmor);
    $scope.filter.page = ($scope.filter.skip / 25) + 1;

    switch (type) {
      case 'fbPosts':
        $scope.getFBPosts();
        break;
    }
  }

});

hash.controller('mainPalavras', function ($scope, $http, settings, CONFIG, WordTwitter) {
  $scope.config = {
    filter: settings.get('words.filters')
  };

  $scope.filter = {
    tema: $scope.config.filter.main[0].tag,
    time: $scope.config.filter.period.values[3].value,
    word: null
  };

  $scope.mandala = null;

  $scope.$watch('filter', function (newFilter, oldFilter) {

    $(".loading-palavras").show();
    $scope.dataLoadOFF = true;

    WordTwitter.mostRecurrentWords({
      'tags[]': [newFilter.tema],
      'period': newFilter.time,
      'per_page': 170,
    }, function success(data) {
      $scope.word10 = data.splice(0,10);
      $scope.word1000 = data.splice(10,200);
      $(".loading-palavras").hide();
    }, function error(err) {
      console.error('DEU ZICA!');
    });

    WordTwitter.mandala({
      'tags[]': [newFilter.tema],
      'period': newFilter.time,
      'top_word': newFilter.word,
    }, function success(data) {
      $scope.mandala = data;
      $(".loading-palavras").hide();
    }, function error(err) {

      console.error('DEU ZICA!');
    });

    $scope.dataLoadON = true;
    $scope.dataLoad404 = false;
    $scope.dataLoadOFF = false;
    // functionSunburst(newFilter.time, newFilter.tema,null,10,5,3,false,false,false);
  },true);

  /* Variaveis globais dos parametros da requisição */
  $scope.sunburstOFF = false;

});

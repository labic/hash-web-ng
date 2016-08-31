hash.controller('mainPalavras', function ($scope, $http, settings, CONFIG, WordTwitter) {
  $scope.config = {
    filter: settings.get('words.filters')
  };

  $scope.filter = {
    tema: $scope.config.filter.main[0].children[0].tag,
    title: $scope.config.filter.main[0].children[0].title,
    time: $scope.config.filter.period.values[3].value,
    number: $scope.config.filter.period.values[3].number,
    unidade: $scope.config.filter.period.values[3].time,
    word: null
  };

  $scope.mandala = null;

  $scope.$watch('filter', function (newFilter, oldFilter) {

    $(".loading-palavras").show();
    $scope.dataLoadOFF = true;

    WordTwitter.mandala({
      'tags[]': [newFilter.tema],
      'period': newFilter.time,
      'top_word': newFilter.word,
    }, function success(data) {
      $scope.mandala = data;
      $(".loading-palavras").hide();
    }, function error(err) {

      console.error('ERROR!');
    });

    $scope.dataLoadON = true;
    $scope.dataLoad404 = false;
    $scope.dataLoadOFF = false;
    // functionSunburst(newFilter.time, newFilter.tema,null,10,5,3,false,false,false);
  },true);

  /* Variaveis globais dos parametros da requisição */
  $scope.sunburstOFF = false;
});
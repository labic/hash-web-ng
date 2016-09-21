hash.controller('mainPalavras', function ($scope, $http, settings, CONFIG, WordTwitter) {
  $scope.config = {
    filter: settings.get('words.filters')
  };

  $scope.filter = {
    tag: $scope.config.filter.main[2].tag,
    title: $scope.config.filter.main[2].title,
    period: $scope.config.filter.period.values[3].value,
    number: $scope.config.filter.period.values[3].number,
    unit: $scope.config.filter.period.values[3].unit,
    word: null
  };

  $scope.mandala = null;

  $scope.$watch('filter', function (newFilter, oldFilter) {

    $(".loading-palavras").show();
    $scope.dataLoadOFF = true;

    WordTwitter.mandala({
      'tags[]': [newFilter.tag],
      'period': newFilter.period,
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
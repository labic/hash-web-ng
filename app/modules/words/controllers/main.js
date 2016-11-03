hash.controller('mainPalavras', function ($scope, $http, settings, CONFIG, WordTwitter) {
  $scope.config = {
    filter: settings.get('words.filters')
  };

  $scope.filter = {
    tag: $scope.config.filter.main[0].tag,
    title: $scope.config.filter.main[0].title,
    period: $scope.config.filter.period.values[0].value,
    number: $scope.config.filter.period.values[0].number,
    unit: $scope.config.filter.period.values[0].unit,
    word: null
  };

  $scope.mandala = null;

  $scope.$watch('filter', function (newFilter, oldFilter) {

    $("#loading").show();
    $("#error").hide();
    $("#empty").hide();
    $("#palavras_mandala").hide();

    WordTwitter.mandala({
      'tags[]': [newFilter.tag],
      'period': newFilter.period,
      'top_word': newFilter.word,
    }, function success(data) {
      if ((JSON.stringify(data.children)) != '[]'){
        $("#loading").hide();
        $("#palavras_mandala").show();
      }else{
        $("#loading").hide();
        $("#empty").show();
      }    
      $scope.mandala = data;
    }, function error(err) {
      $("#loading").hide();
      $("#error").show();
    });
  },true);

  /* Variaveis globais dos parametros da requisição */
  $scope.sunburstOFF = false;
});
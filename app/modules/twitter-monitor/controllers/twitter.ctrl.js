(function () {
  'use strict';

  angular
    .module('hash.twitter-monitor')
    .controller('TwitterMonitorCtrl', function ($scope, $filter, MetricTwitter) {
      $scope.mainTagsFilter = ['tema-negros', 'tema-lgbt', 'tema-indigena', 'tema-genero'];
      $scope.localtionsFilter = [];
      $scope.timeGranularityFilter = {
        values: [{
          key: '15 minutos', 
          value: 15 * 60 * 1000
        },{
          key: '1 hora', 
          value: 60 * 60 * 1000
        },{
          key: '1 dia', 
          value: 24 * 60 * 60 * 1000
        },{
          key: '7 dias', 
          value: 7 * 24 * 60 * 60 * 1000
        }],
        default: {
          key: '1 dia', 
          value: 24 * 60 * 60 * 1000
        }
      };
      $scope.wordsFilter = ['teste', 'brasileiro', 'sem-direitos'];
      $scope.hashtagsFilter = [];
      $scope.tweets = {
        data: [],
        limit: 25,
        skip: 0,
        count: null
      };

      $scope.filter = {
        mainTag: $scope.mainTagsFilter[0],
        //location: $scope.localtionsFilter[],
        timeGranularity: $scope.timeGranularityFilter.default,
        words: [],
        hashtags: []
      };

      $scope.$watch('filter', function(newFilter, oldFilter) {
        console.log(newFilter);

        var metricsParamsWithoutPagination = {
          since: new Date(Date.now() - newFilter.timeGranularity.value),
          until: new Date(),
          tags: newFilter.mainTag,
          hashtags: newFilter.hashtags
        }

        var metricsParamsWithPagination = metricsParamsWithoutPagination;

        MetricTwitter.count(
          metricsParamsWithoutPagination, 
          function success(response) {
            $scope.tweets.count = response.count;
          }, errorHandler);

        // TODO: Implement pagination
        MetricTwitter.topRetweets(
          metricsParamsWithPagination, 
          function success(response) {
            $scope.tweets.data = response;
          }, errorHandler);

        MetricTwitter.topHashtags(
          metricsParamsWithPagination, 
          function success(response) {
            $scope.hashtagsFilter = response;
          }, errorHandler);
      }, true);

      function errorHandler(err) {
        console.log(err);
      }
    });
})();
(function () {
  'use strict';

  angular
    .module('hash.twitter-monitor')
    .controller('TwitterMonitorCtrl', function ($scope, $filter, TwitterService) {
      $scope.mainTagsFilter = ['tema-negro', 'tema-lgbt', 'tema-indigena', 'tema-genero'];
      $scope.localtionsFilter = [];
      $scope.timeGranularityFilter = ['15m', '1h', '1d', '7d'];
      $scope.wordsFilter = ['negro', 'preto', 'macaco', 'direito', 'trabalho', 'teste', 'brasileiro', 'sem-direitos'];
      $scope.hashtagsFilter = [];
      $scope.tweets = {
        data: [],
        limit: 25,
        skip: 0
      };
      $scope.tweets.count = null;

      $scope.filter = {
        mainTag: $scope.mainTagsFilter[0],
        //location: $scope.localtionsFilter[],
        timeGranularity: $scope.timeGranularityFilter[0],
        words: [],
        hashtags: []
      };

      $scope.$watch('filter', function(newFilter, oldFilter) {
        console.log(newFilter);
        var lteFilter = new Date();
        var gteFilter = new Date();
        gteFilter.setHours(lteFilter.getHours() - 24);

        var filter = {
          where: {
            'status.created_at': {
              lte: lteFilter,
              gte: gteFilter
            },
            categories: {
              all: [newFilter.mainTag]
            }
          },
          limit: 25,
          skip: 0
        };

        if (newFilter.hashtags.length > 0) {
          filter.where['status.entities.hashtags.text'] = {
            inq: newFilter.hashtags
          }
        }

        $scope.hashtagsFilter = TwitterService.analytics.get({
          type: 'top-hashtags',
          filter: filter
        });

        $scope.tweets.data = TwitterService.analytics.get({
          type: 'top-retweets',
          filter: filter
        });
        //console.log(oldValue);
      }, true);

      // $scope.$watch('filter.mainTag', function(newValue, oldValue) {
      //   console.log(newValue);
      //   console.log(oldValue);
      // });

      // $scope.$watch('filter.location', function(newValue, oldValue) {
      //   console.log(newValue);
      //   console.log(oldValue);
      // });

      // $scope.$watch('filter.timeGranularity', function(newValue, oldValue) {
      //   console.log(newValue);
      //   console.log(oldValue);
      // });

      // $scope.$watch('filter.words', function(newValue, oldValue) {
      //   console.log(newValue);
      //   console.log(oldValue);
      // });

      // $scope.$watch('filter.hashtags', function(newValue, oldValue) {
      //   console.log(newValue);
      //   console.log(oldValue);
      // });
      //$scope.filters.handlerMainTag = function
    });
})();
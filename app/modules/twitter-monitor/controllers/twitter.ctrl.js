(function () {
  'use strict';

  angular
    .module('hash.twitter-monitor')
    .controller('TwitterMonitorCtrl', function ($scope, $filter, AnalyticsTwitter) {
      $scope.options = {
        mainTags: {},
        location: {},
        timeRanger: {}
      }; 
      $scope.data = {
        twitter: {
          tweets: {
            collection: [],
            count: 10000
          },
          images: {
            collection: [],
            count: 20000
          },
          words: { 
            collection: [
              { word: 'word1', count: 999 },
              { word: 'word2', count: 999 },
              { word: 'word3', count: 999 },
              { word: 'word4', count: 999 },
              { word: 'word5', count: 999 },
              { word: 'word6', count: 999 },
              { word: 'word7', count: 999 },
              { word: 'word8', count: 999 },
              { word: 'word9', count: 999 }
            ]
          },
          hashtags: {
            collection: [
              { hashtag: 'hashtag1', count: 999 },
              { hashtag: 'hashtag2', count: 999 },
              { hashtag: 'hashtag3', count: 999 },
              { hashtag: 'hashtag4', count: 999 },
              { hashtag: 'hashtag5', count: 999 },
              { hashtag: 'hashtag6', count: 999 },
              { hashtag: 'hashtag7', count: 999 }
            ]
          }
        }
      };
      $scope.mainTagsOptions = {
        values: [{ key: 'tema-negros', value: 'Negros' }, { key: 'tema-lgbt', value: 'LGBT' }, { key: 'tema-indigena', value: 'Índigena' }, { key: 'tema-genero', value: 'Mulher' }],
        default: 'tema-negros'
      };
      $scope.localtionsOptions = [];
      $scope.periodOptions = {
        values: [{
          key: '15 minutos', 
          value: '15m'
        },{
          key: '1 hora', 
          value: '1h'
        },{
          key: '1 dia', 
          value: '1d'
        },{
          key: '7 dias', 
          value: '7d'
        }]
      };
      $scope.periodOptions.default = $scope.periodOptions.values[2];

      $scope.filter = {
        period: $scope.periodOptions.default.value,
        mainTag: $scope.mainTagsOptions.default,
        secondaryTag: null,
        //location: localtionsOptions[],
        hashtag: null,
        word: null,
        pagination: {
          analyticsTwitter: {
            mostRetweetedTweets: 1,
            mostPopularHashtags: 1
          },
          wordTwitter: {
            status: 1
          }
        }
      };

      $scope.$watch('filter', function(newFilter, oldFilter) {
        AnalyticsTwitter.mostRetweetedTweets({
          period: newFilter.period,
          // 'tags[]': [newFilter.mainTag, newFilter.secondaryTag],
          'tags[]': [newFilter.mainTag],
          // 'hashtags[]': [newFilter.hashtag],
          retrive_blocked: false,
          page: newFilter.pagination.analyticsTwitter.mostRetweetedTweets
        }, function success(data) {
          $scope.data.twitter.tweets.collection = data;
        }, errorHandler);

        AnalyticsTwitter.mostPopularHashtags({
          period: newFilter.period,
          // 'tags[]': [newFilter.mainTag, newFilter.secondaryTag],
          'tags[]': [newFilter.mainTag],
          // 'hashtags[]': [newFilter.hashtag],
          retrive_blocked: false,
          page: newFilter.pagination.analyticsTwitter.mostPopularHashtags,
          per_page: 20
        }, function(data) {
          $scope.data.twitter.hashtags.collection = data;
        }, errorHandler);
      }, true);

      function errorHandler(err){ console.error(err); };

      // var fistRun = true;
      // $scope.$watch('filter', function(newFilter, oldFilter) {
      //   console.log(newFilter);

      //   var selectedHashtags = _.pluck(_.where(newFilter.hashtags, { select: true }), 'hashtag').join(',');
      //   var metricsParamsWithoutPagination = {
      //     since: newFilter.timeRange.since,
      //     until: newFilter.timeRange.until,
      //     tags: [newFilter.mainTag.key],
      //     hashtags: selectedHashtags === '' ? null : selectedHashtags
      //   }

      //   var metricsParamsWithPagination = metricsParamsWithoutPagination;

      //   MetricsTwitter.count(
      //     metricsParamsWithoutPagination, 
      //     function success(response) {
      //       $scope.tweets.count = response.count;
      //     }, errorHandler);

      //   // TODO: Implement pagination
      //   MetricsTwitter.topRetweets(
      //     metricsParamsWithPagination, 
      //     function success(response) {
      //       $scope.tweets.data = response;
      //       $scope.tweets.page++;
      //     }, errorHandler);

      //   if (newFilter.mainTag.key != oldFilter.mainTag.key || 
      //       newFilter.timeRange.since != oldFilter.timeRange.since ||
      //       fistRun) {
      //     MetricsTwitter.topHashtags(
      //       metricsParamsWithPagination, 
      //       function success(response) { 
      //         $scope.filter.hashtags = response;
      //       }, errorHandler);
      //   }

      //   fistRun = false;
      // }, true);

      // function errorHandler(err) {
      //   console.log(err);
      // }
    });
})();
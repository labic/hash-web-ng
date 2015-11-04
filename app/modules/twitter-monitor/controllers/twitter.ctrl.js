(function () {
  'use strict';

  angular
    .module('hash.twitter-monitor')
    .controller('TwitterMonitorCtrl', function ($scope, $filter, AnalyticsTwitter, MetricsTwitter) {
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
            collection: []
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
            mostRetweetedTweets: { page: 1, perPage: 25 },
            mostPopularHashtags: { page: 1, perPage: 20 },
            mostRetweetedImages: { page: 1, perPage: 75 },
          },
          wordTwitter: {
            status: 1
          }
        }
      };

      $scope.$watch('filter', function(newFilter, oldFilter) {
        var analyticsTwitterResourcesAndMethods = [
          { method: 'mostRetweetedTweets', dataSource: { main: 'tweets', secondary: 'collection' } }, 
          { method: 'mostPopularHashtags', dataSource: { main: 'hashtags', secondary: 'collection' } }, 
          { method: 'mostRetweetedImages', dataSource: { main: 'images', secondary: 'collection' } }, 
        ];

        analyticsTwitterResourcesAndMethods.forEach(function(resource) {
          AnalyticsTwitter[resource.method]({
            period: newFilter.period,
            // 'tags[]': [newFilter.mainTag, newFilter.secondaryTag],
            'tags[]': [newFilter.mainTag],
            // 'hashtags[]': [newFilter.hashtag],
            retrive_blocked: false,
            page: newFilter.pagination.analyticsTwitter[resource.method].page,
            per_page: newFilter.pagination.analyticsTwitter[resource.method].perPage,
          }, function success(data) {
            $scope.data.twitter[resource.dataSource.main][resource.dataSource.secondary] = data;
          }, errorHandler);
        });
      }, true);

      function errorHandler(err){ console.error(err); };
    });
})();
(function () {
  'use strict';

  angular
    .module('hash.twitter-monitor')
    .controller('TwitterMonitorCtrl', function ($scope, $filter, $http, AnalyticsTwitter, MetricsTwitter, WordTwitter) {
      var DEBUG = true;
      $http.get('/data/twitter-monitor-options.json')
        .then(function(res) {
          $scope.options = res.data;

          $scope.filter = {
            period: $scope.options.period.default,
            mainTag: $scope.options.mainTags.default,
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
        });

      $scope.data = {
        twitter: {
          tweets: {
            collection: [],
            count: null
          },
          images: {
            collection: [],
            count: null
          },
          words: { 
            collection: []
          },
          hashtags: {
            collection: []
          }
        }
      };

      $scope.$watch('filter', function(newFilter, oldFilter) {
        if (DEBUG) console.info('$scope.filter changed! %j:', newFilter);
        
        newFilter.tags = newFilter.secondaryTag === null 
                           ? [newFilter.mainTag]
                           : [newFilter.mainTag, newFilter.secondaryTag];

        AnalyticsTwitter.mostRetweetedTweets({
            period: newFilter.period,
            'tags[]': newFilter.tags,
            'hashtags[]': newFilter.hashtag === null ? null : [newFilter.hashtag],
            page: newFilter.pagination.analyticsTwitter.mostRetweetedTweets.page,
            per_page: newFilter.pagination.analyticsTwitter.mostRetweetedTweets.perPage
          }, 
          function success(res) {
            $scope.data.twitter.tweets.collection = res;
          }, 
          errorHandler);

        AnalyticsTwitter.mostRetweetedImages({
            period: newFilter.period,
            'tags[]': newFilter.tags,
            'hashtags[]': newFilter.hashtag === null ? null : [newFilter.hashtag],
            page: newFilter.pagination.analyticsTwitter.mostRetweetedImages.page,
            per_page: newFilter.pagination.analyticsTwitter.mostRetweetedImages.perPage
          }, 
          function success(res) {
            $scope.data.twitter.images.collection = res;
          }, 
          errorHandler);
          
        AnalyticsTwitter.mostPopularHashtags({
            period: newFilter.period,
            'tags[]': newFilter.tags
          }, 
          function success(res) {
            $scope.data.twitter.hashtags.collection = res;
          }, 
          errorHandler);
          
        WordTwitter.mostRecurrentWords({
          filter: {
            where: {
              period: newFilter.period,
              // word: newFilter.word,
              // tag: newFilter.mainTag,
              categories: {
                all: newFilter.tags
              }
              // skip: 0,
              // limit: 10
            }
          }
        }, function(res) {
          $scope.data.twitter.words.collection = res;
        }, errorHandler);

        MetricsTwitter.count({
            period: newFilter.period,
            'tags[]': newFilter.tags,
            'hashtags[]': newFilter.hashtag === null ? null : [newFilter.hashtag]
          }, 
          function success(res) {
            $scope.data.twitter.tweets.count = res.count;
          }, 
          errorHandler);

        MetricsTwitter.count({
            period: newFilter.period,
            'tags[]': newFilter.tags,
            'hashtags[]': newFilter.hashtag === null ? null : [newFilter.hashtag],
            'has[]': ['media']
          }, 
          function success(res) {
            $scope.data.twitter.images.count = res.count;
          }, 
          errorHandler);
      }, true);

      function errorHandler(err){ console.error(err); };
    });
})();
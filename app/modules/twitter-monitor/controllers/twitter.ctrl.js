(function () {
  'use strict';

  angular
    .module('hash.twitter-monitor')
    .controller('TwitterMonitorCtrl', function ($scope, $filter, $http, AnalyticsTwitter, MetricsTwitter, WordTwitter, Tweet) {
      var DEBUG = false;
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
                mostRetweetedImages: { page: 1, perPage: 75 }
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
        newFilter.hashtag = newItem.hashtag === null
                               ? null
                               : [newItem.hashtag];

        // AnalyticsTwitter.mostRetweetedTweets({
        //     period: newFilter.period,
        //     'tags[]': newFilter.tags,
        //     'hashtags[]': newFilter.hashtag === null ? null : [newFilter.hashtag],
        //     page: newFilter.pagination.analyticsTwitter.mostRetweetedTweets.page,
        //     per_page: newFilter.pagination.analyticsTwitter.mostRetweetedTweets.perPage
        //   }, 
        //   function success(res) {
        //     $scope.data.twitter.tweets.collection = res;
        //   }, 
        //   errorHandler);

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
              categories: {
                all: newFilter.tags
              }
            }
          }
        }, function(res) {
          $scope.data.twitter.words.collection = res;
        }, errorHandler);
          
        WordTwitter.geolocation({
          filter: {
            where: {
              period: newFilter.period,
              categories: {
                all: newFilter.tags
              }
            }
          }
        }, function(res) {
          var seriesData = [];

          var map = { 
            count: 'value'
          };

          _.map(res, function(item) { 
            var newItem = {};
            _.each(item, function(value, key) {
              key = map[key] || key;
              newItem[key] = value;
            });

            seriesData.push(newItem);
          });

          if (DEBUG) console.info('Mapped seriesData: %j', seriesData);
          $scope.config.map.series = [{ name: 'Tweets', data: seriesData, allAreas: true }];
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

        Tweet.find({
            period: newFilter.period,
            'filter[contain_tags]': newFilter.tags,
            'filter[hashtags]': newFilter.hashtag,
            //'filter[retweeted]': false
          }, 
          function success(res) {
            console.log(res);
          },
          errorHandler)
      }, true);

      function errorHandler(err){ console.error(err); };

      $scope.config = {
        map: {
          title: { text: null },
          chartType: 'map',
          options: {
            legend: {
              layout: 'horizontal',
              borderWidth: 0,
              backgroundColor: 'rgba(255,255,255,0.85)',
              verticalAlign: 'bottom'
            },
            colorAxis: {
              min: 0,
              minColor: '#EEEEFF',
              maxColor: '#000022'
            },
            plotOptions: {
              map: {
                mapData: Highcharts.maps['countries/br/br-all'],
                joinBy: ['postal-code', 'name']
              }
            }
          },
          series: [
            {
              name: 'Tweets',
              allAreas: true,
              data: []
            }
          ]
        }
      };
    });
})();
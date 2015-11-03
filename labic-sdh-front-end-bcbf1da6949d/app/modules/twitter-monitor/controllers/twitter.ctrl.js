(function () {
	'use strict';

	angular
		.module('hash.twitter-monitor')
		.controller('TwitterMonitorCtrl', function ($scope, $filter, MetricsTwitter) {
		$scope.mainTagsFilter = [
			{ key: 'tema-negros', value: 'Negros' }, 
			{ key: 'tema-lgbt', value: 'LGBT' }, 
			{ key: 'tema-indigena', value: 'Indígena' }, 
			{ key: 'tema-genero', value: 'Mulher' }];
		$scope.localtionsFilter = [];
		$scope.timeRangerFilter = {
			values: [
				{
					key: '15 minutos', 
					value: new Date(Date.now() - 15 * 60 * 1000)
				},{
					key: '1 hora', 
					value: new Date(Date.now() - 60 * 60 * 1000)
				},{
					key: '1 dia', 
					value: new Date(Date.now() - 24 * 60 * 60 * 1000)
				},{
					key: '7 dias', 
					value: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
				}]
		};
		$scope.timeRangerFilter.default = $scope.timeRangerFilter.values[2];
		$scope.tweets = {
			data: [],
			page: 1,
			count: null
		};

		$scope.filter = {
			mainTag: $scope.mainTagsFilter[0],
			//location: $scope.localtionsFilter[],
			timeRange: { 
				since: $scope.timeRangerFilter.default.value,
				until: new Date()
			},
			words: [ { word: 'teste 1', count: 100 }, { word: 'teste 2', count: 200 }, { word: 'teste 1', count: 300 } ],
			hashtags: []
		};

		var fistRun = true;
		$scope.$watch('filter', function(newFilter, oldFilter) {
			console.log(newFilter);

			var selectedHashtags = _.pluck(_.where(newFilter.hashtags, { select: true }), 'hashtag').join(',');
			
			var metricsParamsWithoutPagination = {
				since: newFilter.timeRange.since,
				until: newFilter.timeRange.until,
				tags: [newFilter.mainTag.key],
				hashtags: selectedHashtags === '' ? null : selectedHashtags
			}

			var metricsParamsWithPagination = metricsParamsWithoutPagination;

			MetricsTwitter.count(
				metricsParamsWithoutPagination, 
				function success(response) {
					$scope.tweets.count = response.count;
				}, errorHandler);

			// TODO: Implement pagination
			MetricsTwitter.topRetweets(
				metricsParamsWithPagination, 
				function success(response) {
					$scope.tweets.data = response;
					$scope.tweets.page++;
				}, errorHandler);

			if (newFilter.mainTag.key != oldFilter.mainTag.key || 
				newFilter.timeRange.since != oldFilter.timeRange.since ||
				fistRun) {
				MetricsTwitter.topHashtags(
					metricsParamsWithPagination, 
					function success(response) { 
						$scope.filter.hashtags = response;
					}, errorHandler);
			}

			fistRun = false;
		}, true);

		function errorHandler(err) {
			console.log(err);
		}
	});
})();
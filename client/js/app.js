var hashTwitter = angular.module('hashTwitter', ['ngRoute',]);

hashTwitter
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.
		when('/monitor', {
			templateUrl: 'monitor.html',
		}).
		when('/palavras', {
			templateUrl: 'palavras.html',
		}).
		when('/territorio', {
			templateUrl: 'territorio.html',
		}).
		when('/twitter', {
			templateUrl: 'twitter.html',
		}).
		when('/instagram', {
			templateUrl: 'instagram.html',
		}).
		when('/facebook', {
			templateUrl: 'facebook.html',
		}).
		when('/relatorios', {
			templateUrl: 'relatorios.html',
		}).
		otherwise({
			redirectTo: '/'
		});
	}]);
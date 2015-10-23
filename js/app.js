var hashTwitter = angular.module('hashTwitter', ['ngRoute',]);

hashTwitter
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.
		when('/monitor', {
			templateUrl: 'app/monitor.html',
		}).
		when('/palavras', {
			templateUrl: 'app/palavras.html',
		}).
		when('/territorio', {
			templateUrl: 'app/territorio.html',
		}).
		when('/twitter', {
			templateUrl: 'app/twitter.html',
		}).
		when('/instagram', {
			templateUrl: 'app/instagram.html',
		}).
		when('/facebook', {
			templateUrl: 'app/facebook.html',
		}).
		when('/relatorios', {
			templateUrl: 'app/relatorios.html',
		}).
		otherwise({
			redirectTo: '/'
		});
	}]);
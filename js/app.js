var hashTwitter = angular.module('hashTwitter', ['ui.router','ngResource']);

hashTwitter
	.config(function ($stateProvider, $urlRouterProvider){

	$stateProvider

		.state('monitor', {
		url: "/monitor",
		views: {
			"": { templateUrl: "app/monitor.html" },
			"map@monitor": { templateUrl: "app/monitor/map.html" },
			"word&Tag@monitor": { templateUrl: "app/monitor/wordTweet.html" },
			"conteudo@monitor": { templateUrl: "app/monitor/twTweet.html" }
		}
	})
		.state('monitor.word', {
		url: '',
		views: {
			"word&Tag": { templateUrl: "app/monitor/wordTweet.html" },
		}
	})
		.state('monitor.tag', {
		url: '',
		views: {
			"word&Tag": { templateUrl: "app/monitor/tagTweet.html" },
		}
	})
		.state('monitor.img', {
		url: '',
		views: {
			"conteudo": { templateUrl: "app/monitor/imgTweet.html", 
						 controller: function($scope){
							 var tamDiv = $(".geralTweets_result").css( "width" );
							 tamDiv = parseInt(tamDiv);
							 $scope.alturaImg = tamDiv / 3;
						 }
						}
		}
	})
		.state('monitor.tweet', {
		url: '',
		views: {
			"conteudo": { templateUrl: "app/monitor/twTweet.html" },
		}
	})
		.state('monitor.mosaico', {
		url: '',
		views: {
			"conteudo": { templateUrl: "app/monitor/imgMosaicoTweet.html" , 
						 controller: function($scope){
							 var tamDiv = $(".geralTweets_result").css( "width" );
							 tamDiv = parseInt(tamDiv);
							 $scope.alturaImg = tamDiv / 15;
						 }
						},
		}
	})

		.state('palavra', {
		url: "/palavras",
		views: {
			"": { templateUrl: "app/palavras.html" },
			"sunburst@palavra": { templateUrl: "app/palavra/sunburstPalavra.html" },
			"words@palavra": { templateUrl: "app/palavra/wordsPalavra.html" },
			"conteudo.tweet@palavra": { templateUrl: "app/palavra/twPalavra.html" }
		}
	})
	//	.state('palavra.sunburst', {
	//		url: '',
	//		templateUrl: "app/palavra/sunburstPalavra.html" ,
	//	})

		.state('palavra.tweet', {
		url: '',
		views: {
			"conteudo.palavra": { templateUrl: "app/palavra/twTweet.html" },
		}
	})

		.state('palavra.img', {
		url: '',
		views: {
			"conteudo.palavra": { templateUrl: "app/palavra/imgTweet.html" },
		}
	})
	;
});
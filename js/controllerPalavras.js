hashTwitter.controller('mainPalavras', function ($scope) {

	var palavrasTime;
	var palavrasTema = linkTema;
	var palavrasLinkTime = 60;

	$scope.sunburstON = true;
	$scope.sunburstOFF = false;

	$scope.changeTema = function (tema) {

		$scope.sunburstON = true;
		$scope.sunburstOFF = false;

		if(palavrasLinkTime == 60){
			palavrasTime = dataNow60;
		}else if(palavrasLinkTime == 24){
			palavrasTime = dataNow24;
		}else if(palavrasLinkTime == 7){
			palavrasTime = dataNow7;
		}

		palavrasTema = tema;

		palavraLinkWord = serviceBase+'top_words?filter={"where":{"status.created_at":{"gte":"'+palavrasTime+'","lte":"'+dataNow+'"},"categories":{"all":['+palavrasTema+']}},"limit":170}';

		urlsun = 'http://107.170.54.11:8080/word_concur?filter={"where": {"status.created_at": {"gte":"'+dataNow60+'","lte":"'+dataNow+'"}, "categories": {"all": ['+linkTema+']}}, "MAX_WORDS":10,"MAX_HEIGHT":5, "MAX_DEPTH":3, "duplicity" : "false", "rt":"false", "repeated_text":"false"}';

		d3.select("#palavras_div2_sunburstZoom").select('svg').remove();
		d3.select("#palavras_div2_sunburstZoom").select('g').remove();
		d3.select("#palavras_div2_sunburstZoom_fixed").select('p').remove();
		var word = "";
		d3Sunburst(urlsun,word);

		$scope.$emit('handleEmitPalavrasWord', palavraLinkWord);

		//		d3.select("#palavras_div2_sunburstZoom").select('svg').remove();
		//		d3.select("#palavras_div2_sunburstZoom").select('g').remove();
	};

	$scope.changeTemporalidade = function (time) {

		palavrasLinkTime = time;

		if(palavrasLinkTime == 60){
			palavrasTime = dataNow60;
		}else if(palavrasLinkTime == 24){
			palavrasTime = dataNow24;
		}else if(palavrasLinkTime == 7){
			palavrasTime = dataNow7;
		}

		palavraLinkWord = serviceBase+'top_words?filter={"where":{"status.created_at":{"gte":"'+palavrasTime+'","lte":"'+dataNow+'"},"categories":{"all":['+palavrasTema+']}},"limit":170}';

		$scope.$emit('handleEmitPalavrasWord', palavraLinkWord);
	};

	$scope.changeSunburst = function (word) {

		$scope.sunburstON = true;
		$scope.sunburstOFF = false;

		if(palavrasLinkTime == 60){
			palavrasTime = dataNow60;
		}else if(palavrasLinkTime == 24){
			palavrasTime = dataNow24;
		}else if(palavrasLinkTime == 7){
			palavrasTime = dataNow7;
		}

		urlsun = 'http://107.170.54.11:8080/word_concur?filter={"where": {"status.created_at": {"gte":"'+palavrasTime+'","lte":"'+dataNow+'"}, "categories": {"all": ['+linkTema+']}},"top_words":["'+word+'"], "MAX_WORDS":5,"MAX_HEIGHT":5, "MAX_DEPTH":3, "duplicity" : "false", "rt":"false"}';

		d3.select("#palavras_div2_sunburstZoom").select('svg').remove();
		d3.select("#palavras_div2_sunburstZoom").select('g').remove();
		d3.select("#palavras_div2_sunburstZoom_fixed").select('p').remove();

		d3Sunburst(urlsun,word);
	};
});

hashTwitter.controller('PalavrasHashPalavrasWords', ['$scope', '$http', function ($scope, $http) {

	$scope.dataLoadON = false;
	$scope.dataLoadERROR = false;
	$scope.dataLoadOFF = true;

	$http.get(palavraLinkWord).success(function (data) {
		$scope.word10 = data.splice(0,10);
		$scope.word1000 = data.splice(10,200);

		$scope.dataLoadON = true;
		$scope.dataLoadERROR = false;
		$scope.dataLoadOFF = false;
	});

	$scope.$on('handleBroadcastPalavrasWord', function(event, args) {

		$scope.dataLoadON = false;
		$scope.dataLoadERROR = false;
		$scope.dataLoadOFF = true;

		$http.get(args).success(function (data) {
			$scope.word10 = data.splice(0,10);
			$scope.word1000 = data.splice(10,200);

			$scope.dataLoadON = true;
			$scope.dataLoadERROR = false;
			$scope.dataLoadOFF = false;
		});
	}); 

	$http.get(palavraCountWord).success(function (data1) {
		$scope.countTweets = data1;
	});

	$scope.search = {
		text: '',
		word: /^\s*\w*\s*$/
	};
}]);

hashTwitter.controller('PalavrasSearchForm', ['$scope', function($scope) {

}]);
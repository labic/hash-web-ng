hashTwitter.controller('mainPalavras', function ($scope, $http) {

	/*******************************/
	/* NOTA: PALAVRAS - CONTROLLER */
	/*******************************/

	//	var palavraLinkWord;
	var urlsun;
	var firstRun = false;

	/* Variaveis globais dos parametros da requisição */

	$scope.sunburstON = false;
	$scope.sunburstOFF = true;

	$scope.filter = {
		tema: '%22tema-negros%22',
		time: '60',
		word: ''
	};

	$scope.$watch('filter', function (newFilter, oldFilter) {
		console.log(newFilter);
		if(firstRun == false){
			$scope.timePalavras = transformTime(newFilter.time);

			$scope.sunburstON = true;
			$scope.sunburstOFF = false;

			$scope.palavraLinkWord = serviceBase+'top_words?filter={"where":{"status.created_at":{"gte":"'+$scope.timePalavras+'","lte":"'+dataNow+'"},"categories":{"all":['+newFilter.tema+']}},"limit":170}';

			urlsun = 'http://107.170.54.11:8080/word_concur?filter={"where": {"status.created_at": {"gte":"'+$scope.timePalavras+'","lte":"'+dataNow+'"}, "categories": {"all": ['+newFilter.tema+']}}, "MAX_WORDS":10,"MAX_HEIGHT":5, "MAX_DEPTH":3, "duplicity" : "false", "rt":"false", "repeated_text":"false"}';

			d3.select("#palavras_div2_sunburstZoom").select('svg').remove();
			d3.select("#palavras_div2_sunburstZoom").select('g').remove();
			d3.select("#palavras_div2_sunburstZoom_fixed").select('p').remove();

			newFilter.word = "";

			d3Sunburst(urlsun,newFilter.word);

			firstRun = true;
		}else{

			if(newFilter.time != oldFilter.time){
				$scope.timePalavras = transformTime($scope.filter.time);

				$scope.palavraLinkWord = serviceBase+'top_words?filter={"where":{"status.created_at":{"gte":"'+$scope.timePalavras+'","lte":"'+dataNow+'"},"categories":{"all":['+$scope.filter.tema+']}},"limit":170}';
			}

			if(newFilter.word != oldFilter.word){
				$scope.sunburstON = true;
				$scope.sunburstOFF = false;

				urlsun = 'http://107.170.54.11:8080/word_concur?filter={"where": {"status.created_at": {"gte":"'+$scope.timePalavras+'","lte":"'+dataNow+'"}, "categories": {"all": ['+$scope.filter.tema+']}},"top_words":["'+$scope.filter.word+'"], "MAX_WORDS":5,"MAX_HEIGHT":5, "MAX_DEPTH":3, "duplicity" : "false", "rt":"false"}';

				var palavrasCountTweet = baseURL+'/count?where={"word":}';
				var palavrasCountImage = baseURL+'/count?where={"status.entities.media":{"exists":true},"word":}';

				d3.select("#palavras_div2_sunburstZoom").select('svg').remove();
				d3.select("#palavras_div2_sunburstZoom").select('g').remove();
				d3.select("#palavras_div2_sunburstZoom_fixed").select('p').remove();

				d3Sunburst(urlsun,$scope.filter.word);
			}

			if(newFilter.tema != oldFilter.tema){ 
				$scope.sunburstON = true;
				$scope.sunburstOFF = false;

				$scope.palavraLinkWord = serviceBase+'top_words?filter={"where":{"status.created_at":{"gte":"'+$scope.timePalavras+'","lte":"'+dataNow+'"},"categories":{"all":['+$scope.filter.tema+']}},"limit":170}';

				urlsun = 'http://107.170.54.11:8080/word_concur?filter={"where": {"status.created_at": {"gte":"'+$scope.timePalavras+'","lte":"'+dataNow+'"}, "categories": {"all": ['+$scope.filter.tema+']}}, "MAX_WORDS":10,"MAX_HEIGHT":5, "MAX_DEPTH":3, "duplicity" : "false", "rt":"false", "repeated_text":"false"}';

				d3.select("#palavras_div2_sunburstZoom").select('svg').remove();
				d3.select("#palavras_div2_sunburstZoom").select('g').remove();
				d3.select("#palavras_div2_sunburstZoom_fixed").select('p').remove();

				$scope.filter.word = "";

				d3Sunburst(urlsun,$scope.filter.word);
			}
		}
	},true);
	
	$scope.$watch('palavraLinkWord', function () {
		$scope.dataLoadON = false;
		$scope.dataLoad404 = false;
		$scope.dataLoadOFF = true;

		$http.get($scope.palavraLinkWord).success(function (data) {
			$scope.word10 = data.splice(0,10);
			$scope.word1000 = data.splice(10,200);

			$scope.dataLoadON = true;
			$scope.dataLoad404 = false;
			$scope.dataLoadOFF = false;
		});
	}, true);

	//	$http.get(palavraCountWord).success(function (data1) {
	//		$scope.countTweets = data1;
	//	});
});
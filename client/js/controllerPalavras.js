/*******************************/
/* NOTA: PALAVRAS - CONTROLLER */
/*******************************/

var palavraLinkWord = serviceBase+'top_words?filter={"where":{"status.created_at":{"gte":"'+dataNow60+'","lte":"'+dataNow+'"}, "categories":{"all":['+linkTema+']}},"limit":170}';

var palavraCountWord = 'https://hash-api.herokuapp.com/v1/tweets/count?where={"categories": {"inq": ['+linkTema+']},"status.timestamp_ms": {"gte": '+nowT60+',"lte": '+nowT+'}}';

var urlsun = 'http://107.170.54.11:8080/word_concur?filter={"where": {"status.created_at": {"gte":"'+dataNow60+'","lte":"'+dataNow+'"}, "categories": {"all": ['+linkTema+']}}, "MAX_WORDS":10,"MAX_HEIGHT":5, "MAX_DEPTH":3, "duplicity" : "false", "rt":"false", "repeated_text":"false"}';

var linkSearchWord = "";

hashTwitter.controller('mainPalavras', function ($scope) {

	var palavrasCountTweet;
	var palavrasCountImage;

	var palavrasTime;
	var palavrasTema = '%22tema-negros%22';
	var palavrasLinkTime = 60;

	$scope.sunburstON = false;
	$scope.sunburstOFF = true;

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
		console.log(tema);
		palavrasTema = tema;

		palavraLinkWord = serviceBase+'top_words?filter={"where":{"status.created_at":{"gte":"'+palavrasTime+'","lte":"'+dataNow+'"},"categories":{"all":['+palavrasTema+']}},"limit":170}';

		urlsun = 'http://107.170.54.11:8080/word_concur?filter={"where": {"status.created_at": {"gte":"'+dataNow60+'","lte":"'+dataNow+'"}, "categories": {"all": ['+palavrasTema+']}}, "MAX_WORDS":10,"MAX_HEIGHT":5, "MAX_DEPTH":3, "duplicity" : "false", "rt":"false", "repeated_text":"false"}';

		console.log(urlsun);

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

		urlsun = 'http://107.170.54.11:8080/word_concur?filter={"where": {"status.created_at": {"gte":"'+palavrasTime+'","lte":"'+dataNow+'"}, "categories": {"all": ['+palavrasTema+']}},"top_words":["'+word+'"], "MAX_WORDS":5,"MAX_HEIGHT":5, "MAX_DEPTH":3, "duplicity" : "false", "rt":"false"}';

		var palavrasCountTweet = baseURL+'/count?where={"word":}';
		var palavrasCountImage = baseURL+'/count?where={"status.entities.media":{"exists":true},"word":}';

		d3.select("#palavras_div2_sunburstZoom").select('svg').remove();
		d3.select("#palavras_div2_sunburstZoom").select('g').remove();
		d3.select("#palavras_div2_sunburstZoom_fixed").select('p').remove();

		d3Sunburst(urlsun,word);
	};
});

hashTwitter.controller('PalavrasHashPalavrasWords', ['$scope', '$http', function ($scope, $http) {

	$scope.dataLoadON = false;
	$scope.dataLoad404 = false;
	$scope.dataLoadOFF = true;

	$http.get(palavraLinkWord).success(function (data) {
		$scope.word10 = data.splice(0,10);
		$scope.word1000 = data.splice(10,200);

		$scope.dataLoadON = true;
		$scope.dataLoad404 = false;
		$scope.dataLoadOFF = false;
	});

	$scope.$on('handleBroadcastPalavrasWord', function(event, args) {

		$scope.dataLoadON = false;
		$scope.dataLoad404 = false;
		$scope.dataLoadOFF = true;

		$http.get(args).success(function (data) {
			$scope.word10 = data.splice(0,10);
			$scope.word1000 = data.splice(10,200);

			$scope.dataLoadON = true;
			$scope.dataLoad404 = false;
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

hashTwitter.controller('PalavrasSearchForm', ['$scope', function($scope) {}]);
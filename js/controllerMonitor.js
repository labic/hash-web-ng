'use strict';

/* NOTA: MONITOR - CONTROLLER */
hashTwitter.controller('mainMonitor', function ($scope, $http, $interval) {

	function functionConteudo(localTime, dataNow, linkTema, linkCategoria, linkLocalidade, word, tag, nlimit, nskip){

		if((word === undefined) && (tag === undefined)){

			return baseURL+'/analytics?type=top-retweets&filter={"where":{"status.created_at":{"gte":"'+localTime+'","lte":"'+dataNow+'"},"categories":{"all":['+linkTema+''+linkCategoria+''+linkLocalidade+']}},"limit":'+nlimit+',"skip":'+nskip+'}';

		}else if(tag === undefined){

			return serviceBase+'word_posts?filter={"period":"'+$scope.filter.time+'","word":"'+word+'","categories":{"all":['+linkTema+''+linkCategoria+''+linkLocalidade+']}},"limit":25}';

		}else if(word === undefined){

			return baseURL+'/analytics?type=top-retweets&filter={"where":{"status.entities.hashtags.text":{"all":["'+tag+'"]},"status.created_at":{"gte":"'+localTime+'","lte":"'+dataNow+'"},"categories":{"all":['+linkTema+''+linkCategoria+''+linkLocalidade+']}},"limit":25,"skip":0}';

		}
	};

	function functionNoRtConteudo(localTime, dataNow, linkTema, linkCategoria, linkLocalidade, word, tag){

		if((word === undefined) && (tag === undefined)){

			return baseURL+'?filter={"where":{"status.retweeted_status":{"exists":false},"categories":{"all":['+linkTema+''+linkCategoria+''+linkLocalidade+']}},"limit":25,"skip":0, "order": "status.timestamp_ms DESC"}';

		}else if(tag === undefined){

			return serviceBase+'word_no_rt?filter={"where":{"period":"'+$scope.filter.time+'","word":"'+word+'","categories":{"all":['+linkTema+''+linkCategoria+''+linkLocalidade+']}},"limit":25}';

		}else if(word === undefined){

			return baseURL+'?filter={"where":{"status.entities.hashtags.text":{"all":["'+tag+'"]},"status.retweeted_status":{"exists":false},"status.created_at":{"gte":"'+localTime+'","lte":"'+dataNow+'"},"categories":{"all":['+linkTema+''+linkCategoria+''+linkLocalidade+']}},"limit":25,"skip":0}';

		}
	};

	function functionImage(localTime, dataNow, linkTema, linkCategoria, linkLocalidade, word, tag){

		if((word === undefined) && (tag === undefined)){

			return baseURL+'/analytics?type=top-images&filter={"where":{"status.created_at":{"gte":"'+localTime+'","lte":"'+dataNow+'"},"categories":{"all":['+linkTema+''+linkCategoria+''+linkLocalidade+']}},"limit":400,"skip":0}';

		}else if(tag === undefined){

			return serviceBase+'word_images?filter={"where":{"status.created_at":{"gte":"'+localTime+'","lte":"'+dataNow+'"},"word":"'+word+'","categories":{"all":['+linkTema+''+linkCategoria+''+linkLocalidade+']}},"limit":400}';

		}else if(word === undefined){

			return baseURL+'/analytics?type=top-images&filter={"where":{"status.entities.hashtags.text":{"all":["'+tag+'"]},"status.created_at":{"gte":"'+localTime+'","lte":"'+dataNow+'"},"categories":{"all":['+linkTema+''+linkCategoria+''+linkLocalidade+']}},"limit":400,"skip":0}';

		}
	};

	function functionTag(localTime, dataNow, linkTema, linkCategoria, linkLocalidade){

		return baseURL+'/analytics?type=top-hashtags&filter={"where":{"status.created_at":{"gte":"'+localTime+'","lte":"'+dataNow+'"},"categories":{"all":['+linkTema+''+linkCategoria+''+linkLocalidade+']}},"limit":25,"skip":0}';

	};

	function functionWord(localTime, dataNow, linkTema, linkCategoria, linkLocalidade){

		return serviceBase+'top_words?filter={"where":{"period":"'+$scope.filter.time+'", "categories":{"all":['+linkTema+''+linkCategoria+''+linkLocalidade+']}},"limit":20}';

	};

	function functionMap(localTime, dataNow, linkTema, linkCategoria){

		return serviceBase+'map_volume?filter={"where":{"period":"'+$scope.filter.time+'","categories":{"all":['+linkTema+''+linkCategoria+']}}}';

	};

	var firstRun = false;

	$scope.setAll = function(localTime, dataNow, linkTema, linkCategoria, linkLocalidade, word, tag, nlimit, nskip){
		console.log("entreiALL");

		$scope.monitorlinkNoRtTweet = functionNoRtConteudo(localTime, dataNow, linkTema, linkCategoria, linkLocalidade, word, tag);
		$scope.monitorLinkTweet = functionConteudo(localTime, dataNow, linkTema, linkCategoria, linkLocalidade, word, tag, nlimit, nskip);

		$scope.monitorLinkImg = functionImage(localTime, dataNow, linkTema, linkCategoria, linkLocalidade, word, tag);
		$scope.monitorLinkTag = functionTag(localTime, dataNow, linkTema, linkCategoria, linkLocalidade);
		$scope.monitorLinkWord = functionWord(localTime, dataNow, linkTema, linkCategoria, linkLocalidade);
		$scope.monitorLinkMap = functionMap(localTime, dataNow, linkTema, linkCategoria);
	};

	$scope.setHalf = function(localTime, dataNow, linkTema, linkCategoria, linkLocalidade, word, tag, nlimit, nskip){
		console.log("entreiHalf");
		$scope.monitorlinkNoRtTweet = functionNoRtConteudo(localTime, dataNow, linkTema, linkCategoria, linkLocalidade, word, tag);
		$scope.monitorLinkTweet = functionConteudo(localTime, dataNow, linkTema, linkCategoria, linkLocalidade, word, tag, nlimit, nskip);

		$scope.monitorLinkImg = functionImage(localTime, dataNow, linkTema, linkCategoria, linkLocalidade, word, tag);
		$scope.monitorLinkTag = functionTag(localTime, dataNow, linkTema, linkCategoria, linkLocalidade);
		$scope.monitorLinkWord = functionWord(localTime, dataNow, linkTema, linkCategoria, linkLocalidade);
	};

	$scope.setMin = function(localTime, dataNow, linkTema, linkCategoria, linkLocalidade, word, tag, nlimit, nskip){

		console.log("entreimin");

		$scope.monitorLinkTweet = functionConteudo(localTime, dataNow, linkTema, linkCategoria, linkLocalidade, word, tag, nlimit, nskip);
		$scope.monitorlinkNoRtTweet = functionNoRtConteudo(localTime, dataNow, linkTema, linkCategoria, linkLocalidade, word, tag);
		$scope.monitorLinkImg = functionImage(localTime, dataNow, linkTema, linkCategoria, linkLocalidade, word, tag);
	};

	$scope.loadMoreTweetsChange = function (n) {
		$scope.countpage = n + $scope.countpage;

		$( ".geralTweets_result" ).scrollTop( "slow" );

		var nskip = $scope.countpage * 25;
		var nlimit = $scope.countpage * 25 + 25;

		$scope.setMin($scope.timeMonitor, dataNow, $scope.filter.tema, $scope.filter.categoria, $scope.filter.localidade, undefined, undefined, nlimit, nskip);
	};
	
	$scope.recentTweets = function (){
		
		$scope.monitorLinkTweet = baseURL+'?filter={"where":{"categories":{"all":['+$scope.filter.tema+''+$scope.filter.categoria+''+$scope.filter.localidade+']}},"limit":25,"skip":0, "order": "status.timestamp_ms DESC"}';
		
	};

	$scope.filter = {
		tema: "%22tema-negros%22",
		time: "7d",
		categoria: "",
		word: "",
		tag: "",
		localidade: "",
		pag: 0 
	};

	$scope.monitorCountTweet = baseURL+'/count?where={}';
	$scope.monitorCountImage = baseURL+'/count?where={"status.entities.media":{"exists":true}}';

	$scope.categorieNumber = 0;
	$scope.countpage = 0;

	$scope.$watch('filter', function (newFilter, oldFilter) {
		if(firstRun == false){
			$scope.timeMonitor = transformTime(newFilter.time);

			$scope.setAll($scope.timeMonitor, dataNow, newFilter.tema, " ", " ", undefined, undefined, 25, 0);

			firstRun = true;
		}else{
			$scope.countpage = 0;

			if(newFilter.tema != oldFilter.tema){ 

				$scope.setAll($scope.timeMonitor, dataNow, newFilter.tema, " ", " ", undefined, undefined, 25, 0);
			}

			if(newFilter.time != oldFilter.time){
				$scope.timeMonitor = transformTime($scope.filter.time);

				$scope.setAll($scope.timeMonitor, dataNow, newFilter.tema, newFilter.categoria, newFilter.localidade, newFilter.word, newFilter.tag, 25, 0);
			}			
//localidade e tema apenas
			if(newFilter.localidade != oldFilter.localidade){

				$scope.setHalf($scope.timeMonitor, dataNow, newFilter.tema, " ", newFilter.localidade, undefined, undefined, 25, 0);
			}

			if(newFilter.categoria != oldFilter.categoria){

				$scope.setMin($scope.timeMonitor, dataNow, newFilter.tema, newFilter.categoria, " ", undefined, undefined, 25, 0);
			}

			if(newFilter.word != oldFilter.word){

				$scope.setMin($scope.timeMonitor, dataNow, newFilter.tema,  " ", " ", newFilter.word, undefined, 25, 0);
			}

			if(newFilter.tag != oldFilter.tag){

				$scope.setMin($scope.timeMonitor, dataNow, newFilter.tema, " ", " ", undefined, newFilter.tag, 25, 0);
			}		
		}
	},true);

	$http.get($scope.monitorCountTweet).success(function (data) {
		$scope.countRetweet = data;

		$scope.contConteudoChange = function(x,max){
			$interval(function() {
				if( x < max) {
					x = x + 7;
					$scope.countRetweetFinal = x;
				}
			},1000);
		};

		$scope.contConteudoChange(1200000, $scope.countRetweet.count);
	});

	$http.get($scope.monitorCountImg).success(function (data) {
		$scope.countImage = data;

		$scope.contImageChange = function(x,max){
			$interval(function() {
				if( x < max) {
					x = x + 7;
					$scope.countImageFinal = x;
				}
			},1000);
		};

		$scope.contImageChange(90000,$scope.countImage.count);
	});

	/* MAP */

	$scope.$watch('monitorLinkMap', function() {

		var maxCont = 0;

		$("#svg-map a path").css( "fill", "#d1e8c5" );

		$scope.legendMetade = 0;
		$scope.legendMax = 0;

		$scope.dataMapaON = true;
		$scope.textLoadDisplayMap = true;

		$http.get($scope.monitorLinkMap).success(function (data) {

			maxCont = 0;

			for(var x=0; x<27 ;x++){
				if(data[x].count > maxCont){
					maxCont = data[x].count;
				}
			}

			getColors(data,"#d1e8c5","#426083");

			$scope.mapAC = data[0].cor;
			$scope.mapAL = data[1].cor;
			$scope.mapAM = data[2].cor;
			$scope.mapAP = data[3].cor;
			$scope.mapBA = data[4].cor;
			$scope.mapCE = data[5].cor;
			$scope.mapDF = data[6].cor;
			$scope.mapES = data[7].cor;
			$scope.mapGO = data[8].cor;
			$scope.mapMA = data[9].cor;
			$scope.mapMG = data[10].cor;
			$scope.mapMS = data[11].cor;
			$scope.mapMT = data[12].cor;
			$scope.mapPA = data[13].cor;
			$scope.mapPB = data[14].cor;
			$scope.mapPE = data[15].cor;
			$scope.mapPI = data[16].cor;
			$scope.mapPR = data[17].cor;
			$scope.mapRJ = data[18].cor;
			$scope.mapRN = data[19].cor;
			$scope.mapRO = data[20].cor;
			$scope.mapRR = data[21].cor;
			$scope.mapRS = data[22].cor;
			$scope.mapSC = data[23].cor;
			$scope.mapSE = data[24].cor;
			$scope.mapSP = data[25].cor;
			$scope.mapTO = data[26].cor;

			$("#svg-map a path").removeAttr( "style" );

			$scope.legendMetade = maxCont/2;
			$scope.legendMax = maxCont;

			$scope.dataMapaON = false;
			$scope.textLoadDisplayMap = false;
		});
	}); 

	/* TWEETs */

	$scope.$watch('monitorLinkTweet', function() {

		var contData = 0;

		$scope.dataLoadON = false;
		$scope.dataLoad404 = false;
		$scope.dataLoadOFF = true;
		$scope.dataLoadERROR = false;

		if($scope.countpage > 0){
			$scope.buttonBack = true;
		}else{
			$scope.buttonBack = false;
		}

		$http.get($scope.monitorLinkTweet).success(function (data) {

			contData = Object.keys(data).length;

			if((data == "") || (contData < 25)){

				$scope.buttonNext = false;

				$http.get($scope.monitorlinkNoRtTweet).success(function (data1) {
					$scope.twittes = data.concat(data1);

					if(data1 == ""){
						$scope.twittes = data;
					}else{
						$scope.twittes = data.concat(data1);
					}

					if((data1 == "") && (data == "")){
						$scope.dataLoadON = false;
						$scope.dataLoadOFF = false;
						$scope.dataLoad404 = true;
					}else{
						$scope.dataLoad404 = false;
						$scope.dataLoadOFF = false;
						$scope.dataLoadON = true;
					}
				});
			}else{
				$scope.twittes = data;

				$scope.buttonNext = true;

				$scope.dataLoad404 = false;
				$scope.dataLoadOFF = false;
				$scope.dataLoadON = true;
			}
		}).error(function(data, status) {
			$scope.dataLoadERROR = true;
			console.log(status);
		});   
	}); 

	/* IMAGEM */

	$scope.$watch('monitorLinkImg', function() {
		$scope.dataLoadON = false;
		$scope.dataLoad404 = false;
		$scope.dataLoadOFF = true;
		$scope.dataLoadERROR = false;

		$http.get($scope.monitorLinkImg).success(function (data) {
			$scope.imgs = data.splice(0,24);
			$scope.imgsMos = data;
			if(data == ""){
				$scope.dataLoadON = false;
				$scope.dataLoadOFF = false;
				$scope.dataLoad404 = true;
			}else{
				$scope.dataLoad404 = false;
				$scope.dataLoadOFF = false;
				$scope.dataLoadON = true;
			}
		}).error(function(data, status) {
			$scope.dataLoadERROR = true;
			console.log(status);
		});
	});   

	/* WORD */

	$scope.$watch('monitorLinkWord', function() {
		$scope.dataLoadON = false;
		$scope.dataLoad404 = false;
		$scope.dataLoadOFF = true;
		$scope.dataLoadERROR = false;

		$http.get($scope.monitorLinkWord).success(function (data) {
			$scope.words = data;
			$scope.words = data.splice(0,11);
			if(data == ""){
				$scope.dataLoadON = false;
				$scope.dataLoadOFF = false;
				$scope.dataLoad404 = true;
			}else{
				$scope.dataLoad404 = false;
				$scope.dataLoadOFF = false;
				$scope.dataLoadON = true;
			}

		}).error(function(data, status) {
			$scope.dataLoadERROR = true;
			console.log(status);
		});

		$http.get("data/test/conteudos.json").success(function (data) {
			$scope.conteudos = data[$scope.categorieNumber];
		});
	});  

	/* TAG */

	$scope.$watch('monitorLinkTag', function() {
		$scope.dataLoadON = false;
		$scope.dataLoad404 = false;
		$scope.dataLoadOFF = true;
		$scope.dataLoadERROR = false;

		$http.get($scope.monitorLinkTag).success(function (data) {
			$scope.tags = data;
			$scope.tags = data.splice(0,19);
			if(data == ""){
				$scope.dataLoadON = false;
				$scope.dataLoadOFF = false;
				$scope.dataLoad404 = true;
			}else{
				$scope.dataLoad404 = false;
				$scope.dataLoadOFF = false;
				$scope.dataLoadON = true;
			}
		}).error(function(data, status) {
			$scope.dataLoadERROR = true;
			console.log(status);
		});
	}); 
});
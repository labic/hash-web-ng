'use strict';

/* Controllers */

/* Variaveis de URL fixas */

var baseURL = 'https://hash-api.herokuapp.com:443/v1/tweets/analytics?type=';
var serviceBase = 'http://107.170.54.11:8080/';

/* Inicializando tempo de milisegundos */

var nowState = new Date();

var now = new Date(nowState.getTime() - 11700000);
var now15 = new Date(now.getTime() - 15*60000);
var now60 = new Date(now.getTime() - 3600000);
var now24 = new Date(now.getTime() - 86400000);
var now7 = new Date(now.getTime() - 7*86400000);
var now30 = new Date(now.getTime() - 30*86400000);

var nowT = new Date(now).getTime();
var nowT15 = new Date(now).getTime() - 15*60000;
var nowT60 = new Date(now).getTime() - 3600000;
var nowT24 = new Date(now).getTime() - 86400000;
var nowT7 = new Date(now).getTime() - 7*86400000;
var nowT30 = new Date(now).getTime() - 30*86400000;
/* Organizando data da forma nescessaria para passar para o link; */

var dataNow = now.toISOString().replace(/z/gi,'');
var dataNow15 = now15.toISOString().replace(/z/gi,'');
var dataNow60 = now60.toISOString().replace(/z/gi,'');
var dataNow24 = now24.toISOString().replace(/z/gi,'');
var dataNow7 = now7.toISOString().replace(/z/gi,'');
var dataNow30 = now30.toISOString().replace(/z/gi,'');

/* Variaveis globais dos parametros da requisição */
var linkTime = 60;
var linkTema = '%22conteudo-inclusão social%22,%22conteudo-empoderamento negro%22,%22conteudo-violência%22,%22conteudo-racismo%22,%22conteudo-intolerância religiosa%22';
// ,%22tema-lgbt%22,%22tema-genero%22,%22tema-indigena%22
//var linkTema = '%22tema-negros%22';
var linkCategoria = '';
var linkLocalidade = '';
var pag = 0;
var count = 0;
var catNumber = 0;

var linkConteudo = baseURL+'top-retweets&filter={"where":{"status.created_at":{"gte":"'+dataNow60+'","lte":"'+dataNow+'"},"categories":{"inq":['+linkTema+''+linkCategoria+''+linkLocalidade+']}},"limit":25,"skip":0}';

var linkImg = baseURL+'top-images&filter={"where":{"status.created_at":{"gte":"'+dataNow60+'","lte":"'+dataNow+'"},"categories":{"all":['+linkTema+''+linkCategoria+''+linkLocalidade+']}},"limit":400,"skip":0}';

var linkTag = baseURL+'top-hashtags&filter={"where":{"status.created_at":{"gte":"'+dataNow60+'","lte":"'+dataNow+'"},"categories":{"all":['+linkTema+''+linkCategoria+''+linkLocalidade+']}},"limit":25,"skip":0}';

var linkWord = serviceBase+'top_words?filter={"where":{"status.created_at":{"gte":"'+dataNow60+'","lte":"'+dataNow+'"}, "categories":{"all":['+linkTema+''+linkCategoria+''+linkLocalidade+']}},"limit":20}';

var linkMap = serviceBase+'map_volume?filter={"where":{"status.created_at":{"gte":"'+dataNow60+'","lte":"'+dataNow+'"},"categories":{"all":['+linkTema+''+linkCategoria+''+linkLocalidade+']}}}';

var monitorCountWord = 'https://hash-api.herokuapp.com/v1/tweets/count?where={}';
var monitorCountWord = 'https://hash-api.herokuapp.com/v1/images/count?where={}';

var linkNoRtConteudo = 'https://hash-api.herokuapp.com:443/v1/tweets?filter={"where":{"status.retweeted_status":{"exists":false},"categories":{"inq":['+linkTema+''+linkCategoria+''+linkLocalidade+']}},"limit":25,"skip":0, "order": "status.timestamp_ms DESC"}';

/* Inicializando links de requisição */

hashTwitter.run(function($rootScope) {

	$rootScope.$on('handleEmitConteudo', function(event, args, args1) {
		$rootScope.$broadcast('handleBroadcastConteudo', args, args1);
	});

	$rootScope.$on('handleEmitImage', function(event, args) {
		$rootScope.$broadcast('handleBroadcastImage', args);
	});

	$rootScope.$on('handleEmitTag', function(event, args) {
		$rootScope.$broadcast('handleBroadcastTag', args);
	});

	$rootScope.$on('handleEmitWord', function(event, args) {
		$rootScope.$broadcast('handleBroadcastWord', args);
	});

	$rootScope.$on('handleEmitMap', function(event, args) {
		$rootScope.$broadcast('handleBroadcastMap', args);
	});

	$rootScope.$on('handleEmitPalavrasWord', function(event, args) {
		$rootScope.$broadcast('handleBroadcastPalavrasWord', args);
	});

	$rootScope.$on('handleEmitCountTweets', function(event, args) {
		$rootScope.$broadcast('handleBroadcastCountTweets', args);
	});
});

/* NOTA: MONITOR - CONTROLLER */

hashTwitter.controller('mainMonitor', function ($scope) {

	$scope.templatesConteudo = [ { name: 'twTweet', url: 'app/monitor/twTweet.html'},
								{ name: 'imgTweet', url: 'app/monitor/imgTweet.html'},
								{ name: 'twContTweet', url: 'app/monitor/twContTweet.html'},
								{ name: 'imgMosaicoTweet', url: 'app/monitor/imgMosaicoTweet.html'}];

	$scope.templateConteudo = $scope.templatesConteudo[0];

	$scope.templateConteudoIndex = function (x) {
		$scope.templateConteudo = $scope.templatesConteudo[x];
	};

	$scope.categoriaIndex = function (x) {
		catNumber = x;
	};

	$scope.loadMoreTweetsChange = function (n) {
		count = n + count;
		
		$( ".geralTweets_result" ).scrollTop( "slow" );

		var localTime;

		var nskip = count * 25;
		var nlimit = count * 25 + 25;

		if(linkTime == 15){
			localTime = dataNow15;
		}else if(linkTime == 60){
			localTime = dataNow60;
		}else if(linkTime == 24){
			localTime = dataNow24;
		}else if(linkTime == 7){
			localTime = dataNow7;
		}

		linkConteudo = baseURL+'top-retweets&filter={"where":{"status.created_at":{"gte":"'+localTime+'","lte":"'+dataNow+'"},"categories":{"all":['+linkTema+''+linkCategoria+''+linkLocalidade+']}},"limit":'+nlimit+',"skip":'+nskip+'}';

		linkNoRtConteudo = 'https://hash-api.herokuapp.com:443/v1/tweets?filter={"where":{"status.retweeted_status":{"exists":false},"categories":{"inq":['+linkTema+''+linkCategoria+''+linkLocalidade+']}},"limit":25,"skip":0, "order": "status.timestamp_ms DESC"}';

		$scope.$emit('handleEmitConteudo', linkConteudo, linkNoRtConteudo);
	};

	$scope.loadWordsPub = function (word) {

		count = 0;

		var localTime;

		if(linkTime == 15){
			localTime = dataNow15;
		}else if(linkTime == 60){
			localTime = dataNow60;
		}else if(linkTime == 24){
			localTime = dataNow24;
		}else if(linkTime == 7){
			localTime = dataNow7;
		}

		linkConteudo = serviceBase+'word_posts?filter={"where":{"status.created_at":{"gte":"'+localTime+'","lte":"'+dataNow+'"},"word":"'+word+'","categories":{"all":['+linkTema+''+linkCategoria+''+linkLocalidade+']}},"limit":25}';

		linkImg = serviceBase+'word_images?filter={"where":{"status.created_at":{"gte":"'+localTime+'","lte":"'+dataNow+'"},"word":"'+word+'","categories":{"all":['+linkTema+''+linkCategoria+''+linkLocalidade+']}},"limit":400}';

		linkNoRtConteudo = 'https://hash-api.herokuapp.com:443/v1/tweets?filter={"where":{"status.retweeted_status":{"exists":false},"word":"'+word+'","categories":{"inq":['+linkTema+''+linkCategoria+''+linkLocalidade+']}},"limit":25,"skip":0, "order": "status.timestamp_ms DESC"}';

		$scope.$emit('handleEmitConteudo', linkConteudo, linkNoRtConteudo);
		$scope.$emit('handleEmitImage', linkImg);
	};

	$scope.loadHastagsPub = function (tag) {

		count = 0;

		var localTime;

		if(linkTime == 15){
			localTime = dataNow15;
		}else if(linkTime == 60){
			localTime = dataNow60;
		}else if(linkTime == 24){
			localTime = dataNow24;
		}else if(linkTime == 7){
			localTime = dataNow7;
		}

		linkConteudo = baseURL+'top-retweets&filter={"where":{"status.entities.hashtags.text":{"inq":["'+tag+'"]},"status.created_at":{"gte":"'+localTime+'","lte":"'+dataNow+'"},"categories":{"all":['+linkTema+''+linkCategoria+''+linkLocalidade+']}},"limit":25,"skip":0}';

		linkImg = baseURL+'top-images&filter={"where":{"status.entities.hashtags.text":{"inq":["'+tag+'"]},"status.created_at":{"gte":"'+localTime+'","lte":"'+dataNow+'"},"categories":{"all":['+linkTema+''+linkCategoria+''+linkLocalidade+']}},"limit":400,"skip":0}';

		$scope.$emit('handleEmitConteudo', linkConteudo, "");
		$scope.$emit('handleEmitImage', linkImg);
	};

	$scope.changeLocalidade = function (local) {

		count = 0;

		linkLocalidade = local;

		var localTime;

		if(linkTime == 15){
			localTime = dataNow15;
		}else if(linkTime == 60){
			localTime = dataNow60;
		}else if(linkTime == 24){
			localTime = dataNow24;
		}else if(linkTime == 7){
			localTime = dataNow7;
		}

		linkConteudo = baseURL+'top-retweets&filter={"where":{"status.created_at":{"gte":"'+localTime+'","lte":"'+dataNow+'"},"categories":{"all":['+linkTema+''+linkCategoria+''+linkLocalidade+']}},"limit":25,"skip":0}';

		linkImg = baseURL+'top-images&filter={"where":{"status.created_at":{"gte":"'+localTime+'","lte":"'+dataNow+'"},"categories":{"all":['+linkTema+''+linkCategoria+''+linkLocalidade+']}},"limit":25,"skip":0}';

		linkTag = baseURL+'top-hashtags&filter={"where":{"status.created_at":{"gte":"'+localTime+'","lte":"'+dataNow+'"},"categories":{"all":['+linkTema+''+linkCategoria+''+linkLocalidade+']}},"limit":25,"skip":0}';

		linkWord = serviceBase+'top_words?filter={"where":{"status.created_at":{"gte":"'+localTime+'","lte":"'+dataNow+'"},"categories":{"all":['+linkTema+''+linkCategoria+''+linkLocalidade+']}},"limit":20,"skip":0}';

		linkNoRtConteudo = 'https://hash-api.herokuapp.com:443/v1/tweets?filter={"where":{"status.created_at":{"gte":"'+localTime+'","lte":"'+dataNow+'"}, "status.retweeted_status":{"exists":false},"categories":{"all":['+linkTema+''+linkCategoria+''+linkLocalidade+']}},"limit":25,"skip":0}';

		$scope.$emit('handleEmitConteudo', linkConteudo, linkNoRtConteudo);
		$scope.$emit('handleEmitImage', linkImg);
		$scope.$emit('handleEmitTag', linkTag);
		$scope.$emit('handleEmitWord', linkWord);
	};

	$scope.changeTemporalidade = function (time) {

		count = 0;

		linkCategoria = "";
		linkTime = time;

		var localTime;
		var localTimeMS;

		if(linkTime == 15){
			localTime = dataNow15;
			localTimeMS = nowT15;
		}else if(linkTime == 60){
			localTime = dataNow60;
			localTimeMS = nowT60;
		}else if(linkTime == 24){
			localTime = dataNow24;
			localTimeMS = nowT24;
		}else if(linkTime == 7){
			localTime = dataNow7;
			localTimeMS = nowT7;
		}

		linkConteudo = baseURL+'top-retweets&filter={"where":{"status.created_at":{"gte":"'+localTime+'","lte":"'+dataNow+'"},"categories":{"all":['+linkTema+''+linkCategoria+''+linkLocalidade+']}},"limit":25,"skip":0}';

		linkImg = baseURL+'top-images&filter={"where":{"status.created_at":{"gte":"'+localTime+'","lte":"'+dataNow+'"},"categories":{"all":['+linkTema+''+linkCategoria+''+linkLocalidade+']}},"limit":400,"skip":0}';

		linkTag = baseURL+'top-hashtags&filter={"where":{"status.created_at":{"gte":"'+localTime+'","lte":"'+dataNow+'"},"categories":{"all":['+linkTema+''+linkCategoria+''+linkLocalidade+']}},"limit":25,"skip":0}';

		linkWord = serviceBase+'top_words?filter={"where":{"status.created_at":{"gte":"'+localTime+'","lte":"'+dataNow+'"},"categories":{"all":['+linkTema+''+linkCategoria+''+linkLocalidade+']}},"limit":20,"skip":0}';

		linkMap = serviceBase+'map_volume?filter={"where":{"status.created_at":{"gte":"'+localTime+'","lte":"'+dataNow+'"},"categories":{"all":['+linkTema+''+linkCategoria+''+linkLocalidade+']}}}';

		linkNoRtConteudo = 'https://hash-api.herokuapp.com:443/v1/tweets?filter={"where":{"status.retweeted_status":{"exists":false},"categories":{"inq":['+linkTema+''+linkCategoria+''+linkLocalidade+']}},"limit":25,"skip":0, "order": "status.timestamp_ms DESC"}';

		$scope.$emit('handleEmitConteudo', linkConteudo, linkNoRtConteudo);
		$scope.$emit('handleEmitImage', linkImg);
		$scope.$emit('handleEmitTag', linkTag);
		$scope.$emit('handleEmitWord', linkWord);
		$scope.$emit('handleEmitMap', linkMap);
	};

	$scope.changeCategoria = function (cat) {

		count = 0;

		linkCategoria = cat;
		linkLocalidade = '';

		var localTime;

		if(linkTime == 15){
			localTime = dataNow15;
		}else if(linkTime == 60){
			localTime = dataNow60;
		}else if(linkTime == 24){
			localTime = dataNow24;
		}else if(linkTime == 7){
			localTime = dataNow7;
		}

		linkConteudo = baseURL+'top-retweets&filter={"where":{"status.created_at":{"gte":"'+localTime+'","lte":"'+dataNow+'"},"categories":{"all":['+linkTema+''+linkCategoria+''+linkLocalidade+']}},"limit":25,"skip":0}';

		linkImg = baseURL+'top-images&filter={"where":{"status.created_at":{"gte":"'+localTime+'","lte":"'+dataNow+'"},"categories":{"all":['+linkTema+''+linkCategoria+''+linkLocalidade+']}},"limit":400,"skip":0}';
		//
		//		linkTag = baseURL+'top-hashtags&filter={"where":{"status.created_at":{"gte":"'+localTime+'","lte":"'+dataNow+'"},"categories":{"all":['+linkTema+''+linkCategoria+''+linkLocalidade+']}},"limit":25,"skip":0}';
		//
		//		linkWord = serviceBase+'top_words?filter={"where":{"status.created_at":{"gte":"'+localTime+'","lte":"'+dataNow+'"},"categories":{"all":['+linkTema+''+linkCategoria+''+linkLocalidade+']}},"limit":20,"skip":0}';
		//
		//		linkMap = serviceBase+'map_volume?filter={"where":{"status.created_at":{"gte":"'+localTime+'","lte":"'+dataNow+'"},"categories":{"all":['+linkTema+''+linkCategoria+''+linkLocalidade+']}}}';

		linkNoRtConteudo = 'https://hash-api.herokuapp.com:443/v1/tweets?filter={"where":{"status.retweeted_status":{"exists":false},"categories":{"inq":['+linkTema+''+linkCategoria+''+linkLocalidade+']}},"limit":25,"skip":0, "order": "status.timestamp_ms DESC"}';
		//
		//		monitorCountWord = 'https://hash-api.herokuapp.com/v1/tweets/count?where={"categories": {"inq": ['+linkTema+']},"status.timestamp_ms": {"gte": '+localTimeMS+',"lte": '+nowT+'}}';

		$scope.$emit('handleEmitConteudo', linkConteudo, linkNoRtConteudo);
		$scope.$emit('handleEmitImage', linkImg);
		//		$scope.$emit('handleEmitTag', linkTag);
		//		$scope.$emit('handleEmitWord', linkWord);
		//		$scope.$emit('handleEmitMap', linkMap);
		//		$scope.$emit('handleEmitCountTweets', monitorCountWord);
	};

	$scope.changeTema = function (tema) {

		count = 0;

		linkTema = tema;
		linkCategoria = "";
		linkLocalidade = "";

		var localTime;
		var localTimeMS

		if(linkTime == 15){
			localTime = dataNow15;
			localTimeMS = nowT15;
		}else if(linkTime == 60){
			localTime = dataNow60;
			localTimeMS = nowT60;
		}else if(linkTime == 24){
			localTime = dataNow24;
			localTimeMS = nowT24;
		}else if(linkTime == 7){
			localTime = dataNow7;
			localTimeMS = nowT7;
		}

		linkTema = tema;

		linkConteudo = baseURL+'top-retweets&filter={"where":{"status.created_at":{"gte":"'+localTime+'","lte":"'+dataNow+'"},"categories":{"all":['+linkTema+''+linkCategoria+''+linkLocalidade+']}},"limit":25,"skip":0}';

		linkImg = baseURL+'top-images&filter={"where":{"status.created_at":{"gte":"'+localTime+'","lte":"'+dataNow+'"},"categories":{"all":['+linkTema+''+linkCategoria+''+linkLocalidade+']}},"limit":400,"skip":0}';

		linkTag = baseURL+'top-hashtags&filter={"where":{"status.created_at":{"gte":"'+localTime+'","lte":"'+dataNow+'"},"categories":{"all":['+linkTema+''+linkCategoria+''+linkLocalidade+']}},"limit":25,"skip":0}';

		linkWord = serviceBase+'top_words?filter={"where":{"status.created_at":{"gte":"'+localTime+'","lte":"'+dataNow+'"},"categories":{"all":['+linkTema+''+linkCategoria+''+linkLocalidade+']}},"limit":20,"skip":0}';

		linkMap = serviceBase+'map_volume?filter={"where":{"status.created_at":{"gte":"'+localTime+'","lte":"'+dataNow+'"},"categories":{"all":['+linkTema+''+linkCategoria+''+linkLocalidade+']}}}';

		linkNoRtConteudo = 'https://hash-api.herokuapp.com:443/v1/tweets?filter={"where":{"status.retweeted_status":{"exists":false},"categories":{"inq":['+linkTema+''+linkCategoria+''+linkLocalidade+']}},"limit":25,"skip":0, "order": "status.timestamp_ms DESC"}';

		$scope.$emit('handleEmitConteudo', linkConteudo, linkNoRtConteudo);
		$scope.$emit('handleEmitImage', linkImg);
		$scope.$emit('handleEmitTag', linkTag);
		$scope.$emit('handleEmitWord', linkWord);
		$scope.$emit('handleEmitMap', linkMap);
	};
});

hashTwitter.controller('ResultWords', function ($scope) {

	$scope.templates = [ { name: 'WordTweet', url: 'app/monitor/wordTweet.html'},
						{ name: 'TagTweet', url: 'app/monitor/tagTweet.html'} ];

	$scope.template = $scope.templates[0];

	$scope.templateIndex = function (x) {
		$scope.template = $scope.templates[x];
	};
});

hashTwitter.controller('MenuCategoria', function ($scope) {
	$scope.templates = [ { name: 'ConteudoMenu', url: 'app/monitor/conteudoMenu.html'},
						{ name: 'PerfilMenu', url: 'app/monitor/perfilMenu.html'} ];

	$scope.template = $scope.templates[0];

	$scope.templateIndex = function (x) {
		$scope.template = $scope.templates[x];
	};
});

/* Esse controle serve para ver qual Tematica aparecerá em conteudo e perfil */
hashTwitter.controller('MenuDivisionTematica', ['$scope', '$http', function ($scope, $http) {
	$scope.categorias = [ { name: 'categoriaRacismoMenu', url_conteudo: 'app/monitor/conteudoRacismoMenu.html', url_perfil: 'app/monitor/perfilRacismoMenu.html'},
						 { name: 'categoriaLgbtMenu', url_conteudo: 'app/monitor/conteudoLgbtMenu.html', url_perfil: 'app/monitor/perfilLgbtMenu.html'},
						 { name: 'categoriaIndigenaMenu', url_conteudo: 'app/monitor/conteudoIndigenaMenu.html', url_perfil: 'app/monitor/perfilIndigenaMenu.html'},
						 { name: 'categoriaGeneroMenu', url_conteudo: 'app/monitor/conteudoGeneroMenu.html', url_perfil: 'app/monitor/perfilGeneroMenu.html'}];

	$http.get(monitorCountWord).success(function (data1) {
		$scope.countRetweet = data1;
	});

	$scope.$on('handleBroadcastCountTweets', function(event, args) {
		$http.get(args).success(function (data) {
			$scope.countRetweet = data;
		});
	});   

	$scope.categoria = $scope.categorias[0];

	//	$scope.categoriaIndex = function (x) {
	//
	//		$scope.categoria = $scope.categorias[x];
	//	};

}]);

hashTwitter.controller('MenuMap', ['$scope', '$http', function ($scope, $http) {

	var maxCont = 0;

	$http.get(linkMap).success(function (data) {

		for(var x=0; x<27 ;x++){
			if(data[x].count > maxCont){
				maxCont = data[x].count;
			}
		}

		$scope.legendMetade = maxCont/2;
		$scope.legendMax = maxCont;

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

	});

	$scope.$on('handleBroadcastMap', function(event, args) {

		$http.get(args).success(function (data) {

			maxCont = 0;

			for(var x=0; x<27 ;x++){
				if(data[x].count > maxCont){
					maxCont = data[x].count;
				}
			}

			$scope.legendMetade = maxCont/2;
			$scope.legendMax = maxCont;

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
		});
	});
}]);

hashTwitter.controller('HashTwitterCtr', ['$scope', '$http', function ($scope, $http) {
	var contData = 0;

	$scope.dataLoadON = false;
	$scope.dataLoadERROR = false;
	$scope.dataLoadOFF = true;

	$http.get(linkConteudo).success(function (data) {
		
		contData = Object.keys(data).length;

		if((data == "") || (contData < 25)){

			$scope.buttonNext = false;

			$http.get(linkNoRtConteudo).success(function (data1) {
				$scope.twittes = data.concat(data1);

				if(data1 == ""){
					$scope.twittes = data;
				}else{
					$scope.twittes = data.concat(data1);
				}

				if((data1 == "") && (data == "")){
					$scope.dataLoadON = false;
					$scope.dataLoadOFF = false;
					$scope.dataLoadERROR = true;
				}else{
					$scope.dataLoadERROR = false;
					$scope.dataLoadOFF = false;
					$scope.dataLoadON = true;
				}
			});
		}else{
			$scope.twittes = data;

			$scope.buttonNext = true;

			$scope.dataLoadERROR = false;
			$scope.dataLoadOFF = false;
			$scope.dataLoadON = true;
		}
	});

	$scope.$on('handleBroadcastConteudo', function(event, args, args1) {
		$scope.dataLoadON = false;
		$scope.dataLoadERROR = false;
		$scope.dataLoadOFF = true;

		if(count > 0){
			$scope.buttonBack = true;
		}else{
			$scope.buttonBack = false;
		}

		$http.get(args).success(function (data) {

			contData = Object.keys(data).length;

			if((data == "") || (contData < 25)){

				$scope.buttonNext = false;

				$http.get(args1).success(function (data1) {
					$scope.twittes = data.concat(data1);

					if(data1 == ""){
						$scope.twittes = data;
					}else{
						$scope.twittes = data.concat(data1);
					}

					if((data1 == "") && (data == "")){
						$scope.dataLoadON = false;
						$scope.dataLoadOFF = false;
						$scope.dataLoadERROR = true;
					}else{
						$scope.dataLoadERROR = false;
						$scope.dataLoadOFF = false;
						$scope.dataLoadON = true;
					}
				});
			}else{
				$scope.twittes = data;

				$scope.buttonNext = true;

				$scope.dataLoadERROR = false;
				$scope.dataLoadOFF = false;
				$scope.dataLoadON = true;
			}
		});
	});    
}]);

hashTwitter.controller('HashImgCtr', ['$scope', '$http', function ($scope, $http) {
	$scope.dataLoadON = false;
	$scope.dataLoadERROR = false;
	$scope.dataLoadOFF = true;

	$http.get(linkImg).success(function (data) {
		$scope.imgs = data;
		if(data == ""){
			$scope.dataLoadON = false;
			$scope.dataLoadOFF = false;
			$scope.dataLoadERROR = true;
		}else{
			$scope.dataLoadERROR = false;
			$scope.dataLoadOFF = false;
			$scope.dataLoadON = true;
		}
	});

	var tamDiv = $(".geralTweets_result").css( "width" );
	tamDiv = parseInt(tamDiv);
	$scope.alturaImg = tamDiv / 3;

	$scope.$on('handleBroadcastImage', function(event, args) {
		$scope.dataLoadON = false;
		$scope.dataLoadERROR = false;
		$scope.dataLoadOFF = true;

		$http.get(args).success(function (data) {
			$scope.imgs = data;
			if(data == ""){
				$scope.dataLoadON = false;
				$scope.dataLoadOFF = false;
				$scope.dataLoadERROR = true;
			}else{
				$scope.dataLoadERROR = false;
				$scope.dataLoadOFF = false;
				$scope.dataLoadON = true;
			}
		});
	});   
}]);

hashTwitter.controller('HashImgMosaicoCtr', ['$scope', '$http', function ($scope, $http) {
	$scope.dataLoadON = false;
	$scope.dataLoadERROR = false;
	$scope.dataLoadOFF = true;

	$http.get(linkImg).success(function (data) {
		$scope.imgs = data;
		$scope.img1 = data[0];
		if(data == ""){
			$scope.dataLoadON = false;
			$scope.dataLoadOFF = false;
			$scope.dataLoadERROR = true;
		}else{
			$scope.dataLoadERROR = false;
			$scope.dataLoadOFF = false;
			$scope.dataLoadON = true;
		}
		//		$scope.imgs = data.splice(1,30);
	});

	var tamDiv = $(".geralTweets_result").css( "width" );
	tamDiv = parseInt(tamDiv);
	$scope.alturaImg = tamDiv / 15;

	$scope.$on('handleBroadcastImage', function(event, args) {
		$scope.dataLoadON = false;
		$scope.dataLoadERROR = false;
		$scope.dataLoadOFF = true;

		$http.get(args).success(function (data) {
			$scope.imgs = data;
			$scope.imgs1 = data[0];
			if(data == ""){
				$scope.dataLoadON = false;
				$scope.dataLoadOFF = false;
				$scope.dataLoadERROR = true;
			}else{
				$scope.dataLoadERROR = false;
				$scope.dataLoadOFF = false;
				$scope.dataLoadON = true;
			}
		});
	});   
}]);

hashTwitter.controller('HashTemporalidade', function ($scope) {
	$scope.temporalidades = ['15 minutos', '60 minutos', '24 horas'];
	$scope.temporalidade = 0;
	$scope.temporalidadeIndex = function (x) {
		count = 0;
		$scope.temporalidade = x;
	};
});

hashTwitter.controller('HashWords', ['$scope', '$http', function ($scope, $http) {
	$scope.dataLoadON = false;
	$scope.dataLoadERROR = false;
	$scope.dataLoadOFF = true;

	$http.get(linkWord).success(function (data) {
		$scope.words = data;
		$scope.word1 = data[0];
		$scope.words = data.splice(1,11);
		if(data == ""){
			$scope.dataLoadON = false;
			$scope.dataLoadOFF = false;
			$scope.dataLoadERROR = true;
		}else{
			$scope.dataLoadERROR = false;
			$scope.dataLoadOFF = false;
			$scope.dataLoadON = true;
		}
	});

	$scope.$on('handleBroadcastWord', function(event, args) {
		$scope.dataLoadON = false;
		$scope.dataLoadERROR = false;
		$scope.dataLoadOFF = true;

		$http.get(args).success(function (data) {
			$scope.words = data;
			$scope.word1 = data[0];
			$scope.words = data.splice(1,11);
			if(data == ""){
				$scope.dataLoadON = false;
				$scope.dataLoadOFF = false;
				$scope.dataLoadERROR = true;
			}else{
				$scope.dataLoadERROR = false;
				$scope.dataLoadOFF = false;
				$scope.dataLoadON = true;
			}
		});

		$http.get("data/test/conteudos.json").success(function (data) {
			$scope.conteudos = data[catNumber];
		});
	});

	$http.get("data/test/conteudos.json").success(function (data) {
		$scope.conteudos = data[0];
	});

}]);

hashTwitter.controller('HashTags', ['$scope', '$http', function ($scope, $http) {

	$scope.dataLoadON = false;
	$scope.dataLoadERROR = false;
	$scope.dataLoadOFF = true;

	$http.get(linkTag).success(function (data) {
		$scope.tags = data;
		$scope.tag1 = data[0];
		$scope.tags = data.splice(1,19);
		if(data == ""){
			$scope.dataLoadON = false;
			$scope.dataLoadOFF = false;
			$scope.dataLoadERROR = true;
		}else{
			$scope.dataLoadERROR = false;
			$scope.dataLoadOFF = false;
			$scope.dataLoadON = true;
		}
	});

	$scope.$on('handleBroadcastTag', function(event, args) {
		$scope.dataLoadON = false;
		$scope.dataLoadERROR = false;
		$scope.dataLoadOFF = true;

		$http.get(args).success(function (data) {
			$scope.tags = data;
			$scope.tag1 = data[0];
			$scope.tags = data.splice(1,19);
			if(data == ""){
				$scope.dataLoadON = false;
				$scope.dataLoadOFF = false;
				$scope.dataLoadERROR = true;
			}else{
				$scope.dataLoadERROR = false;
				$scope.dataLoadOFF = false;
				$scope.dataLoadON = true;
			}
		});
	});
}]);

/*******************************/
/* NOTA: PALAVRAS - CONTROLLER */
/*******************************/

var palavraLinkWord = serviceBase+'top_words?filter={"where":{"status.created_at":{"gte":"'+dataNow60+'","lte":"'+dataNow+'"}, "categories":{"all":['+linkTema+']}},"limit":170}';

var palavraCountWord = 'https://hash-api.herokuapp.com/v1/tweets/count?where={"categories": {"inq": ['+linkTema+']},"status.timestamp_ms": {"gte": '+nowT60+',"lte": '+nowT+'}}';

var urlsun = 'http://107.170.54.11:8080/word_concur?filter={"where": {"status.created_at": {"gte":"'+dataNow60+'","lte":"'+dataNow+'"}, "categories": {"all": ['+linkTema+']}}, "MAX_WORDS":10,"MAX_HEIGHT":5, "MAX_DEPTH":3, "duplicity" : "false", "rt":"false", "repeated_text":"false"}';

var linkSearchWord = "";

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

//hashTwitter.controller('PalavrasSearchForm', ['$scope', function($scope) {
//	
//}]);
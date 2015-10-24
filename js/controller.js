'use strict';

/* Controllers */

/* Variaveis de URL fixas */

var baseURL = 'https://inep-enem-hash-api.herokuapp.com:443/v1/tweets';
var serviceBase = 'http://178.62.252.46:8080/';

/* Inicializando tempo de milisegundos */

var nowState = new Date();

var now = new Date(nowState.getTime() - 11700000);
var now15 = new Date(now.getTime() - 15*60000);
var now60 = new Date(now.getTime() - 3600000);
var now12 = new Date(now.getTime() - 43200000);
var now24 = new Date(now.getTime() - 86400000);
var now7 = new Date(now.getTime() - 7*86400000);
var now30 = new Date(now.getTime() - 30*86400000);

var nowT = new Date(now).getTime();
var nowT15 = new Date(now).getTime() - 15*60000;
var nowT60 = new Date(now).getTime() - 3600000;
var nowT12 = new Date(now.getTime() - 43200000);
var nowT24 = new Date(now).getTime() - 86400000;
var nowT7 = new Date(now).getTime() - 7*86400000;
var nowT30 = new Date(now).getTime() - 30*86400000;

/* Organizando data da forma nescessaria para passar para o link; */
var dataNow = now.toISOString().replace(/z/gi,'');
var dataNow15 = now15.toISOString().replace(/z/gi,'');
var dataNow60 = now60.toISOString().replace(/z/gi,'');
var dataNow12 = now12.toISOString().replace(/z/gi,'');
var dataNow24 = now24.toISOString().replace(/z/gi,'');
var dataNow7 = now7.toISOString().replace(/z/gi,'');
var dataNow30 = now30.toISOString().replace(/z/gi,'');

/* Variaveis globais dos parametros da requisição */
var linkTime = 12;
var linkTema = '%22tema-publico_geral%22';
var linkCategoria = '';
var linkLocalidade = '';
var count = 0;
var catNumber = 0;

function transformTime(lTime){
	if(lTime == 15){
		return dataNow15;
	}else if(lTime == 60){
		return dataNow60;
	}else if(lTime == 12){
		return dataNow12;
	}else if(lTime == 24){
		return dataNow24;
	}else if(lTime == 7){
		return dataNow7;
	}
}

/* Função que define a requisição para buscar os Top Retweets */

function functionConteudo(localTime, dataNow, linkTema, linkCategoria, linkLocalidade, nlimit, nskip, word, tag){

	if((word === undefined) && (tag === undefined)){

		return baseURL+'/analytics?type=top-retweets&filter={"where":{"status.created_at":{"gte":"'+localTime+'","lte":"'+dataNow+'"},"categories":{"all":['+linkTema+''+linkCategoria+''+linkLocalidade+']}},"limit":'+nlimit+',"skip":'+nskip+'}';

	}else if(tag === undefined){

		return serviceBase+'twitter/word_posts?filter={"where":{"status.created_at":{"gte":"'+localTime+'","lte":"'+dataNow+'"},"word":"'+word+'","categories":{"all":['+linkTema+''+linkCategoria+''+linkLocalidade+']}},"limit":25}';

	}else if(word === undefined){

		return baseURL+'/analytics?type=top-retweets&filter={"where":{"status.entities.hashtags.text":{"all":["'+tag+'"]},"status.created_at":{"gte":"'+localTime+'","lte":"'+dataNow+'"},"categories":{"all":['+linkTema+''+linkCategoria+''+linkLocalidade+']}},"limit":25,"skip":0}';

	}
};

function functionUser(localTime, dataNow, linkTema, linkCategoria, linkLocalidade){

	return baseURL+'/analytics?type=top-users&filter={"where":{"status.created_at":{"gte":"'+localTime+'","lte":"'+dataNow+'"},"categories":{"all":['+linkTema+''+linkCategoria+''+linkLocalidade+']}}}';
};

function functionMentions(localTime, dataNow, linkTema, linkCategoria, linkLocalidade){

	return baseURL+'/analytics?type=top-mentions&filter={"where":{"status.created_at":{"gte":"'+localTime+'","lte":"'+dataNow+'"},"categories":{"all":['+linkTema+''+linkCategoria+''+linkLocalidade+']}}}';
};

function functionUrl(localTime, dataNow, linkTema, linkCategoria, linkLocalidade){

	return baseURL+'/analytics?type=top-urls&filter={"where":{"status.created_at":{"gte":"'+localTime+'","lte":"'+dataNow+'"},"categories":{"all":['+linkTema+''+linkCategoria+''+linkLocalidade+']}}}';
};

/* Função que define a requisição para buscar os Tweets */

function functionNoRtConteudo(localTime, dataNow, linkTema, linkCategoria, linkLocalidade, word, tag){


	if((word === undefined) && (tag === undefined)){

		return baseURL+'?filter={"where":{"status.retweeted_status":{"exists":false},"categories":{"all":['+linkTema+''+linkCategoria+''+linkLocalidade+']}},"limit":25,"skip":0, "order": "status.timestamp_ms DESC"}';

	}else if(tag === undefined){

		return serviceBase+'twitter/word_no_rt?filter={"where":{"status.created_at":{"gte":"'+localTime+'","lte":"'+dataNow+'"},"word":"'+word+'","categories":{"all":['+linkTema+''+linkCategoria+''+linkLocalidade+']}},"limit":25}';

	}else if(word === undefined){

		return baseURL+'?filter={"where":{"status.entities.hashtags.text":{"all":["'+tag+'"]},"status.retweeted_status":{"exists":false},"status.created_at":{"gte":"'+localTime+'","lte":"'+dataNow+'"},"categories":{"all":['+linkTema+''+linkCategoria+''+linkLocalidade+']}},"limit":25,"skip":0}';

	}
};

function functionImage(localTime, dataNow, linkTema, linkCategoria, linkLocalidade, word, tag){

	if((word === undefined) && (tag === undefined)){

		return baseURL+'/analytics?type=top-images&filter={"where":{"status.created_at":{"gte":"'+localTime+'","lte":"'+dataNow+'"},"categories":{"all":['+linkTema+''+linkCategoria+''+linkLocalidade+']}},"limit":400,"skip":0}';

	}else if(tag === undefined){

		return serviceBase+'twitter/word_images?filter={"where":{"status.created_at":{"gte":"'+localTime+'","lte":"'+dataNow+'"},"word":"'+word+'","categories":{"all":['+linkTema+''+linkCategoria+''+linkLocalidade+']}},"limit":400}';

	}else if(word === undefined){

		return baseURL+'/analytics?type=top-images&filter={"where":{"status.entities.hashtags.text":{"all":["'+tag+'"]},"status.created_at":{"gte":"'+localTime+'","lte":"'+dataNow+'"},"categories":{"all":['+linkTema+''+linkCategoria+''+linkLocalidade+']}},"limit":400,"skip":0}';

	}
};

function functionTag(localTime, dataNow, linkTema, linkCategoria, linkLocalidade){

	return baseURL+'/analytics?type=top-hashtags&filter={"where":{"status.created_at":{"gte":"'+localTime+'","lte":"'+dataNow+'"},"categories":{"all":['+linkTema+''+linkCategoria+''+linkLocalidade+']}},"limit":25,"skip":0}';

};

function functionWord(localTime, dataNow, linkTema, linkCategoria, linkLocalidade){

	return serviceBase+'twitter/top_words?filter={"where":{"status.created_at":{"gte":"'+localTime+'","lte":"'+dataNow+'"}, "categories":{"all":['+linkTema+''+linkCategoria+''+linkLocalidade+']}}}';

};

function functionMap(localTime, dataNow, linkTema, linkCategoria, linkLocalidade){

	return serviceBase+'twitter/map_volume?filter={"where":{"status.created_at":{"gte":"'+localTime+'","lte":"'+dataNow+'"},"categories":{"all":['+linkTema+''+linkCategoria+''+linkLocalidade+']}}}';

};

/* variaveis Monitor */
var linkConteudo = functionConteudo(dataNow12, dataNow, linkTema, linkCategoria, linkLocalidade, 25, 0, undefined, undefined);

var linkImg = functionNoRtConteudo(dataNow12, dataNow, linkTema, linkCategoria, linkLocalidade, undefined, undefined, 25);

var linkTag = functionTag(dataNow12, dataNow, linkTema, linkCategoria, linkLocalidade);

var linkWord = functionWord(dataNow12, dataNow, linkTema, linkCategoria, linkLocalidade);

var linkMap = functionMap(dataNow12, dataNow, linkTema, linkCategoria, linkLocalidade);

var monitorCountTweet = baseURL+'/count?where={}';
var monitorCountImage = baseURL+'/count?where={"status.entities.media":{"exists":true}}';

var linkNoRtConteudo = functionNoRtConteudo(dataNow12, dataNow, linkTema, linkCategoria, linkLocalidade, undefined, undefined);

var linkUser = functionUser(dataNow12, dataNow, linkTema, linkCategoria, linkLocalidade);
var linkMentions = functionMentions(dataNow12, dataNow, linkTema, linkCategoria, linkLocalidade);
var linkUrls = functionUrl(dataNow12, dataNow, linkTema, linkCategoria, linkLocalidade);

hashTwitter.run(function($rootScope) {

	$rootScope.$on('handleEmitConteudo', function(event, args, args1) {
		//		console.logo(args);
		//		args = parser_query(args);
		//		console.logo(args);
		//		args1 = parser_query(args1);
		$rootScope.$broadcast('handleBroadcastConteudo', args, args1);
	});

	$rootScope.$on('handleEmitImage', function(event, args) {
		//		args = parser_query(args);
		$rootScope.$broadcast('handleBroadcastImage', args);
	});

	$rootScope.$on('handleEmitTag', function(event, args) {
		//		args = parser_query(args);
		$rootScope.$broadcast('handleBroadcastTag', args);
	});

	$rootScope.$on('handleEmitWord', function(event, args) {
		//		args = parser_query(args);
		$rootScope.$broadcast('handleBroadcastWord', args);
	});

	$rootScope.$on('handleEmitMap', function(event, args) {
		//		console.log(2);
		//		console.log(args);
		//		args = parser_query(args);
		//		console.log(args);
		$rootScope.$broadcast('handleBroadcastMap', args);
	});

	$rootScope.$on('handleEmitPalavrasWord', function(event, args) {
		//		args = parser_query(args);
		$rootScope.$broadcast('handleBroadcastPalavrasWord', args);
	});

	$rootScope.$on('handleEmitUrl', function(event, args) {
		//		args = parser_query(args);
		$rootScope.$broadcast('handleBroadcastUrl', args);
	});

	$rootScope.$on('handleEmitMentions', function(event, args) {
		//		args = parser_query(args);
		$rootScope.$broadcast('handleBroadcastMentions', args);
	});

	$rootScope.$on('handleEmitUser', function(event, args) {
		//		args = parser_query(args);
		$rootScope.$broadcast('handleBroadcastUser', args);
	});
});

/* NOTA: MONITOR - CONTROLLER */

hashTwitter.controller('mainMonitor', function ($scope) {

	$scope.showTopWord = false;

	$scope.wordChange = function(x){
		$scope.showTopWord = true;
		$scope.wordOne = x;
	};

	$scope.tagChange = function(x){
		$scope.tagOne = x;
	};

	var conteudoSelect = "Negro";
	var categoriaSelect = "";
	var localidadeSelect = "";
	var wordSelect = "";
	var tagSelect = "";
	var limit = 1;

	$scope.filterChange = function(){
		$scope.filtro = conteudoSelect+" "+categoriaSelect+" "+localidadeSelect+" "+wordSelect+" "+tagSelect;
	};

	$scope.filterChange();

	$scope.categoriaIndex = function (x) {
		catNumber = x;
	};

	$scope.templates = [ { name: 'WordTweet', url: 'app/monitor/wordTweet.html'},
						{ name: 'TagTweet', url: 'app/monitor/tagTweet.html'} ];

	$scope.template = $scope.templates[0];

	$scope.templateIndex = function (x) {
		$scope.template = $scope.templates[x];
	};

	$scope.templatesConteudo = [{ name: 'twTweet', url: 'app/monitor/twTweet.html'},
								{ name: 'imgTweet', url: 'app/monitor/imgTweet.html'},
								{ name: 'twContTweet', url: 'app/monitor/twContTweet.html'},
								{ name: 'imgMosaicoTweet', url: 'app/monitor/imgMosaicoTweet.html'},
								{ name: 'usuario', url: 'app/monitor/usuario.html'},
								{ name: 'mensoes', url: 'app/monitor/mentions.html'},
								{ name: 'url', url: 'app/monitor/url.html'},
							   ];

	$scope.templateConteudo = $scope.templatesConteudo[0];

	$scope.templateConteudoIndex = function (x) {
		$scope.templateConteudo = $scope.templatesConteudo[x];
	};

	$scope.loadMoreTweetsChange = function (n) {
		count = n + count;

		$( ".geralTweets_result" ).scrollTop( "slow" );

		var localTime;

		var nskip = count * 25;
		var nlimit = count * 25 + 25;

		localTime = transformTime(linkTime);

		linkConteudo = functionConteudo(localTime, dataNow, linkTema, linkCategoria, linkLocalidade, nlimit, nskip);

		linkNoRtConteudo = functionNoRtConteudo(localTime, dataNow, linkTema, linkCategoria, linkLocalidade);

		$scope.$emit('handleEmitImage', linkImg);
		$scope.$emit('handleEmitConteudo', linkConteudo, linkNoRtConteudo);
	};

	//	$scope.loadWordsPub = function (word)

	$scope.loadWordsPub = function (word) {

		count = 0;

		wordSelect = "> "+word;

		tagSelect = "";
		categoriaSelect = "";

		linkCategoria = "";

		var localTime;

		localTime = transformTime(linkTime);

		linkConteudo = functionConteudo(localTime, dataNow, linkTema, linkCategoria, linkLocalidade, 25, undefined, word);

		linkNoRtConteudo = functionNoRtConteudo(localTime, dataNow, linkTema, linkCategoria, linkLocalidade, word, undefined);
		console.log(linkNoRtConteudo);

		linkImg = functionImage(localTime, dataNow, linkTema, linkCategoria, linkLocalidade, word, undefined);

		$scope.$emit('handleEmitImage', linkImg);
		$scope.$emit('handleEmitConteudo', linkConteudo, linkNoRtConteudo);
	};

	$scope.loadHastagsPub = function (tag) {

		count = 0;

		tagSelect = "> "+tag;

		wordSelect = "";
		categoriaSelect = "";

		linkCategoria = "";

		var localTime;

		localTime = transformTime(linkTime);

		linkConteudo = functionConteudo(localTime, dataNow, linkTema, linkCategoria, linkLocalidade, undefined, undefined, undefined, tag);

		linkNoRtConteudo = functionNoRtConteudo(localTime, dataNow, linkTema, linkCategoria, linkLocalidade, undefined, tag);

		linkImg = functionImage(localTime, dataNow, linkTema, linkCategoria, linkLocalidade, undefined, tag);

		$scope.$emit('handleEmitImage', linkImg);
		$scope.$emit('handleEmitConteudo', linkConteudo, linkNoRtConteudo);
	};

	$scope.changeLocalidade = function (local) {

		count = 0;

		linkLocalidade = local;

		var localTime;

		localTime = transformTime(linkTime);

		linkConteudo = functionConteudo(localTime, dataNow, linkTema, linkCategoria, linkLocalidade, 25, 0);

		linkNoRtConteudo = functionNoRtConteudo(localTime, dataNow, linkTema, linkCategoria, linkLocalidade);

		linkImg = functionImage(localTime, dataNow, linkTema, linkCategoria, linkLocalidade);

		linkTag = functionTag(localTime, dataNow, linkTema, linkCategoria, linkLocalidade);

		linkWord = functionWord(localTime, dataNow, linkTema, linkCategoria, linkLocalidade);
		
		linkUser = functionUser(localTime, dataNow, linkTema, linkCategoria, linkLocalidade);
		
		linkMentions = functionMentions(localTime, dataNow, linkTema, linkCategoria, linkLocalidade);
		
		linkUrls = functionUrl(localTime, dataNow, linkTema, linkCategoria, linkLocalidade);

		$scope.$emit('handleEmitTag', linkTag);
		$scope.$emit('handleEmitWord', linkWord);
		$scope.$emit('handleEmitImage', linkImg);
		$scope.$emit('handleEmitUser', linkUser);
		$scope.$emit('handleEmitMentions', linkMentions);
		$scope.$emit('handleEmitUrl', linkUrl);
		$scope.$emit('handleEmitConteudo', linkConteudo, linkNoRtConteudo);
	};

	$scope.changeCategoria = function (cat) {

		count = 0;

		categoriaSelect = "> "+nome;

		wordSelect = "";
		tagSelect = "";

		linkCategoria = cat;
		linkLocalidade = '';

		var localTime;

		localTime = transformTime(linkTime);

		linkConteudo = functionConteudo(localTime, dataNow, linkTema, linkCategoria, linkLocalidade, 25, 0);

		linkNoRtConteudo = functionNoRtConteudo(localTime, dataNow, linkTema, linkCategoria, linkLocalidade);

		linkImg = functionImage(localTime, dataNow, linkTema, linkCategoria, linkLocalidade);

		linkUser = functionUser(localTime, dataNow, linkTema, linkCategoria, linkLocalidade);
		
		linkMentions = functionMentions(localTime, dataNow, linkTema, linkCategoria, linkLocalidade);
		
		linkUrls = functionUrl(localTime, dataNow, linkTema, linkCategoria, linkLocalidade);

		$scope.$emit('handleEmitUser', linkUser);
		$scope.$emit('handleEmitMentions', linkMentions);
		$scope.$emit('handleEmitUrl', linkUrl);
		$scope.$emit('handleEmitImage', linkImg);
		$scope.$emit('handleEmitConteudo', linkConteudo, linkNoRtConteudo);
	};

	$scope.changeTemporalidade = function (time) {

		count = 0;

		linkCategoria = "";
		linkTime = time;

		var localTime;

		localTime = transformTime(linkTime);

		linkConteudo = functionConteudo(localTime, dataNow, linkTema, linkCategoria, linkLocalidade, 25, 0);

		linkNoRtConteudo = functionNoRtConteudo(localTime, dataNow, linkTema, linkCategoria, linkLocalidade);

		linkImg = functionImage(localTime, dataNow, linkTema, linkCategoria, linkLocalidade);

		linkTag = functionTag(localTime, dataNow, linkTema, linkCategoria, linkLocalidade);

		linkWord = functionWord(localTime, dataNow, linkTema, linkCategoria, linkLocalidade);

		linkMap = functionMap(localTime, dataNow, linkTema, linkCategoria, linkLocalidade);
		
		linkUser = functionUser(localTime, dataNow, linkTema, linkCategoria, linkLocalidade);
		
		linkMentions = functionMentions(localTime, dataNow, linkTema, linkCategoria, linkLocalidade);
		
		linkUrls = functionUrl(localTime, dataNow, linkTema, linkCategoria, linkLocalidade);

		$scope.$emit('handleEmitMap', linkMap);
		$scope.$emit('handleEmitTag', linkTag);
		$scope.$emit('handleEmitWord', linkWord);
		$scope.$emit('handleEmitImage', linkImg);
		$scope.$emit('handleEmitUser', linkUser);
		$scope.$emit('handleEmitMentions', linkMentions);
		$scope.$emit('handleEmitUrl', linkUrls);
		$scope.$emit('handleEmitConteudo', linkConteudo, linkNoRtConteudo);
	};

	$scope.changeTema = function (tema, nome) {

		count = 0;

		conteudoSelect = nome;

		categoriaSelect = "";
		localidadeSelect = "";
		wordSelect = "";
		tagSelect = "";

		linkTema = tema;
		linkCategoria = "";
		linkLocalidade = "";

		var localTime;

		localTime = transformTime(linkTime);

		linkConteudo = functionConteudo(localTime, dataNow, linkTema, linkCategoria, linkLocalidade, 25, 0);

		linkNoRtConteudo = functionNoRtConteudo(localTime, dataNow, linkTema, linkCategoria, linkLocalidade);

		linkImg = functionImage(localTime, dataNow, linkTema, linkCategoria, linkLocalidade);

		linkTag = functionTag(localTime, dataNow, linkTema, linkCategoria, linkLocalidade);

		linkWord = functionWord(localTime, dataNow, linkTema, linkCategoria, linkLocalidade);

		linkMap = functionMap(localTime, dataNow, linkTema, linkCategoria, linkLocalidade);
		
		linkUser = functionUser(localTime, dataNow, linkTema, linkCategoria, linkLocalidade);
		
		linkMentions = functionMentions(localTime, dataNow, linkTema, linkCategoria, linkLocalidade);
		
		linkUrls = functionUrl(localTime, dataNow, linkTema, linkCategoria, linkLocalidade);

		$scope.$emit('handleEmitMap', linkMap);
		$scope.$emit('handleEmitTag', linkTag);
		$scope.$emit('handleEmitWord', linkWord);
		$scope.$emit('handleEmitImage', linkImg);
		$scope.$emit('handleEmitUser', linkUser);
		$scope.$emit('handleEmitMentions', linkMentions);
		$scope.$emit('handleEmitUrl', linkUrl);
		$scope.$emit('handleEmitConteudo', linkConteudo, linkNoRtConteudo);
	};
});

hashTwitter.controller('ResultWords', function ($scope) {});

/* Esse controle serve para ver qual Tematica aparecerá em conteudo e perfil */
hashTwitter.controller('MenuDivisionTematica', ['$scope', '$http', '$interval', function ($scope, $http, $interval) {

	$http.get(monitorCountTweet).success(function (data) {
		$scope.countRetweet = data;

		$scope.contConteudoChange = function(x,max){
			$interval(function() {
				if( x < max) {
					x = x + 7;
					$scope.countRetweetFinal = x;
				}
			},100);
		};

		$scope.contConteudoChange(1200000, $scope.countRetweet.count);
	});

	$http.get(monitorCountImage).success(function (data) {
		$scope.countImage = data;

		$scope.contImageChange = function(x,max){
			$interval(function() {
				if( x < max) {
					x = x + 7;
					$scope.countImageFinal = x;
				}
			},100);
		};

		$scope.contImageChange(90000,$scope.countImage.count);
	});
}]);

hashTwitter.controller('MenuMap', ['$scope', '$http', function ($scope, $http) {

	var maxCont = 0;

	$scope.dataMapaON = true;
	$scope.textLoadDisplayMap = true;

	$http.get(linkMap).success(function (data) {

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

		$scope.legendMetade = maxCont/2;
		$scope.legendMax = maxCont;

		$scope.dataMapaON = false;
		$scope.textLoadDisplayMap = false;
	});

	$scope.$on('handleBroadcastMap', function(event, args) {

		$("#svg-map a path").css( "fill", "#d1e8c5" );

		$scope.legendMetade = 0;
		$scope.legendMax = 0;

		$scope.dataMapaON = true;
		$scope.textLoadDisplayMap = true;

		$http.get(args).success(function (data) {

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

			//			$scope.loadHalf(true);
		});
	});
}]);

hashTwitter.controller('HashTwitterCtr', ['$scope', '$http', function ($scope, $http) {
	var contData = 0;

	$scope.dataLoadON = false;
	$scope.dataLoad404 = false;
	$scope.dataLoadOFF = true;
	$scope.dataLoadERROR = false;

	if(count > 0){
		$scope.buttonBack = true;
	}else{
		$scope.buttonBack = false;
	}

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
		$scope.dataLoad404 = false;
		$scope.dataLoadOFF = false;
		$scope.dataLoadON = false;
		console.log(status);
	});  

	$scope.$on('handleBroadcastConteudo', function(event, args, args1) {

		$scope.dataLoadON = false;
		$scope.dataLoad404 = false;
		$scope.dataLoadOFF = true;
		$scope.dataLoadERROR = false;

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
			$scope.dataLoad404 = false;
			$scope.dataLoadOFF = false;
			$scope.dataLoadON = false;
			console.log(status);
		});   
	});   
}]);

hashTwitter.controller('HashImgCtr', ['$scope', '$http', function ($scope, $http) {

	$( ".geralTweets_result" ).scrollTop( "slow" );

	$scope.dataLoadON = false;
	$scope.dataLoad404 = false;
	$scope.dataLoadOFF = true;
	$scope.dataLoadERROR = false;

	$http.get(linkImg).success(function (data) {
		$scope.imgs = data.splice(0,24);
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
		$scope.dataLoad404 = false;
		$scope.dataLoadOFF = false;
		$scope.dataLoadON = false;
		$scope.dataLoadERROR = true;
		console.log(status);
	});

	var tamDiv = $(".geralTweets_result").css( "width" );
	tamDiv = parseInt(tamDiv);
	$scope.alturaImg = tamDiv / 3;

	$scope.$on('handleBroadcastImage', function(event, args) {
		$( ".geralTweets_result" ).scrollTop( "slow" );

		$scope.dataLoadON = false;
		$scope.dataLoad404 = false;
		$scope.dataLoadOFF = true;
		$scope.dataLoadERROR = false;

		$http.get(args).success(function (data) {
			$scope.imgs = data.splice(0,24);
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
			$scope.dataLoad404 = false;
			$scope.dataLoadOFF = false;
			$scope.dataLoadON = false;
			$scope.dataLoadERROR = true;
			console.log(status);
		});
	});   
}]);

hashTwitter.controller('HashImgMosaicoCtr', ['$scope', '$http', function ($scope, $http) {

	$( ".geralTweets_result" ).scrollTop( "slow" );

	$scope.dataLoadON = false;
	$scope.dataLoad404 = false;
	$scope.dataLoadOFF = true;
	$scope.dataLoadERROR = false;

	$http.get(linkImg).success(function (data) {

		$scope.imgs = data;
		$scope.imgs1 = data[0];
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
		$scope.dataLoad404 = false;
		$scope.dataLoadOFF = false;
		$scope.dataLoadON = false;
		console.log(status);
	});

	var tamDiv = $(".geralTweets_result").css( "width" );
	tamDiv = parseInt(tamDiv);
	$scope.alturaImg = tamDiv / 15;

	$scope.$on('handleBroadcastImage', function(event, args) {
		$( ".geralTweets_result" ).scrollTop( "slow" );

		$scope.dataLoadON = false;
		$scope.dataLoad404 = false;
		$scope.dataLoadOFF = true;
		$scope.dataLoadERROR = false;

		$http.get(args).success(function (data) {

			$scope.imgs = data;
			$scope.imgs1 = data[0];
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
			$scope.dataLoad404 = false;
			$scope.dataLoadOFF = false;
			$scope.dataLoadON = false;
			$scope.dataLoadERROR = true;
			console.log(status);
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
	$scope.dataLoad404 = false;
	$scope.dataLoadOFF = true;
	$scope.dataLoadERROR = false;

	$http.get(linkWord).success(function (data) {
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

		//		if (bool === true){
		//			$scope.$emit('handleEmitConteudo', linkConteudo, linkNoRtConteudo);
		//			$scope.$emit('handleEmitImage', linkImg);
		//		}

	}).error(function(data, status) {
		$scope.dataLoadERROR = true;
		$scope.dataLoad404 = false;
		$scope.dataLoadOFF = false;
		$scope.dataLoadON = false;
		console.log(status);
	});

	$http.get("data/test/conteudos.json").success(function (data) {
		$scope.conteudos = data[catNumber];
	});

	$scope.$on('handleBroadcastWord', function(event, args) {
		$scope.dataLoadON = false;
		$scope.dataLoad404 = false;
		$scope.dataLoadOFF = true;
		$scope.dataLoadERROR = false;

		$http.get(args).success(function (data) {
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

			//			if (bool === true){
			//				$scope.$emit('handleEmitConteudo', linkConteudo, linkNoRtConteudo);
			//				$scope.$emit('handleEmitImage', linkImg);
			//			}

		}).error(function(data, status) {
			$scope.dataLoadERROR = true;
			$scope.dataLoad404 = false;
			$scope.dataLoadOFF = false;
			$scope.dataLoadON = false;
			console.log(status);
		});

		$http.get("data/test/conteudos.json").success(function (data) {
			$scope.conteudos = data[catNumber];
		});
	});
}]);

hashTwitter.controller('HashUser', ['$scope', '$http', function ($scope, $http) {

	$scope.dataLoadON = false;
	$scope.dataLoad404 = false;
	$scope.dataLoadOFF = true;
	$scope.dataLoadERROR = false;

	$http.get(linkUser).success(function (data) {
		$scope.users = data;
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
		$scope.dataLoad404 = false;
		$scope.dataLoadOFF = false;
		$scope.dataLoadON = false;
		console.log(status);
	});

	$scope.$on('handleBroadcastUser', function(event, args) {
		$scope.dataLoadON = false;
		$scope.dataLoad404 = false;
		$scope.dataLoadOFF = true;
		$scope.dataLoadERROR = false;

		$http.get(args).success(function (data) {
			$scope.users = data;
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
			$scope.dataLoad404 = false;
			$scope.dataLoadOFF = false;
			$scope.dataLoadON = false;
			console.log(status);
		});
	});
}]);

hashTwitter.controller('HashMentions', ['$scope', '$http', function ($scope, $http) {

	$scope.dataLoadON = false;
	$scope.dataLoad404 = false;
	$scope.dataLoadOFF = true;
	$scope.dataLoadERROR = false;

	$http.get(linkMentions).success(function (data) {
		$scope.mentions = data;
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
		$scope.dataLoad404 = false;
		$scope.dataLoadOFF = false;
		$scope.dataLoadON = false;
		console.log(status);
	});

	$scope.$on('handleBroadcastMentions', function(event, args) {
		$scope.dataLoadON = false;
		$scope.dataLoad404 = false;
		$scope.dataLoadOFF = true;
		$scope.dataLoadERROR = false;

		$http.get(args).success(function (data) {
			$scope.mentions = data;
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
			$scope.dataLoad404 = false;
			$scope.dataLoadOFF = false;
			$scope.dataLoadON = false;
			console.log(status);
		});
	});
}]);

hashTwitter.controller('HashUrls', ['$scope', '$http', function ($scope, $http) {

	$scope.dataLoadON = false;
	$scope.dataLoad404 = false;
	$scope.dataLoadOFF = true;
	$scope.dataLoadERROR = false;

	$http.get(linkUrls).success(function (data) {
		$scope.urls = data;
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
		$scope.dataLoad404 = false;
		$scope.dataLoadOFF = false;
		$scope.dataLoadON = false;
		console.log(status);
	});

	$scope.$on('handleBroadcastUrls', function(event, args) {
		$scope.dataLoadON = false;
		$scope.dataLoad404 = false;
		$scope.dataLoadOFF = true;
		$scope.dataLoadERROR = false;

		$http.get(args).success(function (data) {
			$scope.urls = data;
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
			$scope.dataLoad404 = false;
			$scope.dataLoadOFF = false;
			$scope.dataLoadON = false;
			console.log(status);
		});
	});
}]);

hashTwitter.controller('HashTags', ['$scope', '$http', function ($scope, $http) {

	$scope.$on('handleBroadcastTag', function(event, args) {
		$scope.dataLoadON = false;
		$scope.dataLoad404 = false;
		$scope.dataLoadOFF = true;
		$scope.dataLoadERROR = false;

		$http.get(args).success(function (data) {
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

			if (bool == true){
				$scope.$emit('handleEmitConteudo', linkConteudo, linkNoRtConteudo);
				$scope.$emit('handleEmitImage', linkImg);
			}
		}).error(function(data, status) {
			$scope.dataLoad404 = false;
			$scope.dataLoadOFF = false;
			$scope.dataLoadON = false;
			$scope.dataLoadERROR = true;
			console.log(status);
		});
	});
}]);
hash.controller('mainInstagram', function ($scope, $http) {
  $http.get('/data/instagram.config.json').then(function(res) {
    $scope.options = res.data;
  });

  $scope.filter = {
    tema: 'tema-negros',
    time: 'recent',
  };

  $scope.$watch('filter', function (newFilter, oldFilter) {
    $(".loading_instagram").show();
    $(".fade_white").show();

    var url = serviceBase+"/instagram/media?page=1&per_page=100&period=recent&geo=true&tags[]="+newFilter.tema+"";
    startMap(url,"instagram_map");

    var url1 = serviceBase+"/instagram/media?page=1&per_page=100&period=recent&tags[]="+newFilter.tema+"";
    startImageCloud(url1,"instagram_cloudImage",$("#instagram_cloudImage").width());
  },true);

  var info;
  var map;
  var atualInfoWindow = null;

  var width;
  var increment;

  function startMap(url, divID){

    d3.json(url,function(err,json){
      if(err){console.log(err)}
      initialize(json,divID);

      $("#loading_mapa").hide();
    });
  }

  function initialize(result, divID) {
    var mapProp = {
      center:new google.maps.LatLng(-13.72156,-28.8852),
      zoom:4,
      mapTypeId:google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById(divID),mapProp);

    var markers = [];

    count = 0;
    for(i in result){
      markers[count] = getMarkers(result[i].data, i);
      markers[count].setMap(map);
      markers[count].addListener('click', function(){
        showInfo(result[this._id].data);
      });
      count++;
    }
  }

  function showInfo(data){
    if(atualInfoWindow != null) atualInfoWindow.close();

    img = "<img class=\"instagram-preview-image\" src=\"" + data.images.low_resolution.url + "\"></img>";
  	info = new google.maps.InfoWindow({
  		content: img + "<br/><p class=\"instagram-preview-text\" style=\"word-wrap:break-word;\">Legenda: " + data.caption.text + "</p>",
  		position: new google.maps.LatLng(data.location.latitude,data.location.longitude),
      maxWidth:300
  	});
    atualInfoWindow = info;
    info.setMap(map);
  }

  function getMarkers(data, indice){
    return new google.maps.Marker({
  		position: new google.maps.LatLng(data.location.latitude,data.location.longitude),
      _id: indice,
  	});
  }

  /*IMAGECLOUD*/
  function startImageCloud(url,divID,width){
    d3.json(url,function(err,json){
      d3.select("#instagram_cloudImage").select('svg').remove();
      json.sort(function(a,b){return (parseInt(b.data.created_time) - parseInt(a.data.created_time));});
      runImageCloud(json,divID,width);
      $("#loading_fotos").hide();
      $(".fade_white").hide();
    });
  }

  function runImageCloud(json, divID, w){

  var y;
  var n;
  var counter;
  var thumbnail_width;
  width = w;

  reset();

  increment = 3;

  var svg = d3.select("#" + divID).append("svg")
    .attr("width", width)
    .attr("height", width);
    //.append("g");

  var images = svg.selectAll("a")
      .data(json).enter()
      .append("a")
      .attr("xlink:href",function(d){return d.data.link;})
      .attr("target","_blank")
      .append("image")
      .attr("xlink:href",function(d){return d.data.images.standard_resolution.url})
      .attr("x",function(d,i){if(i==0){reset()}; return calcX();})
      .attr("width",function(d,i){if(i==0){reset()}; return calcWidth()+ "px";})
      .attr("height",function(d,i){if(i==0){reset()}; return calcWidth()+ "px";})
      .attr("y",function(d,i){if(i==0){reset()}; return calcY();});
  }

  function reset(){
    y = 0;
    n = 5;
    counter = 0;
    thumbnail_width = parseInt(width/n);
  }

  function calcX(){
    r = thumbnail_width * counter;
    counter++;
      if (counter == n){
      counter = 0;
      n = n + increment;
      thumbnail_width = parseInt(width/n);
    }
    return r;
  }

  function calcWidth(){
    r = thumbnail_width;
    counter++;
      if (counter == n){
      counter = 0;
      n = n + increment;
      thumbnail_width = parseInt(width/n);
    }
    return r;
  }

  function calcY(){
    counter++;
    var r = y;
    if (counter == n){
      counter = 0;
      n = n + increment;
      y = y + thumbnail_width;
      thumbnail_width = parseInt(width/n);
    }
    return r;
  }

});

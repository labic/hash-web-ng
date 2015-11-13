var info;
var map;

var width;
var increment; 

function startMap(url,divID){    
  d3.json(url,function(err,json){
    if(err){console.log(err)}        
    initialize(json,divID);
  });
}

function initialize(result,divID) {
  var mapProp = {
    center:new google.maps.LatLng(-18.72156,-39.8852),
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
  img = "<img src=\"" + data.images.thumbnail.url + "\"></img>";
	info = new google.maps.InfoWindow({
		content: img + "<br/>text: " + data.caption.text,
		position: new google.maps.LatLng(data.location.latitude,data.location.longitude)
	});		
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
    json.sort(function(a,b){return (parseInt(b.data.created_time) - parseInt(a.data.created_time));});
    runImageCloud(json,divID,width);    
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
    /*.on("mouseover",function(d){
       var str = "<span>" + d.id + "</span><br>" + "<span>" + d.user_username + "</span><br>" + "<span>" + d.like + " likes" + "</span><br>";
       viewBox.html(str).style("opacity",1).style("left", (d3.event.pageX +20) + "px").style("top", (d3.event.pageY - 12) + "px");
    });*/
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



var info;
var jsonFinal;
var map;

colorMap = ["red","blue","black","green"];

/*function readCSV(fileName){
  d3.csv(fileName,function(error,data){
    console.log(data);
    initialize(data);
  });
}*/

function start(){
  d3.json("data/test/testeMapa.json",function(err,json){
    if(err){console.log(err)}
    //console.log(json);
    jsonFinal = json;
    initialize(json.result,-1);
  });
  
}


function initialize(result,id) {
  var mapProp = {
    center:new google.maps.LatLng(-18.72156,-39.8852),
    zoom:4,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  
  map = new google.maps.Map(document.getElementById("div2_territorio"),mapProp);

  var markers = [];

  count = 0;
  for(i in result){
    if(id==-1 || i==id){
      tweets = result[i].tweets;
      for(t in tweets){        
        markers[count] = getMarkers(tweets[t], i, t, "markers");
        markers[count].setMap(map);
        markers[count].addListener('click', function(){    
          console.log(this._tema);
          console.log(jsonFinal.result[this._tema]);      
          showInfo(jsonFinal.result[this._tema].tweets[this._id]);          
        });        
        count++;        
      }      
    }
    //console.log(count); 
  }
}

google.maps.event.addDomListener(window, 'load', start());

function showInfo(tweet){
	console.log(tweet);
  img = (tweet.img == null) ? "" : "<img src\"" + tweet.img[0] + "\"></img>";
	info = new google.maps.InfoWindow({
		content: "<img src=\"" + tweet.userimg + "\">" + "</img> user: " + tweet.username + "<br/>text: " + tweet.text + img,
		position: new google.maps.LatLng(tweet.coordinates[0],tweet.coordinates[1])
	});		
  info.setMap(map);
}

function getMarkers(data, tema, indice, style){	
	if(style == "circles"){
		return new google.maps.Marker({                  
      position: new google.maps.LatLng(data.coordinates[0],data.coordinates[1]),
      icon:{
        path: google.maps.SymbolPath.CIRCLE,                  
        scale: 5,
        strokeOpacity:0,
        strokeWeight:0,
        fillColor: colorMap[tema],
        fillOpacity:0.6
      },
      _id: indice,
      _tema: tema
    	});
	}
	if(style == "markers"){
		return new google.maps.Marker({
			position: new google.maps.LatLng(data.coordinates[0],data.coordinates[1]),
      _id: indice,
      _tema: tema
		});		
	}
	if(style == "images"){
		var image = {
  				url:'pin1.png',
  				scaledSize: new google.maps.Size(25,25)
  			};
		return new google.maps.Marker({
  			position: new google.maps.LatLng(data.coordinates[0],data.coordinates[1]),
  			icon: image,  			 			
        _id: indice,
        _tema: tema
  		});
	}
	console.log("tipo incorreto.");
	return null;
}
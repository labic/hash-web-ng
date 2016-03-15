hash.controller('mainMetrics', function ($scope, $http, MetricsFacebook, MetricsTwitter, Tweet, FacebookPosts, InstagramMedia, MetricsInstagram) {

  var colorMap = {"indigena":"#c7144f","genero":"#426083","negros":"#f7931e","lgbt":"#8c6239"};

  var widthLineChart = $("#lineChart").width();
  var widthBarChart = $("#barChart").width();

  $(".loading_relatorio").show();
  $(".fade_white").show();

  $scope.countBar = 0;
  $scope.countLoad = 0;

  $scope.filterLineChart = {
    count : 0,
    status : "twitter"
  }

  Tweet.count({
    period: "7d",
    'filter[contain_tags]': ["tema-negros","tema-genero","tema-indigena","tema-lgbt"]
  }, function success(res) {
    $scope.TwitterTweet = res.count;
    $scope.countLoad++;
  });

  Tweet.count({
    period: "7d",
    'filter[contain_tags]': ["tema-negros","tema-genero","tema-indigena","tema-lgbt"],
    'filter[has]': ['media']
  }, function success(res) {
    $scope.TwitterImage = res.count;
    $scope.countLoad++;
  });

  FacebookPosts.count({
    period: "7d",
    profile_type: 'page',
    'filter[contain_tags]': ["tema-negros","tema-genero","tema-indigena","tema-lgbt"],
  }, function success(res) {
    $scope.FacebookPosts = res.count;
    $scope.countLoad++;
  });

  FacebookPosts.count({
    period: "7d",
    profile_type: 'page',
    //    'filter[contain_tags]': ["tema-negros","tema-genero","tema-indigena","tema-lgbt"],
    'filter[types]':['photo']
  }, function success(res) {
    $scope.FacebookImage = res.count;
    $scope.countLoad++;
  });

  InstagramMedia.count({
    'period': "7d",
    'filter[contain_tags]': ["tema-negros","tema-genero","tema-indigena","tema-lgbt"],
  }, function success(res) {
    $scope.InstagramImage = res.count;
    $scope.countLoad++;
  });

  MetricsTwitter.interationsRate({
    'granularity': "7d",
    'filter[contain_tags]': ["tema-negros","tema-genero","tema-indigena","tema-lgbt"],
  }, function success(res) {
    $scope.TwitterInteration = res.splice(0,7);
    $scope.filterLineChart.count++;
    $scope.countLoad++;
  });

  MetricsFacebook.interationsRate({
    profile_type: 'page',
    'granularity': "7d",
    'filter[contain_tags]': ["tema-negros","tema-genero","tema-indigena","tema-lgbt"],
  }, function success(res) {
    $scope.FacebookInteration = res.splice(0,7);
    $scope.filterLineChart.count++;
    $scope.countLoad++;
  });

  MetricsInstagram.interationsRate({
    'node':'media',
    'granularity': "7d",
    'filter[contain_tags]': ["tema-negros","tema-genero","tema-indigena","tema-lgbt"],
  }, function success(res) {
    $scope.InstagramInteration = res.splice(0,7);
    $scope.filterLineChart.count++;
    $scope.countLoad++;
  });

  Tweet.count({
    period: "7d",
    'filter[contain_tags]': ["tema-negros"]
  }, function success(res) {
    $scope.TwitterNegros = res.count;
    $scope.countBar++;
    $scope.countLoad++;
  });

  Tweet.count({
    period: "7d",
    'filter[contain_tags]': ["tema-genero"]
  }, function success(res) {
    $scope.TwitterGenero = res.count;
    $scope.countBar++;
    $scope.countLoad++;
  });

  Tweet.count({
    period: "7d",
    'filter[contain_tags]': ["tema-indigena"]
  }, function success(res) {
    $scope.TwitterIndigena = res.count;
    $scope.countBar++;
    $scope.countLoad++;
  });

  Tweet.count({
    period: "7d",
    'filter[contain_tags]': ["tema-lgbt"]
  }, function success(res) {
    $scope.TwitterLgbt = res.count;
    $scope.countBar++;
    $scope.countLoad++;
  });

  FacebookPosts.count({
    period: "7d",
    profile_type: 'page',
    'filter[contain_tags]': ["tema-negros"],
  }, function success(res) {
    $scope.FacebookNegros = res.count;
    $scope.countBar++;
    $scope.countLoad++;
  });

  FacebookPosts.count({
    period: "7d",
    profile_type: 'page',
    'filter[contain_tags]': ["tema-genero"],
  }, function success(res) {
    $scope.FacebookGenero = res.count;
    $scope.countBar++;
    $scope.countLoad++;
  });

  FacebookPosts.count({
    period: "7d",
    profile_type: 'page',
    'filter[contain_tags]': ["tema-indigena"],
  }, function success(res) {
    $scope.FacebookIndigena = res.count;
    $scope.countBar++;
    $scope.countLoad++;
  });

  FacebookPosts.count({
    period: "7d",
    profile_type: 'page',
    'filter[contain_tags]': ["tema-lgbt"],
  }, function success(res) {
    $scope.FacebookLgbt = res.count;
    $scope.countBar++;
    $scope.countLoad++;
  });

  InstagramMedia.count({
    period: "7d",
    'filter[contain_tags]': ["tema-negros"]
  }, function success(res) {
    $scope.InstagramNegros = res.count;
    $scope.countBar++;
    $scope.countLoad++;
  });

  InstagramMedia.count({
    period: "7d",
    'filter[contain_tags]': ["tema-genero"]
  }, function success(res) {
    $scope.InstagramGenero = res.count;
    $scope.countBar++;
    $scope.countLoad++;
  });

  InstagramMedia.count({
    period: "7d",
    'filter[contain_tags]': ["tema-indigena"]
  }, function success(res) {
    $scope.InstagramIndigena = res.count;
    $scope.countBar++;
    $scope.countLoad++;
  });

  InstagramMedia.count({
    period: "7d",
    'filter[contain_tags]': ["tema-lgbt"]
  }, function success(res) {
    $scope.InstagramLgbt = res.count;
    $scope.countBar++;
    $scope.countLoad++;
  });

  $scope.$watch('countBar', function (newFilter, oldFilter) {
    if(newFilter == 12){
      var barChart =
          {
            "twitter":{"indigena": $scope.TwitterIndigena, "genero": $scope.TwitterGenero, "negros": $scope.TwitterNegros, "lgbt": $scope.TwitterLgbt},
            "facebook":{"indigena": $scope.FacebookIndigena,"genero": $scope.FacebookGenero,"negros": $scope.FacebookNegros,"lgbt": $scope.FacebookLgbt},
            "instagram":{"indigena": $scope.InstagramIndigena,"genero": $scope.InstagramGenero,"negros": $scope.InstagramNegros,"lgbt": $scope.InstagramLgbt}
          };

      plotBarChart(barChart,"barChart",widthBarChart,120,15,25,colorMap);
    }
  });

  $scope.$watch('filterLineChart', function (newFilter, oldFilter) {
    console.log(newFilter.status);
    console.log(oldFilter.status);

    if((newFilter.count == 3) || (newFilter.status != oldFilter.status)){
      var redes = [newFilter.status];
      var lineChart =
          {
            "facebook":$scope.FacebookInteration,
            "twitter":$scope.TwitterInteration,
            "instagram":$scope.InstagramInteration
          };
      d3.select("#lineChart").select('svg').remove();
      plotLineCharts(lineChart,"lineChart",widthLineChart-100,150, redes);
    }
  },true);

  $scope.$watch('countLoad', function (newFilter, oldFilter) {
    if(newFilter == 20){
      $(".loading_relatorio").hide();
    }
  });

  var offsetTop;
  var offsetLeft;

  function plotBarChart(json,divId,width,height,barHeight,jump,colorMap){
  	mapa = [];
  	mapeia(mapa,json.twitter,width,0);
  	mapeia(mapa,json.facebook,width,1);
  	mapeia(mapa,json.instagram,width,2);

  	var svg = d3.select("#" + divId).append("svg")
      .attr("width", width)
      .attr("height", height);

      var bars = svg.selectAll("rect").data(mapa).enter().append("rect");

      bars.attr("x",function(d){return d.x0})
      .attr("y", function(d){return d.line*jump + d.line*barHeight;})
      .attr("width",function(d){return d.w;})
      .attr("height",barHeight)
      .style("fill",function(d){return colorMap[d.tema];})
      .on("mouseover", function(d){
      	tooltip.text((d.percentual * 100).toFixed(2) + "% " + d.tema.toUpperCase());
      	tooltip.style("top", ((d.line + 1)*barHeight + d.line*(jump) + offsetTop) + "px")
      	.style("left",(d.x0 + d.w*0.2 + offsetLeft)+"px")
      	.style("visibility", "visible");
      })
  	.on("mouseout", function(){return tooltip.style("visibility", "hidden");});

  	divData = d3.select("#" + divId)[0][0];
  	offsetTop = divData.offsetTop;
  	offsetLeft = divData.offsetLeft;

  	var tooltip = d3.select("#" + divId)
  	.append("div")
  	.attr("class","tooltip")
  	.style("position", "absolute")
  	.style("z-index", "10")
  	.style("visibility", "hidden");
  }

  function mapeia(mapa, rede, width, indice){
  	total = soma(rede);
  	x0 = 0;
  	for(i in rede){
  		p = rede[i]/total;
  		insert = {"tema":i, "x0":x0, "count":rede[i], "percentual":p,"w":width*p, "line":indice};
  		x0 = x0 + width*p;
  		mapa.push(insert);
  	}
  }

  function soma(rede){
  	return rede.lgbt + rede.genero + rede.negros + rede.indigena;
  }

  function plotLineCharts(json,divId,width,height,redes){
    var margin = {top: 20, right: 80, bottom: 30, left: 50};

    var parseDate = d3.time.format("%Y-%m-%d %H:%M:%S").parse;
    var controlMap = [];

    var x = d3.time.scale()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var color = d3.scale.category10();

    var xAxis = d3.svg.axis()
        .scale(x)
        .ticks(d3.time.days,1)
        .tickFormat(function(d) {return d.getDate() + "/" + (d.getMonth() + 1);})
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .ticks(5)
        .orient("left");

    var line = d3.svg.line()
        //.interpolate("basis")
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.count); });

    var svg = d3.select("#" + divId).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    color.domain(redes);

    for (i in redes){
      controlMap[i] = {"rede":redes[i], timeMap:{}};
      json[redes[i]].forEach(function(d) {
        tempDateStr = d.time.replace("T03"," 00").replace("T02"," 00").replace("T"," ").slice(0,d.time.length-5);
        d.date = parseDate(tempDateStr);
        controlMap[i].timeMap["" + d.date.getTime()] = d.count;
      });
    }

    console.log(controlMap);

    var cities = redes.map(function(name){
      return {
        name: name,
        values: json[name].map(function(d) {
          return {date: d.date, count: +d["count"]};
        })
      };
    });

    x.domain(d3.extent(json[redes[0]], function(d) { return d.date; }));

    y.domain([
      d3.min(cities, function(c) { return d3.min(c.values, function(v) { return v.count; }); }),
      d3.max(cities, function(c) { return d3.max(c.values, function(v) { return v.count; }); })
    ]);

    g = svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        ;

    var city = svg.selectAll(".city")
        .data(cities)
      .enter().append("g")
        .attr("class", "city");

    city.append("path")
        .attr("class", "line")
        .attr("d", function(d) {return line(d.values); })
        .style("stroke", function(d) { return color(d.name); });

    var focus = svg.append("g")
      .attr("class", "focus")
      .style("display", "none");

    var circles = svg.selectAll("circle")
    .data(controlMap)
    .enter()
    .append("circle")
    .attr("fill","none")
    .attr("stroke","black")
    .attr("r", 4.5);

    legendas = [];
    for(i=0;i<redes.length;i++){
      legendas[i] = svg.append("text");
    }

    focus.append("text")
      .attr("x", 9)
      .attr("dy", ".35em");

    svg.append("rect")
        .attr("class", "overlay")
        .attr("width", width)
        .attr("height", height)
        .on("mouseover", function() { focus.style("display", null); })
        .on("mouseout", function() { focus.style("display", "none"); })
        .on("mousemove", mousemove);

    function mousemove() {
      var x0 = x.invert(d3.mouse(this)[0]);
      if(x0.getHours()>11){
        x0.setDate(x0.getDate() + 1);
      }

      x0.setHours(0);
      x0.setMinutes(0);
      x0.setSeconds(0);
      x0.setMilliseconds(0);

      t = "" + x0.getTime();

      circles.attr("cx",x(x0)).attr("cy",function(d){
        return y(d.timeMap[t]);
      });

      for(i in legendas){
        legendas[i].text(controlMap[i].rede + " " + controlMap[i].timeMap[t]);
        legendas[i].attr("x",x(x0) + 7).attr("y",y(controlMap[i].timeMap[t]) + 4);
      }

    }
  }
});

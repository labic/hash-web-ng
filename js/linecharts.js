function plotLineCharts(url,divId,width,height){
  var margin = {top: 20, right: 80, bottom: 30, left: 50};

  var parseDate = d3.time.format("%Y-%d-%m %H:%M:%S").parse;
  var controlMap = [];

  var x = d3.time.scale()
  .range([0, width]);

  var y = d3.scale.linear()
  .range([height, 0]);

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
  .attr("width", width + margin.left + margin.right + 100)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  d3.json(url, function(error, json){
    if (error) throw error;

    redes = ["twitter","facebook","instagram"];
    
    function color(rede){
      if(rede == "twitter"){
        return "#7ACEE3"
      }else if(rede == "facebook"){
        return "#426083"
      }else if(rede == "instagram"){
        return "#736357"
      }
    }

    for (i in redes){
      controlMap[i] = {"rede":redes[i], timeMap:{}};    
      json[redes[i]].forEach(function(d) {
        d.date = parseDate(d.time);
        controlMap[i].timeMap["" + d.date.getTime()] = d.count;
      });
    }   

    var cities = redes.map(function(name){
      return {
        name: name,
        values: json[name].map(function(d) {        
          return {date: d.date, count: +d["count"]};
        })
      };
    });  

    x.domain(d3.extent(json.facebook, function(d) { return d.date; }));

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
    .attr("fill", "white")
    .attr("stroke", "#1DBFD8")
    .attr("r", 4.5);

    legendas = [];
    for(i=0;i<3;i++){
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

      /*focus.attr("transform", "translate(" + x(d.date) + "," + y(d.close) + ")");
  focus.select("text").text(formatCurrency(d.close));*/
    }
    /*city.append("text")
      .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
      .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.temperature) + ")"; })
      .attr("x", 3)
      .attr("dy", ".35em")
      .text(function(d) { return d.name; });*/
  });
}


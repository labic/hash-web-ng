//dias 1 ou 7
function plotGraph(divId,array,title,dias){
	var margin = {top: 30, right: 85, bottom: 30, left: 50};
    var div = document.getElementById(divId);
    var width = $(div).width() - margin.left - margin.right;
    var height = $(div).height() - margin.top - margin.bottom;
    
    var parseDate = d3.time.format.utc("%d-%m-%YT%H:%M:%S").parse;

    var x = d3.time.scale().range([0, width]);
	var y = d3.scale.linear().range([height, 0]);
	var color = d3.scale.category10();

	x.domain(d3.extent(Object.keys(array[0].data),function(d){return parseDate(d);}))

	maxValues = array.map(function(d){
		return d3.max(Object.values(d.data));
	})

	y.domain([0,d3.max(maxValues)]);

	var xAxis = d3.svg.axis().scale(x)
	.tickFormat(function(d) { return dias == 1 ? d.getUTCHours().pad() + ":00" : d.getDate().pad() + "/" + (d.getMonth()+1).pad() })
    .orient("bottom").ticks(dias == 1 ? 6 : 7);

	var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(4);

    newArray = array.map(function(d){
    	keys = Object.keys(d.data).sort(function(a,b){
            tempa = new parseDate(a).getTime();
            tempb = new parseDate(b).getTime();
            return tempb - tempa;
        });        
    	newData = [];
    	for(i in keys){
    		key = keys[i]
    		newData.push({time:key, value:d.data[key]});
    	}
    	return {
    		name:d.label,
    		data:newData
    	}
    })

    var svg = d3.select("#" + divId)
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", 
              "translate(" + margin.left + "," + margin.top + ")");

    // Define the line
	var valueline = d3.svg.line()
    .x(function(d) { return x(parseDate(d.time)); })
    .y(function(d) { return y(d.value); });

    lines = svg.selectAll("path").data(newArray).enter().append("g");

    paths = lines.append("path");
    
    paths.attr("d", function(d){ return valueline(d.data) })
    .style("stroke", function(d,i){ return color(i)})
    .attr("class","line");

    legenda = svg.append("svg").attr("x",width+5).attr("y",height - newArray.length * 15)
    .attr("class","teste")
    .attr("height",(newArray.length * 15) + 5).attr("width",margin.right - 5);

    rects = legenda.selectAll("rect").data(paths[0]).enter().append("rect");
    rects.attr("width",10).attr("height",10);
    rects.attr("fill",function(d){return d.style.stroke});
    rects.attr("y",function(d,i){ return i*15});
    //rects.attr("x",width + 5);
    
    texts = legenda.selectAll("text").data(newArray).enter().append("text")
    .text(function(d){return d.name;})
    .attr("x",12)
    .attr("y",function(d,i){ return 10 + i*15});

    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    svg.append("text").text(title).attr("x",10);
}

Number.prototype.pad = function(size) {
      var s = String(this);
      while (s.length < (size || 2)) 
      	{s = "0" + s;}
      return s;
}
var fill = d3.scale.category20();
var w;
var id;
var h;
var svg;
var first;

function plotWordCloud(url, width, heigth, divID, firstTime){
  w = width;
  id = divID;
  h = heigth;
  first = firstTime;

  if(firstTime){ d3.select("#" + divID).append("h2").text("WordCloud") };  
          
  d3.json(url,function(err,wordMap){
    var sizeScale = d3.scale.linear().domain([0,wordMap[0].count]).range([10,100]);

    d3.layout.cloud().size([width, 200])
      .words(wordMap.map(function(d,i) {        
        return {text: d.word || d.hashtag, size: sizeScale(d.count)};
      }))
      .padding(5)
      .rotate(function() { return 0; })//~~(Math.random() * 2) * 90; })
      .font("Impact")
      .fontSize(function(d) { return d.size; })
      .on("end", draw)
    .start();
  });
}

function draw(words) {
    if(first){
      svg = d3.select("#" + id).append("svg")
        .attr("width", w)
        .attr("height", h)
      .append("g")
        .attr("transform", "translate(" + w/2 + ",100)");
    }

      temp = svg.selectAll("text")
        .data(words);
    
      temp.enter().append("text")
        .style("font-size", function(d) { return d.size + "px"; })
        .style("font-family", "Impact")
        .style("fill", function(d, i) { return fill(i); })
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.text; });

        temp.transition().duration(1000)
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .style("font-size", function(d) { return d.size + "px"; })
        .text(function(d) { return d.text; });

        temp.exit().remove();
}

var fill = ["#798281", "#4C7F9F"],
  w,
  id,
  h,
  padding;

function plotWordCloud(options, wordMap) {
  // width, heigth, divID
  w = options.width;
  id = options.divID;
  h = options.height;
  padding = options.padding || 0;

  var term = wordMap[0].word ? 'word': 'hashtag';
  var sizeScale = d3.scaleLinear().domain([0, wordMap[0].count]).range([15, 60]);

  d3.layout.cloud().size([w, h])
    .words(wordMap.map(function (d, i) {
      return {text: d[term], size: sizeScale(d.count)};
    }))
    .padding(padding)
    .rotate(function () {
      return 0;
    })//~~(Math.random() * 2) * 90; })
    .font("Impact")
    .fontSize(function (d) {
      return d.size;
    })
    .on("end", draw)
    .start();
}

function draw(words) {
  d3.select("#" + id).html("")
  d3.select("#" + id).append("svg")
    .attr("class", "wordCloudSVG")
    .attr("width", w)
    .attr("height", h)
    .append("g")
    .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")")
    .selectAll("text")
    .data(words)
    .enter()
    .append("text")
    .style("font-size", function (d) {
      return d.size + "px";
    })
    .style("font-family", "Walbaum")
    .style("cursor", "pointer")
    .style("fill", function (d, i) {
      return fill[i % 2];
    })
    .attr("text-anchor", "middle")
    .attr("transform", function (d) {
      return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
    })
    .on("click", function (d) {
      angular.element(document.getElementById('str_main_monitor')).scope().changeFilterWord(d.text);
    })
    .text(function (d) {
      return d.text;
    });
}

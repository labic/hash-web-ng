(function () {
  'use strict';

  angular
    .module('hash.words')
    .directive('sunburst', function () {
    return {
      templateUrl: 'modules/words/views/partials/sunbust.html',
      restrict: 'E',
      replace: true,
      scope: {
        data: '=',
      },
      link: function(scope, element, attrs) {
        function clear() {
          d3.select("#palavras_div2_sunburstZoom").select('svg').remove();
          d3.select("#palavras_div2_sunburstZoom").select('g').remove();
          d3.select("#palavras_div2_sunburstZoom_fixed").select('p').remove();
          d3.select("#tweets_count_ofWord").select('p').remove();
        }

        function render() {

          var width = $("#palavras_div2_sunburstZoom").width(),
              height = $("#palavras_div2_sunburstZoom").height(),
              radius = Math.min(width, height) / 2;

          var x = d3.scaleLinear().range([0, 2 * Math.PI]),
              y = d3.scale.pow().exponent(1.3).domain([0, 1]).range([0, radius]),
              padding = 5,
              duration = 1000;

          var color = d3.scale.category20c();

          var tweetstext = d3.select("#tweets_count_ofWord")
          var imagestext = d3.select("#images_count_ofWord")

          var seqtext = d3.select("#palavras_div2_sunburstZoom_words")
          .attr("width", width/5)
          .attr("height", height/5)
          .append("g")
          .attr("transform", "translate(" + width / 2 + "," + (height / 2) +")");

          var svg = d3.select("#palavras_div2_sunburstZoom").append("svg")
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform", "translate(" + width / 2 + "," + (height / 2) +")");

          var partition = d3.layout.partition()
          .value(function(d) { return (d.children == null ? d : d.parent).size; });

          var arc = d3.svg.arc()
          .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
          .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
          .innerRadius(function(d) { return Math.max(0, y(d.y)); })
          .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });

          tweetstext.append("p").html(scope.data.tweet_count)

          var path = svg.selectAll("path")
          .data(partition.nodes(scope.data))
          .enter().append("path")
          .attr("d", arc)
          .style("fill", function(d) { return color((d.children ? d : d.parent).name); })
          .on("click", click);

          var text = svg.selectAll("text")
          .data(partition.nodes(scope.data));

          var textEnter = text.enter().append("text")
          .style("fill-opacity", 1)
          .style("fill", "#000")
          .attr("text-anchor", function(d) {
            return x(d.x + d.dx / 2) > Math.PI ? "end" : "start";
          })
          .attr("dy", ".2em")
          .attr("transform", function(d) {
            var multiline = (d.name || "").split(" ").length > 1,
                angle = x(d.x + d.dx / 2) * 180 / Math.PI - 90,
                rotate = angle + (multiline ? -.5 : 0);
            return "rotate(" + rotate + ")translate(" + (y(d.y) + padding) + ")rotate(" + (angle > 90 ? -180 : 0) + ")";
          })
          .on("click", click);

          textEnter.append("tspan")
            .attr("x", 0)
            .text(function(d) { return d.depth ? d.name.split(" ")[0] : ""; });

          textEnter.append("tspan")
            .attr("x", 0)
            .attr("dy", "1em")
            .text(function(d) { return d.depth ? d.name.split(" ")[1] || "" : ""; });

          seqtext.append("p").text("Clique em um campo no gráfico")

          function click(d) {
            seqtext.select("p").remove()
            //			tweetstext.select("p").remove()
            imagestext.select("p").remove()
            var t = ""
            if(d.name != "top_words"){
              t = ""
              var parent = d.parent
              while(parent.name != "top_words"){
                t = parent.name+" ("+parent.size+")<br/>"+t
                parent = parent.parent
              }
              t = t + d.name +" ("+d.size+")"
            }

            //			tweetstext.append("p").html(t.size)
            seqtext.append("p").html("<p style='color:white;'>PALAVRAS</p>"+t)

            path.transition()
              .duration(750)
              .attrTween("d", arcTween(d));
            // Somewhat of a hack as we rely on arcTween updating the scales.
            text.style("visibility", function(e) { return isParentOf(d, e) ? null : d3.select(this).style("visibility"); })
              .transition()
              .duration(duration)
              .attrTween("text-anchor", function(d) {
              return function() {
                return x(d.x + d.dx / 2) > Math.PI ? "end" : "start";
              };
            })
              .attrTween("transform", function(d) {
              var multiline = (d.name || "").split(" ").length > 1;
              return function() {
                var angle = x(d.x + d.dx / 2) * 180 / Math.PI - 90,
                    rotate = angle + (multiline ? -.5 : 0);
                return "rotate(" + rotate + ")translate(" + (y(d.y) + padding) + ")rotate(" + (angle > 90 ? -180 : 0) + ")";
              };
            })
              .style("fill-opacity", function(e) { return isParentOf(d, e) ? 1 : 1e-6; })
              .each("end", function(e) {
              d3.select(this).style("visibility", isParentOf(d, e) ? null : "hidden");
            });
          }

          function isParentOf(p, c) {
            if (p === c) return true;
            if (p.children) {
              return p.children.some(function(d) {
                return isParentOf(d, c);
              });
            }
            return false;
          }

          function maxY(d) {
            return d.children ? Math.max.apply(Math, d.children.map(maxY)) : d.y + d.dy;
          }

          d3.select(self.frameElement).style("height", height + "px");

          // Interpolate the scales!
          function arcTween(d) {
            var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
                yd = d3.interpolate(y.domain(), [d.y, 1]),
                yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
            return function(d, i) {
              return i
                ? function(t) { return arc(d); }
              : function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); return arc(d); };
            };
          }
        }

        scope.$watch('data', function (newData, oldData) {
          if(scope.data) {
            clear();
            render();
          }
        });
      }
    };
  });
})();
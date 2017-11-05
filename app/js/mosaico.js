function plotMosaico(divID, width, imagesPerLine, data){
	div = d3.select("#" + divID);

	imgs = div.selectAll("img").data(data);

	w = parseInt(width/imagesPerLine);
	h = w;

	imgs.enter()
	.append("div")
	.attr("class","col-md-3")
	.append("a")
	.attr("href",function(d){return "https://twitter.com/" + d.user.screen_name + "/status/" + d.id_str})
	.attr("target","_blank")
	.append("img")
	.attr("x",function(d,i){return (i%imagesPerLine) * w})
	.attr("y",function(d,i){return parseInt(i/imagesPerLine) * h})
	.attr("width",w)
	.attr("height",h)
	.attr("src",function(d){return d.media_url_https})
	.attr("alt",function(d){return d.text})
}

function resetMosaico(divID){
	d3.select("#" + divID).html("");
}
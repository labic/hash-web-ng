function getColors(vetor, corA, corB){
	var min = d3.min(vetor, function(d){return d.count;});
	var max = d3.max(vetor, function(d){return d.count;});

	var colorScale = d3.scale.linear()
    .domain([min, max])
    .range([corA, corB]);

    for(i in vetor){
    	vetor[i].cor = colorScale(vetor[i].count);
    }

    return vetor;
}
function plotGraphics(divID, data){
	d3.select("#" + divID).selectAll("div")
	.data(data)
	.enter()
	.append("div")
	.attr("id",function(d,i){return "mg-graphic" + i})
	.attr("class","mg-stats-div")
	.style("margin-left","10px")
	.style("margin-right","10px")

	for(i in data){
		plot("mg-graphic" + i,data[i]);
	}
}

function plot(divID, data){
	MG.data_graphic({
	  title: data.rede.toUpperCase() + " - " + data.param,
	  description: "",
	  data: data.data,
	  full_width:true,
	  height: 200,
	  target: "#" + divID,
	  x_accessor: "date",
	  y_accessor: "value",
	  color: '#004D85',

	  xax_count: data.data.length,

	});
}

function trataEntrada(res, network){
	data = []

	for(i in res){
		data.push({rede:network, param:res[i].label, data:convert(res[i].data)});
	}


	return data;
}

function convert(json){
	vet = []
	for (i in json){
		vet.push({"date":convertData(i),value:json[i]})
	}
	return vet;
}

function convertData(data){
	temp = data.split("T");
	temp2 = temp[0].split("-");
	return new Date(temp2[2] + "-" + temp2[1] + "-" + temp2[0] + "T" + temp[1])
}

function plotMultiLineGraph(divID,vet, tipo){
	newData = [];
	legends = [];
	title = vet[0].rede + " - " + tipo;
	for(i in vet){
		newData[i] = MG.clone(vet[i].data);
		legends[i] = vet[i].param
	}

	console.log(newData);
	console.log(legends);

	//plota o gráfico
	MG.data_graphic({
	  title: title,
	  data: newData,
	  width: width,
	  height: 200,
	  right: 70,
	  target: "#" + divID,
	  xax_format: d3.utcFormat('%d %b (%H:00)'),
	  color: '#004D85',
	  legend: legends
	});
}

function clear(divID){
	d3.select("#" + divID).html("");
}

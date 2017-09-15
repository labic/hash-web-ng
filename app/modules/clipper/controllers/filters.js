/*
filterManager structure{
		filters = [filterObject{} ...],
		originalData = [Object ...],
		filteredData = [Object ...],
	}


filterObject = {
	attr: attribute name
	type: data, text, tags ou number 
	values: 
	operator: equals, greater,lower, between, contains
}
*/

function createFilterManager(originalDataset){
	var filterManager = {}
	filterManager.dataset = originalDataset;
	filterManager.filteredData = originalDataset;
	filterManager.filters = [];
	return filterManager;
}

function getData(filterManager){
	return filterManager.filteredData;
}

function addFilter(filterManager, newFilter){
	filters = filterManager.filters;	
	
	for(i in filters){		
		if(newFilter.attr == filters[i].attr){
			return changeFilter(filterManager, newFilter,i);			
		}
	}

	filters.push(newFilter);
	filterManager.filteredData = applyFilter(filterManager.filteredData, newFilter);
	return filterManager.filteredData;
}

function changeFilter(filterManager, filter, index){
	console.log("Mudando o filtro " + index);
	filterManager.filters[index] = filter;	
	return applyAllFilters(filterManager);
}

function applyAllFilters(filterManager){
	filterManager.filteredData = filterManager.dataset;
	for(i in filterManager.filters){
		filterManager.filteredData = applyFilter(filterManager.filteredData,filterManager.filters[i]);
	}
	return filterManager.filteredData;
}

function applyFilter(data,newFilter){
	var f;
	switch (newFilter.type){
		case "data":
			//console.log("filtrando por Data");
			params = getDataParams(newFilter);
			f = cutByData;
			break;
		case "text":
			//console.log("filtrando por Texto");
			params = null
			f = cutByText;
			break;
		case "number":
			//console.log("filtrando por Número");			
			params = null;
			f = cutByNumber;
			break;
		case "tags": //text array
			//console.log("filtrando por Tags");
			params = null
			f = cutByTags;
	}

	data = data.filter(function(d){		
		return f(d, newFilter, params);		
	});
	
	return data;
}

function cutByText(d, filter){
	if (d[filter.attr] == null){		
		return false;
	}

	if(filter.operator == "equals"){
		return d[filter.attr] == filter.values;
	}else if(filter.operator == "contains"){				
		return (d[filter.attr].indexOf(filter.values) != -1);
	}else{
		console.log("operador inválido");
		return false;
	}
}

function cutByData(d,filter, dataParams){
	//verifica data de publicação
	if (d[filter.attr] == null){
		tempData = manageData(d["dateCreated"]);
	}else{
		tempData = manageData(d[filter.attr]);
	}

	if (tempData == null){		
		return false;
	}


	if(filter.operator == "lower"){	
		return tempData < params.supLimit;
	}else if(filter.operator == "greater"){
		return params.infLimit < tempData;
	}else if(filter.operator == "between"){
		return (tempData < params.supLimit && params.infLimit < tempData);
	}else{
		console.log("operador inválido");
		return false;
	}
}

function getDataParams(filter){
	dataParams = {"infLimit":null,"supLimit":null}
	if(filter.operator == "lower"){	
		dataParams.supLimit = manageData(filter.values);
	}else if(filter.operator == "greater"){
		dataParams.infLimit = manageData(filter.values);
	}else if(filter.operator == "between"){
		dataParams.infLimit = manageData(filter.values[0]);
		dataParams.supLimit = manageData(filter.values[1]);
	}

	return dataParams;
};


function cutByNumbers(d,filter){
	if (d[filter.attr] == null){		
		return false;
	}

	n = d[filter.attr];

	if(filter.operator == "lower"){	
		return n < filter.values;
	}else if(filter.operator == "greater"){
		return filter.values < n;
	}else if(filter.operator == "between"){
		return (n < filter.values[1] && filter.values[0] < n);
	}else if(filter.operator == "equals"){
		return n == filter.values;
	}else{
		console.log("operador inválido");
		return false;
	}

	return true;
}

function cutByTags(d, filter){
	t = filter.values;
	tags = d[filter.attr];	 

	if(Array.isArray(t)){
		for (i in t){
			if(!findTag(t[i],tags)){
				return false;
			}			
		}
		return true;
	}else{
		return findTag(t,tags);
	}
}

function findTag(t, tags){
	for (i in tags){
		if(tags[i].toLowerCase() == t.toLowerCase()){
			return true;
		}
	}
	return false;
}

function manageData(dataText){
	return new Date(dataText);
}

function resetFilters(filterManager){
	filterManager.filteredData = filterManager.dataset;
	filterManager.filters = [];
}

function removeFilter(filterManager,attr){
	filters = filterManager.filters;
	for(i in filters){
		if(filters[i].attr == attr){
			filters.splice(i,1)			
			return applyAllFilters(filterManager)
		}
	}
	console.log("Filtro para " + attr + "não encontrado.");
	return filterManager.filteredData;
}

function updateData(filterManager,newData){
	filterManager.dataset = newData;
	return applyAllFilters(filterManager);
}

angular.module('hash.clipper').exports = {
	"createFilterManager":createFilterManager,
	"getData":getData,
	"addFilter":addFilter,
	"resetFilters":resetFilters,
	"removeFilter":removeFilter,	
	"updateData":updateData
}
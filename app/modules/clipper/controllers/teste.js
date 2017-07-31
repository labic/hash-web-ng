jsonText = require("https://inep-hash-data-api-dev.herokuapp.com/articles");
f = require("./filters.js");
mainData = jsonText.data;

filterManager = f.createFilterManager(mainData);

textFilter = {
	"attr":"description",  
	"type":"text",
	"values":"educação",
	"operator":"contains"
}

textFilter2 = {
	"attr":"description",  
	"type":"text",
	"values":"enem",
	"operator":"contains"
}

dataFilter = {
	"attr":"dateCreated",
	"type":"data",
	"values":["2017-07-01T00:00:00.000000","2017-07-13T00:00:00.000000"],
	"operator":"between"
}

tagFilter = {
	"attr":"keywords",
	"type":"tags",
	"values":"enem"
}

tagFilter2 = {
	"attr":"keywords",
	"type":"tags",
	"values":["enem","educação básica"]
}

//console.log(mainData.length);
f.addFilter(filterManager,tagFilter);
f.addFilter(filterManager,textFilter);
f.addFilter(filterManager,dataFilter);
f.addFilter(filterManager,textFilter2);
console.log(f.getData(filterManager).length)
//resetFilters(filterManager);
f.removeFilter(filterManager,"description")
console.log(f.getData(filterManager).length)

f.addFilter(filterManager,tagFilter2);
console.log(f.getData(filterManager).length)


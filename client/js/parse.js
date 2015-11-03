
function parser_query(url){

	var splited = url.split('=')
	url = splited[1]
	var url = JSON.parse(url);
	var url_parsed = splited[0] + '=';

	lte = url['where']['status.created_at']['lte']
	gte = url['where']['status.created_at']['gte']

	lte =  new Date(lte)
	gte =  new Date(gte)
	delta = lte - gte

	var lteISO = findTimePartition(lte)

	var gteISO = (lteISO - delta)
	gteISO = new Date(gteISO)

	// ISO date UTC
	lteISO = lteISO.toISOString()
	gteISO = gteISO.toISOString()

	//remove the Z in the iso date
	lteISO = lteISO.substring(0, lteISO.length - 1)

	//remove the Z in the iso date
	gteISO = gteISO.substring(0, gteISO.length - 1)

	url['where']['status.created_at']['lte'] = lteISO
	url['where']['status.created_at']['gte'] = gteISO

	return url_parsed + JSON.stringify(url)

}

function findTimePartition(now){
//smallest time partition is 15 min
	fixedHour    = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours()-1, 45)
	fixedHour_15 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), 15)
	fixedHour_30 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), 30)
	fixedHour_45 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), 45)

	if(now < fixedHour_15){
		return fixedHour
	}
	else if (now < fixedHour_30){
		return fixedHour_15
	}
	else if (now < fixedHour_45){
		return fixedHour_30
	}
	else{
		return fixedHour_45
	}

}
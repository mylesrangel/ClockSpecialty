

console.log("footer working");

$('#footerHere').load("./footer.html", function(response, status, xhr){

	if(status != 'error'){
		console.log("loaded fine");
	}

});
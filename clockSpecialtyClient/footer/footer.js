

$('#footerHere').load("../footer/footer.html", function(response, status, xhr){

	if(status == 'error'){

		console.log("An Error occured in Footer.js");
	}

});


const cardClicked = document.querySelector("main");


cardClicked.addEventListener("click", function(event){

	//get id of card clicked
	var searchTerm = event.target.id;
	console.log("SearchTerm in PurchaseClock.js "+ searchTerm);

	//on click of the card take the id and pass it to search page
	if((searchTerm != '') && (searchTerm != "cardContainer")){


		window.location.href = "./searchPage.html?search=" + searchTerm;


	}


});





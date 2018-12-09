
const cardSelection = document.querySelector('#cardContainer');


cardSelection.addEventListener('click', function(event){
	event.preventDefault();

	let cardClicked = event.target.id;

	if(cardClicked != undefined){

		window.location.href = ("./mainPages/" + cardClicked + ".html");
	}

	console.log("event Listener " + cardClicked);
	

})
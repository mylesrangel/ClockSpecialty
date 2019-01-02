

$('#footerHere').load("../footer/footer.html", function(response, status, xhr){

	if(status != 'error'){

		// const mainNavBar = document.querySelector('#footerMainNavBar');

		// //Event listener for links in main Nav Bar
		// //Take the id and send it to displayContent
		// mainNavBar.addEventListener('click', function(event){
		// 	event.preventDefault();
		// 	console.log("eventListener");
		// 	let pageClicked = event.target.id;

		// 	if((pageClicked != 'mainNavBar') && (pageClicked != '')){

		// 		//$('.container').load("../"+pageClicked + ".html");
		// 	}
		// });


	}

});


	///place footer at the bottom of the page
	//if view port is not scrolling
		//set height of main.container to 40vw;

		console.log("in Footer: ");

		console.log("viewport height : " + document.body.scrollHeight);

		console.log("viewport height : " + window.innerHeight);
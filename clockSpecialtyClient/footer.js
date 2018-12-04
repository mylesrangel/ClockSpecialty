


$('#footerHere').load("./footer.html", function(response, status, xhr){

	if(status != 'error'){


		console.log("in footer");
		const mainNavBar = document.querySelector('#footerMainNavBar');

		//Event listener for links in main Nav Bar
		//Take the id and send it to displayContent
		mainNavBar.addEventListener('click', function(event){
			event.preventDefault();
			console.log("eventListener");
			var pageClicked = event.target.id;

			if(pageClicked != 'mainNavBar'){

				$('.container').load("./"+pageClicked + ".html");
			}
		});


	}

});
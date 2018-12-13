
	const resultsList = document.querySelector('#results');  //get ID

	const BASE_URL = 'https://clockspecialtyback.now.sh';
	const LIVE_URL = 'https://clockspecialty.now.sh';

	//get current url and parse it for search term
	var urlString = window.location.href;
	var url = new URL(urlString);
	var searchTerm = url.searchParams.get('search');

	getSearchResults(searchTerm)
		.then(showResults);

	console.log('SearchTerm: ' + searchTerm);

	function getSearchResults(searchTerm){

		return fetch(`${BASE_URL}/search/${searchTerm}`)
			.then(res => res.json())
		
	}

	function showResults(results){

		//TODO: NEED THIS STILL??removes previous search results list
		if(resultsList.hasChildNodes()){
			while(resultsList.hasChildNodes()){
				resultsList.removeChild(resultsList.childNodes[0]);
			}
		}

		//if results only has one result just go to that page
		if(results.length == 1){
			console.log("only has one result " + results[0].sku);
			//Similar to being clicked
			window.location.href = '/clock.html?:sku=' + results[0].sku;
		}


		//counter for 3 items per row in a card

		var counter = 0;

		results.forEach(clock => {
			const li = document.createElement('li');
			const div = document.createElement('div');
			div.className = "card col-lg-3 mx-lg-5 mx-xs-2"
			const img = document.createElement('img');
			const a = document.createElement('a');

			a.href = './clock.html?:sku=' + clock.sku;
			div.appendChild(a);
			img.src= clock.$image;
			a.appendChild(img);

			resultsList.appendChild(div);

			counter++;
		});
	}
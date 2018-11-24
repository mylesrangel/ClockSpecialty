
const form = document.querySelector('form');
const searchInput = document.querySelector('input');
const resultsList = document.querySelector('#results');  //get ID 

const BASE_URL = 'https://clockspecialtyback.now.sh';
const LIVE_URL = 'https://clockspecialty.now.sh';

//search bar event listener
form.addEventListener('submit' , formSubmitted);

function formSubmitted(event){
	event.preventDefault();

	const searchTerm = searchInput.value
	getSearchResults(searchTerm)
		.then(showResults);

	console.log('SearchTerm: ' + searchTerm);

}

function getSearchResults(searchTerm){

	return fetch(`${BASE_URL}/search/${searchTerm}`)
		.then(res => res.json())
	
}

function showResults(results){

	//removes previous search results list
	if(resultsList.hasChildNodes()){
		while(resultsList.hasChildNodes()){
			resultsList.removeChild(resultsList.childNodes[0]);
		}
	}

	results.forEach(clock => {
		const li = document.createElement('li');
		const img = document.createElement('img');
		const a = document.createElement('a');

		a.href = '/clock.html?:sku=' + clock.sku;
		li.appendChild(a);
		img.src= clock.$image;
		a.appendChild(img);

		resultsList.appendChild(li);

	});
}

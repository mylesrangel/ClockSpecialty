
const form = document.querySelector('form');
const searchInput = document.querySelector('input');
const resultsList = document.querySelector('#results');  //get ID 

const BASE_URL = 'https://clockspecialty.now.sh';

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

	results.forEach(clock => {
		const li = document.createElement('li');
		const img = document.createElement('img');
		const a = document.createElement('a');
		
		a.href = '/clock.html?sku=' + clock.sku;
		li.appendChild(a);
		img.src= clock.$image;
		a.appendChild(img);

		resultsList.appendChild(li);

	});
}

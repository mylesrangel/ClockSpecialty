
const form = document.querySelector('form');
const searchInput = document.querySelector('input');
const resultsList = document.querySelector('#results');  //get ID 

const BASE_URL = 'https://clockspecialty.now.sh';

form.addEventListener('submit' , formSubmitted);

function formSubmitted(event){

	console.log('works' + event);

}



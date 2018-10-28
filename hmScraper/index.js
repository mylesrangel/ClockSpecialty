
const fetch = require('node-fetch');
const cheerio = require('cheerio');

//Digital Image Gallery useful for searching and getting: Lists and pictures
const digSearchUrl = "https://digitalimagegallery.howardmiller.com/search?s=";


function searchInventory(searchTerm){
	///TODO: create a list of search terms to check (incorrect:'floor clock' correct: 'floor clocks')
	return fetch(`${digSearchUrl}${searchTerm}`)
		.then(response => response.text())

}

searchInventory('floor clocks')
	.then(body => {
		const $ = cheerio.load(body);
			$('.Grid-cell').each(function(i,element){
				$element = $(element);
				$image = $(element).find('.Image-img img').attr('src');
				console.log($image);
			});
	});
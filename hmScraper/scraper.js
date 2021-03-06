

const clockDescriptionURL = "https://digitalimagegallery.howardmiller.com/image/";

//Digital Image Gallery useful for searching and getting: Lists and pictures
const digSearchUrl = "https://digitalimagegallery.howardmiller.com/search?s=";

const fetch = require('node-fetch');
const cheerio = require('cheerio');


//Cache objects
const searchClocksCache = {};
const clockCache = {};

function searchInventory(searchTerm){

	if(searchClocksCache[searchTerm]){
		console.log("Serving from Cache: " + searchTerm);
		return Promise.resolve(searchClocksCache[searchTerm]);
	}


	///TODO: create a list of search terms to check (incorrect:'floor clock' correct: 'floor clocks')
	return fetch(`${digSearchUrl}${searchTerm}`)
		.then(response => response.text())
		.then(body => {
			const searchResults = [];
			const $ = cheerio.load(body);
			///TODO: "More" button on bottom of search page. Click it? Ignore it?
			//NOTE: Cheerio doesn't click buttons just parses the given page
			
			$('.Grid-cell').each(function(i,element){

				

				const $image = $(element).find('.Image-img img').attr('src'); //gets reference to image
				//sku is the number id number for each clock (e.g. 610644)
				const $sku = $image.match(/jpg\/(.*).jpg/)[1];

				//retrieves the Kieninger format for clocks
				let kFormat = $sku.match(/(.*)-(.*)-(.*)/g);

				let result;

				//if the kformat matches the correct format for Kienger
				console.log("\nActual Sku: " + $sku);
				console.log("Actual kFormat: " + kFormat);

				if(kFormat){

					//if kFormat has '_a ' at the end, remove the _a
					kFormat = $sku.replace(/_a+/g, "");

					console.log("formatted kFormat: " + kFormat);

					if((kFormat.indexOf("_") == -1)){
						
						sku = kFormat;

						console.log("formatted kFormat ready for insert: " + kFormat);

						result = {
							$image,
							sku
						};
					}

				///NOTE: indexOf returns -1 if it never finds the value
				///check if image has underscore in its value, exclude if it does (alternate picture)
				}else if($sku){

					let sku = $sku;

					console.log("Sku before replace: " + sku);

					//if sku has '_a' at the end, remove the _a
					//NOTE: this might be creating Duplicates (it was)
					//sku = sku.replace(/_a+/g, "");
					console.log("Sku after replace: " + sku);

					//NOTE: this excludes the Klienger formats found in sku
					if((sku.indexOf("_") == -1) && (sku.indexOf("-") == -1)){

						console.log("Sku for insert:: " + sku);

						result = {
							$image,
							sku
						};
					}
				}

				//remove the null returns
				if(result){
				searchResults.push(result);
				result = null;
				}
			})
			
			// put the search results in the cache and return them to client
			searchClocksCache[searchTerm] = searchResults;
			return searchResults;

		})
}

function getClock(SKU){

	if(clockCache[SKU]){
		console.log("Serving from Cache: " + SKU);
		return Promise.resolve(clockCache[SKU]);
	}

	return fetch(`${clockDescriptionURL}${SKU}`)
	.then(response => response.text())
	.then(body => {

		const $ = cheerio.load(body);

		const $clockInfo = $('.ProductInfo-value');
		const $clockDesc = $('.ProductInfo-value li');
		const clockImg = $('.Image--solo img').attr('src');


		clockInformation = [];
		$clockInfo.each(function(i, element){

			const clockInfoTemp = $(element).text()

			///if the element has children exclude the value (get it in clockDescription)
			if(!$(element).children().text()){
				clockInformation.push(clockInfoTemp);
			}
		});

		clockDescription = [];
		$clockDesc.each(function(i, element){

			const clockInfoTemp = $(element).text();
			clockDescription.push(clockInfoTemp);		
		});

		const clock = {
			SKU,
			clockImg,
			clockInformation,
			clockDescription

		}

		clockCache[SKU] = clock;
		return clock;
	});

}


module.exports={
	searchInventory,
	getClock
};

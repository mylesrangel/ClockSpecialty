

//TODO: Remove?
//Howard Miller site (maybe: description might be needed No GOOD)
//const hmSearchUrl = "http://www.howardmiller.com/AjaxCatalogSearchView?storeId=12652&catalogId=13551&langId=-1&pageSize=12&beginIndex=0&sType=SimpleSearch&resultCatEntryType=2&showResultsPage=true&pageView=image&searchTermScope=1&searchTermCaseSensitive=no&categoryTermCaseSensitive=no&searchTerm=";

const clockDescriptionURL = "https://digitalimagegallery.howardmiller.com/image/";

//Digital Image Gallery useful for searching and getting: Lists and pictures
const digSearchUrl = "https://digitalimagegallery.howardmiller.com/search?s=";

const fetch = require('node-fetch');
const cheerio = require('cheerio');

function searchInventory(searchTerm){
	///TODO: create a list of search terms to check (incorrect:'floor clock' correct: 'floor clocks')
	return fetch(`${digSearchUrl}${searchTerm}`)
		.then(response => response.text())
		.then(body => {
			const searchResults = [];
			const $ = cheerio.load(body);
			$('.Grid-cell').each(function(i,element){
				$element = $(element);

				$image = $(element).find('.Image-img img').attr('src'); //gets reference to image
				$sku = $image.match(/jpg\/(.*).jpg/)[1];

				
				///NOTE: indexOf returns -1 if it never finds the value, else it returns the index position of the value
				///check if image has underscore in its value, exclude if it does (alternate picture)
				///TODO: check if last indexs are -02 (just in case of a 1083-02-02)
				if( ($sku.indexOf("_") == -1) && ($sku.indexOf("-02") == -1) && ($sku.indexOf("-03") == -1) ){
					console.log('Didnt find a _ or a -02 or -03 in: ' + $sku );

					const result = {
						$image,
						$sku
					};

					searchResults.push(result);

				}else{

					console.log('Found a _ or a -02 or a -03 in: '  + $sku);
				}
		
			});
			return searchResults;

		});
}

function getClock(SKU){


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

		return {
			SKU,
			clockImg,
			clockInformation,
			clockDescription

		}
	});

}


module.exports={
	searchInventory,
	getClock
};

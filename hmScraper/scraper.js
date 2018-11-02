

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

				///TODO: "More" button on bottom of search page. Click it? Ignore it?

				//LEFTOFF: double check values, kFormat might be a little different than expected, sku seems okay (double check) 
				const $image = $(element).find('.Image-img img').attr('src'); //gets reference to image
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
						
						console.log("formatted kFormat ready for insert: " + kFormat);

						result = {
							$image,
							$sku
						};
					}

				///NOTE: indexOf returns -1 if it never finds the value, else it returns the index position of the value
				///check if image has underscore in its value, exclude if it does (alternate picture)
				}else if($sku){

					let sku = $sku;

					console.log("Sku before replace: " + sku);

					//if sku has '-01' at the end, remove the -01
					sku = sku.replace(/_a+/g, "");


					console.log("Sku after replace: " + sku);

					//NOTE: this excludes the Klienger formats found in sku
					if((sku.indexOf("_") == -1)){

						console.log("Sku for insert: " + sku);

						///TODO: if $sku has a -01 at the end of it, remove the -01 after the end (its an alternate picture)
						result = {
							$image,
							$sku
						};
					}
				}

				//remove the null returns
				if(result){
				searchResults.push(result);
				}
			})
			
			return searchResults;

		})
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

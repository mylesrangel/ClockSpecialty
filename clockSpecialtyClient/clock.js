
const main = document.querySelector('main');
//from URL grab anything after 'sku=''
const sku = (window.location.search.match(/sku=(.*)/)[1]);
const BASE_URL = 'https://clockspecialty.now.sh';

let html = "";

function getClock(sku){
	return fetch(`${BASE_URL}/clock/${sku}`)
		.then(res => res.json())
}
function showClock(clock){

	//creating the section to add the clock information
	const section = document.createElement('section');
	main.appendChild(section);

	console.log(clock);

	console.log

	clock.clockDescription.forEach(value => {

		if(value){
			html += `<li>${value}</li>`;
		}
	});

	console.log(html);

	section.outerHTML = `
	

		<section class="row">
			<h1 class = "text-center"> ${clock.clockInformation[1]} </h1>
			<div class = "col-sm-6">
				<img src="${clock.clockImg}" class="img-fluid" />
			</div>
			<div class = "col-sm-6">
				${html}
 			</div>
		</section>

	`
}

getClock(sku)
	.then(showClock)



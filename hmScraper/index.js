
const express = require('express');
const scraper = require('./scraper.js')
const app = express();
const cors = require('cors');


app.use(cors());

app.get('/', (req, res) =>{
	res.json({
		Message: "Lets do this, Man"
	})
});

app.get('/search/:searchTerm',(req,res) =>{

	scraper.searchInventory(req.params.searchTerm)
	.then(results => {
		res.json(results);
	});
});

app.get('/clock/:SKU',(req,res) =>{

	scraper.getClock(req.params.SKU)
	.then(results => {

		res.json(results);
	});

});

const port = process.env.PORT || 3000;

app.listen(port, () =>{
	console.log(`Listening on ${port}`);
});

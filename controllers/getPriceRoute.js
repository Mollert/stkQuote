
const express = require("express");
const fetch = require("node-fetch");
const cheerio = require("cheerio");
const router = express.Router();

let fetchError = require("../public/javascript/fetchError.js");


let front = "https://finance.yahoo.com/quote/";
let tie = "?p=";

let query = {
	visible: "visible",
	time: "",
	company: "",
	ticker: "",
	price: ""
};

router.post("/", (req, res) => {

	query.ticker = req.body.tSymbol;
	let trail = front + query.ticker + tie + query.ticker;

	fetch(trail)
	.then(fetchError)
	.then( response => {
		return response.text();
	}).then( reply => {
		const $ = cheerio.load(reply);
//		console.log($('.quote-header-section').find('span').eq(1).text());
		query.price = $('.quote-header-section').find('span').eq(1).text();

//		console.log($('.quote-header-section').find('h1').text());
		let transfer = $('.quote-header-section').find('h1').text();
		let dash = (transfer.search("-")) + 2;
		query.company = transfer.slice(dash);

//		console.log($('#quote-market-notice').find('span').text());
		query.time = $('#quote-market-notice').find('span').text();
		if ((query.time).charAt(1) === "t") {
			query.time = "At close";
		} else {
			query.time = (query.time).replace("As of  ", "As of ");
			query.time = (query.time).slice(0, 13);
		}

		res.render("index", { query });

	}).catch(error => {
		res.render("errorPage", {error});
		console.error(error);
	});
});


module.exports = router;
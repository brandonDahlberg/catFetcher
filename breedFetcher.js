const request = require('request');
const fs = require('fs');
const breed = process.argv[2];
const path = process.argv[3];
const api = `https://api.thecatapi.com/v1/breeds/search?q=`;

request(`${api}${breed}`, (error, response, body) => {
	console.log('error:', error); // Print the error if one occurred
	console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
	const data = JSON.parse(body);
	const description = data[0].description;
	fs.writeFile(path, description, err => {
		if (err) {
			console.error(err);
			return;
		}
		console.log(`Downloaded and saved a description of ${breed} cats to ${path}`);
	});
});

/** Command-line tool to generate Markov text. */

const fs = require('fs');
const process = require('process');
const axios = require('axios');
const { MarkovMachine } = require('./markov');

const [ method, path ] = process.argv.slice(2);

const generateText = (text) => {
	const markov = new MarkovMachine(text);
	console.log(markov.makeText());
};

const makeMarkovFile = (path) => {
	fs.readFile(path, 'utf8', (error, data) => {
		if (error) {
			throw error;
		} else {
			generateText(data);
		}
		process.exit();
	});
};

const makeMarkovFromWeb = (url) => {
	try {
		const response = axios.get(url);
		const markov = new MarkovMachine(resp.data);
		generateText(markov);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

if (method === 'file') {
	makeMarkovFile(path);
} else if (method === 'url') {
	makeMarkovFromWeb(path);
} else {
	console.error(`Please provide a valid method: 'file' or 'url' \n You provided: ${method}`);
	process.exit(1);
}

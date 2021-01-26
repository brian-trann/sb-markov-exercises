/** Textual markov chain generator */

class MarkovMachine {
	/** build markov machine; read in text.*/

	constructor(text) {
		let words = text.split(/[ \r\n]+/);
		this.words = words.filter((c) => c !== '');
		this.makeChains();
	}

	/** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} 
   *  'the' -> word after is: => cat. If KEY in obj, push to arr
   *  'cat' ->  add key, in is next
   * 
   * */

	makeChains() {
		this.chains = {};
		this.words.forEach((word, i) => {
			const nextWord = this.words[i + 1] || null;
			if (!this.chains[word]) {
				this.chains[word] = [ nextWord ];
			} else {
				this.chains[word] = [ ...this.chains, nextWord ];
			}
		});
		return this.chains;
	}

	/** return random text from chains
   * 
   * pick one of those next-words randomly
   * if we picked null, we’ve reached the end of the chain, so stop
   * otherwise, restart at step 1
   */

	makeText(numWords = 100) {
		const text = [];
		const words = Object.keys(this.chains);

		// generate random index value, to choose random word
		const randIdx = Math.floor(Math.random() * words.length);
		let currWord = words[randIdx];
		text.push(currWord);

		while (text.length < numWords) {
			const newIdx = Math.floor(Math.random() * this.chains[currWord].length);
			const nextWord = this.chains[currWord][newIdx];
			if (nextWord) {
				text.push(nextWord);
				currWord = nextWord;
			} else {
				break;
			}
		}
		return text.join(' ');
	}
}
module.exports = { MarkovMachine };

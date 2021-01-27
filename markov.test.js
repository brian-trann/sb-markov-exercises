const { MarkovMachine } = require('./markov.js');

describe('MarkovMachine Tests', () => {
	let testNewLine;
	let testCarriageReturn;
	let testSpace;
	let fourSpaces;

	beforeEach(() => {
		testNewLine = 'a\nb\nc';
		testCarriageReturn = '1\r2\r3';
		testSpace = 'x y z';
		fourSpaces = '    ';
	});
	test('text splitting: newLines, spaces, carriage returns, empty strings', () => {
		const mmNewLine = new MarkovMachine(testNewLine);
		const mmCarriageReturn = new MarkovMachine(testCarriageReturn);
		const mmSpace = new MarkovMachine(testSpace);
		const mmFourSpaces = new MarkovMachine(fourSpaces);

		expect(mmNewLine.words.length).toBe(3);
		expect(mmCarriageReturn.words.length).toBe(3);
		expect(mmSpace.words.length).toBe(3);
		expect(mmFourSpaces.words.length).toBe(0);
	});

	test('making of chains', () => {
		const testString = new MarkovMachine('a b c a d');
		const mmSpace = new MarkovMachine(testSpace);
		const mmFourSpaces = new MarkovMachine(fourSpaces);
		const mmCarriageReturn = new MarkovMachine(testCarriageReturn);

		expect(testString.chains).toEqual({ a: [ 'b', 'd' ], b: [ 'c' ], c: [ 'a' ], d: [ null ] });
		expect(mmSpace.chains).toEqual({ x: [ 'y' ], y: [ 'z' ], z: [ null ] });
		expect(mmFourSpaces.chains).toEqual({});
		expect(mmCarriageReturn.chains).toEqual({ 1: [ '2' ], 2: [ '3' ], 3: [ null ] });
	});

	test('making of text; ends with a predictable character/word', () => {
		const testString = new MarkovMachine('a b c a d');
		const mmSpace = new MarkovMachine(testSpace);
		const mmCarriageReturn = new MarkovMachine(testCarriageReturn);
		const mmFourSpaces = new MarkovMachine(fourSpaces);

		const testStringText = testString.makeText(10);
		const mmSpaceText = mmSpace.makeText();
		const mmCarriageReturnText = mmCarriageReturn.makeText(100);
		const mmFourSpacesText = mmFourSpaces.makeText();

		expect(testStringText.endsWith('d')).toBe(true);
		expect(mmSpaceText.endsWith('z')).toBe(true);
		expect(mmCarriageReturnText.endsWith('1')).toBe(false);
		expect(mmFourSpacesText.endsWith('')).toBe(true);
	});
});

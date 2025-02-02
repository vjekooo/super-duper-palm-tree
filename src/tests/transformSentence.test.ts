import { transformSentence } from '../lib/utils'

describe('transformSentence', () => {
	it('should transform the sentence based on guessed letters', () => {
		const sentence = 'Hello, World!'
		const guessedLetters = ['h', 'e', 'o', 'l']

		const result = transformSentence(sentence, guessedLetters)

		expect(result).toEqual([
			'_',
			' e ',
			' l ',
			' l ',
			' o ',
			' , ',
			' ',
			'_',
			' o ',
			'_',
			' l ',
			'_',
			' ! '
		])
	})
})

import { checkIfWinner } from '../lib/utils'

describe('checkIfWinner', () => {
	it('returns true when all letters are guessed', () => {
		const sentence = 'hello world'
		const guessedLetters = ['h', 'e', 'l', 'o', 'w', 'r', 'd']
		expect(checkIfWinner(sentence, guessedLetters)).toBe(true)
	})

	it('returns false when there are non-guessed letters', () => {
		const sentence = 'hello world'
		const guessedLetters = ['h', 'e', 'l', 'o']
		expect(checkIfWinner(sentence, guessedLetters)).toBe(false)
	})

	it('ignores spaces and non-alphabetic characters', () => {
		const sentence = 'hi! my number is 42.'
		const guessedLetters = ['h', 'i', 'm', 'y', 'n', 'u', 'b', 'e', 'r', 's']
		expect(checkIfWinner(sentence, guessedLetters)).toBe(true)
	})
})

import { Quote } from './types'

/**
 * Calculates the number of unique characters (letters only) in a given sentence.
 *
 * @param {string} sentence - The input sentence to analyze.
 * @returns {number} The number of unique alphabetic characters in the sentence.
 */
export const calculateNumberOfUniqueCharacters = (sentence: string): number => {
	const transformedSentence = sentence.toLowerCase().replace(/[^a-z]/g, '')
	const uniqueCharacters = new Set(transformedSentence.split(''))
	return uniqueCharacters.size
}

/**
 * Calculates a score based on input parameters:
 * - Length of the text,
 * - Number of unique letters,
 * - Number of errors,
 * - Time taken.
 *
 * @param {number} length - The length of the text.
 * @param {number} uniqueLetters - The number of unique letters in the text.
 * @param {number} errors - The number of errors made.
 * @param {number} time - The time taken in milliseconds.
 * @returns {number} The calculated score. Returns 0 if the score calculation results in a negative value.
 */
export const calculateScore = (
	length: number,
	uniqueLetters: number,
	errors: number,
	time: number
): number => {
	const timeInSeconds = time / 1000

	return Math.max(
		0,
		Math.round(
			((length * 2 + uniqueLetters) * 100) / ((1 + errors) * timeInSeconds)
		)
	)
}

/**
 * Generates an array of alphabet letters from 'a' to 'z'.
 *
 * @returns {string[]}
 */
export const generateAlphabetLetters = (): string[] =>
	Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i))

/**
 * Transforms a sentence into a formatted array where each character in the sentence
 * is represented differently based on the guessed letters. Not guessed letters are replaced with underscores,
 * while guessed letter is represented by itself.
 * Special chars are ignored by returning self.
 *
 * @param {string} sentence - The input sentence to be transformed.
 * @param {string[]} guessedLetters - An array of guessed letters.
 * @returns {string[]} An array representing the transformed sentence.
 */
export const transformSentence = (
	sentence: string,
	guessedLetters: string[]
): string[] => {
	return sentence?.split('').map(char => {
		if (char === ' ') {
			return ' '
		} else if (!/[a-zA-Z]/.test(char)) {
			return ` ${char} `
		} else {
			return guessedLetters.includes(char) ? ` ${char} ` : '_'
		}
	})
}

export const setQuoteToLocalStorage = (cacheKey: string, data: Quote): void => {
	const cachedData = localStorage.getItem(cacheKey)
	localStorage.setItem(cacheKey, JSON.stringify([data, cachedData]))
}

export const getRandomQuoteFromLocalStorage = (cacheKey: string): Quote => {
	const cachedData = localStorage.getItem(cacheKey)
	const data = cachedData ? JSON.parse(cachedData) : null
	return data.length > 0 ? data[Math.floor(Math.random() * data.length)] : null
}

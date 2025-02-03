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
		Math.round(((length * 2 + uniqueLetters) * 100) / ((1 + errors) * timeInSeconds))
	)
}

/**
 * Generates an array of alphabet letters from 'A' to 'Z'.
 *
 * @returns {string[]}
 */
export const generateAlphabetLetters = (): string[] =>
	Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i))

/**
 * Transforms a quote into a formatted array where each character in the sentence
 * is represented differently based on the guessed letters. Not guessed letters are replaced with underscores,
 * while guessed letter is represented by itself.
 * Special chars are ignored by returning self.
 *
 * @param {string} sentence - The input quote to be transformed.
 * @param {string[]} guessedLetters - An array of guessed letters.
 * @returns {string[]} An array representing the transformed quote.
 */
export const transformQuoteForDisplay = (
	sentence: string,
	guessedLetters: string[]
): string[] => {
	return sentence?.split('').map(char => {
		if (char === ' ') {
			return ' '
		} else if (!/[a-zA-Z]/.test(char)) {
			return char
		} else {
			return guessedLetters.includes(char) ? char : '_'
		}
	})
}

/**
 * Stores a quote object into localStorage under the specified cache key.
 *
 * @param {string} cacheKey - The key under which the data will be stored in localStorage.
 * @param {Quote} data - The Quote object to be stored.
 * @returns {void}
 */
export const setQuoteToLocalStorage = (cacheKey: string, data: Quote): void => {
	const cachedData = localStorage.getItem(cacheKey)
	const dataArray = cachedData ? JSON.parse(cachedData) : []
	localStorage.setItem(cacheKey, JSON.stringify([data, ...dataArray]))
}

/**
 * Retrieves a random Quote object from localStorage using the specified cache key.
 *
 * @param {string} cacheKey - The key used to retrieve data from localStorage.
 * @returns {Quote | null} The randomly selected Quote object, or null if no data exists.
 */
export const getRandomQuoteFromLocalStorage = (cacheKey: string): Quote => {
	const cachedData = localStorage.getItem(cacheKey)
	const data = cachedData ? JSON.parse(cachedData) : null
	return data?.length > 0 ? data[Math.floor(Math.random() * data.length)] : null
}

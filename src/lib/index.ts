/**
 * Calculates the number of unique characters (letters only) in a given sentence.
 *
 * @param {string} sentence - The input sentence to analyze.
 * @returns {number} The number of unique alphabetic characters in the sentence.
 */
export const calculateUniqueCharacters = (sentence: string): number => {
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

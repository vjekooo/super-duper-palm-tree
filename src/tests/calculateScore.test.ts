import { calculateScore } from '../lib'

describe('calculateUniqueCharacters', () => {
	it('should calculate score correctly for valid inputs', () => {
		expect(calculateScore(50, 10, 1, 65956)).toBe(83)
	})

	it('should give a higher score to the solution with fewer errors', () => {
		const length = 50
		const uniqueLetters = 10
		const time = 65956

		const scoreWithFewErrors = calculateScore(length, uniqueLetters, 2, time)

		const scoreWithMoreErrors = calculateScore(length, uniqueLetters, 5, time)

		expect(scoreWithFewErrors).toBeGreaterThan(scoreWithMoreErrors)
	})

	it('should give a higher score to the solution with more unique letter and same number of errors', () => {
		const length = 50
		const errors = 2
		const time = 65956

		const scoreWithMoreUniqueLetters = calculateScore(length, 12, errors, time)

		const scoreWithLessUniqueLetters = calculateScore(length, 9, errors, time)

		expect(scoreWithMoreUniqueLetters).toBeGreaterThan(
			scoreWithLessUniqueLetters
		)
	})

	it('should give a higher score to the longer solution with same number or errors and unique chars', () => {
		const errors = 2
		const uniqueLetters = 10
		const time = 65956

		const scoreWithMoreLength = calculateScore(78, uniqueLetters, errors, time)

		const scoreWithLessLength = calculateScore(45, uniqueLetters, errors, time)

		expect(scoreWithMoreLength).toBeGreaterThan(scoreWithLessLength)
	})

	it('should give a higher score to the faster solution with same number of other params', () => {
		const length = 50
		const errors = 2
		const uniqueLetters = 10

		const fasterScore = calculateScore(length, uniqueLetters, errors, 54456)

		const slowerScore = calculateScore(length, uniqueLetters, errors, 64456)

		expect(fasterScore).toBeGreaterThan(slowerScore)
	})
})

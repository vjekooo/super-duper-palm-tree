import { calculateNumberOfUniqueCharacters } from '../lib'

describe('calculateUniqueCharacters', () => {
	it('should handle a simple sentence with unique characters', () => {
		expect(calculateNumberOfUniqueCharacters('Hello')).toBe(4)
	})

	it('should handle a sentence with mixed case and duplicate letters', () => {
		expect(calculateNumberOfUniqueCharacters('Hello World')).toBe(7)
	})

	it('should ignore numbers and special characters while counting letters', () => {
		expect(calculateNumberOfUniqueCharacters('123 !@# abc def')).toBe(6)
	})

	it('should return 0 for an empty string', () => {
		expect(calculateNumberOfUniqueCharacters('')).toBe(0)
	})

	it('should return 0 for a string with only special characters', () => {
		expect(calculateNumberOfUniqueCharacters('!@#$%^&*()')).toBe(0)
	})

	it('should treat uppercase and lowercase letters as identical', () => {
		expect(calculateNumberOfUniqueCharacters('AaBbCc')).toBe(3)
	})
})

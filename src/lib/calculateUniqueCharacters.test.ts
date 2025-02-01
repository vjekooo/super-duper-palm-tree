import { calculateUniqueCharacters } from './index'

describe('calculateUniqueCharacters', () => {
	it('should handle a simple sentence with unique characters', () => {
		expect(calculateUniqueCharacters('Hello')).toBe(4)
	})

	it('should handle a sentence with mixed case and duplicate letters', () => {
		expect(calculateUniqueCharacters('Hello World')).toBe(7)
	})

	it('should ignore numbers and special characters while counting letters', () => {
		expect(calculateUniqueCharacters('123 !@# abc def')).toBe(6)
	})

	it('should return 0 for an empty string', () => {
		expect(calculateUniqueCharacters('')).toBe(0)
	})

	it('should return 0 for a string with only special characters', () => {
		expect(calculateUniqueCharacters('!@#$%^&*()')).toBe(0)
	})

	it('should treat uppercase and lowercase letters as identical', () => {
		expect(calculateUniqueCharacters('AaBbCc')).toBe(3)
	})
})

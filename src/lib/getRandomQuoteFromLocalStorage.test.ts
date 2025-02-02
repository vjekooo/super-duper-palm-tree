import { Quote } from './types'
import { getRandomQuoteFromLocalStorage } from './utils'

describe('getRandomQuoteFromLocalStorage', () => {
	beforeEach(() => {
		localStorage.clear()
	})

	it('should return a random quote from localStorage if data exists', () => {
		const cacheKey = 'testCacheKey'

		const quotes: Quote[] = [
			{ quoteId: 'Hjhj', content: 'First quote', length: 12 },
			{ quoteId: 'GssB', content: 'Second quote', length: 15 },
			{ quoteId: 'Gjkk', content: 'Third quote', length: 11 }
		]

		localStorage.setItem(cacheKey, JSON.stringify(quotes))

		const randomQuote = getRandomQuoteFromLocalStorage(cacheKey)

		expect(randomQuote).not.toBeNull()
		expect(quotes).toContainEqual(randomQuote)
	})

	it('should return null if no data exists for the given cache key', () => {
		const cacheKey = 'nonExistentKey'

		const randomQuote = getRandomQuoteFromLocalStorage(cacheKey)

		expect(randomQuote).toBeNull()
	})

	it('should return null if the stored data is empty', () => {
		const cacheKey = 'testCacheKey'

		localStorage.setItem(cacheKey, JSON.stringify([]))

		const randomQuote = getRandomQuoteFromLocalStorage(cacheKey)

		expect(randomQuote).toBeNull()
	})
})

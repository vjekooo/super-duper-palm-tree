import { Quote } from '../lib/types'
import { setQuoteToLocalStorage } from '../lib/utils'

describe('setQuoteToLocalStorage', () => {
	beforeEach(() => {
		localStorage.clear()
	})

	it('should store a Quote object in localStorage under the specified cache key', () => {
		const cacheKey = 'testCacheKey'
		const quote: Quote = {
			_id: 'Hte',
			content: 'This is a test quote',
			length: 16
		}

		setQuoteToLocalStorage(cacheKey, quote)

		const storedData = localStorage.getItem(cacheKey)
		expect(storedData).not.toBeNull()

		const parsedData = JSON.parse(storedData || '')
		expect(Array.isArray(parsedData)).toBe(true)
		expect(parsedData[0]).toEqual(quote)
	})

	it('should append to existing data in localStorage', () => {
		const cacheKey = 'testCacheKey'
		const quote: Quote = {
			_id: 'Hte',
			content: 'This is a test quote',
			length: 16
		}

		setQuoteToLocalStorage(cacheKey, quote)

		const storedData = localStorage.getItem(cacheKey)
		expect(storedData).not.toBeNull()

		const quote2: Quote = {
			_id: 'LOpe',
			content: 'This is another test quote',
			length: 20
		}

		setQuoteToLocalStorage(cacheKey, quote2)

		const test = localStorage.getItem(cacheKey)
		expect(test).not.toBeNull()

		const parsedData = JSON.parse(test || '')
		expect(Array.isArray(parsedData)).toBe(true)
		expect(parsedData[0]).toEqual(quote2)
		expect(parsedData[1]).toEqual(quote)
	})

	it('should handle cases where localStorage key is empty', () => {
		const cacheKey = 'emptyCacheKey'
		const quote: Quote = {
			_id: 'LOpe',
			content: 'This is another test quote',
			length: 20
		}

		setQuoteToLocalStorage(cacheKey, quote)

		const storedData = localStorage.getItem(cacheKey)
		expect(storedData).not.toBeNull()

		const parsedData = JSON.parse(storedData || '')
		expect(Array.isArray(parsedData)).toBe(true)
		expect(parsedData[0]).toEqual(quote)
		expect(parsedData[1]).toBeUndefined()
	})
})

import { renderHook, waitFor } from '@testing-library/react'
import axios from 'axios'
import { useCachedQuoteSometimes } from '../hooks/useCachedQuoteSometimes'
import { getRandomQuoteFromLocalStorage, setQuoteToLocalStorage } from '../lib/utils'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('useCachedQuote', () => {
	const cacheKey = 'quote'

	beforeEach(() => {
		localStorage.clear()
	})

	it('should store fetched data in localStorage', async () => {
		const mockQuote = {
			content: 'Test quote.'
		}
		mockedAxios.get.mockResolvedValueOnce({ data: mockQuote })

		const quotePromiseFn = () =>
			mockedAxios.get('https://api.quotable.io/random').then(res => res.data)

		const { result } = renderHook(() => useCachedQuoteSometimes(quotePromiseFn))

		expect(result.current.status).toBe('pending')
		expect(result.current.quoteData).toBe(null)

		await waitFor(() => {
			const localQuote = getRandomQuoteFromLocalStorage(cacheKey)
			expect(result.current.status).toBe('success')
			expect(result.current.quoteData).toEqual(mockQuote)
			expect(localQuote).toEqual(mockQuote)
		})
	})

	it('should reject on fetch failure with no cached data', async () => {
		const fetchQuote = jest.fn().mockRejectedValue(new Error('Fetch failed'))

		const { result } = renderHook(() => useCachedQuoteSometimes(fetchQuote))

		expect(result.current.status).toBe('pending')
		expect(result.current.quoteData).toBe(null)

		await waitFor(() => {
			expect(result.current.status).toBe('error')
		})
	})

	it('should fallback to cached data on fetch failure', async () => {
		const mockQuote = {
			_id: 'Hjhja',
			content: 'Test quote.',
			length: 12
		}

		setQuoteToLocalStorage(cacheKey, mockQuote)

		const mockError = new Error('Network error')
		mockedAxios.get.mockRejectedValueOnce(mockError)

		const quotePromiseFn = () =>
			mockedAxios.get('https://api.quotable.io/random').then(res => res.data)

		const { result } = renderHook(() => useCachedQuoteSometimes(quotePromiseFn))

		await waitFor(() => {
			expect(result.current.status).toBe('success')
			expect(result.current.quoteData).toBeDefined()
		})
	})
})

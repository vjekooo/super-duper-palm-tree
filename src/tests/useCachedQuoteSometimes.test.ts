import { renderHook, waitFor } from '@testing-library/react'
import { useCachedQuoteSometimes } from '../hooks/useCachedQuoteSometimes'

const localStorageMock = (() => {
	const store: Record<string, string> = {}
	return {
		getItem: (key: string) => store[key] || null,
		setItem: (key: string, value: string) => {
			store[key] = value
		},
		clear: () => {
			Object.keys(store).forEach(key => delete store[key])
		}
	}
})()
Object.defineProperty(window, 'localStorage', { value: localStorageMock })

describe('useCachedQuote', () => {
	const cacheKey = 'quote'

	beforeEach(() => {
		localStorage.clear()
	})

	it('should store fetched data in localStorage', async () => {
		const mockQuote = { content: 'This is a test quote!' }
		const fetchQuote = jest.fn().mockResolvedValue(mockQuote)

		const { result } = renderHook(() => useCachedQuoteSometimes(fetchQuote))

		expect(result.current.status).toBe('pending')
		expect(result.current.quoteData).toBe(null)

		await waitFor(() => {
			expect(result.current.status).toBe('success')
			expect(result.current.quoteData).toEqual(mockQuote)

			const storedQuote = localStorage.getItem(cacheKey)
			expect(storedQuote).toEqual(JSON.stringify(mockQuote))
		})
	})
})
